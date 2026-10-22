# Iterum Sciences

[![Live Demo](https://img.shields.io/badge/Live--Demo-iterum--sciences.vercel.app-neongreen)](https://iterum-sciences.vercel.app)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)

Iterum Sciences is a Vite + React + TypeScript web platform for educational tools, research content, and interactive client-side experiences.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- ESLint
- Supabase Auth (`@supabase/supabase-js`)
- Vercel Analytics + Speed Insights

## Project Structure (recursive)

```text
Iterum-Sciences/
├── index.html                     # Vite HTML entry
├── styles.css                     # Global site styles
├── loadingStyle.css               # Shared loading indicator styles
├── public/
│   ├── background-image.png
│   ├── favicon.jpg
│   └── icons.svg
├── src/
│   ├── main.tsx                   # React mount + analytics providers
│   ├── App.tsx                    # Root app state/navigation shell
│   ├── Home.tsx                   # Main landing/home app section
│   ├── Settings.tsx               # Settings app section
│   ├── Login.tsx                  # Email/password + OAuth login app section
│   ├── SignUp.tsx                 # Signup + OAuth app section
│   ├── supabase.ts                # Supabase client setup
│   ├── App.css
│   ├── index.css
│   ├── login.css
│   ├── signup.scss
│   ├── assets/
│   │   ├── FullHeader.tsx
│   │   ├── Header.tsx
│   │   ├── MobileOverlay.tsx
│   │   ├── SideBarNav.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── ToolSelection.tsx
│   │   ├── ToolCard.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Research.tsx
│   │   ├── Footer.tsx
│   │   ├── Scripts.tsx
│   │   ├── SpanComp.tsx
│   │   ├── app.js
│   │   ├── script.js
│   │   └── appComponents/
│   │       ├── ColorSelector.tsx
│   │       ├── Warning.tsx
│   │       └── Warning.css
│   └── iframe-game-pkgs/
│       ├── Engine.ts
│       ├── Canvas.ts
│       ├── Camera.ts
│       ├── Entity.ts
│       ├── EntityManager.ts
│       ├── TextureManager.ts
│       └── Vec2.ts
├── package.json
├── package-lock.json
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## App-level Architecture

### `src/main.tsx`
- Boots React into `#root`.
- Loads global styles.
- Mounts `App`, `Analytics`, and `SpeedInsights`.

### `src/App.tsx`
- Core page-state controller (`home`, `settings`, `signup`/auth views).
- Lazy loads route sections (`Home`, `Settings`, `SignUp`).
- Handles responsive sidebar behavior.
- Imports legacy DOM behavior modules (`src/assets/app.js`, `src/assets/script.js`) at runtime.

### `src/Home.tsx`
- Composes content sections from `src/assets/*`:
  - Header/navigation
  - Hero + About
  - Tool and research sections
  - Footer

### `src/Settings.tsx`
- Lightweight settings surface with shared header/navigation controls.

### `src/Login.tsx` and `src/SignUp.tsx`
- Supabase authentication flows:
  - Email/password auth
  - OAuth providers (Google/GitHub)
  - Shared warning/error UI from `src/assets/appComponents/Warning.tsx`

## New Game Engine (`src/iframe-game-pkgs`) - How it works

The engine package is a modular 2D rendering pipeline designed for iframe/embedded game content.

### Module responsibilities

- `Vec2.ts`  
  Generic two-value vector used for positions and movement.

- `Canvas.ts`  
  Creates and owns an HTML canvas, validates `2d` context access, and exposes width/height/context getters.

- `Camera.ts`  
  Stores camera origin, render view, and movement speed. Engine updates origin every frame.

- `Entity.ts`  
  Renderable object containing position, dimensions, and an `ImageBitmap` sprite. Supports movement via vector offset.

- `EntityManager.ts`  
  Central entity registry for add/get/list operations used by the renderer loop.

- `TextureManager.ts`  
  Async texture loader/cache:
  - load from URL (cached by key)
  - create texture from an existing canvas
  - fetch cached texture
  - clear cached bitmaps

- `Engine.ts`  
  Main loop controller:
  - configures target frame timing from FPS
  - attaches `Canvas`, `EntityManager`, and optional `Camera`
  - starts async render loop
  - clears frame, runs callback, draws entities, enforces frame pacing
  - supports graceful stop via `stop()`

### Engine runtime flow

1. Create `Canvas`, `EntityManager`, and `Engine`.
2. Attach canvas and entity manager to engine.
3. Optionally attach a camera (or engine falls back to a default camera).
4. Load/create textures through `TextureManager`.
5. Create `Entity` objects and register them in `EntityManager`.
6. Start `engine.start(callback)`:
   - applies camera translation
   - updates camera origin using camera speed
   - clears frame
   - runs your callback for per-frame logic
   - renders each entity sprite
   - waits remaining frame budget to maintain target FPS

## Local Development

```bash
npm install
npm run dev
```

### Build / Lint / Preview

```bash
npm run lint
npm run build
npm run preview
```

## Contact

For questions or concerns, reach out at **timothywallis@ucmerced.edu**.

## License

Licensed under Apache-2.0. See [LICENSE](LICENSE).
