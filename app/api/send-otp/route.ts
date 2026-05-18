import User from "@/models/UserModel";
import dbConnect from "@/lib/dbConnect";
import nodemailer from "nodemailer";



const rateLimit = new Map();

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return Response.json({ message: "Email is required" }, { status: 400 });
    }

    // ⛔ Rate limiting (1 min)
    const now = Date.now();
    if (rateLimit.get(email) && now - rateLimit.get(email) < 60000) {
      return Response.json(
        { message: "Wait 1 minute before requesting again" },
        { status: 429 },
      );
    }
    rateLimit.set(email, now);

    // 👤 Find user
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // 🔢 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    console.log("OTP generated:", otp);

    // 📧 Validate env
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email config missing");
    }

    // 📧 Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Mail transporter ready");

    // 📩 SEND OTP EMAIL (FIXED)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial;">
          <h2>Email Verification OTP</h2>
          <p>Your OTP code is:</p>
          <h1 style="color:#4CAF50;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
        </div>
      `,
    });

    console.log("OTP sent successfully");

    return Response.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("OTP ERROR:", error);

    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
