# 📧 Resend Email Integration - Deployment Guide

## ✅ What Has Been Completed

### 1. Package Installation
- ✅ Installed `resend` package (v4.x)
- ✅ Updated `package.json`

### 2. Email Service Module Created
- ✅ `/lib/email/resend.ts` - Resend client configuration
- ✅ `/lib/email/templates.ts` - Professional HTML email templates
- ✅ `/lib/email/send-contact-notification.ts` - Email sending logic
- ✅ `/lib/email/index.ts` - Barrel exports

### 3. API Integration
- ✅ Updated `/app/api/contact/route.ts` to send emails on form submission
- ✅ Non-blocking email sending (fire-and-forget)
- ✅ Error handling ensures contact form doesn't break if email fails

### 4. Environment Variables
- ✅ Added to `.env.example`
- ✅ Added to `.env.local` (with placeholders)

---

## 🔧 Step 4: Cloudflare Deployment Configuration

### Required Actions

#### A. Update Wrangler Configuration Files

You need to manually add the `vars` section to your wrangler config files:

**File: `wrangler.prod.jsonc`**

Add this after the `r2_buckets` section:

```jsonc
"vars": {
  "RESEND_FROM_EMAIL": "noreply@yourdomain.com",
  "RESEND_TO_EMAIL": "admin@yourdomain.com"
}
```

**Full structure should look like:**

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "humam-website",
  // ... other config ...
  "r2_buckets": [
    {
      "binding": "NEXT_INC_CACHE_R2_BUCKET",
      "bucket_name": "humam-website-cache"
    }
  ],
  "vars": {
    "RESEND_FROM_EMAIL": "noreply@yourdomain.com",
    "RESEND_TO_EMAIL": "admin@yourdomain.com"
  }
}
```

**Note:** Update `wrangler.jsonc` (local) the same way if you want to test locally.

---

#### B. Set Resend API Key as Secret

The `RESEND_API_KEY` should be stored as a **secret** (not in vars) for security.

Run this command to add it to your Cloudflare Worker:

```bash
# For production
wrangler secret put RESEND_API_KEY --config wrangler.prod.jsonc
```

When prompted, paste your Resend API key.

**Get your API key from:** https://resend.com/api-keys

---

#### C. Update Environment Variables

Update your `.env.local` file with real values:

```env
# Replace these with your actual values
RESEND_API_KEY=re_YourActualResendAPIKey
RESEND_FROM_EMAIL=noreply@yourdomain.com  # Must be verified in Resend
RESEND_TO_EMAIL=admin@yourdomain.com      # Where you want to receive emails
```

---

## 🚀 Deployment Steps

### 1. Verify Resend Domain

Before deploying, ensure your sending domain is verified in Resend:

1. Go to https://resend.com/domains
2. Add your domain (e.g., `yourdomain.com`)
3. Add the required DNS records (DKIM, SPF, etc.)
4. Wait for verification (usually 5-15 minutes)

### 2. Update Configuration Files

1. Update `wrangler.prod.jsonc` with the `vars` section (see above)
2. Update email addresses to match your verified domain
3. Save the file

### 3. Set the Secret

```bash
wrangler secret put RESEND_API_KEY --config wrangler.prod.jsonc
```

### 4. Deploy to Cloudflare

```bash
npm run deploy
```

This will:
- Build the Next.js app
- Deploy to Cloudflare Workers
- Apply all environment variables and secrets

---

## 🧪 Testing

### Local Testing

1. Update `.env.local` with your Resend credentials
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Submit a test contact form
4. Check console logs for email sending status
5. Check your recipient email inbox

### Production Testing

1. After deployment, visit your production website
2. Submit a test contact form
3. Check Cloudflare Worker logs:
   ```bash
   wrangler tail --config wrangler.prod.jsonc
   ```
4. Check your recipient email inbox
5. Check Resend dashboard for email delivery status: https://resend.com/emails

---

## 📊 Monitoring

### Cloudflare Logs

```bash
# View real-time logs
wrangler tail --config wrangler.prod.jsonc

# Look for these messages:
# ✅ Contact notification sent successfully. Email ID: xxx
# ❌ Failed to send contact notification: error message
```

### Resend Dashboard

- View all sent emails: https://resend.com/emails
- Check delivery status, open rates, bounces
- View email content and debug issues

---

## 🔍 Troubleshooting

### Email Not Sending

1. **Check API Key:**
   ```bash
   # Verify secret is set
   wrangler secret list --config wrangler.prod.jsonc
   ```

2. **Check Domain Verification:**
   - Go to https://resend.com/domains
   - Ensure status is "Verified"
   - Check DNS records are correct

3. **Check Logs:**
   ```bash
   wrangler tail --config wrangler.prod.jsonc
   ```
   Look for error messages

4. **Check `RESEND_FROM_EMAIL`:**
   - Must use your verified domain
   - Format: `noreply@yourdomain.com`

### Email Goes to Spam

1. **Add SPF, DKIM, DMARC records** (provided by Resend)
2. **Use a verified domain** (not @gmail.com)
3. **Check email content** for spam triggers
4. **Warm up your domain** by sending gradually increasing volumes

### Environment Variables Not Working

1. **Verify wrangler.prod.jsonc has the `vars` section**
2. **Verify secret is set:**
   ```bash
   wrangler secret list --config wrangler.prod.jsonc
   ```
3. **Redeploy after making changes:**
   ```bash
   npm run deploy
   ```

---

## 📋 Pre-Deployment Checklist

- [ ] Resend account created
- [ ] Domain added and verified in Resend
- [ ] DNS records (DKIM, SPF) configured
- [ ] `wrangler.prod.jsonc` updated with `vars` section
- [ ] `RESEND_FROM_EMAIL` uses verified domain
- [ ] `RESEND_TO_EMAIL` set to correct recipient
- [ ] `RESEND_API_KEY` secret set via wrangler
- [ ] `.env.local` updated for local testing
- [ ] Code tested locally
- [ ] Deployed to Cloudflare
- [ ] Production test completed
- [ ] Monitoring setup reviewed

---

## 🎯 Key Features Implemented

✅ **Professional HTML Email Template**
- Beautiful, responsive design
- All contact form fields included
- Plain text fallback

✅ **Non-Blocking Email Sending**
- Contact form responds immediately
- Email sends in background
- Failed emails don't break form submission

✅ **Comprehensive Error Handling**
- Validation of email configuration
- Detailed error logging
- Graceful degradation

✅ **Reply-To Feature**
- Email reply-to set to customer's email
- Easy one-click response to inquiries

✅ **Type-Safe Implementation**
- Full TypeScript support
- Proper type definitions
- IDE autocomplete

✅ **Production-Ready**
- Secure secret management
- Environment-based configuration
- Cloudflare Workers optimized

---

## 📞 Support

- **Resend Documentation:** https://resend.com/docs
- **Resend API Reference:** https://resend.com/docs/api-reference
- **Cloudflare Workers Docs:** https://developers.cloudflare.com/workers
- **Wrangler Docs:** https://developers.cloudflare.com/workers/wrangler

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - It contains secrets
2. **Use wrangler secrets** for sensitive data in production
3. **Verify domains** before sending emails
4. **Monitor Resend dashboard** for suspicious activity
5. **Rotate API keys periodically**

---

**Last Updated:** Step 4 - Ready for deployment configuration
**Status:** ✅ Development complete, pending production deployment
