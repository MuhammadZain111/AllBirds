"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  //  if (session) {
  //      router.push("/");
  //  }

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = form.email;
    let hasError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      alert("Invalid email");
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      hasError = true;

      if (hasError) return;
    }

    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      console.log(data);

      if (res.ok) {
        router.push("/sign-in");
      } else {
        alert(data.error || data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB] px-4">
      <div className="w-[450px] max-w-xl bg-white rounded-[5px] p-4 md:p-8 shadow-lg border border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center px-4 space-y-5 py-6 rounded-xl"
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Sign Up
          </h2>

          {/* Username */}
          <div className="relative w-full">
            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] w-5 h-5 z-10" />

            <input
              placeholder="Username"
              className="w-full bg-white text-black rounded-sm px-5 py-4 pr-14 outline-none border border-gray-200 placeholder:text-gray-400 focus:border-[#0F172A] transition-all"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="relative w-full">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] w-5 h-5 z-10" />

            <input
              placeholder="Email"
              className="w-full bg-white text-black rounded-sm px-5 py-4 pr-14 outline-none border border-gray-200 placeholder:text-gray-400 focus:border-[#0F172A] transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm w-full">{errors.email}</p>
          )}

          {/* Password */}
          <div className="relative w-full">
            {/* Lock Icon */}
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] w-5 h-5 z-10" />

            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full bg-white text-black rounded-2xl pl-12 pr-14 py-4 outline-none border border-gray-200 placeholder:text-gray-400 focus:border-[#0F172A] transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] cursor-pointer z-10"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Password Rule */}
          <div className="w-full border border-gray-200 rounded-2xl p-4 bg-[#FAFBFC]">
            <p className="text-sm text-[#475569] font-medium">
              Password must contain 1 - 16 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F172A] hover:bg-black transition duration-300 rounded-sm py-4 text-xl font-medium text-white cursor-pointer"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Footer */}
          <p className="mt-4 text-[#475569]">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#2563EB] font-semibold hover:underline transition"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
