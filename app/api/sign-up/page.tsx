import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";




function page() {


  
//here i  have to write the logic for the sign-up of user


const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);


const handleSubmit = async (e:React.FormEvent) =>
{
    e.preventDefault();

   try {
       const res = await fetch("/api/sign-up", {
        method: "POST",
       headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(form)
      })

     const data = await res.json()
      console.log(data)

if (res.ok) {
    router.push("/sign-in");
  } else {
    alert(data.error || data.message || "Something went wrong");
  }

     } catch (error) {
  console.error("Error:", error)
}
finally {
  setLoading(false);
}
}
  

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col text-black    " >
        <label  className="text-white"  > Username</label>
      <input placeholder="Username"  className="bg-white w-75"
      onChange={e => setForm({ ...form, username: e.target.value })} />
      <label  className="text-white"  > Username</label>
      <input placeholder="Email"   className="bg-white text-black    w-75 mt-2"
      onChange={e => setForm({ ...form, email: e.target.value })} />

       <label  className="text-white"  > Password</label>
      <input placeholder="Password" type="text" className="bg-white w-75" onChange={e => setForm({ ...form, password: e.target.value })} />

      <button type="submit" className="bg-red-400 w-75 mt-3"  >Sign Up</button>
    </form>



    </div>
  )
}

export default page
