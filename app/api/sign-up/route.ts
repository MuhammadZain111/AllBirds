import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { DbConnect } from "@/lib/DbConnect";
import UserModel from "@/models/UserModel";



export async function POST(req: Request) {
  try {
    await DbConnect();

    const { email, username, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 401 }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
      role: 3,
      isVerified: true,
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}