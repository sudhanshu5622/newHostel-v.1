const jwt = require("jsonwebtoken");
const Owner = require("../Models/Owner");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = await Owner.findById(decoded.id).select("-password");
    if (!owner) return res.status(401).json({ error: "Invalid token" });
    req.owner = owner;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized" });
  }
};

module.exports = authMiddleware;
