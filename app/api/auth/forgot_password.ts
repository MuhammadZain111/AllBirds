import crypto from "crypto"
import User from "@/models/User"
import dbConnect from "@/lib/dbConnect"

export async function POST(req) {
  await dbConnect()

  const { email } = await req.json()

  const user = await User.findOne({ email })

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 })
  }

  const resetToken = crypto.randomBytes(32).toString("hex")

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000

  await user.save()

  const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password/${resetToken}`

  console.log("RESET LINK:", resetUrl)

  return Response.json({ message: "Reset link sent" })
}