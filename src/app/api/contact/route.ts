import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!email || !email.includes('@') || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide your email address and a message.' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER || 'prachishukla921@gmail.com';
    const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Inquiry from Prachi Jewellery Finds</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FFF9FA; padding: 25px; color: #2D2427;">
        <div style="max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #F4D3DA; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="color: #BA4A6E; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
            💌 New Website Message
          </div>
          <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; color: #2D2427; font-size: 20px;">
            Inquiry from ${name || 'A Website Visitor'}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #8C7E83; width: 90px; font-weight: 600;">From:</td>
              <td style="padding: 6px 0; color: #2D2427; font-weight: bold;">${name || 'Visitor'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8C7E83; font-weight: 600;">Email:</td>
              <td style="padding: 6px 0; color: #BA4A6E; font-weight: bold;"><a href="mailto:${email}" style="color: #BA4A6E;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8C7E83; font-weight: 600;">Subject:</td>
              <td style="padding: 6px 0; color: #2D2427;">${subject || 'General Inquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8C7E83; font-weight: 600;">Date:</td>
              <td style="padding: 6px 0; color: #6E6266;">${new Date().toLocaleString('en-IN')}</td>
            </tr>
          </table>

          <div style="background: #FFF5F7; border: 1px solid #FCE4E9; border-radius: 14px; padding: 18px; margin-bottom: 20px;">
            <div style="font-size: 11px; text-transform: uppercase; color: #BA4A6E; font-weight: bold; margin-bottom: 6px;">Message Content:</div>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #3E3437; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="font-size: 12px; color: #8C7E83; text-align: center; border-top: 1px solid #FDE8EC; padding-top: 15px;">
            Sent directly via Contact Curators on <strong>Prachi Jewellery Finds</strong>.<br>
            You can reply directly to <a href="mailto:${email}" style="color: #BA4A6E;">${email}</a>.
          </div>
        </div>
      </body>
      </html>
    `;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser.trim(),
            pass: emailPass.trim().replace(/\s+/g, ''),
          },
        });

        await transporter.sendMail({
          from: `"Prachi Jewellery Finds" <${emailUser.trim()}>`,
          to: 'prachishukla921@gmail.com',
          replyTo: email.trim(),
          subject: `💬 New Message: ${subject || 'Jewellery Inquiry'} (from ${name || email})`,
          html: emailHtml,
        });

        console.log(`[Contact API] Message dispatched to prachishukla921@gmail.com from ${email}`);
      } catch (mailErr) {
        console.warn('[Contact Mail Error]:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent to our curators! We will get back to you shortly.',
    });
  } catch (error: any) {
    console.error('[Contact Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
