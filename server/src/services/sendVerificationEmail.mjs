import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification Code",
        text: `Your verification code is: ${code}. It will expire in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
}

