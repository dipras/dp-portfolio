# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is freelance/contract clients evaluating Aldy "Dipras" Prastyo for project work — people who need a full-stack developer comfortable across web, mobile, and low-level systems and are deciding whether to reach out. Full-time recruiters may also view the site, but freelance/contract acquisition is the primary job the site does.

## Product Purpose

A personal portfolio site for Aldy Prastyo (Dipras), a full-stack and systems-leaning developer. It exists to establish credibility and prompt a contact/inquiry from a prospective freelance client, showcasing background, real work history, and technical range.

## Positioning

The combination of full-stack web/mobile delivery experience (React, React Native, PHP, Node.js/NestJS) with genuine low-level systems interest (C, Linux internals, kernel/memory work) — a "ships production apps and understands what's happening under the hood" profile, not just a web-only or systems-only developer.

## Operating Context

- Deployed as a statically exported Next.js site (`output: export`) to GitHub Pages with a custom domain (`public/CNAME`), via GitHub Actions (`.github/workflows/deploy.yml`).
- Pages: Home (`/`), About (`/about`), Projects (`/projects`), Blog (`/blog`), Contact (`/contact`).
- Resume/CV is a static downloadable asset (`public/aldy_prastyo.pdf`), linked from the Navbar and About page.
- Contact page currently ships a form with no backend wired up (static export has no server to submit to) — a functional constraint future work must account for.

## Capabilities and Constraints

- Static export only: no server-side rendering, API routes, or form backend at present. Any "Send Message" functionality needs a third-party or serverless form handler to actually work.
- Terminology: goes by "Aldy Prastyo" formally, "Dipras" informally/as the brand name (used in Navbar title and site metadata).
- Undecided: whether/how the Contact form becomes functional; whether Blog is a real content channel or placeholder (not yet confirmed).

## Brand Commitments

- Name/handle: Aldy Prastyo, aka "Dipras."
- Contact: dipras75@gmail.com.
- Profiles: GitHub (github.com/dipras), LinkedIn (linkedin.com/in/aldy-prastyo).
- Personal voice touch: "i use Arch btw" line on the homepage — a deliberate identity signal, not filler.

## Evidence on Hand

- Real, confirmed facts (from About page, treated as source of truth): current role as Fullstack Developer at Export Expert Indonesia (2024–present); prior roles at Web Programming Unpas (community moderator, 2022–2024), Aspenku (2022–2024), KPMI (WordPress developer, 2020–2022), Mars Digital (backend developer, Oct 2019–Jan 2020), Pojokan.io (2018–2019); education at Telkom University Surabaya (Software Engineering, present) and SMKN 1 Karanganyar (Computer & Network Engineering, graduated); certifications: LFCS (Linux Foundation), AWS Certified Developer, Cisco CCNA.
- **Not real — placeholders to replace:** the Projects page entries (Kernel Module Monitor, E-Commerce Dashboard, Crypto Wallet Mobile, Auto-Backup Script, Custom Memory Allocator) are stand-in content with generated/stock images and dead `#` links. Future work must not treat these as real case studies, testimonials, or shipped work — they need to be replaced with actual project data, screenshots, and links, or explicitly marked as coming soon.
- Blog page content status not yet confirmed as real vs. placeholder.

## Product Principles

1. Every claim of real work must be traceable to the About page's confirmed history until Projects is populated with verified case studies — never fabricate client names, metrics, or testimonials.
2. Design and copy should keep pulling the "full-stack + low-level systems" duality forward as the differentiator, not flatten it into a generic "full-stack developer" story.
3. Because the primary goal is freelance/contract acquisition, the path to contact (Contact page, email, resume download) should stay prominent and low-friction across all pages.
4. Respect the static-export constraint: don't design features (forms, dynamic content) that imply a backend that doesn't exist without flagging the need for one.

## Accessibility & Inclusion

No product-specific accessibility requirement established yet.
