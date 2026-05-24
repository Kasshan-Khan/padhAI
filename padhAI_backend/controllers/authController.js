const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, goal } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      domain: goal || null,
      authProvider: "local"
    });

    res.status(201).json({ msg: "Signup successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || user.authProvider !== "local") {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.domain,
        picture: user.profilePic
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// GOOGLE AUTH
exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        profilePic: picture,
        authProvider: "google",
        domain: null
      });
    }

    const appToken = generateToken(user._id);

    res.json({
      token: appToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.domain,
        picture: user.profilePic
      }
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Google Auth Failed" });
  }
};

// UPDATE DOMAIN
exports.updateDomain = async (req, res) => {
  try {
    const { domain } = req.body;
    const allowedDomains = ["JEE", "NEET", "ENGINEERING"];

    if (!allowedDomains.includes(domain)) {
      return res.status(400).json({ msg: "Invalid domain selection" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { domain },
      { new: true }
    );

    res.json({
      msg: "Domain updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.domain,
        picture: user.profilePic
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

