const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey"; // Move this to .env in real apps

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // ✅ safer

  if (!token) return res.status(401).json({ message: "Auth token missing" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId; // Attach userId to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
