This is a statically exported [Next.js](https://nextjs.org) portfolio.

## Content

Every post and project keeps its metadata in an individual JSON file:

- `content/posts/<slug>.json`
- `content/projects/<slug>.json`

Run the local editor:

```bash
bun run content:studio
```

Then open `http://127.0.0.1:4173`. The landing screen lets you search, create, and open articles or projects. Blog content is edited with a Quill WYSIWYG editor, while metadata lives in a collapsible drawer. Project bodies come from the `README.md` in their GitHub `sourceUrl`. Saving updates the appropriate JSON file; review and commit it as usual.

The Studio loads Tailwind Browser and Quill from their pinned CDN versions, so the editor requires an internet connection. The published portfolio does not use those CDN assets.

The editor can upload thumbnails and images inserted into blog posts. JPEG, PNG, WebP, GIF, and AVIF uploads are decoded and written as optimized WebP files before being referenced by JSON. Uploaded assets are stored at:

- `public/uploads/posts/<slug>/thumbnail/`
- `public/uploads/posts/<slug>/content/`
- `public/uploads/projects/<slug>/thumbnail/`

Post JSON stores sanitized rich content in `contentHtml`. Project JSON stores a GitHub repository root in `sourceUrl`; during the build its root `README.md` is fetched through `raw.githubusercontent.com`, relative links and images are resolved against the repository, and the Markdown is converted to sanitized HTML. Inline post images reference their public URL (for example `/uploads/posts/my-post/content/diagram.webp`). Commit local JSON and uploaded files as usual.

`bun run build` validates the content, fetches every published project README, generates every `/blog/[slug]` and `/projects/[slug]` page, and writes the static site to `out/`. A build therefore requires network access and fails clearly if a README cannot be fetched. The GitHub Pages workflow deploys the generated directory; visitors do not call GitHub at runtime, and no production API or database is required.

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
