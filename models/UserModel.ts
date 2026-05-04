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
      default: 3 
      },
      resetPasswordToken:{
       type: String ,
    },  
       resetPasswordExpire:{
        default:Date.now,
     }, 
      resetOTP:
     {
      type:String,
     }, 

     

      isVerified: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    // 
    phoneNumber: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    departmentRole: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    accountStatus: {
      type: String,
      enum: ["active", "Inactive","blocked"],
      default: "Active",
    },

    permissions: {
      type: [String],
      default: [],
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },
    
  },

  { timestamps: true }
);



const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;