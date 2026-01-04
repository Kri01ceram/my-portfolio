\
# Krishna Singh — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38b2ac?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Modern personal portfolio built with Next.js App Router, Tailwind CSS, shadcn/ui + Radix primitives, and Framer Motion.

## Highlights

- Single-page home with section-based navigation (smooth scrolling)
- Dedicated pages for hiring and projects by domain
- Data-driven content (projects/experience/education/social links live in `lib/`)
- Responsive layout + motion polish

## Pages & Routes

- `/` — Home (Hero, Experience, Projects, Education, Contact)
- `/projects` — Choose a domain
- `/projects/web` and `/projects/ml` — Projects grouped by category
- `/hire` — “Work With Me” + project inquiry form

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS, shadcn/ui (New York), Radix UI, Lucide icons
- **Animation:** Framer Motion
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js (recommended: Node 18.18+)
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:3000

## Scripts

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build (Turbopack)
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Customization Guide

Most site content is intentionally easy to edit.

### 1) Update your profile + hero content

- Edit the `PROFILE` object in [components/hero.tsx](components/hero.tsx)

### 2) Update social links

- Edit [lib/social.ts](lib/social.ts)

### 3) Update projects

- Edit [lib/projects.ts](lib/projects.ts)
- Projects are split by:
	- `domain`: `web` | `ml`
	- `category`: `valuable` | `practice` | `scaled`

### 4) Update experience & education

- Experience: [lib/experience.ts](lib/experience.ts)
- Education + certifications: [lib/education.ts](lib/education.ts)

### 5) SEO / Site metadata

- Update the site title/description/open graph fields in [app/layout.tsx](app/layout.tsx)
	- Tip: replace the placeholder Open Graph `url` with your actual domain.

### 6) Resume / assets

- The site links to `/resume.pdf` from the hero and `/hire` page.
	- Put your PDF at `public/resume.pdf`.
- Images belong in `public/images/`.

## Notes

- The `/hire` page includes a UI-only inquiry form (no backend action wired by default).
- The site is styled in a dark-first way (the root `<html>` is set to `className="dark"`).

## Deployment

- **Vercel** is the simplest option for Next.js.
	- Build command: `npm run build`
	- Output: Next.js default

## Project Structure

```text
app/                  # Routes (App Router)
components/           # Page sections + UI building blocks
components/ui/        # shadcn/ui components
lib/                  # Content/data (projects, experience, education, socials)
public/               # Static assets (resume.pdf, images)
```

## License

No license file is currently included. Add a `LICENSE` if you want this repository to be reusable by others.
