import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/UserModel";






export async function POST(req) {
  try {
 
    await dbConnect();

    //  Auth Check

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Please login" },
        { status: 401 }
      );
    }


    //  GET FILE
    const formData = await req.formData();
    const file = formData.get("file");

console.log("Received file:", file);

    //  FILE VALIDATION
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "No valid file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // CLOUDINARY UPLOAD
    let uploadResult;


    try {
      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "profile_avatars",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
    } catch (cloudError) {
      console.error("Cloudinary Error:", cloudError);

      return NextResponse.json(
        { success: false, message: "Image upload failed" },
        { status: 500 }
      );
    }

    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        { success: false, message: "Failed to get image URL" },
        { status: 500 }
      );
    }

    const imageUrl = uploadResult.secure_url;

    // DATABASE UPDATE
    let updatedUser;

    
console.log("Updating user with email:", session.user.email, "to have image URL:", imageUrl);



    try {
      updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { profileImage: imageUrl },
        { new: true }
      );
    } catch (dbError) {
      console.error("Db Error:", dbError);

      return NextResponse.json(
        { success: false, message: "Database update failed" },
        { status: 500 }
      );
    }

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      message: "Profile image updated successfully",
      imageUrl,
    });

    
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}