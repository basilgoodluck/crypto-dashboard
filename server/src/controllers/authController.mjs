import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import process from "node:process";
import { connectDB } from "../config/mongodb.mjs";

const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
export const signUp = async (req, res) => {
    try{
        const db = await connectDB();
        const users = db.collection("users");
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(422).json({ message: "Fill in all details" });
        }
        const user = await users.findOne({ email })
        if(user){
            return res.status(409).json({ message: "Email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await users.insertOne({ 
            name, 
            email, 
            password: hashedPassword
        })
        return res.status(201).json({ message: `${name} registered successfully`})
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
}

export const signIn = async (req, res) => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(422).json({ message: "Fill in all details" })
        }
        const db = await connectDB()
        const users = db.collection("users")
        const refreshTokens = db.collection("refresh-tokens")
        const user = await users.findOne({ email })
        if(!user){
            return res.status(401).json({ message: "Email or password is invalid" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({ message: "Email or password is invalid"})
        }
        const accessToken = jwt.sign({ userId: user._id }, JWT_ACCESS_TOKEN, { subject: "Access API", expiresIn: "10m"} )
        const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_TOKEN, { subject: "Refresh token", expiresIn: "1w"})

        await refreshTokens.insertOne({ token: refreshToken, userId: user._id })
        return res.status(201).json({
            username: user.name,
            userId: user._id,
            accessToken,
            refreshToken
        })
    }
    catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

export const signOut = async (req, res) => {
    try {
      const { refreshToken } = req.body;
  
      if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token required" });
      }
  
      const db = await connectDB();
      const refreshTokens = db.collection("refresh-tokens");
  
      await refreshTokens.deleteOne({ token: refreshToken });
  
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  