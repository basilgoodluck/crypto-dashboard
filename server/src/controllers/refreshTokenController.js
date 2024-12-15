import jwt from "jsonwebtoken";
import process from "process";
import { connectDB } from "../config/mongodb.mjs";

const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
export const refreshTokensController = async (req, res) => {
    try{
        const { token } = req.body
        const db = await connectDB()
        const refreshTokenCollection = db.collection("refresh-token")
        const tokenDoc = await refreshTokenCollection.findOne({ token })
        if(!tokenDoc){
            return res.status(403).json({ message: "refresh token is required" })
        }
        jwt.verify(token, JWT_REFRESH_TOKEN, (err, decoded) => {
            if(err){
                return res.status(403).json({ message: "Invalid token" })
            }
            const newAccessToken = jwt.sign(
                { userId: decoded.userId },
                process.env.JWT_ACCESS_TOKEN,
                { expiresIn: "1h" }
            );
            return res.status(200).json({ accessToken: newAccessToken });
        })
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
