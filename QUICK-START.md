# Quick Start Guide - Contact Form Backend

## ⚡️ 5-Minute Setup

### 1. Login to Cloudflare
```bash
npx wrangler login
```

### 2. Create Database
```bash
npx wrangler d1 create humam-contact-db
```

**Copy the `database_id` from the output!**

### 3. Update Configuration

Edit `wrangler.jsonc` and add at the end (before the closing `}`):

```jsonc
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "humam-contact-db",
      "database_id": "PASTE_YOUR_DATABASE_ID_HERE"
    }
  ]
```

### 4. Run Migration
```bash
npm run db:migrate
```

### 5. Start Server
```bash
npm run dev
```

### 6. Test It!
- Open: `http://localhost:3000/contact`
- Fill and submit the form  
- Check database: `npm run db:query -- --command="SELECT * FROM contact_submissions"`

---

## 🚀 Deploy to Production

### 1. Migrate Remote Database
```bash
npm run db:migrate:remote
```

### 2. Deploy
```bash
npm run deploy
```

### 3. Test Production
Visit your deployed URL + `/contact` and submit a test!

---

## 📚 More Documentation

- **Full Setup Guide**: `README-CONTACT-SETUP.md`
- **Architecture Overview**: `CONTACT-BACKEND-SUMMARY.md`
- **Step-by-Step Checklist**: `SETUP-CHECKLIST.md`

---

## 🆘 Quick Troubleshooting

**Form doesn't submit?**
- Check browser console for errors
- Verify database is created: `npm run db:list`
- Restart dev server

**Database not found?**
- Check `wrangler.jsonc` has correct `database_id`
- Run `npx wrangler d1 list` to verify

**TypeScript errors?**
- Restart VS Code / your IDE
- Run `npm install`

---

## 📊 Useful Commands

```bash
# View all submissions
npm run db:query -- --command="SELECT * FROM contact_submissions"

# Count submissions
npm run db:query -- --command="SELECT COUNT(*) FROM contact_submissions"

# View pending only
npm run db:query -- --command="SELECT * FROM contact_submissions WHERE status='pending'"

# Check database info
npm run db:info
```

---

## ✅ That's It!

Your contact form is now fully functional with:
- ✅ Database persistence
- ✅ Form validation
- ✅ Rate limiting
- ✅ Success/error handling
- ✅ Clean architecture

**Questions?** Check the detailed documentation files in the project root.
