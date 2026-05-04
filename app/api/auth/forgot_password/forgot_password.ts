import User from "@/models/User"
import dbConnect from "@/lib/dbConnect"

const rateLimit = new Map()

export async function POST(req) {
  try {
    await dbConnect()

    const { email } = await req.json()

    // ⛔ simple rate limit (1 min per email)
    const now = Date.now()
    if (rateLimit.get(email) && now - rateLimit.get(email) < 60000) {
      return Response.json(
        { message: "Wait 1 minute before requesting again" },
        { status: 429 }
      )
    }
    rateLimit.set(email, now)

    const user = await User.findOne({ email })

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    // 🔢 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    user.resetOTP = otp
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000 // 10 min

    await user.save()

    // 📧 send email (replace later with nodemailer)
    console.log("OTP:", otp)

    return Response.json({ message: "OTP sent successfully" })

  } catch (error) {
    console.log(error)
    return Response.json({ message: "Server error" }, { status: 500 })
  }
}