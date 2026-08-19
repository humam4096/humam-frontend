# Cloudflare D1 Database Setup Guide

This guide will help you set up the Cloudflare D1 database for the contact form.

## Prerequisites

- Wrangler CLI installed (`npm install -g wrangler`)
- Cloudflare account with Workers/Pages access
- Authenticated with Wrangler (`wrangler login`)

## Step 1: Create D1 Database

Create a new D1 database for storing contact submissions:

```bash
wrangler d1 create humam-contact-db
```

This will output something like:
```
✅ Successfully created DB 'humam-contact-db'
Created your database using D1's new storage backend.

[[d1_databases]]
binding = "DB"
database_name = "humam-contact-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## Step 2: Update wrangler.jsonc

Copy the `database_id` from the output above and update the `wrangler.jsonc` file:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "humam-contact-db",
    "database_id": "YOUR_DATABASE_ID_HERE"  // Replace with your actual database_id
  }
]
```

## Step 3: Run Database Migrations

Execute the schema SQL to create the tables:

```bash
wrangler d1 execute humam-contact-db --file=./lib/db/schema.sql
```

For remote (production) database:
```bash
wrangler d1 execute humam-contact-db --remote --file=./lib/db/schema.sql
```

## Step 4: Verify Database Setup

Check that the table was created:

```bash
wrangler d1 execute humam-contact-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

You should see `contact_submissions` in the output.

## Step 5: Test Locally

Start the development server with D1 local mode:

```bash
npm run dev
```

The contact form will now save submissions to your local D1 database.

## Step 6: Deploy to Production

When ready to deploy:

```bash
npm run deploy
```

This will deploy your application with the D1 database connection.

## Querying the Database

### View all submissions
```bash
wrangler d1 execute humam-contact-db --command="SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10"
```

### Count total submissions
```bash
wrangler d1 execute humam-contact-db --command="SELECT COUNT(*) as total FROM contact_submissions"
```

### View pending submissions
```bash
wrangler d1 execute humam-contact-db --command="SELECT * FROM contact_submissions WHERE status='pending' ORDER BY created_at DESC"
```

### Update submission status
```bash
wrangler d1 execute humam-contact-db --command="UPDATE contact_submissions SET status='contacted' WHERE id='SUBMISSION_ID'"
```

## Database Schema

The `contact_submissions` table includes:
- `id` - Unique identifier (UUID)
- `name` - Contact name
- `email` - Contact email
- `company` - Company name (optional)
- `message` - Message content
- `industry` - Industry type (optional)
- `service` - Service interest (optional)
- `status` - Submission status (pending/contacted/resolved)
- `created_at` - Timestamp of submission
- `updated_at` - Timestamp of last update

## Troubleshooting

### Database not found
- Ensure you're logged in: `wrangler login`
- Verify database exists: `wrangler d1 list`

### Local development issues
- Clear local cache: `rm -rf .wrangler`
- Restart dev server: `npm run dev`

### Production deployment issues
- Run migration on remote: `wrangler d1 execute humam-contact-db --remote --file=./lib/db/schema.sql`
- Check deployment logs: `wrangler tail`

## Security Notes

- The API includes rate limiting (5 submissions per hour per IP)
- All inputs are validated and sanitized
- Email addresses are stored in lowercase
- SQL injection protection via prepared statements
- CORS headers are configured for same-origin only

## Next Steps

1. Set up email notifications for new submissions (optional)
2. Create an admin dashboard to view submissions (optional)
3. Configure backup strategy for production data
4. Monitor database usage in Cloudflare dashboard
