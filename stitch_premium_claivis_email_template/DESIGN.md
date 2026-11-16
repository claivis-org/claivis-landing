---
name: Claivis Executive
colors:
  surface: '#f9f9ff'
  surface-dim: '#d9d9df'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f9'
  surface-container: '#eeedf3'
  surface-container-high: '#e8e8ee'
  surface-container-highest: '#e2e2e8'
  on-surface: '#1a1c20'
  on-surface-variant: '#434750'
  inverse-surface: '#2f3035'
  inverse-on-surface: '#f0f0f6'
  outline: '#737781'
  outline-variant: '#c3c6d2'
  surface-tint: '#335e9f'
  primary: '#00336b'
  on-primary: '#ffffff'
  primary-container: '#1a4a8a'
  on-primary-container: '#96bbff'
  inverse-primary: '#aac7ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#003b35'
  on-tertiary: '#ffffff'
  tertiary-container: '#00544d'
  on-tertiary-container: '#5eccbe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#144686'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f9f9ff'
  on-background: '#1a1c20'
  surface-variant: '#e2e2e8'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  email-body:
    fontFamily: Arial, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style
The design system for this platform is built upon a foundation of **Executive Minimalism**. It is designed to resonate with high-level school administrators and decision-makers who require clarity, authority, and efficiency. The aesthetic prioritizes a "calm intelligence"—avoiding the frantic energy of typical ed-tech in favor of a sophisticated, editorial feel.

The visual language utilizes a mix of **Corporate Modernism** and **Tactile Precision**. It features expansive whitespace, high-fidelity typography, and subtle depth through tonal layering rather than aggressive shadows. The goal is to evoke a sense of institutional stability blended with forward-thinking AI innovation.

## Colors
The palette is anchored by **Midnight Navy (#1A4A8A)**, representing authority and deep institutional knowledge. 

- **Primary (Midnight Navy):** Used for key brand moments, primary actions, and navigational headers.
- **Secondary (Slate Blue):** A muted slate used for secondary UI elements and supporting text.
- **Tertiary (Deep Teal):** Used sparingly for "AI-powered" insights and innovative features.
- **Accent (Heritage Gold):** Reserved for premium status indicators, achievements, or high-level alerts.
- **Backgrounds:** A tiered system of off-whites and cool grays to maintain high legibility and prevent eye strain during long administrative sessions.

## Typography
The typography system uses **Hanken Grotesk** for headlines to provide a sharp, contemporary edge that feels "designed." For body copy, **Inter** provides maximum legibility and a systematic feel across dense data views.

**Email-Safe Strategy:** For all outbound communications to school leaders, the system automatically falls back to **Arial** or **Helvetica**. All high-contrast ratios (4.5:1 minimum) are enforced to ensure accessibility for all administrators. Large headings in emails should be limited to 24px-28px to ensure they do not break on mobile mail clients.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. The main content area is capped at 1280px to maintain line-length readability, while decorative elements and sidebars may bleed to the edges. 

- **Grid:** A 12-column grid is used for dashboards. Gutters are kept wide (24px) to create a feeling of "room to breathe."
- **Rhythm:** Spacing follows an 8px linear scale. For "Executive" views, we favor generous padding (e.g., 32px or 48px internal card padding) to reduce the perceived complexity of administrative data.
- **Mobile:** Elements stack vertically, with margins reducing to 16px. AI insights move from sidebars to "sticky bottom" drawers for accessibility.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Stacking** and **Soft Plurality**. 

- **Level 0 (Surface):** The main background using the neutral base color.
- **Level 1 (Container):** White cards with a very subtle, 1px border in Slate-200. No shadows are used here to keep the UI clean.
- **Level 2 (Hover/Active):** A soft, diffused "Executive Shadow"—a 12% opacity Midnight Navy blur with a 16px spread.
- **AI Layers:** Features driven by AI use a faint backdrop-blur (glassmorphism) with a 2px Deep Teal left-border to signal "intelligence" without disrupting the professional aesthetic.

## Shapes
We use **Soft (0.25rem)** roundedness as the default. This "near-sharp" approach communicates precision and seriousness. 

- **Standard Elements:** Inputs, buttons, and small containers use 4px (0.25rem) corners.
- **Large Cards:** Use 8px (0.5rem) to slightly soften the presence of large data blocks.
- **System Icons:** Icons should be stroke-based (2px weight) with slight rounding on the terminals to match the UI corners.

## Components
- **Buttons:** Primary buttons use a solid Midnight Navy background with white text. Tertiary buttons use a ghost style (border-only) with a Heritage Gold hover state.
- **Input Fields:** Minimalist design with a 1px Slate border that transitions to Midnight Navy on focus. Labels are always positioned above the input in the `label-sm` style.
- **AI Insights (Custom Component):** Specialized cards with a subtle Teal-to-Navy gradient border. These components use "generous whitespace" (minimum 24px internal padding).
- **Data Lists:** High-contrast rows with alternating backgrounds. Every 4th row has a subtle horizontal separator to prevent "scanning fatigue" for school leaders reviewing long reports.
- **Status Chips:** Small, rectangular indicators with low-saturation backgrounds (e.g., light teal background with deep teal text) to provide status without visual noise.
- **Email Templates:** High-contrast, single-column layouts. Buttons in emails must be "bulletproof" HTML buttons (table-based or VML) using the Primary color for maximum click-through on desktop Outlook and mobile iOS.