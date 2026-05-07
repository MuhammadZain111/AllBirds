"use client";

import { useSession, signIn, signOut } from "next-auth/react";
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
    <div className="min-h-screen flex items-center justify-center bg-[#0F0B1A]">
      <div className="w-[600px] max-w-2xl bg-[#241C38] rounded-[32px] p-4 md:p-6 text-white  ">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1830] flex flex-col items-center px-4 space-y-4 py-6 rounded-2xl p-6"
        >
          <h2 className="text-2xl md:text-4xl font-semibold ">Sign In</h2>

          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={form.identifier}
            onChange={handleChange}
            className=" w-full bg-[#352C4D] rounded-xl px-5 py-4 pr-14 outline-none text-white placeholder:text-gray-40 my-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-[#352C4D] rounded-xl px-5 py-4 pr-14 outline-none text-white placeholder:text-gray-40 my-3 "
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="p-2 w-full bg-[#8B5CF6] hover:bg-[#7C4DF2] transition-all duration-300 rounded-xl py-4 text-xl font-medium mt-2 mt-4 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <Link
            href="/forgot-password"
            className=" cursor-pointer w-full text-white text-black px-4 py-2 rounded"
          >
            Forgot Password
          </Link>

          <button
            onClick={() => signIn("facebook")}
            className=" text-white px-4 py-2 rounded w-full border-2   cursor-pointer  "
          >
            Continue with Facebook
          </button>

          <div>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className=" cursor-pointer w-full text-white border-2 text-black px-4 py-2 rounded"
            >
              Continue with Google..
            </button>

            {google_auth_error && (
              <p className="text-red-500 mt-4">
                {error === "OAuthCallback" && "Login failed. Please try again."}
                {error === "AccessDenied" && "Access denied by Google."}
                {error === "Configuration" && "Auth misconfigured."}
              </p>
            )}
          </div>

          <p className="mt-4 text-white">
            Dont have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
