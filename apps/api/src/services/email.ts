import nodemailer from "nodemailer";
import { company } from "@insucare/domain";
import { config } from "../config.js";

const transporter =
  config.SMTP_HOST && config.SMTP_PORT
    ? nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: config.SMTP_PORT === 465,
        auth: config.SMTP_USER ? { user: config.SMTP_USER, pass: config.SMTP_PASS } : undefined
      })
    : null;

export async function notifyEnquiry(values: { name: string; email: string; phone: string; interest: string; message: string }) {
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: config.MAIL_FROM,
      to: config.ADMIN_EMAIL,
      replyTo: values.email,
      subject: `New InsuCARE enquiry: ${values.interest}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nInterest: ${values.interest}\n\n${values.message}`
    });

    await transporter.sendMail({
      from: config.MAIL_FROM,
      to: values.email,
      subject: "We received your InsuCARE enquiry",
      text: `Dear ${values.name},\n\nThank you for contacting ${company.displayName}. Our advisory team will review your request and respond shortly.\n\nRegards,\n${company.displayName}`
    });
  } catch (error) {
    console.error("Failed to send enquiry emails:", error);
  }
}
