# Complete Setup Guide

## ✅ Resources Already Created

All Cloudflare resources are ready:

### D1 Databases
- ✅ **Production**: `humam-contact-db` (ID: `588dbffc-4b97-4a5f-a95d-2d42f1b0ca6d`)
- ✅ **Dev**: `humam-db-dev` (ID: `e6564247-f505-44d6-b0e7-7cfe7a36233b`)

### R2 Buckets
- ✅ **Production**: `humam-website-cache`
- ✅ **Dev**: `humam-website-cache-dev`

## 📝 Next Steps

### 1. Update `wrangler.jsonc`

Replace the entire content of `wrangler.jsonc` with:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "humam-website",
	"main": ".open-next/worker.js",
	"compatibility_date": "2026-03-01",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"assets": {
		"directory": ".open-next/assets",
		"binding": "ASSETS"
	},
	"images": {
		"binding": "IMAGES"
	},
	"observability": {
		"enabled": true
	},
	"d1_databases": [
		{
			"binding": "DB",
			"database_name": "humam-contact-db",
			"database_id": "588dbffc-4b97-4a5f-a95d-2d42f1b0ca6d",
			"migrations_dir": "db/migrations"
		}
	],
	"r2_buckets": [
		{
			"binding": "NEXT_INC_CACHE_R2_BUCKET",
			"bucket_name": "humam-website-cache"
		}
	],
	"vars": {
		"RESEND_FROM_EMAIL": "noreply@humam.sa",
		"RESEND_TO_EMAIL": "humam4096@gmail.com"
	},
	// Secrets (not committed to git):
	// Local dev: Create .dev.vars with RESEND_API_KEY=re_your_key
	// Production: Run `wrangler secret put RESEND_API_KEY --env production`
	//
	// Environments:
	"env": {
		"dev": {
			"name": "humam-website-dev",
			"vars": {
				"RESEND_TO_EMAIL": "humam4096@gmail.com+dev-test"
			},
			"d1_databases": [
				{
					"binding": "DB",
					"database_name": "humam-db-dev",
					"database_id": "e6564247-f505-44d6-b0e7-7cfe7a36233b",
					"migrations_dir": "db/migrations",
					"remote": false
				}
			],
			"r2_buckets": [
				{
					"binding": "NEXT_INC_CACHE_R2_BUCKET",
					"bucket_name": "humam-website-cache-dev"
				}
			]
		},
		"production": {
			"name": "humam-website",
			"d1_databases": [
				{
					"binding": "DB",
					"database_name": "humam-contact-db",
					"database_id": "588dbffc-4b97-4a5f-a95d-2d42f1b0ca6d",
					"migrations_dir": "db/migrations",
					"remote": true
				}
			]
		}
	}
}
```

### 2. Delete Old Config

```bash
rm wrangler.prod.jsonc
```

### 3. Apply Migrations to Dev Database

```bash
# Local dev database
wrangler d1 migrations apply humam-db-dev --env dev

# If you need to apply to remote dev database:
wrangler d1 migrations apply humam-db-dev --env dev --remote
```

### 4. Set Secrets

#### For Local Development
Create `.dev.vars`:
```bash
echo "RESEND_API_KEY=your_resend_api_key_here" > .dev.vars
```

#### For Dev Environment (optional - if you want to test on Cloudflare)
```bash
wrangler secret put RESEND_API_KEY --env dev
# Paste: your_resend_api_key_here
```

#### For Production Environment
```bash
wrangler secret put RESEND_API_KEY --env production
# Paste: your_resend_api_key_here
```

### 5. Test & Deploy

#### Test Locally
```bash
npm run dev
# Visit http://localhost:3000 and test the contact form
```

#### Deploy to Dev Environment
```bash
npm run deploy:dev
# Visit https://humam-website-dev.workers.dev and test
```

#### Deploy to Production
```bash
npm run deploy
# Visit https://humam-website.workers.dev (or your custom domain)
```

## 📊 Environment Comparison

| Aspect | Dev | Production |
|--------|-----|------------|
| Worker Name | `humam-website-dev` | `humam-website` |
| D1 Database | `humam-db-dev` | `humam-contact-db` |
| D1 Remote | `false` (local) | `true` |
| R2 Bucket | `humam-website-cache-dev` | `humam-website-cache` |
| Email To | `humam4096@gmail.com+dev-test` | `humam4096@gmail.com` |

## 🔍 Troubleshooting

### "No environment found" error
- Make sure you've updated `wrangler.jsonc` with the `env` sections

### "Missing API key" during build
- This should be fixed with the lazy initialization in `lib/email/resend.ts`
- Make sure `.dev.vars` exists for local dev

### "RESEND_API_KEY is not configured" at runtime
- **Local**: Check `.dev.vars` exists and has the correct key
- **Dev**: Run `wrangler secret put RESEND_API_KEY --env dev`
- **Production**: Run `wrangler secret put RESEND_API_KEY --env production`

### Database migration issues
- Local: `wrangler d1 migrations apply humam-db-dev --env dev`
- Remote: `wrangler d1 migrations apply humam-db-dev --env dev --remote`
- Production: `npm run deploy:migrations`

## 🎯 Final Checklist

- [ ] Updated `wrangler.jsonc` with environment sections
- [ ] Deleted `wrangler.prod.jsonc`
- [ ] Created `.dev.vars` with `RESEND_API_KEY`
- [ ] Applied migrations to dev database
- [ ] Set production secret: `wrangler secret put RESEND_API_KEY --env production`
- [ ] Tested locally: `npm run dev`
- [ ] Deployed to production: `npm run deploy`
- [ ] Verified contact form works in production

## 🚀 You're All Set!

Your project now has:
- ✅ Proper environment separation (dev/production)
- ✅ Lazy-loaded Resend client (no build errors)
- ✅ Isolated databases and caches per environment
- ✅ Clear deployment workflow

Happy coding! 🎉
