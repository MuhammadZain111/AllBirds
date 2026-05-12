import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log("Signup API started");

    await dbConnect();
    console.log("DB connected");

    const { email, username, password } = await req.json();
    console.log(" Request data received:", { email, username });

    if (!email || !password || !username) {
      console.log("Missing fields");
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.log(" User already exists:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔒 Password hashed");

    const verificationToken = crypto.randomBytes(32).toString("hex");
    console.log("🔑 Verification token generated");

    // 6. CREATE USER
    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
      role: 3,
      isVerified: false,
      verificationToken,
    });

    console.log("User created:", user._id);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("Email credentials missing in .env");
      throw new Error("Email config missing");
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.log("BASE URL missing");
      throw new Error("Base URL missing");
    }

    // 8. EMAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Mail transporter created");

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${verificationToken}&email=${email}`;

    console.log("Verify URL:", verifyUrl);

    // 9. SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      html: `
        <h2>Verify Your Email</h2>
        <p>Click below to verify your account:</p>
        <a href="${verifyUrl}" target="_blank">Verify Account</a>
      `,
    });

    console.log("Verification email sent");

    return NextResponse.json(
      { message: "User created. Verification email sent." },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("SIGNUP ERROR OCCURRED");

    // FULL ERROR LOG
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    return NextResponse.json(
      {
        error: "Server error",
        details: error.message, // helps debugging in dev
      },
      { status: 500 },
    );
  }
}
