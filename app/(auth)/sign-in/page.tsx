"use client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { FaChrome, FaFacebook } from "react-icons/fa";

import { useSession, signIn, signOut,getSession} from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  
  const router = useRouter();

  const searchParams = useSearchParams();

  const google_auth_error = searchParams.get("error");

  // if (session) {
  //     router.push("/");
  //   }

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: form.identifier,
        password: form.password,
      });

      console.log(res);

      if (res?.error) {
        setError("Invalid email or password");
        return;
      }    
      
      const session = await getSession();

      const role = session?.user?.role;

      if (role === 1) {
        router.push("/superadmin");
      } else if (role === 2) {
        router.push("/admindashboard");
      } else {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  // if (session) {
  //   return (
  //     <>
  //       <p>Signed in as {session.user?.email}</p>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }

  // if (status === 'loading') {
  //     return <p>Loading...</p>; // Or a spinner
  //   }

  //   if (status === 'authenticated') {
  //     // Session is available, you can access session.user
  //     console.log(session.user);
  //   }

  //   else {
  //     // User is not authenticated
  //     return <p className="  text-black ">Access denied</p>;
  //   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB] px-4">
      <div className="w-[450px]  bg-white rounded-[10px] p-8 md:p-8 shadow-lg border border-gray-100">
        {/* Heading */}
        <h2 className="text-1xl md:text-3xl font-bold text-center text-[#0F172A] mb-10">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email / Username */}
          <div>
            <label className="block text-[#1E293B] font-semibold mb-3 text-lg">
              Email or Username
            </label>

            <div className="relative">
              <input
                type="text"
                name="identifier"
                placeholder="Enter your email or username"
                value={form.identifier}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm py-4 pl-5 pr-14 text-black outline-none focus:border-[#0F172A] transition-all bg-white"
                required
              />

              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-[#334155] w-5 h-5" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#1E293B] font-semibold mb-3 text-lg">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm py-4 pl-5 pr-14 text-black outline-none focus:border-[#0F172A] transition-all bg-white"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#334155] cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Hint */}
            <p className="text-sm text-gray-500 mt-3">
              Password must contain 1 - 16 characters
            </p>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F172A] hover:bg-black transition-all duration-300 text-white rounded-sm py-4 text-xl font-semibold cursor-pointer mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Forgot Password */}
          <Link
            href="/forgot-password"
            className="text-center text-[#334155] hover:text-black transition font-medium"
          >
            Forgot Password?
          </Link>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-gray-400 font-medium">Or</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-[#EEF5FF] hover:bg-[#E2ECFA] transition-all duration-300 rounded-sm py-4 text-[#0F172A] font-semibold text-lg border border-[#D8E4F8] cursor-pointer"
        >
          <FaChrome className="text-blue-500" />
          Continue with Google
        </button>

        {/* Facebook Button */}
        <button
          onClick={() => signIn("facebook")}
          className="w-full flex items-center justify-center gap-3 bg-[#F8FAFC] hover:bg-[#EEF2F7] transition-all duration-300 rounded-sm py-4 text-[#0F172A] font-semibold text-lg border border-gray-200 cursor-pointer mt-4"
        >
          <FaFacebook className="text-blue-700" />
          Continue with Facebook
        </button>

        {/* Google Errors */}
        {google_auth_error && (
          <p className="text-red-500 mt-4 text-center">
            {error === "OAuthCallback" && "Login failed. Please try again."}
            {error === "AccessDenied" && "Access denied by Google."}
            {error === "Configuration" && "Auth misconfigured."}
          </p>
        )}

        {/* Footer */}
        <p className="mt-10 text-center text-[#334155] text-lg">
          Dont have an account?{" "}
          <Link
            href="/sign-up"
            className="text-[#2563EB] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
