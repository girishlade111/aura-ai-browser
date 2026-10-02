# Aura AI Browser

A sleek, AI-powered web browser interface built with React — a polished browser UI mockup/prototype with tab management, a smart address bar, bookmarks, and an integrated AI assistant panel. Originally prototyped with Lovable.

## Features

- **Multi-tab browsing UI** — open, switch, and manage browser tabs
- **Address bar** — enter URLs with quick navigation
- **Navigation controls** — back, forward, reload actions
- **Bookmark bar** — save and access bookmarked sites
- **AI assistant panel** — built-in AI companion sidebar
- **Theme support** — light / dark / system themes
- **Modern component library** — shadcn/ui + Radix UI primitives

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite 5
- **Styling:** Tailwind CSS + tailwindcss-animate
- **UI components:** shadcn/ui (Radix UI primitives)
- **Routing:** react-router-dom
- **State/data:** TanStack React Query
- **Forms:** react-hook-form + zod
- **Icons:** lucide-react

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

No environment variables are required — the app is fully client-side.

## Project Structure

```
├── index.html
├── public/                 # Static assets
├── src/
│   ├── main.tsx            # App entry point
│   ├── App.tsx             # Router + providers
│   ├── pages/
│   │   ├── Index.tsx       # Main browser page
│   │   └── NotFound.tsx    # 404 page
│   ├── components/
│   │   ├── browser/        # Browser UI: tabs, address bar, bookmarks,
│   │   │                   # navigation controls, AI assistant
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/
│   └── lib/
├── tailwind.config.ts
└── vite.config.ts
```

## Deploy

The production build outputs to `dist/` and can be hosted on any static host (Cloudflare Pages, Netlify, GitHub Pages):

```bash
npm run build   # dist/
```

## Author

Built by Girish Lade — [ladestack.in](https://ladestack.in)
