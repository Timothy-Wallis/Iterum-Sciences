# Azurix Hub

**Azurix Hub** is the official web platform for Azurix — a company dedicated to delivering cutting-edge tools and resources for the biology and life sciences community. The platform serves educators, researchers, and laboratory teams with a suite of solutions designed to streamline workflows and support breakthrough discoveries.

---

## Overview

Azurix Hub provides a centralized interface for accessing biology-focused teaching materials, genomics software, and collaborative workspace features. The site is built as a lightweight, fully client-side web application with no external runtime dependencies.

---

## Features

- **Biology Tool Suite** — Direct access to tools including teaching materials and genomics software.
- **User Accounts** — Login and account management for personalized access.
- **Team Collaboration** — A dedicated collaboration dashboard for working with research teams.
- **Theme Support** — Light and dark mode with multiple color palette options, persisted across sessions via `localStorage`.
- **Responsive Design** — Mobile-friendly layout with a collapsible sidebar navigation.
- **No-Flash Theming** — Saved theme preferences are applied before the first paint to prevent a flash of unstyled content.

---

## Project Structure

```
Azurix-Hub-Website/
├── index.html              # Main landing page
├── styles.css              # Global stylesheet
├── app.js                  # Shared application logic (theming, sidebar)
├── script.js               # Page-specific scripts
├── assets/                 # Static assets (images, icons, etc.)
└── workspace/
    ├── account.html        # User account page
    └── collaboration.html  # Team collaboration dashboard
```

---

## Technology Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Markup     | HTML5                             |
| Styling    | CSS3 (custom properties, flexbox) |
| Scripting  | Vanilla JavaScript (ES6+)         |
| Hosting    | Vercel (linked tools)             |

---

## Getting Started

No build step is required. To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Timothy-Wallis/Azurix-Hub-Website.git
   ```
2. Open `index.html` in your browser, or serve the directory with any static file server:
   ```bash
   npx serve .
   ```

---

## Tools

| Tool                 | Description                                               | Link                                      |
|----------------------|-----------------------------------------------------------|-------------------------------------------|
| Teaching Materials   | Interactive resources for teaching biological systems     | [ecosystemsim.vercel.app](https://ecosystemsim.vercel.app/) |
| Genomics Software    | Advanced tools for genomic sequencing and analysis        | [genomics-portal.vercel.app](https://genomics-portal.vercel.app/) |

---

## Contact

For questions or support, please reach out at **timothywallis@ucmerced.edu**.

---

## License

© 2026 Azurix. All rights reserved. See [LICENSE](LICENSE) for details.
