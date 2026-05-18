import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await UserModel.findOne({
      email,
      verificationToken: token,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 404 },
      );
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
