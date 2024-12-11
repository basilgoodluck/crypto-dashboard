import { connectDB } from "../config/mongodb.mjs";
import bcrypt from "bcryptjs";
import { generateRandomCode } from "../utils/generateRandomCode.mjs";
import { sendVerificationEmail } from "../services/sendVerificationEmail.mjs";

export const requestPasswordReset = async (req, res) => {
    try{
        const { email } = req.body
        const db = await connectDB();
        const resetTokens = db.collection("reset-tokens");
        const users = db.collection("users");

        const user = await users.findOne({ email })
        if(!user){
            return res.status(401).json({ message: "User not found" })
        }
        const code = await bcrypt.hash(generateRandomCode(), 10)
        await resetTokens.insertOne({
            email,
            code,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        })
        await sendVerificationEmail(email, code)
        return res.status(200).json({ message: `Verifcation code sent to ${email}, expires in 10 minutes`})
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}