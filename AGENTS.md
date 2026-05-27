# Seefood Shop

A seafood-themed e-commerce web application built with Node.js and Express.

## Cursor Cloud specific instructions

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Dev server | `npm run dev` | 3000 | Uses `--watch` for auto-reload on file changes |

### Key commands

- **Dev server**: `npm run dev` (auto-restarts on file changes)
- **Lint**: `npm run lint` (ESLint with flat config)
- **Tests**: `npm test` (Node.js built-in test runner, no extra test framework needed)
- **Start (production)**: `npm start`

### Architecture

- `src/server.js` — Express app entry point (only binds port when run directly, not when imported for tests)
- `src/routes/api.js` — REST API routes (menu, cart, checkout)
- `src/data/menu.js` — In-memory menu data
- `public/index.html` — Single-page frontend (vanilla JS)
- `eslint.config.js` — ESLint flat config (ES module format, sources are CommonJS)

### Non-obvious notes

- The ESLint config uses ES module syntax (`export default`) but the source code is CommonJS. This is intentional and works with ESLint 9 flat config.
- Tests use Node.js built-in `node:test` module — no Jest/Mocha/Vitest needed.
- The server module guards `app.listen()` behind `require.main === module` so tests can import the app without binding port 3000.
- Cart state is in-memory (resets on server restart).
