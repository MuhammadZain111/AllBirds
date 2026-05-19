import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      enum: [1, 2, 3],
      default: 3,
    },

     provider: 
     {
       type: String,
     },

    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
      default: Date.now,
    },
    resetOTP: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    //
    phoneNumber: {
      type: String,
    },

    department: {
      type: String,
    },

    departmentRole: {
      type: String,
    },

    address: {
      type: String,
      default: "",
    },

    accountStatus: {
      type: String,
      enum: ["active", "Inactive", "blocked"],
      default: "active",
    },

    permissions: {
      type: [String],
      default: [],
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },
  },

  { timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
