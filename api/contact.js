import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["sadra1hoseinpour@gmail.com"],
      subject: `New Contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background-color:#f4f4f5;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
                    <tr>
                      <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:12px 12px 0 0;padding:32px 32px 24px;text-align:center;">
                        <span style="font-size:36px;line-height:1;">✉️</span>
                        <h1 style="margin:12px 0 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">New Contact Message</h1>
                        <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">${name} reached out via your portfolio</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background:#ffffff;border-radius:0 0 12px 12px;padding:32px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                          <tr>
                            <td style="padding-bottom:20px;">
                              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                                <tr>
                                  <td style="width:48%;background:#f8f8ff;border-radius:8px;padding:16px;vertical-align:top;">
                                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.6px;color:#6366f1;font-weight:600;">Name</p>
                                    <p style="margin:6px 0 0;font-size:15px;color:#1e293b;font-weight:500;">${name}</p>
                                  </td>
                                  <td style="width:4%;"></td>
                                  <td style="width:48%;background:#f8f8ff;border-radius:8px;padding:16px;vertical-align:top;">
                                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.6px;color:#6366f1;font-weight:600;">Email</p>
                                    <p style="margin:6px 0 0;font-size:15px;color:#1e293b;font-weight:500;">${email}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:8px;">
                              <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.6px;color:#6366f1;font-weight:600;">Message</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="background:#fafafa;border-radius:8px;padding:16px;border-left:3px solid #6366f1;">
                              <p style="margin:0;font-size:15px;color:#334155;line-height:1.6;white-space:pre-wrap;">${message}</p>
                            </td>
                          </tr>
                        </table>
                        <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0 0;">
                        <p style="margin:16px 0 0;font-size:12px;color:#a1a1aa;text-align:center;">Sent via sadra1hoseinpour.com &bull; Reply to ${email} to respond</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
