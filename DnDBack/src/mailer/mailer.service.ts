// src/mailer/mailer.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER || 'your_email@example.com',
      pass: process.env.SMTP_PASS || 'your_password',
    },
  });

  async sendConfirmationEmail(email: string, token: string) {
    const confirmationLink = `http://localhost:3000/confirm?token=${token}`;

    const mailOptions = {
      from: '"DND App" <no-reply@dnd.com>',
      to: email,
      subject: 'Confirme ton inscription',
      html: `
        <p>Bienvenue !</p>
        <p>Merci de t’être inscrit. Clique sur le lien ci-dessous pour confirmer ton adresse :</p>
        <a href="${confirmationLink}">Confirmer mon compte</a>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email envoyé à ${email}`);
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi de l'email à ${email}`, error);
    }
  }
}
