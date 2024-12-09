import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { connectDB } from "../config/mongodb.mjs";

export const confirmVerificationCode = async (req, res) => {
    try {
        const { userId } = req.params;
        const { code, purpose } = req.body; 

        const db = await connectDB();
        const users = db.collection("users");
        const resetTokens = db.collection("reset-tokens");

        const objectId = ObjectId.createFromHexString(userId);
        const user = await users.findOne({ _id: objectId });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const targetToken = await resetTokens.findOne({ code, email: user.email, purpose });
        if (!targetToken) {
            return res.status(401).json({ message: "Invalid code or purpose" });
        }
        if (targetToken.expiresAt < Date.now()) {
            await resetTokens.deleteOne({ _id: targetToken._id }); 
            return res.status(410).json({ message: "Code has expired" });
        }
        const isMatch = await bcrypt.compare(code, targetToken.codeHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid or incorrect code" });
        }
        res.status(200).json({ message: "Code confirmed successfully" });
        await resetTokens.deleteOne({ _id: targetToken._id });
        if(purpose === "email-verification"){
            await users.updateOne({ email }, { $set: {isVerified: true }})
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};
