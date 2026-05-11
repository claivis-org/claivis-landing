# Claivis Landing Page

**AI Teaching Infrastructure for Schools**

Professional Next.js landing page for [Claivis](https://claivis.org) — Nigeria's first AI teaching agent for secondary school classrooms.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel
- **Fonts**: DM Serif Display + DM Sans (Google Fonts)

---

## Sections

1. **Nav** — Fixed navigation with mobile menu, WhatsApp and waitlist CTAs
2. **Hero** — Headline, subheadline, waitlist form with name/school/email fields
3. **Subject marquee** — Scrolling subject ticker strip
4. **Stats** — 4 key statistics with animated reveal cards
5. **How it works** — 4-step flow from upload to live lesson
6. **Dashboard demo** — Mockup showing live session, schedule, Q&A feed
7. **Features** — 6 feature cards with icons
8. **Comparison** — Side-by-side with vs without Claivis
9. **Pricing** — 3-tier pricing (Starter, Growth, Enterprise)
10. **WhatsApp CTA** — Community join section with benefits
11. **FAQ** — 6 questions with accordion expand
12. **Waitlist CTA** — Final conversion section with form
13. **Footer** — Links, contact, legal

---

## Quick Start

```bash
# Clone / copy the project
cd claivis-landing

# Install dependencies
npm install

# Copy env template
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Before Going Live — Checklist

### 1. Update your WhatsApp group link
Search for `YOUR_GROUP_LINK` in `app/page.tsx` and replace all instances with your actual WhatsApp invite link:

```tsx
// Change this:
href="https://chat.whatsapp.com/YOUR_GROUP_LINK"

// To this:
href="https://chat.whatsapp.com/AbCdEfGhIjKlMnOpQrStUv"
```

### 2. Connect your waitlist backend
The waitlist form already posts to `app/api/waitlist/route.ts`. Configure Airtable in `.env.local`:

```env
AIRTABLE_API_KEY=your_key
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
# Optional
# AIRTABLE_TABLE_NAME=Waitlist
# AIRTABLE_STATUS_FIELD_NAME=Status
# AIRTABLE_DEFAULT_STATUS=New
```

Expected Airtable columns:
- `Name`
- `Email`
- `School`

Optional:
- `Status` as a single select. If you set `AIRTABLE_DEFAULT_STATUS`, make sure that option already exists in Airtable or the API will retry without it.

**Alternative: Mailchimp, ConvertKit, or Supabase** — all have code ready in `route.ts`, just uncomment.

### 3. Verify the waitlist form
Submit the form locally and confirm a record appears in Airtable. If you do not provide Airtable credentials, the API returns a simulated success response for development.

### 4. Add your phone number
Search for `[Phone number]` in `app/page.tsx` and replace with your actual number.

### 5. Add your founder name
Search for `[Founder Name]` in the pilot offer letter and update.

### 6. Update metadata
In `app/layout.tsx`, update the `metadataBase` URL to your actual domain.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set production domain
vercel --prod
```

Or connect your GitHub repo directly in the [Vercel dashboard](https://vercel.com) for automatic deployments on every push.

### Environment variables on Vercel
Go to: Project → Settings → Environment Variables
Add all variables from `.env.example` with your real values.

---

## Customisation Guide

### Colours
All brand colours are in `app/globals.css` under `:root` and `tailwind.config.js` under `theme.extend.colors`.

Primary palette:
- `--navy: #0A1628` — Dark background
- `--accent: #00D4FF` — Cyan accent
- `--gold: #F5A623` — Gold highlight
- `--chalk: #F8F5EE` — Light section background

### Fonts
Using Google Fonts — DM Serif Display (headings) and DM Sans (body). Change in `app/globals.css` import and update CSS variables.

### Waitlist form fields
Edit the `WaitlistForm` component in `app/page.tsx` to add or remove fields. Currently collects: name, school (optional), email.

### Content
All text content is in `app/page.tsx`:
- `stats` array — the four statistics
- `features` array — the six feature cards
- `howSteps` array — the four how-it-works steps
- `pricing` array — the three pricing tiers
- `faqs` array — the six FAQ questions

---

## Analytics Setup (Optional)

### Google Analytics
Add to `app/layout.tsx`:
```tsx
import Script from 'next/script'
// In <head>:
<Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
```

### PostHog (recommended for product analytics)
```bash
npm install posthog-js
```
Add your PostHog key to `.env.local` and wrap your app with PostHogProvider.

---

## File Structure

```
claivis-landing/
├── app/
│   ├── globals.css          # Global styles, animations, fonts
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Full landing page (all sections)
│   └── api/
│       └── waitlist/
│           └── route.ts     # Waitlist API endpoint
├── public/                  # Static assets (add og-image.png here)
├── .env.example             # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

---

## Adding an OG Image

Create a 1200×630px image named `og-image.png` and put it in `/public/`. Then update `app/layout.tsx`:

```tsx
openGraph: {
  images: [{ url: '/og-image.png', width: 1200, height: 630 }],
}
```

---

## Support

Questions? Email [hello@claivis.org](mailto:hello@claivis.org) or join the WhatsApp community.

---

*Built in Nigeria, for Nigeria — and the world.*
