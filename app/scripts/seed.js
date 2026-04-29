import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import UserModel from "../../models/UserModel.js";


const MONGODB_URI="mongodb://localhost:27017/mybirds"

async function seedAdmin() {
 
 
 mongoose.connect(MONGODB_URI,{
      dbName: "my_birds"});
 


    try {
    
    const existing = await UserModel.findOne({
      email: "zain@gmail.com",
    })

    if (!existing) {
    

      const plainPassword = "zain1122"
      const hashedPassword = await bcrypt.hash(plainPassword, 10)

      // Create Admin
      await UserModel.create({
        username:"zain",
        email: "zain@gmail.com",
        password: hashedPassword,
        role: 1, 
      })

      console.log("Super Admin created")
    } else {
      console.log("Admin already exists")
    }

    mongoose.disconnect()
  } catch (error) {
    console.log("Error seeding admin:", error)
    mongoose.disconnect()
  }
}

seedAdmin()