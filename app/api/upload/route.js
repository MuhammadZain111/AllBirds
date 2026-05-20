import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/UserModel";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const UPLOAD_TIMEOUT_MS = 10_000;

export async function POST(req) {
  try {
    await dbConnect();

    // ── 1. Auth ─────────
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized – please log in" },
        { status: 401 },
      );
    }

    // ── 2. File extraction ────
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "No valid file provided" },
        { status: 400 },
      );
    }

    // ── 3. File validation (type + size) ─────────────────────
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: "File too large. Maximum size is 5 MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ── 4. Cloudinary upload (with timeout) ──────────────────
    let uploadResult;
    try {
      const uploadPromise = new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "profile_avatars" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Cloudinary upload timed out")),
          UPLOAD_TIMEOUT_MS,
        ),
      );

      uploadResult = await Promise.race([uploadPromise, timeoutPromise]);
    } catch (cloudError) {
      console.error("Cloudinary error:", cloudError);
      return NextResponse.json(
        { success: false, message: "Image upload failed" },
        { status: 500 },
      );
    }

    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        { success: false, message: "Failed to get image URL from Cloudinary" },
        { status: 500 },
      );
    }

    const newImageUrl = uploadResult.secure_url;
    const newPublicId = uploadResult.public_id; // needed for cleanup

    // ── 5. DB update ─────────────────────────────────────────
    let updatedUser;
    try {
      updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { image: newImageUrl },
        { returnDocument: "after" }, // ← was `{ returnDocument: "after" }` — that's a MongoDB driver option, not Mongoose
      );
    } catch (dbError) {
      console.error("DB error:", dbError);

      // Rollback: delete the just-uploaded Cloudinary image
      await cloudinary.uploader
        .destroy(newPublicId)
        .catch((e) => console.error("Cloudinary rollback failed:", e));

      return NextResponse.json(
        { success: false, message: "Database update failed" },
        { status: 500 },
      );
    }

    if (!updatedUser) {
      // Rollback here too — user not found means the upload was wasted
      await cloudinary.uploader
        .destroy(newPublicId)
        .catch((e) => console.error("Cloudinary rollback failed:", e));

      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // ── 6. (Optional) Delete old Cloudinary image ────────────
    // If you store public_id in the DB, do this instead of parsing the URL.
    // Parsing is fragile but works as a fallback:
    // const oldUrl = updatedUser.profileImage; // value BEFORE the update — needs `new: false` above
    // if (oldUrl) {
    //   const segments = new URL(oldUrl).pathname.split("/");
    //   const oldPublicId = segments.slice(-2).join("/").replace(/\.[^/.]+$/, "");
    //   await cloudinary.uploader.destroy(oldPublicId).catch(console.error);
    // }

    return NextResponse.json({
      success: true,
      message: "Profile image updated successfully",
      imageUrl: newImageUrl,
    });
  } catch (error) {
    console.error("Unhandled server error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
