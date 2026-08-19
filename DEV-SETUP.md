# Development Setup - Contact Form with D1

## Issue: 503 Service Unavailable

If you're seeing a 503 error when testing the contact form locally, it's because `next dev` doesn't automatically provide access to the D1 database.

## ✅ Solution Applied

The code has been updated to automatically detect and use the D1 database in both development and production environments using Wrangler's `getPlatformProxy` API.

## 🚀 How to Run Locally

### Option 1: Using Next.js Dev (Recommended - Fastest)

This now works with the updated code:

```bash
# 1. Make sure database is migrated
npm run db:migrate

# 2. Start dev server (now works with D1!)
npm run dev

# 3. Visit contact form
open http://localhost:3000/contact
```

The form will automatically connect to your local D1 database!

### Option 2: Using Wrangler Dev (Most Accurate to Production)

For a development environment that's 100% identical to production:

```bash
# Use wrangler dev instead
npm run dev:wrangler
```

This runs your app exactly as it would in Cloudflare Workers.

## 📋 Setup Checklist

Before testing the form, make sure:

- [ ] Database exists: `npm run db:list`
- [ ] Database is migrated: `npm run db:migrate`
- [ ] Dev server is running: `npm run dev`
- [ ] No errors in terminal

## 🧪 Test the Form

1. **Navigate to contact page**
   ```bash
   open http://localhost:3000/contact
   # or
   open http://localhost:3000/ar/contact
   ```

2. **Fill out the form**
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test

3. **Submit**
   - You should see a success message with checkmark animation
   - Form should reset

4. **Verify in database**
   ```bash
   npm run db:query -- --command="SELECT * FROM contact_submissions"
   ```
   
   You should see your test submission!

## 🐛 Troubleshooting

### Still Getting 503 Error?

**1. Check database exists**
```bash
npm run db:list
```
Should show `humam-contact-db`

**2. Run migration**
```bash
npm run db:migrate
```
Should complete without errors

**3. Restart dev server**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

**4. Check terminal for errors**
Look for messages like:
- ✅ `Contact submission created: ...` (Success!)
- ❌ `D1 Database not available` (Problem)

### Database Migration Failed?

```bash
# Check if database exists
npm run db:list

# If not, create it
npx wrangler d1 create humam-contact-db

# Update wrangler.jsonc with the database_id

# Then migrate
npm run db:migrate
```

### Form Submits But No Data?

```bash
# Check if table exists
npm run db:query -- --command="SELECT name FROM sqlite_master WHERE type='table'"

# Should show: contact_submissions

# If not, run migration again
npm run db:migrate
```

## 📊 Useful Development Commands

```bash
# View all submissions
npm run db:query -- --command="SELECT * FROM contact_submissions ORDER BY created_at DESC"

# Count submissions
npm run db:query -- --command="SELECT COUNT(*) as total FROM contact_submissions"

# View pending submissions
npm run db:query -- --command="SELECT * FROM contact_submissions WHERE status='pending'"

# Clear all test data
npm run db:query -- --command="DELETE FROM contact_submissions"

# Drop and recreate table (fresh start)
npm run db:query -- --command="DROP TABLE IF EXISTS contact_submissions"
npm run db:migrate
```

## 🔄 Development Workflow

1. **Start dev server**
   ```bash
   npm run dev
   ```

2. **Make changes to code**
   - Save file
   - Next.js auto-reloads

3. **Test form submission**
   - Visit `/contact`
   - Submit test
   - Check database

4. **View submissions**
   ```bash
   npm run db:query -- --command="SELECT * FROM contact_submissions"
   ```

## 🎯 What Changed?

The code now uses a helper function (`lib/db/get-db.ts`) that:

1. ✅ Automatically detects development vs production
2. ✅ Uses Wrangler's `getPlatformProxy` in development
3. ✅ Uses direct env binding in production
4. ✅ Provides helpful error messages if database is not configured

This means **you don't need to do anything special** - just run `npm run dev` and the form will work!

## ✨ Success Indicators

When everything is working, you'll see:

1. **Form submission succeeds**
   - Success animation appears
   - Form resets
   - No errors in browser console

2. **Terminal shows**
   ```
   Contact submission created: { id: '...', email: '...', timestamp: '...' }
   ```

3. **Database contains data**
   ```bash
   npm run db:query -- --command="SELECT * FROM contact_submissions"
   ```
   Shows your submission

## 🚀 Ready for Production?

Once local development works:

```bash
# Migrate production database
npm run db:migrate:remote

# Deploy
npm run deploy
```

Your contact form will work exactly the same in production!

---

**Questions?** Check the terminal output for errors or run `npm run db:query` to verify database state.
