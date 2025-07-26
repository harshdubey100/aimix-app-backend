// routes.js (ESM version)
import express from 'express';
import User from '../schema/datamodel.js'; // ensure .js is used

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("Welcome to Express.js");
});

// Register user
router.post("/userregister", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required", status: 400 });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already registered", status: 409 });
    }
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ data: savedUser, msg: "Registration successful", status: 201 });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error, status: 500 });
  }
});

// Login user
router.post("/userlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required", status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found", status: 404 });
    }

    if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect password", status: 401 });
    }

    // Return complete user info
    res.status(200).json({
      msg: "Login successful",
      status: 200,
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error, status: 500 });
  }
});


export default router;
