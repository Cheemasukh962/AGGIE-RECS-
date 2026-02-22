# Deployment Guide

This project is a Vite + React app. Use the steps below to build and ship it.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ (comes with Node)

## One-time setup
1) Install dependencies:
   - `npm install`

## Local checks
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview built files locally: `npx vite preview`

## Production deploy (static hosting)
1) Build: `npm run build`
2) The output is in `dist/`. Serve that folder with any static host/CDN.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output/public directory: `dist`

### GitHub Pages (or any static file server)
- Build with `npm run build`
- Upload the `dist/` contents to your static host.
- If deploying under a subpath, set `base` in `vite.config.ts` to that subpath before building.

## Environment variables
- None required for the current app. If you add any, remember to expose them with Vite's `VITE_` prefix and configure them in your hosting provider.
