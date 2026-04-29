import moongoose from "mongoose"
import User from "@/models/User"
import DbConnect from "@/lib/DbConnect" 



async function seedAdmin() {
    DbConnect();
 
    const existing = await User.findOne({ email: "admin@gmail.com" })

  if (!existing) {
    await User.create({
      email: "admin@gmail.com",
      password: "hashedpassword",
      role: 1
    })
    console.log("Super Admin created")
  }

  mongoose.disconnect()
}

seedAdmin()