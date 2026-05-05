"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"




export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setMessage("")

      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      setMessage(data.message)

      if (response.ok) {
        localStorage.setItem("resetEmail", email)

        setTimeout(() => {
          router.push("/reset-password")
        }, 1500)
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

        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium text-black   ">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 text-black  outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer  "
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {message && (
            <p className="text-center text-sm mt-3 text-black ">
              {message}
            </p>
          )}

        </form>
      </div>
    </div>
  )
}