import jwt from 'jsonwebtoken';
import User from '../../../models/user-model.js';
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("👉 Received Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded, ' Secret ', process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    console.log("✅ Attached user to req:", user._id);
    next();
  } catch (err) {
    console.log("❌ Auth Error:", err.message);
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
export default protect;