# Resend Email Service Setup

## Overview
The email service has been refactored to use lazy initialization, which fixes the build-time error when deploying to Cloudflare Workers.

## Changes Made

### 1. **lib/email/resend.ts**
- Changed from module-level initialization to lazy initialization
- Added `getResend()` function that creates the Resend client on first use
- Added `getEmailConfig()` function for runtime email configuration
- Supports both Cloudflare Workers and local Next.js dev server
- Uses `getCloudflareContext()` for Cloudflare runtime, falls back to `process.env` for local dev

### 2. **lib/email/send-contact-notification.ts**
- Updated to use `getResend()` and `getEmailConfig()` functions
- No breaking changes to the public API

### 3. **lib/email/index.ts**
- Updated exports to use the new function-based API

### 4. **wrangler configs**
- Added comments explaining how to set the `RESEND_API_KEY` secret

## Setting up RESEND_API_KEY

### For Local Development (next dev)
Add to `.env.local`:
```bash
RESEND_API_KEY=re_your_actual_key_here
```

### For Local Cloudflare Preview (wrangler dev)
Add to `.dev.vars`:
```bash
RESEND_API_KEY=re_your_actual_key_here
```

### For Production Deployment

#### Option 1: Using Wrangler CLI
```bash
# For production environment
wrangler secret put RESEND_API_KEY --env production

# You'll be prompted to enter the secret value
# Paste: re_your_actual_key_here
```

#### Option 2: Using Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Select your worker: `humam-website`
4. Go to **Settings** → **Variables**
5. Click **Add variable**
6. Select **Encrypt** (to make it a secret)
7. Name: `RESEND_API_KEY`
8. Value: `re_your_actual_key_here`
9. Click **Save**

## Environment Variables Summary

| Variable | Type | Set In | Required |
|----------|------|--------|----------|
| `RESEND_API_KEY` | Secret | Cloudflare Secret / `.env.local` / `.dev.vars` | Yes |
| `RESEND_FROM_EMAIL` | Public | `wrangler.jsonc` vars | No (defaults to noreply@humam.sa) |
| `RESEND_TO_EMAIL` | Public | `wrangler.jsonc` vars | No (defaults to humam4096@gmail.com) |

## Why This Approach?

### The Problem
- Next.js builds run in Node.js during CI/CD
- Cloudflare Worker secrets are only available at runtime
- Module-level code (`export const resend = new Resend(...)`) executes during build
- This caused: "Missing API key" error during build

### The Solution
- **Lazy initialization**: Client is created only when first used (at runtime)
- **Runtime environment resolution**: Uses `getCloudflareContext()` for Workers, `process.env` for local dev
- **No build-time evaluation**: No Resend instantiation during the build phase

## Testing

### Test Local Dev
```bash
npm run dev
# Send a test contact form submission
```

### Test Cloudflare Preview
```bash
npm run build
wrangler dev
# Send a test contact form submission
```

### Test Production
```bash
npm run build
wrangler deploy --config wrangler.prod.jsonc
# Send a test contact form submission
```

## Troubleshooting

### "RESEND_API_KEY is not configured" at runtime
- **Local dev**: Check `.env.local` exists and has `RESEND_API_KEY=re_...`
- **Cloudflare**: Verify the secret is set using `wrangler secret list`

### Build still fails
- Clear build cache: `rm -rf .next .open-next`
- Rebuild: `npm run build`

### Emails not sending
1. Check Cloudflare Worker logs for errors
2. Verify the API key is valid in Resend dashboard
3. Check that `RESEND_FROM_EMAIL` domain is verified in Resend

## Next Steps

1. ✅ Set `RESEND_API_KEY` secret in Cloudflare (see above)
2. ✅ Build and deploy: `npm run build && wrangler deploy --config wrangler.prod.jsonc`
3. ✅ Test the contact form on production
4. ✅ Monitor Cloudflare logs for any issues
