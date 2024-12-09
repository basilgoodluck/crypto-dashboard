import jwt from "jsonwebtoken";
import process from "node:process";

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Access Token not found" });
    }
    const token = authHeader.startsWith("Bearer ") 
        ? authHeader.split(" ")[1] 
        : authHeader;
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
};
export default authenticate;
