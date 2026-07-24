This is a statically exported [Next.js](https://nextjs.org) portfolio.

## Content

Every post and project is versioned as an individual JSON file:

- `content/posts/<slug>.json`
- `content/projects/<slug>.json`

Run the local editor:

```bash
bun run content:studio
```

Then open `http://127.0.0.1:4173`. Saving an entry updates the appropriate JSON file. Review and commit that file as usual.

The editor can upload both thumbnail images and images inserted between content paragraphs. Uploaded assets are stored at:

- `public/uploads/posts/<slug>/thumbnail/`
- `public/uploads/posts/<slug>/content/`
- `public/uploads/projects/<slug>/thumbnail/`
- `public/uploads/projects/<slug>/content/`

The generated JSON stores their public URL (for example `/uploads/posts/my-post/content/diagram.webp`). Commit both the JSON and uploaded files.

`bun run build` validates the content, generates every `/blog/[slug]` and `/projects/[slug]` page, and writes the static site to `out/`. The GitHub Pages workflow deploys that directory; no production API or database is required.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
