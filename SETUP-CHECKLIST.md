# Contact Form Setup Checklist

Follow this checklist to set up the contact form backend with Cloudflare D1.

## 📋 Pre-Setup

- [ ] Node.js installed (v18 or higher)
- [ ] Cloudflare account created
- [ ] Project dependencies installed (`npm install`)

## 🔧 Setup Steps

### Option A: Automated Setup (Recommended)

- [ ] Run the setup script: `./scripts/setup-contact-db.sh`
- [ ] Follow the prompts
- [ ] Update `wrangler.jsonc` with the database ID when prompted
- [ ] Continue with the script

### Option B: Manual Setup

#### 1. Cloudflare Authentication
- [ ] Install Wrangler CLI: `npm install -g wrangler`
- [ ] Login to Cloudflare: `npx wrangler login`
- [ ] Verify: `npx wrangler whoami`

#### 2. Create D1 Database
- [ ] Run: `npx wrangler d1 create humam-contact-db`
- [ ] Copy the `database_id` from the output
- [ ] Open `wrangler.jsonc`
- [ ] Add D1 configuration:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "humam-contact-db",
    "database_id": "paste-your-database-id-here"
  }
]
```

#### 3. Run Database Migration
- [ ] Local: `npm run db:migrate`
- [ ] Verify: `npm run db:query -- --command="SELECT name FROM sqlite_master WHERE type='table'"`
- [ ] You should see `contact_submissions` in the output

#### 4. Test Locally
- [ ] Start dev server: `npm run dev`
- [ ] Open browser: `http://localhost:3000/contact`
- [ ] Fill out the form and submit
- [ ] Check database: `npm run db:query -- --command="SELECT * FROM contact_submissions"`
- [ ] You should see your test submission

## ✅ Verification Checklist

### Form Functionality
- [ ] Form loads without errors
- [ ] All fields are visible (name, email, company, message, industry, service)
- [ ] Required field validation works (try submitting empty)
- [ ] Email validation works (try: `test@invalid`)
- [ ] Loading state shows when submitting
- [ ] Success message appears after submission
- [ ] Form resets after successful submission
- [ ] Can submit another form after success

### Backend Functionality
- [ ] Form data saves to database
- [ ] Timestamps are recorded correctly
- [ ] Status defaults to 'pending'
- [ ] Rate limiting works (try 6 quick submissions)
- [ ] Admin API returns submissions: `curl http://localhost:3000/api/admin/submissions`

### Database Integrity
- [ ] Table exists: `npm run db:query -- --command="SELECT * FROM sqlite_master WHERE type='table'"`
- [ ] Indexes exist: `npm run db:query -- --command="PRAGMA index_list('contact_submissions')"`
- [ ] Can query submissions: `npm run db:query -- --command="SELECT COUNT(*) FROM contact_submissions"`

## 🚀 Production Deployment Checklist

### Pre-Deployment
- [ ] All tests passing locally
- [ ] Database migrated: `npm run db:migrate:remote`
- [ ] Environment variables configured (if any)
- [ ] `wrangler.jsonc` has correct database_id

### Deployment
- [ ] Build locally: `npm run build`
- [ ] Fix any build errors
- [ ] Deploy: `npm run deploy`
- [ ] Wait for deployment to complete
- [ ] Note the deployed URL

### Post-Deployment Verification
- [ ] Visit deployed URL + `/contact`
- [ ] Submit a test form
- [ ] Verify submission in remote database:
  ```bash
  npm run db:query:remote -- --command="SELECT * FROM contact_submissions"
  ```
- [ ] Check Cloudflare dashboard for errors
- [ ] Test from different devices/networks
- [ ] Verify rate limiting works on production

## 🔍 Troubleshooting Checklist

If something doesn't work, check these:

### Database Issues
- [ ] Wrangler is authenticated: `npx wrangler whoami`
- [ ] Database exists: `npm run db:list`
- [ ] Migration ran successfully: Check for error messages
- [ ] `wrangler.jsonc` has correct database_id
- [ ] Binding name is "DB" in `wrangler.jsonc`

### Form Submission Issues
- [ ] Check browser console for errors
- [ ] Check network tab for API call status
- [ ] Verify API route exists: `app/api/contact/route.ts`
- [ ] Check dev server logs for errors
- [ ] Verify D1 database is accessible

### Build/Deploy Issues
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] No ESLint errors: `npm run lint`
- [ ] Dependencies installed: `npm install`
- [ ] Wrangler configuration valid: `npx wrangler validate`

### Rate Limiting Issues
- [ ] Wait 1 hour for rate limit reset
- [ ] Or restart dev server (resets in-memory limit)
- [ ] In production, consider using D1 or KV for distributed rate limiting

## 📚 Documentation Review Checklist

Have you read:
- [ ] `README-CONTACT-SETUP.md` - Setup guide
- [ ] `CONTACT-BACKEND-SUMMARY.md` - Architecture overview
- [ ] `scripts/db-setup.md` - Database setup details
- [ ] Code comments in:
  - [ ] `app/api/contact/route.ts`
  - [ ] `lib/db/contact-repository.ts`
  - [ ] `lib/validation/contact-validator.ts`

## 🎯 Optional Enhancements Checklist

Consider implementing:
- [ ] Email notifications on new submission
- [ ] Admin dashboard UI
- [ ] Authentication for admin routes
- [ ] CAPTCHA (Cloudflare Turnstile)
- [ ] Export submissions to CSV
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Analytics tracking
- [ ] Webhook notifications
- [ ] Automated follow-up emails

## 📊 Monitoring Checklist

Set up monitoring for:
- [ ] Database size: `npm run db:info`
- [ ] Submission count: Track growth over time
- [ ] Error rates: Check Cloudflare dashboard
- [ ] Response times: Monitor API performance
- [ ] Rate limit hits: Track how often limits are hit

## 🔒 Security Review Checklist

Verify security measures:
- [ ] Rate limiting is working
- [ ] Input validation on client and server
- [ ] Data sanitization before storage
- [ ] SQL prepared statements used
- [ ] No sensitive data in error messages
- [ ] CORS configured correctly
- [ ] Admin routes need authentication (TODO in production)
- [ ] No API keys in frontend code
- [ ] Environment variables not committed to git

## ✨ Final Checks

Before going live:
- [ ] Test form on mobile devices
- [ ] Test with screen reader for accessibility
- [ ] Test with slow network connection
- [ ] Test error scenarios (invalid data, network error)
- [ ] Test success flow end-to-end
- [ ] Verify email notifications work (if implemented)
- [ ] Verify data retention policy
- [ ] Set up backup strategy
- [ ] Document for team members
- [ ] Train team on admin API usage

## 🎉 Go Live!

When everything is checked:
- [ ] Deploy to production: `npm run deploy`
- [ ] Announce to team
- [ ] Monitor for first 24 hours
- [ ] Set up alerts for errors
- [ ] Schedule regular database backups

---

**Congratulations! Your contact form backend is ready.** 🚀

For support, refer to the troubleshooting sections in the documentation files.
