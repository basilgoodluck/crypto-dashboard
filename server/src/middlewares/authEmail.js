import jwt from "jsonwebtoken";
import { connectDB } from "../config/mongodb.mjs";
import process from "process"

const authenticateEmail = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Access token not found" });
    }
    const token = authHeader.startsWith("Bearer ") 
        ? authHeader.split(" ")[1] 
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.user = decoded;
        const db = await connectDB();
        const users = db.collection("users");
        const user = await users.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Email is not verified" });
        }
        next();
    } catch (error) {
        return res.status(403).json({ message: error.message || "Invalid or expired token" });
    }
};

export default authenticateEmail;
