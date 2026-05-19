import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import UserModel from "../../models/UserModel.js";

const MONGODB_URI =
  "mongodb+srv://csmuhammadzain_db_user:kcRE0MtzRIPP4vgN@cluster0.ygv1gzz.mongodb.net/";

async function seedAdmin() {
  mongoose.connect(MONGODB_URI, {
    dbName: "my_birds",
  });

  try {
    const existing = await UserModel.findOne({
      email: "zain@gmail.com",
    });

    if (!existing) {
      const plainPassword = "zain1122";
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      // Create Admin
      await UserModel.create({
        username: "Muhammad Zain",
        email: "csmuhammadzain@gmail.com",
        password: hashedPassword,
        role: 1,
      });

      console.log("Super Admin created");
    } else {
      console.log("Admin already exists");
    }

    mongoose.disconnect();
  } catch (error) {
    console.log("Error seeding admin:", error);
    mongoose.disconnect();
  }
}

seedAdmin();
