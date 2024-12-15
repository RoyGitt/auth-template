const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minlength: [6, "Email must be at least 6 characters long"],
      maxlength: [255, "Email must not exceed 255 characters"],
      match: [/.+@.+\..+/, "Invalid email format"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [1024, "Password must not exceed 1024 characters"],
      required: [true, "Password is required"],
      match: [
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
        "Password must include at least one uppercase letter, one lowercase letter, and one number",
      ],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
