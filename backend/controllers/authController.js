// controllers/authController.js
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authController = {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await User.create({ email, password, name });

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "24h" }
      );

      res.status(201).json({ message: "User created", user, token });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "24h" }
      );

      res.json({ message: "Login successful", user, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getProfile(req, res) {
    res.json({ message: "Mock user profile — middleware dolazi u sledećem commitu" });
  },

  async updateProfile(req, res) {
    res.json({ message: "Mock profile update — biće implementirano kasnije" });
  },
};
