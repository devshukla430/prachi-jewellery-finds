import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Prachi Jewellery Finds</title>
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
            width: 52px;
            height: 52px;
            line-height: 52px;
            border-radius: 18px;
            background: #FFF0F3;
            color: #BA4A6E;
            font-size: 26px;
            margin-bottom: 12px;
          }
          .brand {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 26px;
            font-weight: bold;
            color: #2D2427;
          }
          .brand-accent {
            color: #BA4A6E;
          }
          .tagline {
            font-size: 11px;
            color: #8C7E83;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .divider {
            height: 1px;
            background: #FDE8EC;
            margin: 24px auto;
            max-width: 220px;
          }
          .title {
            font-size: 22px;
            font-family: Georgia, serif;
            font-weight: 600;
            color: #2D2427;
            margin-bottom: 12px;
          }
          .desc {
            font-size: 14px;
            color: #6E6266;
            line-height: 1.65;
            margin-bottom: 24px;
          }
          .perks-box {
            background: #FFF5F7;
            border: 1px solid #FCE4E9;
            border-radius: 20px;
            padding: 20px;
            text-align: left;
            margin: 20px 0;
          }
          .perk-item {
            font-size: 13px;
            color: #4A3E42;
            margin: 8px 0;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .cta-btn {
            display: inline-block;
            background: #BA4A6E;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 34px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-top: 10px;
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
          <div class="sparkle-icon">🌸</div>
          <div class="brand">Prachi <span class="brand-accent">Jewellery Finds</span></div>
          <div class="tagline">Find It. Love It. Wear It.</div>
          
          <div class="divider"></div>
          
          <div class="title">You're on the VIP Style List! ♡</div>
          <p class="desc">
            Hello beautiful! Thank you for subscribing. You will now receive instant, 100% free notifications every time we discover and upload trending jewellery finds, budget steals, and Amazon price drops.
          </p>

          <div class="perks-box">
            <div class="perk-item">✨ <strong>Instant Alerts:</strong> Be first to know when new jewellery finds are added.</div>
            <div class="perk-item">💎 <strong>Verified Quality:</strong> Anti-tarnish gold, 925 sterling silver, and authentic pearls.</div>
            <div class="perk-item">🎁 <strong>Budget Steals:</strong> Curated pieces under ₹99, ₹499 & ₹999.</div>
            <div class="perk-item">🔒 <strong>100% Free Lifetime:</strong> Zero hidden charges or subscription fees ever.</div>
          </div>

          <a href="https://prachi-jewellery-finds.vercel.app" class="cta-btn">Explore Today's Finds →</a>

          <div class="footer">
            You subscribed to alerts at Prachi Jewellery Finds.<br>
            © ${new Date().getFullYear()} Prachi Jewellery Finds • Curated with love.
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
          to: email.trim(),
          subject: `✨ Welcome to Prachi Jewellery Finds! You're on the list ♡`,
          html: emailHtml,
        });

        console.log(`[Newsletter] Welcome email sent to ${email}`);
      } catch (mailErr) {
        console.warn('[Newsletter Mail Error - Non-fatal]:', mailErr);
      }
    } else {
      console.log(`[Newsletter] Subscribed ${email} (simulated, SMTP not set)`);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your inbox for your welcome confirmation.',
    });
  } catch (error: any) {
    console.error('[Newsletter Subscribe Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to subscribe.' },
      { status: 500 }
    );
  }
}
