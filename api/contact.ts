import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS Preflight request
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || 'ayuhirpara@gmail.com';
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER || 'ayuhirpara@gmail.com';

    if (!smtpPass) {
      console.error('SMTP_PASS environment variable is missing.');
      return res.status(500).json({ 
        error: 'Email service is not configured. Please set the SMTP_PASS environment variable in Vercel.' 
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: receiver,
      replyTo: email,
      subject: `[UniHunt Contact] ${subject}`,
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${receiver}`);

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send message.', 
      details: error.message || error 
    });
  }
}
