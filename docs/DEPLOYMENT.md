# Deployment Checklist

This checklist ensures a smooth and safe deployment to production.

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass locally
- [ ] No ESLint errors or warnings
- [ ] TypeScript compilation successful (`npx tsc --noEmit`)
- [ ] Code reviewed and approved
- [ ] Git branch is up to date with `main`

### Database

- [ ] Database migrations created (`npx drizzle-kit generate`)
- [ ] Migrations tested locally
- [ ] Backup of production database taken
- [ ] Migration SQL reviewed for safety

### Environment Variables

- [ ] All required environment variables documented
- [ ] Production environment variables set in Cloudflare Dashboard
- [ ] No sensitive data in code or git history
- [ ] `.dev.vars` not committed to git

### Configuration

- [ ] `wrangler.jsonc` configured correctly
- [ ] `next.config.mjs` has correct settings
- [ ] Compatibility date is current
- [ ] D1 database binding configured

### Testing

- [ ] API endpoints tested locally
- [ ] Contact form submission works
- [ ] Database writes are successful
- [ ] Both EN and AR locales work
- [ ] Error handling tested

---

## Deployment Steps

### Step 1: Pre-Deployment

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies
npm install

# 3. Run linter
npm run lint

# 4. Build locally to check for errors
npm run build
```

### Step 2: Database Migration

```bash
# 1. Backup production database (optional but recommended)
npx wrangler d1 execute humam-contact-db --remote \
  --command "SELECT * FROM contacts" --json > backup_$(date +%Y%m%d_%H%M%S).json

# 2. List pending migrations
npx wrangler d1 migrations list humam-contact-db

# 3. Apply migrations to production
npx wrangler d1 migrations apply humam-contact-db

# 4. Verify migration success
npx wrangler d1 execute humam-contact-db --remote \
  --command "SELECT * FROM contacts LIMIT 1"
```

### Step 3: Deploy to Cloudflare

#### Option A: CLI Deployment (Quick)

```bash
# Deploy directly
npm run deploy
```

#### Option B: Git Push (Recommended for CI/CD)

```bash
# 1. Commit changes
git add .
git commit -m "feat: your changes"

# 2. Push to main branch
git push origin main

# 3. Cloudflare Workers Build will auto-deploy
# Monitor in Cloudflare Dashboard → Workers & Pages → Deployments
```

### Step 4: Verification

```bash
# 1. Test API endpoint
curl -X POST https://humam.sa/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Deployment Test",
    "email": "test@example.com",
    "message": "Testing production deployment"
  }'

# Expected: {"success":true}

# 2. Check database
npx wrangler d1 execute humam-contact-db --remote \
  --command "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 1"

# 3. Check website loads
curl -I https://humam.sa
curl -I https://humam.sa/en/contact
curl -I https://humam.sa/ar/contact
```

### Step 5: Monitor

```bash
# View real-time logs
# Cloudflare Dashboard → Workers & Pages → humam-website → Logs

# Check analytics
# Cloudflare Dashboard → Workers & Pages → humam-website → Analytics
```

---

## Post-Deployment Checklist

### Immediate Checks (0-5 minutes)

- [ ] Website loads correctly (https://humam.sa)
- [ ] Both locales accessible (`/en` and `/ar`)
- [ ] Contact form submits successfully
- [ ] Database receives new submissions
- [ ] No errors in Cloudflare logs
- [ ] No console errors in browser

### Extended Monitoring (1-24 hours)

- [ ] Monitor error rate in Cloudflare Analytics
- [ ] Check response times (should be <200ms)
- [ ] Verify all pages load correctly
- [ ] Test from different geographic locations (optional)
- [ ] Monitor database growth

### Rollback Plan

If issues occur:

```bash
# Option 1: Rollback via Cloudflare Dashboard
# Workers & Pages → Deployments → Select previous version → "Rollback to this deployment"

# Option 2: Revert git commit and redeploy
git revert HEAD
git push origin main
```

---

## Environment-Specific Configurations

### Development

```bash
# Database: Remote with "remote": true
# Domain: localhost:3000
# Logs: Console output
```

### Production

```bash
# Database: Remote Cloudflare D1
# Domain: humam.sa
# Logs: Cloudflare Dashboard
# Analytics: Enabled
# Observability: Enabled
```

---

## Common Deployment Issues

### Issue: Build Fails

**Symptoms:**
```
Error: Build failed
```

**Solutions:**
```bash
# Clear caches
rm -rf .next .open-next node_modules
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint
```

### Issue: Database Connection Error

**Symptoms:**
```
Error: Unable to connect to D1
```

**Solutions:**
```bash
# Verify database binding in wrangler.jsonc
cat wrangler.jsonc | grep -A5 "d1_databases"

# Check database exists
npx wrangler d1 list

# Verify database ID matches
npx wrangler d1 info humam-contact-db
```

### Issue: 500 Internal Server Error

**Symptoms:**
- API returns 500 status
- Logs show errors

**Solutions:**
1. Check Cloudflare logs for error details
2. Verify environment variables are set
3. Check database migrations are applied
4. Review recent code changes
5. Consider rolling back

### Issue: Contact Form Not Working

**Symptoms:**
- Form submits but returns error
- Database not receiving entries

**Solutions:**
```bash
# Test API directly
curl -X POST https://humam.sa/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Check validation is working
# Review lib/validation.ts

# Verify database connection
npx wrangler d1 execute humam-contact-db --remote \
  --command "SELECT COUNT(*) FROM contacts"
```

---

## Emergency Procedures

### Critical Bug Found in Production

1. **Immediate Response:**
   ```bash
   # Rollback to last known good version
   # Via Cloudflare Dashboard → Deployments → Rollback
   ```

2. **Investigation:**
   - Check Cloudflare logs
   - Reproduce issue locally
   - Identify root cause

3. **Fix:**
   - Create fix branch
   - Test thoroughly locally
   - Deploy fix

4. **Verification:**
   - Monitor logs
   - Test affected functionality
   - Check analytics

### Database Corruption

1. **Assess Damage:**
   ```bash
   npx wrangler d1 execute humam-contact-db --remote \
     --command "PRAGMA integrity_check"
   ```

2. **Restore from Backup:**
   ```bash
   # If you have a backup JSON file
   # Contact Cloudflare support for D1 backup restoration
   ```

3. **Prevention:**
   - Regular backups
   - Test migrations thoroughly
   - Use transactions for multi-step operations

---

## Performance Monitoring

### Key Metrics to Monitor

| Metric                | Target      | Alert Threshold |
|-----------------------|-------------|-----------------|
| Response Time (P50)   | <100ms      | >200ms          |
| Response Time (P99)   | <500ms      | >1000ms         |
| Error Rate            | <0.1%       | >1%             |
| Database Query Time   | <50ms       | >200ms          |
| Success Rate          | >99%        | <95%            |

### Monitoring Tools

1. **Cloudflare Analytics**
   - Request volume
   - Error rate
   - Latency percentiles

2. **Cloudflare Logs**
   - Real-time error tracking
   - Request/response debugging

3. **Database Monitoring**
   ```bash
   # Check database stats
   npx wrangler d1 info humam-contact-db
   ```

---

## Deployment Schedule

### Recommended Deployment Times

**Best:**
- Weekdays: 10:00 - 14:00 GMT+3 (Saudi Arabia)
- Low traffic periods
- Team available for monitoring

**Avoid:**
- Fridays and weekends (unless urgent)
- Late evening/night
- During high traffic periods
- Major holidays

### Emergency Deployments

For critical bugs only:
1. Prepare hotfix
2. Test thoroughly
3. Deploy immediately
4. Monitor closely
5. Document incident

---

## Deployment Automation (CI/CD)

### Current Setup: Cloudflare Workers Builds

**Triggers:**
- Push to `main` branch
- Manual trigger

**Process:**
1. GitHub webhook triggers Cloudflare Build
2. Cloudflare clones repository
3. Runs `npm install`
4. Runs `npx @opennextjs/cloudflare build`
5. Runs `npx @opennextjs/cloudflare deploy`
6. Deployment live

### GitHub Actions (Alternative)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npx @opennextjs/cloudflare build
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          CLOUDFLARE_DATABASE_ID: ${{ secrets.CLOUDFLARE_DATABASE_ID }}
          
      - name: Deploy
        run: npx @opennextjs/cloudflare deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

---

## Security Checklist

### Pre-Deployment Security

- [ ] No API keys in code
- [ ] No passwords in code
- [ ] `.env` files not committed
- [ ] Dependencies up to date
- [ ] No known vulnerabilities (`npm audit`)
- [ ] HTTPS enforced
- [ ] Input validation in place
- [ ] SQL injection prevention (using ORM)
- [ ] XSS prevention

### Post-Deployment Security

- [ ] SSL certificate valid
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting considered
- [ ] Monitoring for suspicious activity

---

## Documentation Updates

After deployment:

- [ ] Update CHANGELOG.md
- [ ] Update API version (if changed)
- [ ] Update documentation (if features added)
- [ ] Notify team of changes
- [ ] Update deployment log

---

## Deployment Log Template

Keep a log of all deployments:

```markdown
## Deployment: [Date] - v[Version]

**Deployed by:** [Name]
**Time:** [HH:MM GMT+3]
**Branch:** main
**Commit:** [hash]

**Changes:**
- Feature: [description]
- Fix: [description]
- Update: [description]

**Database Migrations:**
- [Migration name]: [Applied/Skipped]

**Verification Results:**
- Website load: ✅
- API test: ✅
- Database test: ✅
- Logs: ✅

**Issues:** None / [Description]

**Rollback:** Not needed / [Details]
```

---

## Quick Reference Commands

```bash
# Deploy
npm run deploy

# Build only
npm run build

# Preview production build locally
npm run preview

# Database migrations
npx wrangler d1 migrations apply humam-contact-db

# Test API
curl -X POST https://humam.sa/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test"}'

# View logs
# Cloudflare Dashboard → Logs

# Rollback
# Cloudflare Dashboard → Deployments → Rollback
```

---

## Contact

For deployment issues:
- **Emergency:** Contact DevOps team
- **Non-urgent:** Create GitHub issue
- **Questions:** Check documentation first

---

**Last Updated:** August 19, 2026  
**Maintained by:** Humam Development Team
