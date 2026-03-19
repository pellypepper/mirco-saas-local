import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { changeEmailTemplate } from "@/lib/emails/changeEmailTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { to, confirmationUrl, currentEmail } = await req.json();

    
    const mailOptions = {
      from: `"ServiceHub" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Confirm your email change",
      html: changeEmailTemplate(confirmationUrl, currentEmail, to),
    };

    const info = await transporter.sendMail(mailOptions);


    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });

  } catch (error) {
  
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}