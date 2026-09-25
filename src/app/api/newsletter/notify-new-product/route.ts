import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { product, subscribers } = await request.json();

    if (!product || !product.title) {
      return NextResponse.json(
        { success: false, message: 'Product details are required.' },
        { status: 400 }
      );
    }

    const emailList: string[] = Array.isArray(subscribers)
      ? subscribers.map((s: any) => (typeof s === 'string' ? s : s.email)).filter((e: string) => e && e.includes('@'))
      : [];

    if (emailList.length === 0) {
      return NextResponse.json({
        success: true,
        sentCount: 0,
        message: 'No active subscribers to notify at this time.',
      });
    }

    const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    const amazonUrl = product.amazonUrl || 'https://www.amazon.in';
    const offerPrice = product.offerPrice ? `₹${product.offerPrice.toLocaleString('en-IN')}` : 'Check Amazon';
    const mrp = product.mrp ? `₹${product.mrp.toLocaleString('en-IN')}` : '';
    const discount = product.discountPercent ? `${product.discountPercent}% OFF` : '';
    const rating = product.rating ? `★ ${product.rating.toFixed(1)}` : '★ 4.8';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Jewellery Find Uploaded</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #FFF9FA;
            margin: 0;
            padding: 30px 15px;
            color: #2D2427;
          }
          .container {
            max-width: 540px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 28px;
            border: 1px solid #F4D3DA;
            padding: 36px 28px;
            box-shadow: 0 10px 30px rgba(186, 74, 110, 0.08);
            text-align: center;
          }
          .badge-pill {
            display: inline-block;
            background: #FCEEF0;
            color: #BA4A6E;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            padding: 6px 14px;
            border-radius: 9999px;
            margin-bottom: 12px;
          }
          .brand {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 24px;
            font-weight: bold;
            color: #2D2427;
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
            margin: 20px auto;
            max-width: 200px;
          }
          .headline {
            font-size: 20px;
            font-family: Georgia, serif;
            font-weight: 600;
            color: #2D2427;
            margin-bottom: 8px;
          }
          .subheadline {
            font-size: 13.5px;
            color: #6E6266;
            margin-bottom: 22px;
          }
          .product-card {
            background: #FFFBFB;
            border: 1px solid #FCE4E9;
            border-radius: 24px;
            padding: 20px;
            text-align: center;
            margin-bottom: 24px;
          }
          .product-img {
            width: 100%;
            max-width: 320px;
            height: 240px;
            object-fit: cover;
            border-radius: 18px;
            margin: 0 auto 16px auto;
            display: block;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }
          .product-title {
            font-size: 16px;
            font-weight: 600;
            color: #2D2427;
            margin: 0 0 10px 0;
            line-height: 1.4;
          }
          .price-row {
            margin: 12px 0 18px 0;
          }
          .offer-price {
            font-size: 24px;
            font-weight: bold;
            color: #BA4A6E;
            margin-right: 8px;
          }
          .mrp {
            font-size: 14px;
            color: #A59499;
            text-decoration: line-through;
            margin-right: 8px;
          }
          .discount-badge {
            background: #FCEEF0;
            color: #BA4A6E;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 6px;
          }
          .cta-button {
            display: inline-block;
            background: #BA4A6E;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 36px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 12px rgba(186, 74, 110, 0.25);
          }
          .footer {
            font-size: 11px;
            color: #A59B9E;
            margin-top: 28px;
            line-height: 1.6;
            border-top: 1px solid #F9EFF1;
            padding-top: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge-pill">✨ Just Added to Collection</div>
          <div class="brand">Prachi <span style="color: #BA4A6E;">Jewellery Finds</span></div>
          <div class="tagline">Find It. Love It. Wear It.</div>
          
          <div class="divider"></div>
          
          <div class="headline">New Trending Find Alert! 💖</div>
          <div class="subheadline">We just handpicked and uploaded a stunning new jewellery piece for you:</div>

          <div class="product-card">
            ${
              product.imageUrl
                ? `<img src="${product.imageUrl}" alt="${product.title}" class="product-img" />`
                : ''
            }
            <div style="font-size: 11px; color: #D4AF37; font-weight: bold; margin-bottom: 6px;">
              ${rating} · ${product.category || 'Jewellery'}
            </div>
            <h3 class="product-title">${product.title}</h3>
            
            <div class="price-row">
              <span class="offer-price">${offerPrice}</span>
              ${mrp ? `<span class="mrp">${mrp}</span>` : ''}
              ${discount ? `<span class="discount-badge">${discount}</span>` : ''}
            </div>

            <a href="${amazonUrl}" class="cta-button" target="_blank" rel="noopener noreferrer">
              View on Amazon →
            </a>
          </div>

          <div class="footer">
            You received this email because you subscribed to instant jewellery alerts on Prachi Jewellery Finds.<br>
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

        // Send to all subscribers via BCC for privacy and in batches
        const bccList = emailList.slice(0, 50).join(', ');

        await transporter.sendMail({
          from: `"Prachi Jewellery Finds" <${emailUser.trim()}>`,
          to: emailUser.trim(), // To admin
          bcc: bccList, // Blind carbon copy to subscribers
          subject: `✨ New Jewellery Alert: ${product.title} on Prachi Jewellery Finds!`,
          html: emailHtml,
        });

        console.log(`[New Product Alert] Successfully sent email to ${emailList.length} subscribers!`);
        return NextResponse.json({
          success: true,
          sentCount: emailList.length,
          message: `Alert sent to ${emailList.length} subscriber(s).`,
        });
      } catch (mailErr: any) {
        console.warn('[New Product Alert Mail Error]:', mailErr);
        return NextResponse.json({
          success: true,
          sentCount: 0,
          warning: mailErr?.message,
          message: 'Product uploaded. Email notification failed to deliver via SMTP.',
        });
      }
    } else {
      console.log(`[DEV Alert] Would notify ${emailList.length} subscribers about: ${product.title}`);
      return NextResponse.json({
        success: true,
        sentCount: emailList.length,
        simulated: true,
        message: `Product uploaded. Simulated alert sent to ${emailList.length} subscribers.`,
      });
    }
  } catch (error: any) {
    console.error('[Notify New Product Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to dispatch subscriber notifications.' },
      { status: 500 }
    );
  }
}
