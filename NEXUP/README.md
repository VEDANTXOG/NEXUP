<div align="center">

# NEXUP

### The marketplace for what's next.

A dark, editorial-style frontend for buying, selling, and pitching digital ventures.
Plain HTML, CSS, and JavaScript. No frameworks, no build step, no backend.

![Status](https://img.shields.io/badge/status-archived-lightgrey)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![Tests](https://img.shields.io/badge/e2e%20tests-24%20passing-8FF5D1)
![License](https://img.shields.io/badge/license-MIT-8FF5D1)

</div>

---

## Table of Contents

1. [Overview](#overview)
2. [Project Status](#project-status)
3. [Pages and Features](#pages-and-features)
4. [How It Works](#how-it-works)
5. [Quality](#quality)
6. [Design System](#design-system)
7. [Tech Stack](#tech-stack)
8. [Project Structure](#project-structure)
9. [Getting Started](#getting-started)
10. [Testing](#testing)
11. [Deploying to GitHub Pages](#deploying-to-github-pages)
12. [Known Limitations](#known-limitations)
13. [Possible Future Work](#possible-future-work)
14. [Authors](#authors)
15. [License](#license)

---

## Overview

NEXUP is a frontend prototype of a **marketplace for early-stage digital ventures**: AI tools, SaaS products, games, e-commerce platforms, apps, and startups. A seller lists a venture with its revenue, growth, and asking price. A buyer or investor browses the marketplace, reads the pitch, opens the full venture page, saves the ones they like, and tracks them through deal stages.

The project is built around **visual design and interaction**. It uses a near-black theme, mint and gold accents, large editorial typography, and subtle motion, so it feels closer to a magazine than to a typical listings site.

### Who it is for

| Audience | What they can do |
| :--- | :--- |
| **Visitors** | Explore the landing page, read founder pitches, and search ventures |
| **Buyers / investors** | Filter and sort the marketplace, open venture and pitch pages, save favourites, and track deals in a pipeline |
| **Sellers / founders** | List a venture with a live preview, and manage or delete their listings from a profile page |

---

## Project Status

> **Development has stopped.** This repository is an archive of the frontend work.

Everything described below runs in the browser. Nine fictional demo ventures ship with the project, and anything you create (listings, favourites, pipeline stages, your name) is saved in your own browser through `localStorage`. There is no server. See [Known Limitations](#known-limitations).

---

## Pages and Features

NEXUP has nine pages. Each page has its own HTML, CSS, and JavaScript file, and all of them share one data file and one helper file.

| Page | Purpose | Files |
| :--- | :--- | :--- |
| **Home** | Landing page, pitch carousel, trending ventures, categories, global search | `HTML/home2.html` · `CSS/home2.css` · `JS/home2.js` |
| **Marketplace** | Browse, search, filter, and sort ventures | `HTML/marketplace.html` · `CSS/marketplace.css` · `JS/marketplace.js` |
| **Venture** | Full details of one venture | `HTML/venture.html` · `CSS/venture.css` · `JS/venture.js` |
| **Pitch** | A long-form, story-style pitch for one venture | `HTML/pitch.html` · `CSS/pitch.css` · `JS/pitch.js` |
| **Sell** | Listing form with live preview, saves real listings | `HTML/sell.html` · `CSS/sell.css` · `JS/sell.js` |
| **Favorites** | Ventures the user has saved | `HTML/favorites.html` · `CSS/favorites.css` · `JS/favorites.js` |
| **Categories** | Every category with its venture count and average growth | `HTML/categories.html` · `JS/categories.js` |
| **Pipeline** | Move saved ventures through deal stages | `HTML/pipeline.html` · `JS/pipeline.js` |
| **Profile** | Display name, your listings, and browser data controls | `HTML/profile.html` · `JS/profile.js` |

Categories, Pipeline, and Profile reuse the Favorites styles and add `CSS/pages.css`.

### Home

- Hero with a mouse-driven parallax and an interactive "spatial field" that follows the cursor. The animation only runs while there is movement to catch up with, and is switched off for people who prefer reduced motion
- **Pitch carousel** with five founder pitches, previous and next controls, and a counter
- **Trending ventures:** the six fastest-growing ventures, each with a favourite toggle
- **Category shortcuts** that open the Marketplace already filtered
- **Global search overlay:** press `/` to open it and `Esc` to close it. It searches name, category, description, and seller
- Live favourites counter in the navigation bar

### Marketplace

- Every venture as a card with revenue, growth, price, views, and a verified badge. Ventures you list on the Sell page appear here too
- **Category tabs** for every category a venture can be listed under
- **Quick filters:** All, High growth (100% or more), Under $50K, Verified only
- **Sorting:** Featured, Growth, Price (low to high), Price (high to low)
- **Search** across name, category, description, pitch, and seller. Press `/` or `Ctrl+K` to jump to it
- **Featured carousel** with dot navigation and its own favourite button
- **Deep links:** `marketplace.html?category=AI`, `?q=flow`, and `?focus=search`
- Result counter, an empty state, and a reset button
- Click a card to open the venture, or use the pitch button to read its pitch

### Venture

- Loads a venture from the URL, for example `venture.html?id=2`
- Shows the name, category, seller, verification status, asking price, revenue, growth, views, a headline, and a long description
- Deal summary panel and a seller card with an initials avatar
- Favourite button that stays in sync with the rest of the site
- A clear not-found state for an unknown ID

### Pitch

- Loads a venture from the URL, for example `pitch.html?id=1`
- Story layout: hero, opportunity, problem, solution, traction, seller, and closing sections
- Scroll-reveal animations and an image parallax
- **Share** button (native share sheet, or copies the link) and a **Contact** button, both with toast messages
- **View venture** button and `Esc` to go back
- A clear not-found state for an unknown ID

### Sell

- Fields for venture name, category, tagline, description, revenue, growth, asking price, founder name, and founder role
- **Live preview card** that updates as you type
- Image upload with preview. The picture is shrunk to a 900 px JPEG before it is stored so it fits in browser storage
- Validation for name, category, and description
- **Publish saves the listing** and opens its venture page. It then appears in the Marketplace, Categories, search, Favorites, and Profile

### Favorites

- Every saved venture, with the count in the header
- Remove individual ventures, or open one to see its details
- Empty state with a prompt to go back to the Marketplace
- **Cross-tab sync:** changes made in another browser tab appear automatically

### Categories

- One card per category, with the number of ventures and their average growth
- Opens the Marketplace already filtered to that category

### Pipeline

- Four stages: **Saved, Researching, In talks, Offer made**
- Every favourite appears on the board. Change its stage with the dropdown, or **Drop** it to remove it from your favourites
- Stages are remembered between visits and work with the keyboard

### Profile

- Display name, saved in the browser. Its first letter appears on the Profile button in the header
- Live stats: saved ventures, ventures in talks or offers, and ventures you have listed
- List of your own listings, each with a delete button
- **Clear all NEXUP data** with a two-click confirmation

---

## How It Works

### Load order

Every page loads three scripts in the same order:

```
data.js    →   shared.js    →   <page>.js
the data       the helpers      the page's own logic
```

`data.js` holds all demo content once. `shared.js` builds one `window.NEXUP` object that every page reads from.

### Shared data

All ventures, founder pitch cards, and categories live in `JS/data.js`. Change a venture there and every page updates. User listings are merged on top of that catalogue when a page loads.

### What `shared.js` provides

| API | What it does |
| :--- | :--- |
| `NEXUP.ventures`, `NEXUP.byId(id)` | The full catalogue (demo ventures plus your listings) |
| `NEXUP.favorites` | `ids()`, `has()`, `toggle()`, `remove()`, `count()`, `onChange()` |
| `NEXUP.listings` | `all()`, `add()`, `remove()` |
| `NEXUP.profile` | `name()`, `setName()`, `initial()` |
| `NEXUP.fmt` | `money()`, `revenue()`, `growth()`, `views()` |
| `NEXUP.escapeHtml()` | Escapes text before it goes into `innerHTML` |
| `NEXUP.toast()` | Small confirmation message |
| `NEXUP.storage` | `localStorage` wrapper that never throws |

It also keeps the "Saved" counter and the profile letter correct on every page, and replaces any image that fails to load with a branded placeholder.

### What is stored in the browser

| Key | Contents |
| :--- | :--- |
| `nexupFavorites` | Array of saved venture ids, for example `[1, 4, 6]` |
| `nexupListings` | Ventures created on the Sell page |
| `nexupPipeline` | Pipeline stage per venture id |
| `nexupProfile` | Display name |

An older build saved Marketplace hearts under `nexupMarketplaceFavorites`. That key is merged into `nexupFavorites` automatically the first time a page loads.

### Pages talk to each other through the URL

```
venture.html?id=3                       full venture details
pitch.html?id=3                         story-style pitch
marketplace.html?category=AI            filtered marketplace
marketplace.html?q=flow                 pre-filled search
```

### Demo data

The demo ventures are NovaMind AI, FlowDesk, GameForge, UrbanCart, LearnMate, EcoDrive, PixelPilot, TaskOrbit, and QuickBite. All names, people, and figures are fictional.

---

## Quality

### Security

- Every value that reaches `innerHTML` goes through `NEXUP.escapeHtml()`. This matters because listings contain text typed by a user. A test submits `<b>` tags and `<img onerror>` payloads and checks that nothing runs
- All storage reads and writes are guarded, so blocked or full storage cannot crash a page

### Accessibility

- A **skip link** and a labelled main area on every page
- Visible **keyboard focus** on every interactive element
- Cards that act as links can be opened with `Enter` or `Space`
- Form controls and icon buttons carry labels
- `prefers-reduced-motion` is honoured in CSS and in the animation loops

### Performance and resilience

- Animation loops stop when nothing is moving instead of running every frame
- Images are lazy-loaded, and a failed image falls back to a placeholder
- Unknown venture ids show a clear not-found state instead of loading the wrong venture

### Code organisation

- One data file and one helper file, instead of copies in every page
- No duplicated favourites logic, toast code, or formatters
- Consistent formatting across all scripts, with section banners in every file

---

## Design System

NEXUP uses a dark, editorial look with mint as the main accent and gold used sparingly. Each page defines its own colour variables in `:root`, built on the same palette.

### Core palette (the "Editorial Mint System")

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
| Marketplace, Pitch | `#050505` | `#9fffd0` |
| Sell | `#080909` | `#b8f3dc` (gold: `#d9b85c`) |
| Venture | `#080909` | `#b8f6dc` |
| Favorites, Categories, Pipeline, Profile | `#080909` | `#8FF5D1` (gold: `#D9B85C`) |

### Typography

| Page | Fonts |
| :--- | :--- |
| Home | IBM Plex Mono and Instrument Sans |
| Marketplace, Pitch, Sell | Manrope and Playfair Display (serif) |
| Venture, Favorites, Categories, Pipeline, Profile | Manrope |

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
| Logic | Vanilla JavaScript (ES2020+) |
| Storage | Browser `localStorage` |
| Fonts | Google Fonts |
| Images | Unsplash (remote URLs) |
| Backend | None |
| Build tools | None |
| Tests | Node.js script and [Playwright](https://playwright.dev) (development only) |

Browser APIs used include `localStorage`, `URLSearchParams`, `IntersectionObserver`, `FileReader`, `canvas`, `requestAnimationFrame`, `navigator.share`, and `navigator.clipboard`.

**An internet connection is needed** for fonts and venture images. Without it, the site still works and shows placeholders.

---

## Project Structure

```text
NEXUP/
├── index.html               # Redirects to HTML/home2.html (for GitHub Pages)
│
├── HTML/
│   ├── home2.html           # Landing page (main entry point)
│   ├── marketplace.html     # Browse, search, filter, sort
│   ├── venture.html         # Venture details (?id=)
│   ├── pitch.html           # Story-style pitch (?id=)
│   ├── sell.html            # Listing form with live preview
│   ├── favorites.html       # Saved ventures
│   ├── categories.html      # Browse by category
│   ├── pipeline.html        # Deal-stage board
│   └── profile.html         # Name, listings, data controls
│
├── JS/
│   ├── data.js              # All demo content, in one place
│   ├── shared.js            # Storage, favourites, listings, formatting, escaping
│   ├── home2.js
│   ├── marketplace.js
│   ├── venture.js
│   ├── pitch.js
│   ├── sell.js
│   ├── favorites.js
│   ├── categories.js
│   ├── pipeline.js
│   └── profile.js
│
├── CSS/
│   ├── base.css             # Focus, skip link, reduced motion (every page)
│   ├── pages.css            # Categories, Pipeline, Profile
│   ├── home2.css
│   ├── marketplace.css
│   ├── venture.css
│   ├── pitch.css
│   ├── sell.css
│   └── favorites.css
│
├── tools/
│   └── check.mjs            # Link, script-order, and data checks (no dependencies)
├── tests/
│   └── e2e.mjs              # 24 browser tests (Playwright)
│
├── package.json
├── .editorconfig
├── .gitattributes
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

### Requirements

- A modern browser (Chrome, Edge, Firefox, or Safari)
- Optional: [Visual Studio Code](https://code.visualstudio.com/) with the **Live Server** extension

### Run with Live Server (recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/VEDANTXOG/NEXUP.git
   ```
2. Open the `NEXUP` folder in VS Code.
3. Open `HTML/home2.html`.
4. Click **Go Live** in the bottom-right corner.

The site opens in your browser and refreshes whenever you save a file.

### Run without any tools

Open the `HTML` folder and double-click `home2.html`.

### Suggested tour

1. **Home:** try the pitch carousel, then press `/` to search
2. **Marketplace:** filter, sort, and save a few ventures
3. **Pipeline:** move a saved venture to "In talks"
4. **Sell:** list your own venture and watch the live preview
5. **Profile:** see your stats and delete the listing again

---

## Testing

Two checks are included, and neither is needed to run the site.

**Quick check (no install).** Verifies that every link and file path resolves with the exact letter case, every script parses, every page loads `data.js` and `shared.js` first, and the demo data is consistent:

```bash
node tools/check.mjs
```

**Browser tests.** Opens all nine pages in Chromium and runs 24 checks: pages load without errors, filters and deep links, search and HTML escaping, the favourites-to-pipeline-to-profile flow, publishing and deleting a listing, and not-found states.

```bash
npm install
npx playwright install chromium
npm test
```

---

## Deploying to GitHub Pages

Because the site is fully static, it can be hosted for free:

1. In your repository, go to **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then save.
4. After a minute, open `https://vedantxog.github.io/NEXUP/`. The root `index.html` sends visitors to the home page.

GitHub Pages is case-sensitive. `node tools/check.mjs` confirms every path matches its folder name before you push.

---

## Known Limitations

This is an archived frontend prototype, so some things are intentionally out of scope:

- **No backend or database.** Listings, favourites, and pipeline stages live in the visitor's own browser. They are not shared between devices or people, and clearing browser data removes them.
- **No accounts, messaging, or payments.** The Contact button shows a placeholder message, and there is no login, offer system, or checkout.
- **Demo content.** The nine ventures and their figures are fictional.
- **Needs internet for fonts and venture images.** Offline, text and layout still work and images become placeholders.
- **Uploaded listing images are stored in the browser.** They are shrunk to fit, but browser storage is limited, and a listing falls back to no image if storage is full.
- **Not production-hardened.** There is no server-side validation, which a real marketplace would need.

---

## Possible Future Work

- Add a backend (Node.js, Django, Firebase, or Supabase) so listings are shared between users
- Add user accounts, seller profiles, and verification
- Add a messaging and offers system between buyers and sellers
- Add payments or escrow
- Move the demo data behind an API, which `data.js` is already shaped for
- Add a service worker so the site works fully offline
- Expand the test suite with visual regression checks

---

## Authors

| Name | Role |
| :--- | :--- |
| **VEDANTXOG** | Developer |
| **NEXUP co-founder** | Co-founder and developer |

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

<div align="center">

*NEXUP was a design and frontend project. Development has ended, and the code is preserved here as an archive.*

</div>
