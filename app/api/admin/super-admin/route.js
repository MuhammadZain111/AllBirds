import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import User from "@/models/User"
import dbConnect from "@/lib/dbConnect"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req) {
  await dbConnect()

  const session = await getServerSession(authOptions)

  // 🔐 check Super Admin
  if (!session || session.user.role !== 1) {
    return NextResponse.json(
      { message: "Access denied" },
      { status: 403 }
    )
  }

  const { email, password } = await req.json()

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    email,
    password: hashedPassword,
    role: 2   // 👈 sub admin
  })

  return NextResponse.json(user)
}