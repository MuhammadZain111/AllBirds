"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const router = useRouter()

  
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail")

    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const response = await fetch("/api/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp,
          password
        })
      })

      const data = await response.json()

      setMessage(data.message)

      if (response.ok) {
        localStorage.removeItem("resetEmail")

        setTimeout(() => {
          router.push("/sign-in")
        }, 2000)
      }

    } catch (error) {
      console.log(error)
      setMessage("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-black   ">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium text-black ">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-black        "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black ">
              OTP
            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black text-black  "
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black text-black   "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black  ">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black text-black   "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {message && (
            <p className="text-center text-sm mt-3">
              {message}
            </p>
          )}

        </form>

      </div>
    </div>
  )
}
