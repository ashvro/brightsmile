# BrightSmile Dental

Marketing site for BrightSmile Dental — React 19 + Vite, client-side routing, scroll animations, and a responsive mobile navbar.

## Stack

- React 19, Vite 8
- React Router 7
- Framer Motion, react-icons, react-scroll
- oxlint

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run lint       # oxlint
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Structure

```
src/
  main.jsx            entry
  App.jsx             routes + layout shell
  styles/index.css    global styles & design tokens
  assets/             images
  components/
    layout/           Navbar, Footer, FloatingContact, PageHero, Reveal
    sections/         page sections (Hero, Services, About, FAQ, …)
  pages/              route components composing sections
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services |
| `/about-us` | About |
| `/testimonials` | Testimonials |
| `/faq` | FAQ |
| `/contact` | Contact |

SPA fallback for client-side routes is configured in `vercel.json`.
