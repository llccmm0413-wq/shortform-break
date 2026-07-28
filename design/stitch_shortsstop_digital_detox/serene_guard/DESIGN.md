---
name: Serene Guard
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#ab0b1c'
  on-tertiary: '#ffffff'
  tertiary-container: '#cf2c30'
  on-tertiary-container: '#ffecea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px
  gutter: 16px
---

## Brand & Style

The design system is centered on the concept of "Digital Mindfulness." Aimed at a Gen Z and Alpha audience (10-20s), it moves away from the chaotic, high-dopamine aesthetic of short-form platforms. Instead, it adopts a **Corporate / Modern** style with a focus on **Minimalism** to provide a psychological "breathing space."

The brand personality is analytical, calm, and encouraging. It functions as a supportive mentor rather than a strict enforcer. The UI uses generous whitespace and a subdued palette to reduce cognitive load, helping users regain control over their digital habits through a clean, systematic interface.

## Colors

The palette is designed to balance clinical analysis with emotional encouragement.
- **Primary (Trust Blue):** Used for progress indicators, primary actions, and "focused" states. It represents reliability and clarity.
- **Secondary (Soft Orange):** A warning color used for "Caution" zones or when a user is nearing their limit. It provides a gentle nudge without causing panic.
- **Tertiary (Alert Red):** Reserved for "Stop" states and critical usage alerts. It is softened to avoid being overly aggressive while maintaining urgency.
- **Neutral (Slate Grays):** A sophisticated range of grays used for backgrounds and secondary text to maintain a calm, non-distracting environment.
- **Base:** Pure white (`#FFFFFF`) and very light gray (`#F8FAFC`) surfaces ensure a clean, "fresh start" feeling every time the app is opened.

## Typography

The typography strategy employs **Hanken Grotesk** for its sharp, contemporary, and professional feel. It provides the "analytical" weight required for data visualization while remaining approachable for a younger demographic.

**JetBrains Mono** is used sparingly for labels and data-heavy metrics (like timers and usage percentages) to lean into the "analytical/technical" aspect of time management. All headings use a slightly tighter letter-spacing to maintain a modern, "designed" look, while body text prioritizes legibility with generous line heights.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with high internal padding, mimicking the comfort of modern alarm and wellness apps. 

- **Mobile First:** A single-column flow with elements centered or grouped in "cards" to allow for easy thumb navigation.
- **Rhythm:** An 8px linear scale is used. Large 40px gaps between major sections (Usage Chart vs. Goal Setting) create clear mental breaks.
- **Safe Zones:** Content is inset by 20px from the screen edge to ensure a premium, spacious feel that doesn't feel crowded on smaller devices.

## Elevation & Depth

This design system avoids heavy shadows to maintain a "lightweight" psychological feel. Instead, it uses **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Levels:** The background is `#F8FAFC`. Interactive cards use pure `#FFFFFF` with a subtle 1px border (`#E2E8F0`).
- **Depth via Tinting:** To show hierarchy, active states use a very light tint of the primary color (Blue 50) as a background fill rather than a drop shadow.
- **Focus:** When an element requires absolute attention (like a "Stop" modal), a soft backdrop blur (12px) is applied to the content behind it to eliminate distractions.

## Shapes

The shape language is **Rounded**, signifying comfort and approachability. 

- **Primary Cards:** Use a 1rem (16px) corner radius to feel soft yet structured.
- **Buttons:** Use fully rounded (pill) shapes to encourage interaction and provide a friendlier "non-systemic" feel.
- **Progress Bars:** Utilize rounded end-caps to make the data visualization feel organic rather than rigid.

## Components

### Buttons
Primary buttons are pill-shaped, using the Trust Blue fill with white text. Secondary buttons use a "Ghost" style with a 1px border and neutral text.

### Progress Gauges (Circular)
Inspired by the reference sketch, the central "Usage Score" uses a thick-stroke circular progress bar. The stroke uses a gradient or segmenting (Green-Yellow-Red) to visualize the "danger zone" of addiction.

### Information Cards
Cards for AI suggestions or daily analysis should have a subtle 1px border. No shadows are used; instead, the card background is slightly brighter than the page background to create a "lifted" effect.

### Input Fields (Timers)
Time pickers and number inputs should be large and easy to tap, using a light gray fill (`#F1F5F9`) that turns Trust Blue on focus.

### Status Chips
Small, rounded labels used for categorizing apps (e.g., "Social," "Entertainment"). These use low-saturation background tints to stay informative without being distracting.