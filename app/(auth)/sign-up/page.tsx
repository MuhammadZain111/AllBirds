// app/sign-up/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
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
    <form onSubmit={handleSubmit} className="flex flex-col text-black  w-full max-w-md mx-auto p-6 border rounded-lg shadow mt-4 " >
       
         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
       
        <label  className="text-black  "  > Username</label>
      <input placeholder="Username"  className="bg-white w-75"
      onChange={e => setForm({ ...form, username: e.target.value })} />
      
      <label  className="text-black   "  > email</label>
      <input placeholder="Email"   className="bg-white text-black    w-75 mt-2"
      onChange={e => setForm({ ...form, email: e.target.value })} />

       {errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>  
          )}




       <label  className="text-black"  > Password</label>
      <input placeholder="Password" type="text" className="bg-white w-75" onChange={e => setForm({ ...form, password: e.target.value })} />

      <button type="submit" 
      disabled={loading}
      className="w-full bg-black text-white p-2 rounded"  >
         {loading ? "Signing Up..." : "Sign Up"}</button>
    </form>
  );
}