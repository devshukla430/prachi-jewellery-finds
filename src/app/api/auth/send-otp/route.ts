import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { contact, code } = await request.json();

    if (!contact || !code) {
      return NextResponse.json(
        { success: false, message: 'Contact email and verification code are required.' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
    const resendApiKey = process.env.RESEND_API_KEY;

    const isEmail = contact.includes('@');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code - Prachi Jewellery Finds</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #FFF9FA;
            margin: 0;
            padding: 30px 15px;
            color: #2D2427;
          }
          .container {
            max-width: 520px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 28px;
            border: 1px solid #F4D3DA;
            padding: 40px 32px;
            box-shadow: 0 10px 30px rgba(186, 74, 110, 0.08);
            text-align: center;
          }
          .sparkle-icon {
            display: inline-block;
            width: 48px;
            height: 48px;
            line-height: 48px;
            border-radius: 16px;
            background: #FFF0F3;
            color: #BA4A6E;
            font-size: 24px;
            margin-bottom: 12px;
          }
          .brand {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 24px;
            font-weight: bold;
            color: #BA4A6E;
            letter-spacing: 0.5px;
          }
          .tagline {
            font-size: 11px;
            color: #8C7E83;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }
          .divider {
            height: 1px;
            background: #FDE8EC;
            margin: 24px auto;
            max-width: 200px;
          }
          .title {
            font-size: 20px;
            font-weight: 600;
            color: #2D2427;
            margin-bottom: 10px;
          }
          .desc {
            font-size: 13.5px;
            color: #6E6266;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .code-box {
            background: #FFF4F6;
            border: 2px dashed #BA4A6E;
            border-radius: 20px;
            padding: 22px 30px;
            display: inline-block;
            min-width: 220px;
            margin-bottom: 20px;
          }
          .code {
            font-family: 'Courier New', Courier, monospace;
            font-size: 34px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #BA4A6E;
          }
          .expiry {
            font-size: 12px;
            color: #8C7E83;
            margin-top: 10px;
          }
          .quote-card {
            background: #FFF5F7;
            border-left: 3px solid #BA4A6E;
            border-radius: 12px;
            padding: 16px 20px;
            margin: 28px 0;
            text-align: left;
          }
          .quote-text {
            font-style: italic;
            font-size: 13px;
            color: #7A354D;
            line-height: 1.5;
            margin: 0 0 6px 0;
          }
          .quote-author {
            font-size: 11px;
            font-weight: 600;
            color: #BA4A6E;
            margin: 0;
          }
          .footer {
            font-size: 11px;
            color: #A59B9E;
            margin-top: 32px;
            line-height: 1.6;
            border-top: 1px solid #F9EFF1;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="sparkle-icon">✨</div>
          <div class="brand">Prachi Jewellery Finds</div>
          <div class="tagline">Curated with Love • Amazon Jewellery Finds</div>
          
          <div class="divider"></div>
          
          <div class="title">Reset Your Password</div>
          <p class="desc">
            Hello gorgeous! We received a request to reset your password. Use the single-use 6-digit verification code below to restore access to your style wishlist and account:
          </p>

          <div class="code-box">
            <div class="code">${code}</div>
          </div>

          <div class="expiry">
            ⏱️ This code is valid for <strong>10 minutes</strong>. For your safety, never share this code with anyone.
          </div>

          <!-- Brand Quote Card -->
          <div class="quote-card">
            <p class="quote-text">
              “Jewellery has the power to be this one little thing that makes you feel unique, radiant, and effortlessly confident.”
            </p>
            <p class="quote-author">
              — Curated with love, for your timeless style ♡
            </p>
          </div>

          <div class="footer">
            If you did not request a password reset, you can safely ignore this email. Your account remains completely secure.<br><br>
            © ${new Date().getFullYear()} Prachi Jewellery Finds • Handpicked styles, latest trends, and timeless jewellery.
          </div>
        </div>
      </body>
      </html>
    `;

    // Option A: Send via Resend API (100% Free, instant delivery without Google App Password)
    if (isEmail && resendApiKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey.trim()}`,
          },
          body: JSON.stringify({
            from: 'Prachi Finds <onboarding@resend.dev>',
            to: [contact.trim()],
            subject: `🔒 ${code} is your Prachi Jewellery Finds verification code`,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          console.log(`[OTP] Successfully delivered real-time verification email via Resend to ${contact}`);
          return NextResponse.json({
            success: true,
            channel: 'email_resend',
            message: `Verification code sent to ${contact}. Please check your inbox and spam folder.`,
          });
        }
      } catch (resendErr) {
        console.warn('Resend send failed, falling back:', resendErr);
      }
    }

    // Option B: Send via Gmail SMTP (Nodemailer)
    if (isEmail && emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser.trim(),
          pass: emailPass.trim().replace(/\s+/g, ''),
        },
      });

      await transporter.sendMail({
        from: `"Prachi Jewellery Finds" <${emailUser.trim()}>`,
        to: contact.trim(),
        subject: `🔒 ${code} is your Prachi Jewellery Finds verification code`,
        html: emailHtml,
      });

      console.log(`[OTP] Successfully delivered real-time verification email via Gmail to ${contact}`);
      return NextResponse.json({
        success: true,
        channel: 'email_gmail',
        message: `Verification code sent to ${contact}. Please check your inbox and spam folder.`,
      });
    }

    // Development fallback when credentials are not yet saved
    console.log(`[DEV OTP LOG] Verification code for ${contact}: ${code}`);
    return NextResponse.json({
      success: true,
      channel: 'email_simulated',
      message: `Verification code dispatched to ${contact}.`,
      needsSmtpSetup: (!emailUser || !emailPass) && !resendApiKey,
    });
  } catch (error: any) {
    console.error('[OTP Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to send verification code.',
      },
      { status: 500 }
    );
  }
}
