import nodemailer from 'nodemailer';

export interface DealingInquiryEmailData {
  inquiryType: string;
  name: string;
  phone: string;
  email?: string;
  stockName: string;
  quantity?: string;
  message?: string;
  sourcePage?: string;
  submittedAt?: string;
}

export const DEFAULT_DEALING_RECIPIENT = 'info.biswal01@gmail.com';

/**
 * Format inquiry type into a human-readable badge label
 */
export function formatInquiryTypeLabel(type: string): string {
  const map: Record<string, string> = {
    buy: 'Buy Shares',
    sell: 'Sell Shares',
    esop: 'Sell ESOPs',
    liquidate_esop: 'Liquidate ESOPs',
    partner: 'Partner With Us',
    buy_order: 'Buy Shares',
    sell_order: 'Sell Shares',
    esop_liquidity: 'Sell ESOPs',
    partner_desk: 'Partner With Us',
  };
  return map[type.toLowerCase()] || type;
}

/**
 * Send inquiry notification email to dealing desk
 */
export async function sendDealingInquiryEmail(
  data: DealingInquiryEmailData,
  recipient: string = DEFAULT_DEALING_RECIPIENT
): Promise<{ success: boolean; messageId?: string; simulated?: boolean; error?: string }> {
  const typeLabel = formatInquiryTypeLabel(data.inquiryType);
  const timestamp = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const recipientEmail = process.env.DEALING_INQUIRY_RECIPIENT_EMAIL || recipient;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Dealing Inquiry</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: #0b132b; color: #ffffff; padding: 24px; text-align: left; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background: #1d4ed8; color: #ffffff; margin-bottom: 8px; }
          .title { font-size: 20px; font-weight: 700; margin: 0; color: #ffffff; }
          .content { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .table td { padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .table td.label { font-weight: 600; color: #64748b; width: 35%; }
          .table td.value { color: #0f172a; font-weight: 500; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #334155; line-height: 1.5; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">${typeLabel}</span>
            <h1 class="title">New Dealing Desk Inquiry Received</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">Private Market Institutional Dealing Portal</p>
          </div>
          <div class="content">
            <table class="table">
              <tr>
                <td class="label">Inquiry Type</td>
                <td class="value"><strong style="color: #1d4ed8;">${typeLabel}</strong></td>
              </tr>
              <tr>
                <td class="label">Full Name</td>
                <td class="value"><strong>${data.name}</strong></td>
              </tr>
              <tr>
                <td class="label">Mobile Number</td>
                <td class="value"><a href="tel:${data.phone}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${data.phone}</a></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value">${data.email ? `<a href="mailto:${data.email}" style="color: #1d4ed8;">${data.email}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}</td>
              </tr>
              <tr>
                <td class="label">Company / Stock</td>
                <td class="value"><strong>${data.stockName}</strong></td>
              </tr>
              ${data.quantity ? `
              <tr>
                <td class="label">Quantity / Budget</td>
                <td class="value">${data.quantity}</td>
              </tr>` : ''}
              <tr>
                <td class="label">Submission Source</td>
                <td class="value">${data.sourcePage || '/contact-us'}</td>
              </tr>
              <tr>
                <td class="label">Received At</td>
                <td class="value">${timestamp} IST</td>
              </tr>
            </table>

            ${data.message ? `
              <div style="margin-top: 20px;">
                <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Instructions / Notes:</span>
                <div class="message-box">${data.message.replace(/\\n/g, '<br/>')}</div>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            Delivered automatically to ${recipientEmail} from Private Market Dealing Desk Ingestion Gateway.
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
[NEW DEALING DESK INQUIRY]
----------------------------------------
Inquiry Type: ${typeLabel}
Full Name:    ${data.name}
Mobile:       ${data.phone}
Email:        ${data.email || 'N/A'}
Stock/Company: ${data.stockName}
Quantity/Est: ${data.quantity || 'N/A'}
Source:       ${data.sourcePage || '/contact-us'}
Timestamp:    ${timestamp} IST
----------------------------------------
Notes:
${data.message || 'No additional instructions provided.'}
----------------------------------------
Recipient: ${recipientEmail}
  `.trim();

  // Check if SMTP is configured
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const from = process.env.SMTP_FROM || `"Private Market Desk" <${user || 'dealing@privatemarket.co.in'}>`;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      const info = await transporter.sendMail({
        from,
        to: recipientEmail,
        subject: `[Dealing Desk] ${typeLabel} - ${data.stockName} (${data.name})`,
        text: textContent,
        html: htmlContent,
      });

      console.log(`[Email Service] Delivered dealing inquiry to ${recipientEmail}, MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.error('[Email Service Error] Failed to send email via SMTP:', err);
      return { success: false, error: err.message || 'SMTP delivery failed' };
    }
  }

  // If SMTP is not yet configured in local environment, log details safely and simulate delivery
  console.log(`\n======================================================`);
  console.log(`[Email Service - Simulated Dev Mode] Email Dispatched!`);
  console.log(`Recipient:   ${recipientEmail}`);
  console.log(`Subject:     [Dealing Desk] ${typeLabel} - ${data.stockName} (${data.name})`);
  console.log(`Payload:\n${textContent}`);
  console.log(`======================================================\n`);

  return { success: true, simulated: true };
}
