import { connectDB } from "../config/mongodb.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const resetPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const db = await connectDB();
    const users = db.collection("users");

    const objectId = ObjectId.createFromHexString(userId);
    const user = await users.findOne({ _id: objectId });

    if (!user) {
      return res.status(403).json({ message: "Unauthorized action, user not found!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await users.updateOne(
      { _id: objectId }, 
      { $set: { password: hashedPassword } } 
    );
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
