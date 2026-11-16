export function getWaitlistEmailHtml({
  fullName,
  schoolName,
}: {
  fullName: string;
  schoolName: string;
}) {
  const firstName = fullName.split(" ")[0] || fullName;
  const schoolText = schoolName ? ` for <strong>${schoolName}</strong>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You’ve been added to the Claivis waitlist</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Physical Letter Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Top Header Navigation Bar -->
          <tr>
            <td style="padding: 28px 36px 12px 36px; background-color: #ffffff;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Brand Logo + Wordmark -->
                  <td align="left" valign="middle">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="middle" style="padding-right: 12px;">
                          <img src="https://useclaivis.com/logo.png" 
                               width="40" height="40" 
                               alt="Claivis" 
                               style="display: block; width: 40px; height: 40px; border-radius: 50%; border: 2px solid #e2e8f0; object-fit: cover;"/>
                        </td>
                        <td valign="middle">
                          <span style="font-size: 26px; font-weight: 800; color: #1a4a8a; letter-spacing: -0.03em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Claivis</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Top-Right Social Badges -->
                  <td align="right" valign="middle">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <!-- Twitter / X -->
                        <td style="padding-left: 8px;">
                          <a href="https://x.com/useclaivis" target="_blank" style="text-decoration: none; display: inline-block;">
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 32px; height: 32px; border-radius: 50%; background-color: #0284c7;">
                              <tr>
                                <td align="center" valign="middle" style="width: 32px; height: 32px;">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="display: block; margin: auto;">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                  </svg>
                                </td>
                              </tr>
                            </table>
                          </a>
                        </td>
                        <!-- Facebook -->
                        <td style="padding-left: 8px;">
                          <a href="https://facebook.com" target="_blank" style="text-decoration: none; display: inline-block;">
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 32px; height: 32px; border-radius: 50%; background-color: #0284c7;">
                              <tr>
                                <td align="center" valign="middle" style="width: 32px; height: 32px;">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="display: block; margin: auto;">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                  </svg>
                                </td>
                              </tr>
                            </table>
                          </a>
                        </td>
                        <!-- LinkedIn -->
                        <td style="padding-left: 8px;">
                          <a href="https://linkedin.com/company/claivis" target="_blank" style="text-decoration: none; display: inline-block;">
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width: 32px; height: 32px; border-radius: 50%; background-color: #0284c7;">
                              <tr>
                                <td align="center" valign="middle" style="width: 32px; height: 32px;">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" style="display: block; margin: auto;">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63s1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63z"/>
                                  </svg>
                                </td>
                              </tr>
                            </table>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Dimensional Open Physical Envelope (Precise Multi-Layered Structure) -->
          <tr>
            <td style="padding: 0; margin: 0; background-color: #ffffff;">
              <svg width="100%" height="275" viewBox="0 0 580 275" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; width: 100%;">
                <defs>
                  <!-- 1. Light Interior Gradient (Near-white to pale blue) -->
                  <linearGradient id="backFlapInterior" x1="290" y1="20" x2="290" y2="210" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#f0f9ff"/>
                    <stop offset="85%" stop-color="#e0f2fe"/>
                    <stop offset="100%" stop-color="#d0ebfd"/>
                  </linearGradient>

                  <!-- 2. Centerpiece Brand Ring Gradient (Navy #1A4A8A to Cyan #00D4FF) -->
                  <linearGradient id="brandRingGradient" x1="170" y1="30" x2="410" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#00D4FF"/>
                    <stop offset="50%" stop-color="#0284C7"/>
                    <stop offset="100%" stop-color="#1A4A8A"/>
                  </linearGradient>

                  <!-- 3. Soft Diffused Front Lip Drop Shadow -->
                  <filter id="frontLipShadow" x="-20%" y="-40%" width="140%" height="160%" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="-7" stdDeviation="12" flood-color="#1A4A8A" flood-opacity="0.15"/>
                    <feDropShadow dx="0" dy="-2" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.06"/>
                  </filter>
                </defs>

                <!-- LAYER 1: BACK FLAP (Furthest back layer - single smooth organic curve) -->
                <path d="M 0 95 
                         C 120 50, 200 24, 290 22 
                         C 380 24, 460 50, 580 95 
                         L 580 220 
                         L 0 220 
                         Z" 
                      fill="url(#backFlapInterior)"/>

                <!-- Back Flap Soft Rim Highlight -->
                <path d="M 0 95 C 120 50, 200 24, 290 22 C 380 24, 460 50, 580 95" 
                      stroke="#e2e8f0" 
                      stroke-width="1.2" 
                      fill="none"/>

                <!-- LAYER 2: BACKGROUND MESH TEXTURE (Faint ambient constellation, non-converging, opacity <= 0.16) -->
                <g stroke="#0284c7" stroke-width="1" opacity="0.15" stroke-linecap="round">
                  <line x1="60" y1="85" x2="140" y2="60"/>
                  <line x1="140" y1="60" x2="220" y2="75"/>
                  <line x1="220" y1="75" x2="310" y2="45"/>
                  <line x1="360" y1="55" x2="440" y2="40"/>
                  <line x1="440" y1="40" x2="520" y2="75"/>
                  <line x1="140" y1="60" x2="180" y2="105"/>
                  <line x1="440" y1="40" x2="400" y2="95"/>
                  <line x1="260" y1="100" x2="330" y2="95"/>

                  <circle cx="60" cy="85" r="2.5" fill="#0284c7"/>
                  <circle cx="140" cy="60" r="3" fill="#00D4FF"/>
                  <circle cx="220" cy="75" r="2.5" fill="#0284c7"/>
                  <circle cx="310" cy="45" r="3" fill="#00D4FF"/>
                  <circle cx="360" cy="55" r="2.5" fill="#00D4FF"/>
                  <circle cx="440" cy="40" r="3" fill="#00D4FF"/>
                  <circle cx="520" cy="75" r="2.5" fill="#0284c7"/>
                  <circle cx="180" cy="105" r="2" fill="#0284c7"/>
                  <circle cx="400" cy="95" r="2" fill="#0284c7"/>
                </g>

                <!-- LAYER 3: CENTERPIECE FULL RING & BRAND ICON (Emerging like sun over horizon) -->
                <g>
                  <!-- Soft Outer Glow behind main ring -->
                  <circle cx="290" cy="125" r="80" stroke="#00D4FF" stroke-width="24" fill="none" opacity="0.22"/>
                  <!-- Main Full Circular Ring (Navy to Cyan Gradient) -->
                  <circle cx="290" cy="125" r="80" stroke="url(#brandRingGradient)" stroke-width="20" fill="none"/>
                  <!-- Solid White Core Circle -->
                  <circle cx="290" cy="125" r="58" fill="#ffffff" filter="drop-shadow(0 6px 16px rgba(2, 132, 199, 0.18))"/>
                  
                  <!-- Existing Claivis Brand Icon centered inside -->
                  <g transform="translate(258, 93) scale(0.64)">
                    <path d="M 64 24 C 42 24 28 36 28 50 C 28 64 42 76 64 76 L 68 86 L 76 72 C 82 66 84 58 84 50 C 84 34 68 24 64 24 Z" fill="#1A4A8A"/>
                    <circle cx="53" cy="50" r="17" fill="#ffffff"/>
                    <rect x="44" y="43" width="3.5" height="14" rx="1.75" fill="#00D4FF"/>
                    <rect x="51.5" y="36" width="4" height="28" rx="2" fill="#00D4FF"/>
                    <rect x="60" y="43" width="3.5" height="14" rx="1.75" fill="#00D4FF"/>
                  </g>
                </g>

                <!-- LAYER 4: FRONT POCKET / LIP (Overlaps lower ring, organic 4-segment bezier wave with soft drop shadow) -->
                <g filter="url(#frontLipShadow)">
                  <path d="M 0 105 
                           C 80 120, 150 138, 210 142 
                           C 240 144, 265 130, 290 130 
                           C 315 130, 340 144, 370 142 
                           C 430 138, 500 120, 580 105 
                           L 580 275 
                           L 0 275 
                           Z" 
                        fill="#ffffff"/>
                  
                  <!-- Soft paper fold highlight along organic wave edge -->
                  <path d="M 0 105 
                           C 80 120, 150 138, 210 142 
                           C 240 144, 265 130, 290 130 
                           C 315 130, 340 144, 370 142 
                           C 430 138, 500 120, 580 105" 
                        stroke="#edf2f7" 
                        stroke-width="1.2" 
                        fill="none"/>
                </g>

                <!-- LAYER 5: CREASE LINES (Two faint subtle diagonal fold suggestions, opacity ~0.55) -->
                <g opacity="0.55">
                  <line x1="0" y1="265" x2="210" y2="155" stroke="#f1f5f9" stroke-width="1.5"/>
                  <line x1="580" y1="265" x2="370" y2="155" stroke="#f1f5f9" stroke-width="1.5"/>
                </g>
              </svg>
            </td>
          </tr>

          <!-- Hero Headline (Directly Below Envelope Opening on White Card) -->
          <tr>
            <td align="center" style="padding: 6px 36px 28px 36px; background-color: #ffffff;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1e293b; letter-spacing: -0.02em; line-height: 1.25; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                You’ve been added to the<br/>Claivis waitlist.
              </h1>
            </td>
          </tr>

          <!-- Main Letter Content -->
          <tr>
            <td style="padding: 0 40px 24px 40px; font-size: 15px; color: #334155; line-height: 1.7; background-color: #ffffff;">
              <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #1e293b;">
                Hello ${firstName},
              </p>

              <p style="margin-bottom: 18px;">
                Thank you for reserving a spot on our early access list${schoolText}! I’m really glad to have you with us.
              </p>

              <p style="margin-bottom: 18px;">
                We built Claivis because we know how stressful teacher shortages and class step-ins can be for school leaders. When a teacher isn't around, keeping lessons going smoothly without overwhelming the rest of your staff is a constant challenge.
              </p>

              <p style="margin-bottom: 24px;">
                With Claivis, your students can keep learning with live AI teaching tailored to your curriculum, classroom Q&amp;A, and automated lesson reports for your peace of mind.
              </p>

              <!-- What Happens Next Panel -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #1a4a8a; text-transform: uppercase; letter-spacing: 0.05em;">
                      What happens next?
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
                      We are giving access to schools in batches so we can work closely with each principal. I will reach out to you directly as soon as your school's slot is ready.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin-bottom: 28px;">
                If you have any quick questions or specific challenges your school is facing right now, feel free to reply directly to this email. I read every reply!
              </p>

              <!-- Founder Signature -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 15px; color: #1e293b; font-weight: 600;">
                      Warm regards,
                    </p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #1a4a8a;">
                      Wisdom
                    </p>
                    <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b; font-weight: 500;">
                      Founder, Claivis
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 28px 36px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
                The Claivis Platform &bull; <a href="https://useclaivis.com" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 500;">useclaivis.com</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} Claivis Inc. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
