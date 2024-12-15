import jwt from "jsonwebtoken";
import process from "node:process";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Access Token not found" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.user = decoded; // Attach decoded token payload to req.user
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(403).json({ message: "JWT verification failed", error: error.message });
    }
};

export default authenticate;
