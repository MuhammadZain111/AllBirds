// app/sign-up/page.tsx
"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react";


export default function SignUpPage() {


    const { data: session, status } = useSession()
    const router = useRouter()
  

  //  if (session) {
  //      router.push("/");
  //  }
 

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "" });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const  email  = form.email;
        let hasError = false;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!email || !emailRegex.test(email)) {
    alert("Invalid email");
    setErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
      hasError = true;
    
    if (hasError)  return; 
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
  }
  
  return (
   <div className="min-h-screen flex items-center justify-center bg-[#0F0B1A]">
  
  <div className="w-[600px] max-w-2xl bg-[#241C38] rounded-[32px] p-4 md:p-6 text-white">
    
    <form
      onSubmit={handleSubmit}
      className="bg-[#1E1830] flex flex-col items-center px-4 space-y-4 py-6 rounded-2xl p-6"
    >
      <h2 className="text-2xl md:text-4xl font-semibold">Sign Up</h2>

      <input
        placeholder="Username"
        className="w-full bg-[#352C4D] rounded-xl px-5 py-4 outline-none text-white my-3"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />

      <input
        placeholder="Email"
        className="w-full bg-[#352C4D] rounded-xl px-5 py-4 outline-none text-white my-3"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )}

      <input
        placeholder="Password"
        type="password"
        className="w-full bg-[#352C4D] rounded-xl px-5 py-4 outline-none text-white my-3"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8B5CF6] hover:bg-[#7C4DF2] transition rounded-xl py-4 text-xl font-medium"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="mt-4 text-white">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Log in
        </Link>
      </p>
    </form>

  </div>
</div>
  );
}