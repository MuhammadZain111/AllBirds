import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

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
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

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
      enum: ["active", "Inactive", "blocked"],
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
    role: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
    },
  },
  {
    timestamps: true,
  },
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;
