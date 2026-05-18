import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, otp, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // ⛔ check expiry
    if (user.resetOTPExpire < Date.now()) {
      return Response.json({ message: "OTP expired" }, { status: 400 });
    }

    // ⛔ check OTP
    if (user.resetOTP !== otp) {
      return Response.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // 🔐 update password
    user.password = await bcrypt.hash(password, 10);

    // 🧹 clear OTP
    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;

    await user.save();

    return Response.json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
