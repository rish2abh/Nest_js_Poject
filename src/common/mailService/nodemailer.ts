import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: 'rishabhshri20@outlook.com',
        pass: process.env.PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'rishabhshri20@outlook.com',
      to,       
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
