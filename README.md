# NEXUP


### The marketplace for what's next.


A dark, editorial-style frontend for buying, selling, and pitching digital ventures.
Built with plain HTML, CSS, and JavaScript. No frameworks, no build step, no backend.

![Status](https://img.shields.io/badge/status-archived-lightgrey)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-8FF5D1)

</div>

---

## Table of Contents

1. [Overview](#overview)
2. [Project Status](#project-status)
3. [Pages and Features](#pages-and-features)
4. [How It Works](#how-it-works)
5. [Design System](#design-system)
6. [Tech Stack](#tech-stack)
7. [Project Structure](#project-structure)
8. [Getting Started](#getting-started)
9. [Deploying to GitHub Pages](#deploying-to-github-pages)
10. [Known Limitations](#known-limitations)
11. [Possible Future Work](#possible-future-work)
12. [Authors](#authors)
13. [License](#license)

---

## Overview

NEXUP is a frontend prototype of a **marketplace for early-stage digital ventures**: AI tools, SaaS products, games, e-commerce platforms, apps, and startups. A seller lists a venture with its revenue, growth, and asking price. A buyer or investor browses the marketplace, reads the pitch, opens the full venture page, and saves the ones they care about.

The project is built around **visual design and interaction**. It uses a near-black theme, mint and gold accents, large editorial typography, and subtle motion, so it feels closer to a magazine than to a typical listings site.

### Who it is for

| Audience | What they can do |
| :--- | :--- |
| **Visitors** | Explore the landing page, read founder pitches, and search ventures |
| **Buyers / investors** | Filter and sort the marketplace, open venture and pitch pages, save favourites |
| **Sellers / founders** | Fill in a listing form and see a live preview of how the listing will look |

---

## Project Status

> **Development has stopped.** This repository is an archive of the frontend work.

Everything described below runs locally in the browser. It is a prototype: all venture data is demo data written directly into the JavaScript files, and nothing is stored on a server. See [Known Limitations](#known-limitations) for what is unfinished.

---

## Pages and Features

NEXUP has six pages. Each page has its own HTML, CSS, and JavaScript file.

| Page | Purpose | Files |
| :--- | :--- | :--- |
| **Home** | Landing page, pitch carousel, trending ventures, categories, global search | `HTML/home2.html` · `CSS/home2.css` · `JS/home2.js` |
| **Marketplace** | Browse, search, filter, and sort ventures | `HTML/marketplace.html` · `CSS/marketplace.css` · `JS/marketplace.js` |
| **Venture** | Full details of one venture | `HTML/venture.html` · `CSS/venture.css` · `JS/venture.js` |
| **Pitch** | A long-form, story-style pitch for one venture | `HTML/pitch.html` · `CSS/pitch.css` · `JS/pitch.js` |
| **Sell** | Listing form with live preview | `HTML/sell.html` · `CSS/sell.css` · `JS/sell.js` |
| **Favorites** | Ventures the user has saved | `HTML/favorites.html` · `CSS/favorites.css` · `JS/favorites.js` |

### Home

- Hero section with a mouse-driven parallax effect and an interactive "spatial field" that follows the cursor
- **Pitch carousel** with five founder pitches, previous/next controls, and a counter (`01 — 05`)
- **Trending ventures**, ranked by growth, each with a favourite toggle
- **Category shortcuts** for AI, SaaS, Gaming, E-Commerce, Apps, and Startup
- **Global search overlay**: press `/` to open it and `Esc` to close it. It searches venture name, category, description, and seller, and shows a "Nothing found" message when there are no matches
- Live favourites counter in the navigation bar
- Navigation highlights the current section as you scroll

### Marketplace

- **Nine demo ventures** shown as cards with revenue, growth, price, views, and a verified badge
- **Category tabs:** All, AI, SaaS, Gaming, E-Commerce, Apps, Startup
- **Quick filters:** All, High growth (100% or more), Under $50K, Verified only
- **Sorting:** Featured, Growth, Price (low to high), Price (high to low)
- **Search** across name, category, description, pitch, and seller
- **Featured carousel** with dot navigation and its own favourite button
- Result counter, an empty state, and a reset button
- Clicking a card opens its venture page; the pitch button opens its pitch page
- Cards fade in as they scroll into view

### Venture

- Loads a venture from the URL, for example `venture.html?id=2`
- Shows the name, category, seller, verification status, asking price, revenue, growth, views, a headline, and a long description
- Deal summary panel and a seller card with an initials avatar
- Favourite button that stays in sync with the rest of the site
- Shows a clear error state for a missing or invalid ID instead of silently loading the wrong venture

### Pitch

- Loads a venture from the URL, for example `pitch.html?id=1`
- Story layout with hero, opportunity, problem, solution, traction, seller, and closing sections
- Scroll-reveal animations and an image parallax effect
- **Share** button (uses the native share sheet when available, otherwise copies the link) and a **Contact** button, both with toast notifications

### Sell

- Form fields for venture name, category, tagline, description, revenue, growth, asking price, founder name, and founder role
- **Live preview card** that updates as you type
- Image upload with instant preview and a remove button
- Character counter on the description
- Validation on publish (name, category, and description are required)

### Favorites

- Lists every venture the user has saved, with the count shown in the header
- Remove individual ventures, or open one to see its details
- Empty state with a prompt to go back to the marketplace
- **Cross-tab sync:** if you change favourites in another browser tab, this page updates automatically

---

## How It Works

### Favourites are saved in the browser

Favourites are stored in `localStorage` under one key, **`nexupFavorites`**, as a JSON array of venture IDs (for example `[1, 4, 6]`). Home, Marketplace, Venture, and Favorites all read and write the same key, so a heart you click on one page shows up everywhere.

### Pages share data through the URL

Marketplace cards link to the detail pages using a query string:

```
venture.html?id=3     →  full venture details
pitch.html?id=3       →  story-style pitch
```

### Demo data

There is no database. Each page that needs ventures defines its own `ventures` array at the top of its JavaScript file:

| File | Ventures |
| :--- | :--- |
| `JS/home2.js` | 6 |
| `JS/venture.js` | 6 |
| `JS/marketplace.js` | 9 |
| `JS/pitch.js` | 9 |
| `JS/favorites.js` | 9 |

The demo ventures are: NovaMind AI, FlowDesk, GameForge, UrbanCart, LearnMate, EcoDrive, PixelPilot, TaskOrbit, and QuickBite. All names, people, and figures are fictional.

---

## Design System

NEXUP uses a dark, editorial look with mint as the main accent and gold used sparingly. Each page defines its own colour variables in `:root`, built on the same palette.

### Core palette (Favorites page, the "Editorial Mint System")

| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--black` | `#080909` | Page background |
| `--black-soft` | `#0D0F0F` | Raised surfaces |
| `--black-card` | `#101313` | Cards and panels |
| `--white` | `#F5F7F5` | Primary text |
| `--white-soft` | `#DDE3DF` | Secondary text |
| `--muted` | `#89928D` | Supporting text |
| `--muted-dark` | `#626A66` | Captions and labels |
| `--mint` | `#8FF5D1` | Main accent |
| `--mint-soft` | `#C4FBE9` | Light accent |
| `--mint-dark` | `#4BC9A2` | Hover and emphasis |
| `--gold` | `#D9B85C` | Secondary accent |
| `--line` | `rgba(255,255,255,.11)` | Borders |
| `--max-width` | `1440px` | Content width |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` | Shared easing curve |

### Accent colour per page

| Page | Background | Accent |
| :--- | :--- | :--- |
| Home | `#050605` | `#b9f6d1` |
| Marketplace | `#050505` | `#9fffd0` |
| Pitch | `#050505` | `#9fffd0` |
| Sell | `#080909` | `#b8f3dc` (gold: `#d9b85c`) |
| Venture | `#080909` | `#b8f6dc` |
| Favorites | `#080909` | `#8FF5D1` (gold: `#D9B85C`) |

### Typography

| Page | Fonts |
| :--- | :--- |
| Home | IBM Plex Mono and Instrument Sans |
| Marketplace, Pitch, Sell | Manrope and Playfair Display (serif) |
| Venture, Favorites | Manrope |

All fonts are loaded from Google Fonts.

### Principles

- **Dark first:** near-black backgrounds with soft off-white text
- **Restrained accents:** mint highlights actions and key numbers, gold is used sparingly
- **Editorial feel:** large type, clear hierarchy, generous whitespace
- **Thin borders:** translucent hairlines separate sections instead of heavy boxes
- **Motion with purpose:** scroll reveals, parallax, and a shared easing curve

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Markup | HTML5 |
| Styling | CSS3 with custom properties |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` |
| Fonts | Google Fonts |
| Images | Unsplash (remote URLs) |
| Backend | None |
| Build tools / package manager | None |

Browser APIs used include `localStorage`, `URLSearchParams`, `IntersectionObserver`, `FileReader`, `requestAnimationFrame`, `navigator.share`, and `navigator.clipboard`.

**An internet connection is needed** for fonts and venture images.

---

## Project Structure

```text
NEXUP/
├── CSS/
│   ├── favorites.css
│   ├── home2.css
│   ├── marketplace.css
│   ├── pitch.css
│   ├── sell.css
│   └── venture.css
│
├── HTML/
│   ├── favorites.html      # Saved ventures
│   ├── home2.html          # Landing page (entry point)
│   ├── marketplace.html    # Browse, search, filter, sort
│   ├── pitch.html          # Story-style pitch (?id=)
│   ├── sell.html           # Listing form with live preview
│   └── venture.html        # Venture details (?id=)
│
├── JS/
│   ├── favorites.js
│   ├── home2.js
│   ├── marketplace.js
│   ├── pitch.js
│   ├── sell.js
│   └── venture.js
│
├── LICENSE
└── README.md
```

Each page follows the same pattern: `HTML/name.html` loads `CSS/name.css` and `JS/name.js`.

---

## Getting Started

### Requirements

- A modern browser (Chrome, Edge, Firefox, or Safari)
- Optional: [Visual Studio Code](https://code.visualstudio.com/) with the **Live Server** extension

### Run with Live Server (recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nexup.git
   ```
2. Open the `NEXUP` folder in VS Code.
3. Open `HTML/home2.html`.
4. Click **Go Live** in the bottom-right corner.

The site opens in your browser and refreshes whenever you save a file.

### Run without any tools

Open the `HTML` folder and double-click `home2.html`.

### Suggested tour

1. **Home:** try the pitch carousel, then press `/` to search
2. **Marketplace:** filter, sort, and favourite a few ventures
3. **Venture and Pitch:** open a card, then use its pitch button
4. **Favorites:** see your saved ventures
5. **Sell:** fill in the form and watch the preview update

---

## Deploying to GitHub Pages

Because the site is fully static, it can be hosted for free:

1. In your repository, go to **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then save.
4. After a minute, open `https://your-username.github.io/nexup/HTML/home2.html`.

GitHub Pages is **case-sensitive**, so file paths must match folder names exactly (`CSS`, `HTML`, `JS`).

---

## Known Limitations

This is an archived frontend prototype, so these parts are intentionally incomplete:

- **No backend or database.** Ventures are hard-coded demo data and the Sell form does not save anything. Clicking **Publish** only validates the fields and shows a confirmation message.
- **Not all pages exist.** Some navigation links point to pages that were never built: `pipeline.html` (Home), `profile.html` (Favorites and Venture), and `categories.html` (Venture). These links lead to a 404.
- **Category links on Home do not filter yet.** They open the Marketplace with a `?category=` value, but the Marketplace does not read it, so it shows all ventures.
- **Inconsistent data across pages.** Venture and Home include 6 ventures, while Marketplace, Pitch, and Favorites include 9. Opening one of the three extra ventures on the Venture page shows the invalid-ID state.
- **Missing local images.** `pitch.html` and `pitch.js` reference `assets/ventures/venture1.jpg` through `venture9.jpg`, but there is no `assets` folder in this repository.
- **Duplicated code.** Each page repeats its own copy of the venture data and favourites helpers instead of sharing them.
- **No accounts or payments.** There is no login, messaging, offer system, or checkout.
- **Requires internet** for fonts and Unsplash images.

---

## Possible Future Work

- Move venture data into a single shared file, then into a real database
- Add a backend (Node.js, Django, Firebase, or Supabase) so Sell actually saves listings
- Build the missing pages: pipeline, profile, and categories
- Read the `?category=` query on the Marketplace
- Add user accounts, seller profiles, and verification
- Add messaging and offers between buyers and sellers
- Add payments or escrow
- Add the local `assets/` images with a fallback when images fail to load
- Improve accessibility and test responsive layouts on more devices
- Add automated tests

---

## Authors

VEDANT BABAR AND YUVRAJ DESAI.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

<div align="center">

*NEXUP was a design and frontend project. Development has ended, and the code is preserved here as an archive.*

</div>
