

'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {

  
  const { data: session } = useSession()
  const router = useRouter()

  

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")


    const res = await signIn("credentials", {
      redirect: false,
      identifier: form.identifier,
      password: form.password,
    })

    console.log(res);

    setLoading(false)

    if (res?.error) {
      setError("Invalid email or password")
      return
    }

    router.push("/dashboard")
  }


  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  
  
  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow bg-gray-400 flex  flex-col  items-center justify-center ">

      <h2 className="text-2xl font-bold mb-4 ">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        

        <label className="text-black   "  > email</label>
         <input
          type="text"         
        name="identifier"    
        placeholder="Email or Username"
        value={form.identifier}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-white text-black"
        required
        />

       <label className="text-black ">Password</label>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white text-black "
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>


        <button
        onClick={() => signIn("facebook")}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full   cursor-pointer  "
      >
        Continue with Facebook
      </button>


       <button
        onClick={() => signIn("google")}
        className=" cursor-pointer w-full bg-white text-black px-4 py-2 rounded"
      >
        Continue with Google..
      </button>








      
      </form>
    </div>
  )
}