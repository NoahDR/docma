# AutoSaaS Frontend

Multi-locale Next.js 16 marketing and auth preview for AutoSaaS. The app is App Router based, statically prerendered, and serves localized routes under `/de`, `/en`, `/it`, and `/fr`.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
npm run clean
npx -y react-doctor@latest .
```

## Runtime Notes

- Requires Node.js `>=20.9.0` and uses `npm@11.7.0`.
- Root traffic redirects permanently from `/` to `/de`.
- Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin if you want fully-qualified metadata URLs.
- Conservative runtime headers are configured in [next.config.ts](/Users/reinbold/dev/frontend-1/next.config.ts).

## Structure

- [src/app](/Users/reinbold/dev/frontend-1/src/app): App Router layouts, routes, global styles, and metadata.
- [src/components](/Users/reinbold/dev/frontend-1/src/components): reusable UI, layout, and section components.
- [src/lib](/Users/reinbold/dev/frontend-1/src/lib): locale helpers, shared utilities, and server-only dictionary access.
- [messages](/Users/reinbold/dev/frontend-1/messages): locale-specific copy.
