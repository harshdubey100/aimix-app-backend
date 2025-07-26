'Access-Control-Allow-Origin'

import express from 'express';
import User from '../schema/datamodel.js';

const router = express.Router();


router.get("/", (req, res) => {
  res.send("Welcome to Express.js");
});


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


router.post("/userlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", email, password);

    if (!email || !password) {
      console.log("Missing credentials");
      return res.status(400).json({ msg: "Email and password are required", status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found", status: 404 });
    }

    if (user.password !== password) {
      console.log("Wrong password");
      return res.status(401).json({ msg: "Incorrect password", status: 401 });
    }

    console.log("Login successful");
    res.status(200).json({
      msg: "Login successful",
      status: 200,
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error("Server error:", error);  // 🛠️ log exact error
    res.status(500).json({ msg: "Server error", error, status: 500 });
  }
});



export default router;
