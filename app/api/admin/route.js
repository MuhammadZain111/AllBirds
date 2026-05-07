import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import User from "@/models/UserModel";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    // 🔐 Super Admin check
    if (!session?.user || session.user.role !== 1) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const body = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const employeeData = await User.create({
      ...body,
      password: hashedPassword,
      role: 2,
      accountStatus: "active",
    });

    return NextResponse.json(employeeData);
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
