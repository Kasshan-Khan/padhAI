const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Temporary in-memory storage for testing (when DB is not available)
let users = [];

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, goal } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists in memory
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in memory
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      domain: goal
    };

    users.push(newUser);

    return res.status(201).json({ msg: "Signup successful" });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Find user in memory
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        goal: user.domain
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
