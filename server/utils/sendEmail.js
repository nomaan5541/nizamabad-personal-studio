import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `Nizamabad PT Studio <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial; padding: 20px; background:#111; color:#fff;">
          <h2 style="color:#C9A34E;">Nizamabad PT Studio</h2>
          <p style="line-height:1.6;">
            ${message.replace(/\n/g, "<br/>")}
          </p>
          <hr style="border-color:#333"/>
          <small style="color:#888;">
            This is an automated message. Please do not reply.
          </small>
        </div>
      `,
    });

    console.log("✅ Email sent");
  } catch (err) {
    console.log("❌ Email error:", err.message);
  }
};
