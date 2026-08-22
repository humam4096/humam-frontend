# Database Setup Guide

## Overview

This project uses **Cloudflare D1** (SQLite) for the database with separate configurations for development and production.

## Configuration Files

- **`wrangler.jsonc`** - Local development configuration (`remote: false`)
- **`wrangler.prod.jsonc`** - Production configuration (`remote: true`)

## Development Workflow

### Local Development

```bash
# Start development server (uses local database)
npm run dev

# The local database is stored in:
# .wrangler/state/v3/d1/miniflare-D1DatabaseObject/

# Apply migrations to local database
npx wrangler d1 migrations apply humam-contact-db --local

# Query local database
npx wrangler d1 execute humam-contact-db --local --command "SELECT * FROM contacts;"
```

### Production Deployment

```bash
# First time only: Create remote D1 database on Cloudflare
npx wrangler d1 create humam-contact-db

# Copy the database_id from the output and update wrangler.prod.jsonc

# Apply migrations to production database
npm run deploy:migrations

# Deploy to production (automatically uses wrangler.prod.jsonc)
npm run deploy
```

## Database Migrations

Migrations are stored in `db/migrations/` and managed by Drizzle Kit.

### Create a new migration

```bash
# Generate migration from schema changes
npx drizzle-kit generate

# Apply to local database
npx wrangler d1 migrations apply humam-contact-db --local

# Apply to production (after testing locally)
npm run deploy:migrations
```

## Important Notes

1. **Local and production data are separate** - This is intentional for safety
2. **Always test migrations locally first** before applying to production
3. **The production database must be created** on Cloudflare before first deployment
4. **Never commit sensitive database credentials** - They're in `.gitignore`

## Troubleshooting

### Error: "D1_ERROR: Failed to parse body as JSON, got: error code: 1031"

This means the database doesn't exist or migrations haven't been applied.

**Solution:**
- Local: Run `npx wrangler d1 migrations apply humam-contact-db --local`
- Production: Run `npm run deploy:migrations`

### Local database not working

```bash
# Delete local database and recreate
rm -rf .wrangler/state/v3/d1/
npx wrangler d1 migrations apply humam-contact-db --local
```

## Database Schema

Current tables:
- `contacts` - Contact form submissions
- `users` - Admin users for authentication
- `sessions` - User sessions
- `rate_limits` - API rate limiting

See `db/schema.ts` for detailed schema definitions.



local database read & write 

curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "industry": "restaurants",
    "service": "consultancy",
    "message": "This is a test message"
  }'


# View all contacts
npx wrangler d1 execute humam-contact-db --local \
  --command "SELECT * FROM contacts;"

# View recent contacts
npx wrangler d1 execute humam-contact-db --local \
  --command "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;"

# Count contacts
npx wrangler d1 execute humam-contact-db --local \
  --command "SELECT COUNT(*) as total FROM contacts;"

# Search by email
npx wrangler d1 execute humam-contact-db --local \
  --command "SELECT * FROM contacts WHERE email = 'test@example.com';"

# Insert a new contact
npx wrangler d1 execute humam-contact-db --local \
  --command "INSERT INTO contacts (name, email, company, industry, service, status, message, created_at) 
             VALUES ('John Doe', 'john@example.com', 'ABC Corp', 'food_industry', 'consultancy', 'new', 'Hello!', CURRENT_TIMESTAMP);"

# Update a contact status
npx wrangler d1 execute humam-contact-db --local \
  --command "UPDATE contacts SET status = 'read' WHERE id = 1;"

# Delete a contact
npx wrangler d1 execute humam-contact-db --local \
  --command "DELETE FROM contacts WHERE id = 1;"
