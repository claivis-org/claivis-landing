export function getWaitlistEmailHtml({
  fullName,
  schoolName,
}: {
  fullName: string;
  schoolName: string;
}) {
  const firstName = fullName.split(" ")[0] || fullName;
  const schoolText = schoolName ? ` for ${schoolName}` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Claivis</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1a1a1a; line-height:1.6;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8; padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05); border:1px solid #e5e7eb;">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color:#1A4A8A; padding:28px 32px; text-align:left;">
              <span style="font-size:24px; font-weight:800; color:#ffffff; letter-spacing:-0.03em; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Claivis</span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px; font-size:15px; color:#334155;">
              <p style="margin-top:0; font-size:16px; font-weight:600; color:#0f172a;">
                Hello ${firstName},
              </p>

              <p style="margin-bottom:16px;">
                Thank you for reserving a spot on our early access list${schoolText}! I’m really glad to have you with us.
              </p>

              <p style="margin-bottom:16px;">
                We built Claivis because we know how stressful teacher shortages and class step-ins can be for school leaders. When a teacher isn't around, keeping lessons going smoothly without overwhelming the rest of your staff is a constant challenge.
              </p>

              <p style="margin-bottom:16px;">
                With Claivis, your students can keep learning with live AI teaching tailored to your curriculum, classroom Q&amp;A, and automated lesson reports for your peace of mind.
              </p>

              <!-- Highlight Callout Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f0f4f9; border-left:4px solid #1A4A8A; border-radius:4px; margin:24px 0;">
                <tr>
                  <td style="padding:16px; font-size:14px; color:#1e293b;">
                    <strong>What happens next?</strong><br/>
                    We are giving access to schools in batches so we can work closely with each principal. I will reach out to you directly as soon as your school's slot is ready.
                  </td>
                </tr>
              </table>

              <p style="margin-bottom:24px;">
                If you have any quick questions or specific challenges your school is facing right now, feel free to reply directly to this email. I read every reply!
              </p>

              <p style="margin-bottom:0; color:#0f172a; font-weight:500;">
                Warm regards,<br/>
                <strong style="font-size:16px; color:#0f172a;">Wisdom</strong><br/>
                <span style="font-size:13px; color:#64748b;">Founder, Claivis</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; padding:20px 32px; border-top:1px solid #f1f5f9; text-align:center; font-size:12px; color:#94a3b8;">
              &copy; ${new Date().getFullYear()} Claivis. Helping schools keep learning active.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
