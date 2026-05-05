import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";





export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get token and email from URL
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    // Check if token/email exists
    if (!token || !email) {
      return NextResponse.json(
        { success: false, message: "Invalid verification link" },
        { status: 400 }
      );
    }

    // Find user
    const user = await UserModel.findOne({
      email,
      verificationToken: token,
    });

    // User not found
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check token expiry
    if (user.verificationTokenExpire < Date.now()) {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 400 }
      );
    }

    // Verify user
    user.isVerified = true;

    // Remove token after verification
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}