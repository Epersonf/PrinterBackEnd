import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

export default class EmailSender {
  static singleton: EmailSender = null;

  mailer: Transporter;
  email: string;
  password: string;

  constructor() {
    this.email = process.env.FIRM_EMAIL;
    this.password = process.env.FIRM_PASSWORD;

    this.mailer = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.email, // generated ethereal user
        pass: this.password, // generated ethereal password
      },
    });

    console.log("Email sender configured.");
  }

  static sendEmail(title: string, message: string, destinationEmails: string[]): boolean {
    if (EmailSender.singleton == null) return;
    EmailSender.singleton.mailer.sendMail({
      from: EmailSender.singleton.email,
      to: destinationEmails.join(", "),
      subject: title,
      text: message,
    });
  }
}