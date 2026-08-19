# Development Guide

## Database Setup with Cloudflare D1

This project uses Cloudflare D1 (SQLite) for the database.

### Development with Remote Bindings

The project is configured to use **remote bindings** in `wrangler.jsonc`, which means when you run `npm run dev`, it connects to your actual Cloudflare D1 database (not a local copy).

#### Prerequisites

1. **Authenticate with Cloudflare** (first time only):
   ```bash
   npx wrangler login
   ```

2. **Verify you have access** to the D1 database:
   ```bash
   npx wrangler d1 info humam-contact-db
   ```

### Running the Development Server

Simply run:

```bash
npm run dev
```

This will:
- Start Next.js dev server
- Connect to your remote Cloudflare D1 database via `getCloudflareContext()`
- Your contact form API will work properly

### Database Migrations

Run migrations against your Cloudflare D1 database:

```bash
# Run migrations on your remote database
npx wrangler d1 migrations apply humam-contact-db

# Or for local-only database (if you remove "remote": true from wrangler.jsonc)
npx wrangler d1 migrations apply humam-contact-db --local
```

### Alternative: Preview Mode

To test the actual production build locally:

```bash
npm run preview
```

This will:
1. Build your Next.js app with OpenNext
2. Start a local Cloudflare Worker
3. Run exactly as it would in production

### Environment Variables

- `.dev.vars` - Local development variables (loaded by wrangler)
- `.env.local` - Next.js environment variables
- `wrangler.jsonc` - Cloudflare Worker configuration including D1 bindings
  - `"remote": true` means dev server connects to your actual Cloudflare D1 database

### Deployment

```bash
npm run deploy
```

This will deploy your site to Cloudflare Pages with D1 database connected.

### Troubleshooting

If you get "getCloudflareContext has been called without having called initOpenNextCloudflareForDev":

1. Make sure `next.config.ts` has `initOpenNextCloudflareForDev()` at the top
2. Restart your dev server completely
3. Ensure you're authenticated: `npx wrangler whoami`
4. Check that `"remote": true` is set in your D1 binding in `wrangler.jsonc`
