# Sadra Hoseinpour | Portfolio

https://sadra-s-website.vercel.app/

A personal portfolio website built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. Features a glassmorphism design with dark/light mode, bilingual support (English/Persian), and interactive animations.

## Features

- **Dark/Light theme** — persisted to `localStorage`, respects `prefers-color-scheme`
- **Bilingual EN / FA** — full RTL support for Persian, persisted preference
- **Interactive UI** — typewriter effect, scroll-triggered animations, 3D tilt cards, count-up stats, cursor glow
- **Contact form** — sends email via Resend API through a serverless function
- **Responsive** — mobile drawer nav, touch-device optimizations, safe-area support
- **Performance** — passive scroll listeners, `will-change` hints, intersection-based animations

## Tech Stack

| Tool                                         | Purpose                        |
| -------------------------------------------- | ------------------------------ |
| [React](https://react.dev) (v19)             | UI framework                   |
| [Vite](https://vite.dev) (v8)                | Build tool & dev server        |
| [Tailwind CSS](https://tailwindcss.com) (v4) | Styling                        |
| [Resend](https://resend.com)                 | Email API (contact form)       |
| [Vercel](https://vercel.com)                 | Hosting & serverless functions |
| [pnpm](https://pnpm.io)                      | Package manager                |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:5173)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
```

## Project Structure

```
src/
├── components/       # UI components (Navbar, Hero, About, Skills, Projects, Contact, etc.)
├── context/          # Theme & Language React contexts
├── hooks/            # Custom hooks (useCountUp, useInView, useTypewriter)
├── translations/     # en.json / fa.json locale files
├── App.jsx           # Root layout
├── main.jsx          # Entry point
└── index.css         # Global styles & Tailwind

api/
└── contact.js        # Vercel serverless function for contact form
```

## Environment Variables

| Variable         | Description                                    |
| ---------------- | ---------------------------------------------- |
| `RESEND_API_KEY` | Resend API key for contact form email delivery |

## Deployment

Deployed on **Vercel**. The `api/` directory is automatically deployed as serverless functions. Push to the default branch to trigger a production deploy, or use the Vercel CLI:

```bash
vercel --prod
```

## License

MIT
