import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";        
import User from "@/models/User";            
import bcrypt from "bcryptjs";              

export async function PUT(req) {
  try {
    await connectDB();

    const { email, currentPassword, newPassword } = await req.json();

    // Basic validation
    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Find user — select password explicitly (if you use select: false in schema)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user signed up with OAuth (no password set)

    if (!user.password) {
      return NextResponse.json(
        { success: false, message: "Password update not available for OAuth accounts" },
        { status: 400 }
      );
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update in DB
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
