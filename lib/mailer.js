import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g. smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,                     // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,     // App password, not your real password
  },
});

export async function sendAbandonedCartEmail({ to, userName, items }) {
  if (!to || !items?.length) {
    throw new Error("Missing required fields: to, items");
  }

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f0f0f0">
          ${item.name}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:center">
          x${item.quantity}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject: "You left something behind 🛒",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#111">
        <h2 style="margin-bottom:4px">Hey ${userName || "there"} 👋</h2>
        <p style="color:#555">You left some items in your cart. Come back and complete your order!</p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <thead>
            <tr style="color:#888;font-size:12px;text-transform:uppercase">
              <th style="text-align:left;padding-bottom:8px">Item</th>
              <th style="text-align:center;padding-bottom:8px">Qty</th>
              <th style="text-align:right;padding-bottom:8px">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding-top:12px;font-weight:600">Total</td>
              <td style="padding-top:12px;font-weight:600;text-align:right">
                $${total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        
          href="${process.env.NEXT_PUBLIC_APP_URL}/cart"
          style="display:inline-block;background:#000;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:500"
        >
          Return to cart
        </a>

        <p style="margin-top:32px;font-size:12px;color:#aaa">
          If you didn't create an account, ignore this email.
        </p>
      </div>
    `,
  });
}