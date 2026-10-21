import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new Database("users.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

app.get("/", (req, res) => {
  res.send("Employee Management Backend is running!");
});

app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: "Enter a valid email and a password of at least 8 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    ).run(normalizedEmail, hashedPassword);

    res.status(201).json({
      message: "Account created successfully!",
      userId: result.lastInsertRowid
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "This email is already registered."
      });
    }

    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Unable to create account." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = db.prepare(
      "SELECT id, email, password FROM users WHERE email = ?"
    ).get(email.trim().toLowerCase());
console.log("User found:", Boolean(user));
console.log("Password hash exists:", Boolean(user?.password));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
console.log("JWT TOKEN CREATED:", Boolean(token));
res.json({
  message: "Login successful!",
  token,
  user: { id: user.id, email: user.email }
});
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Unable to log in." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
