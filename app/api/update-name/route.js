import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";

export async function PUT(req) {
  try {
    await dbConnect();

    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { success: false, message: "Email and name are required" },
        { status: 400 },
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Name must be at least 2 characters" },
        { status: 400 },
      );
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { username: name.trim() },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Name updated successfully",
        user: {
          email: updatedUser.email,
          username: updatedUser.username, // Fields here should be Same as  in Db
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update name error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
