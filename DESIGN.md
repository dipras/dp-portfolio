---
name: Dipras Portfolio
description: Sky-blue developer portfolio pairing terminal/code motifs with soft, glassmorphic surfaces
colors:
  primary: "#0369a1"
  primary-hover: "#0284c7"
  primary-soft: "#e0f2fe"
  background: "#f8fafc"
  background-light: "#ffffff"
  card: "#ffffff"
  border: "#f1f5f9"
  text-main: "#0f172a"
  text-muted: "#64748b"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 700
  body:
    fontFamily: "Noto Sans, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "ui-monospace, monospace"
rounded:
  DEFAULT: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  2xl: "1.25rem"
  3xl: "1.5rem"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-ghost:
    backgroundColor: "#f1f5f9"
    textColor: "#334155"
    rounded: "{rounded.full}"
    padding: "14px 32px"
---

# Design System: Dipras Portfolio

## Overview

**Creative North Star: "The Terminal Window"**

This system reads as a developer's terminal wrapped in a soft, confident SaaS shell: traffic-light window dots, monospace status snippets ("$ ./init_portfolio.sh", "ONLINE & CODING"), and a terminal glyph in the navbar mark sit inside otherwise gentle, rounded, glassmorphic surfaces. The tension is deliberate — it mirrors the site's own positioning of a developer who ships polished full-stack products but is genuinely at home closer to the metal. Nothing here is harsh or brutalist; the "terminal" is a recurring accent motif, not the dominant texture.

The palette is a single confident sky-blue running through pill badges, links, primary buttons, and colored shadow blooms, set against near-white cards and slate-toned neutrals. Corners are generously rounded almost everywhere (pills for badges/nav/buttons, `2xl`–`4xl` for cards and framed images), borders are hairline and pale, and depth comes from soft, sometimes color-tinted shadows rather than hard edges or drop lines.

**Key Characteristics:**
- Single-accent sky-blue system (`#0369a1` family) carried through badges, links, buttons, focus rings, and shadow tint.
- Terminal/code-editor motifs (window dot chrome, monospace snippets, terminal glyph mark) as a recurring but sparing accent, not a base texture.
- Pill-shaped interactive elements (nav, buttons, status badges) contrasted against large-radius rectangular containers (cards, framed photos).
- Soft, often color-tinted shadow blooms (`shadow-primary/20`, `shadow-sky-900/20`) instead of neutral gray elevation.
- Subtle glassmorphism on chrome surfaces (translucent, blurred navbar and overlay panels).
- Space Grotesk for display/headings, Noto Sans for body — a geometric-technical display face over a warm, highly legible body face.

## Colors

A single-hue sky-blue system carrying nearly all color signal, set against a near-monochrome slate neutral scale; there is no secondary or tertiary accent hue in the current implementation.

### Primary
- **Signal Sky** (`#0369a1`, `--color-primary`): the one accent color — links, primary buttons, active nav state, badge text/icons, focus rings, and the tint source for colored shadows. Used sparingly against neutral backgrounds so it reads as a deliberate signal (available-for-hire dot, CTA buttons, active states).
- **Signal Sky Hover** (`#0284c7`, `--color-primary-hover`): the pressed/hover state of Signal Sky, one step darker and more saturated.
- **Signal Sky Soft** (`#e0f2fe`, `--color-primary-soft` / `--color-primary-light`): the tint fill behind badges, icon chips, and soft highlighted backgrounds — Signal Sky diluted to near-white.

### Neutral
- **Paper** (`#ffffff`, `--color-background-light` / `--color-card`): the base surface for cards, forms, and the navbar chrome.
- **Mist** (`#f8fafc`, `--color-background`): the page background and alternating section backgrounds (e.g. the About section on Home), one step off pure white.
- **Hairline** (`#f1f5f9`, `--color-border`): borders and dividers throughout — always faint, never a hard rule.
- **Ink** (`#0f172a`, `--color-text-main`): primary text and headline color.
- **Fog** (`#64748b`, `--color-text-muted`): secondary/supporting text — descriptions, metadata, captions.

### Named Rules
**The One Accent Rule.** Signal Sky is the only hue in the system. Status colors (red/yellow/green traffic-light dots, green "online" pulse) are the sole exception, used only inside literal terminal/status-chrome motifs, never as general UI color.

**The Glow Rule.** Elevation on primary interactive elements tints toward Signal Sky rather than staying neutral gray (`shadow-primary/20`, `shadow-primary/25`, `shadow-sky-900/20`) — the accent color is reinforced even in depth cues, not just in fills and text.

## Typography

**Display Font:** Space Grotesk (with sans-serif fallback)
**Body Font:** Noto Sans (with sans-serif fallback)
**Label/Mono Font:** ui-monospace stack (used for the terminal snippet accents and version/status tags)

**Character:** Space Grotesk's geometric, slightly technical letterforms carry headlines and give the "terminal" personality its display voice; Noto Sans keeps body copy warm and highly legible so long bios and job descriptions stay easy to scan. Monospace is reserved for literal code/terminal quotations, never for UI labels.

### Hierarchy
- **Display** (bold/700, `text-5xl`–`text-6xl`, tight leading `1.1`): page-level hero headlines ("Hi, I'm Aldy Prastyo").
- **Headline** (bold/700, `text-3xl`–`text-4xl`): section titles ("About Me", "Selected Works", "Experience").
- **Title** (bold/700, `text-xl`–`text-2xl`): card and item titles (project names, job titles, article titles).
- **Body** (regular/400, `text-base`–`text-lg`, relaxed leading): paragraph copy, bios, descriptions; kept to comfortable measure via constrained container widths (`max-w-lg`, `max-w-2xl`).
- **Label** (bold/700, `text-xs`, uppercase, wide tracking): eyebrow badges ("Available for hire", "Featured Project"), tag chips, metadata.

### Named Rules
**The Mono-Is-Literal Rule.** Monospace type only appears where it represents literal code, terminal output, or a version string — never as a decorative label font.

## Layout

Content sits in a generous centered container (`max-w-6xl` on Home/Footer, `max-w-300`/`max-w-4xl` on other pages), with page padding of `px-4`–`px-10` scaling up at breakpoints. Vertical rhythm runs large: sections use `py-20`+ and hero regions add extra top/bottom padding (`pt-16 lg:pt-24`, `pb-20 lg:pb-32`) to let content breathe.

The dominant grid pattern is an asymmetric two-column split on wide screens (text block + framed visual on Home/About heroes; `lg:grid-cols-2`), collapsing to a single stacked column on mobile with the visual re-ordered above the text (`order-1`/`order-2` swaps). Card grids elsewhere (Projects, Blog) use responsive multi-column grids (`sm:grid-cols-2`, `lg:grid-cols-3`) that collapse to one column below `md`. The fixed top navbar (`h-16`, `z-50`) is always present, with page content padded below it (`pt-28`).

## Elevation & Depth

The system is not flat and not neutral-shadowed — it uses soft, frequently color-tinted shadow blooms as the primary depth cue, layered with translucent glass panels for chrome surfaces. Depth reads as "glow," not "cast shadow from a light source": shadows are large, soft-edged, and often carry the primary hue's tint at low opacity.

### Shadow Vocabulary
- **Ambient card shadow** (`shadow-sm`/`shadow-md`/`shadow-lg` with `shadow-slate-200/50–80`): the resting depth for plain content cards (project cards, blog cards, form panels).
- **Signal glow** (`shadow-lg shadow-primary/20` to `shadow-primary/40`): the elevated state for primary buttons and badges — grows more saturated on hover.
- **Deep glow** (`shadow-xl shadow-sky-900/20`, `shadow-2xl`): reserved for hero imagery frames and large feature panels (About portrait, CTA banners).
- **Glass chrome** (`bg-white/80 backdrop-blur-lg`, `bg-white/10 backdrop-blur-md`): the navbar and dark-panel overlay text plates use frosted translucency instead of a shadow to separate from what's behind them.

### Named Rules
**The Glow-Not-Gray Rule.** Where a shadow supports a primary-colored element, tint the shadow toward Signal Sky rather than defaulting to neutral gray.

## Shapes

Corners are generously rounded almost everywhere, with a clear split by role: interactive controls and status indicators are fully pill-shaped (`rounded-full`) — nav links, buttons, badges, tag chips — while containers (cards, images, panels, CTA banners) use large but finite radii (`rounded-2xl` through `rounded-4xl`). Borders, when present, are hairline and pale (`border-slate-100`/`border-slate-200`, matching the Hairline neutral), used to define card edges rather than to add visual weight. A recurring signature is the slight rotation-on-hover treatment on framed photos (`rotate-3` at rest, `hover:rotate-0`), giving otherwise static portrait frames a touch of playful physicality.

## Components

### Buttons
- **Shape:** fully pill-shaped (`rounded-full`).
- **Primary:** Signal Sky background, white text, bold weight, generous horizontal padding (`px-8 py-3.5`); rests with a Signal glow shadow that deepens and the button lifts slightly (`hover:-translate-y-0.5`) on hover.
- **Hover / Focus:** background steps to Signal Sky Hover; shadow opacity increases; subtle upward translate reinforces "confident and responsive."
- **Ghost/Secondary:** neutral slate fill (`bg-slate-100`) with dark text, same pill shape and padding, no colored glow — used for secondary actions alongside a primary CTA (e.g. "Read Blog" beside "View Projects").

### Chips / Badges
- **Style:** Signal Sky Soft background with Signal Sky text, `rounded-full`, uppercase bold label text at small size, often paired with an animated ping dot for "live" status signals ("Available for hire", "Open for work").
- **State:** tag chips (skills, tech stack) use a plainer neutral chip (`bg-slate-100`) that swaps to a colored border/text on hover, reserving the solid Signal Sky treatment for status/eyebrow badges specifically.

### Cards / Containers
- **Corner Style:** `rounded-2xl`–`rounded-3xl`.
- **Background:** Paper (`#ffffff`) on Mist or white page backgrounds, giving a subtle lift even before shadow is applied.
- **Shadow Strategy:** Ambient card shadow at rest, stepping up to a stronger ambient shadow plus a slight upward translate on hover (see Elevation & Depth).
- **Border:** hairline pale border (`border-slate-100`) as the primary edge definition, shadow as the secondary cue.
- **Internal Padding:** generous (`p-6` to `p-12` depending on card size).

### Inputs / Fields
- **Style:** Mist-toned fill (`bg-slate-50`) with a pale border, `rounded-xl`, comfortable padding (`py-3 px-4`).
- **Focus:** border and ring shift to Signal Sky at partial opacity (`focus:border-sky-500 focus:ring-sky-500/20`).

### Navigation
- **Style:** fixed, full-width, glass chrome bar (`bg-white/80 backdrop-blur-lg`) with a hairline bottom border; nav links live inside a pill-shaped track (`bg-slate-100/50 rounded-full`).
- **States:** active link gets a white pill background with bold Signal Sky text and a soft shadow; inactive links are muted slate text that shifts to Signal Sky on hover, no background change.
- **Mobile:** nav links collapse behind a menu icon button; brand mark (terminal glyph in a Signal Sky rounded-square) and resume CTA remain the persistent anchors.

### Timeline (signature component)
The About page's Experience list uses a vertical dotted-line timeline: a pale left border (`border-l border-slate-200`) with small circular markers (`size-4 rounded-full`) at each entry, the current/active entry marked in Signal Sky and past entries in neutral slate. This is the system's one custom structural component beyond standard cards/buttons.

## Do's and Don'ts

### Do:
- **Do** keep Signal Sky as the only chroma accent; introduce a second hue only for a confirmed new product need, not for visual variety.
- **Do** use pill shape (`rounded-full`) for anything interactive or status-like (buttons, nav, badges, chips) and reserve large-but-finite radii (`2xl`–`4xl`) for containers and imagery.
- **Do** tint shadows toward Signal Sky on primary-colored elements (Glow-Not-Gray Rule) rather than defaulting to neutral gray shadows.
- **Do** keep monospace type literal (real code/terminal/version strings only).

### Don't:
- **Don't** introduce hard, sharp-cornered components; the system has no straight-corner precedent outside literal code blocks.
- **Don't** use flat, un-elevated cards at rest — even resting cards carry at least an ambient shadow in this system.
- **Don't** add a second saturated accent hue alongside Signal Sky without a confirmed product reason; the One Accent Rule is load-bearing for the "single confident signal" feel.
- **Don't** use monospace or terminal chrome (window dots, `$` prompts) as decoration on components unrelated to code/systems content — it's a meaningful accent tied to the "low-level" positioning, not a generic texture.
