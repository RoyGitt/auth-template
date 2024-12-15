const bcrypt = require("bcrypt");
const {
  createUserSchema,
  loginSchema,
} = require("../validations/user.validations");
const { User } = require("../models/user.model");
var jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/dotenv");

const signUp = async (req, res) => {
  try {
    const validation = createUserSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation Error",
        details: validation.error.errors,
      });
    }

    const { email, password, firstName, lastName } = validation.data;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const newUserId = newUser._id;

    const authToken = jwt.sign({ userId: newUserId }, JWT_SECRET, {
      expiresIn: "14d",
    });

    return res
      .status(201)
      .json({ message: "User created successfully", token: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation Error",
        details: validation.error.errors,
      });
    }

    const { email, password } = validation.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const authToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "14d",
    });

    return res
      .status(200)
      .json({ message: "User logged in successfully", token: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const users = await User.find({ _id: { $ne: user.userId } });

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = { signUp, signIn, getUsers };
