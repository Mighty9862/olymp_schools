import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

export const sendPasswordResetEmail = async (email, code) => {
    const templatePath = path.join(__dirname, '../templates/emails/password-reset.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{code}}', code);

    transporter.verify((error) => {
        if (error) {
          console.error('SMTP Connection Error:', error);
        } else {
          console.log('SMTP Server Ready');
        }
      });

    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Код сброса пароля',
      html
    });
  };