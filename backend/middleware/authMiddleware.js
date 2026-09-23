const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

// Protect routes (checks cookie "jwt" first, then Authorization: Bearer)
const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  // 1) Try HTTP-only cookie set by generateToken()
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // 2) Fallback: Authorization header (Bearer <token>)
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user (without password) for downstream handlers
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

module.exports = { protect };
