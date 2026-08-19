# Contact Form Backend Setup with Cloudflare D1

This guide will walk you through setting up the contact form backend using Cloudflare D1 database.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Login to Cloudflare
```bash
npx wrangler login
```

### 3. Create D1 Database
```bash
npx wrangler d1 create humam-contact-db
```

Copy the `database_id` from the output and update `wrangler.jsonc`:
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "humam-contact-db",
      "database_id": "YOUR_DATABASE_ID_HERE"
    }
  ]
}
```

### 4. Run Database Migration
```bash
npx wrangler d1 execute humam-contact-db --file=./lib/db/schema.sql
```

For production (remote):
```bash
npx wrangler d1 execute humam-contact-db --remote --file=./lib/db/schema.sql
```

### 5. Start Development Server
```bash
npm run dev
```

The contact form is now fully functional at `/contact`!

## 📁 Project Structure

```
├── app/
│   └── api/
│       └── contact/
│           └── route.ts              # API endpoint for form submission
├── components/
│   └── sections/
│       ├── Contact.tsx               # Contact form component
│       └── Contact.module.css        # Styles
├── lib/
│   ├── db/
│   │   ├── schema.sql               # Database schema
│   │   └── contact-repository.ts   # Database access layer
│   └── validation/
│       └── contact-validator.ts    # Input validation
├── types/
│   └── contact.ts                  # TypeScript types
└── wrangler.jsonc                  # Cloudflare configuration
```

## 🏗️ Architecture

### Clean Architecture Layers

1. **Presentation Layer** (`components/sections/Contact.tsx`)
   - React component with form state management
   - Client-side validation
   - User feedback (loading, success, error states)

2. **API Layer** (`app/api/contact/route.ts`)
   - RESTful API endpoint
   - Rate limiting (5 submissions per hour per IP)
   - Request validation and sanitization
   - Error handling

3. **Business Logic** (`lib/validation/contact-validator.ts`)
   - Input validation rules
   - Data sanitization
   - Security checks

4. **Data Access Layer** (`lib/db/contact-repository.ts`)
   - Clean repository pattern
   - Type-safe database queries
   - CRUD operations

5. **Database** (Cloudflare D1)
   - SQLite-based edge database
   - Prepared statements (SQL injection protection)
   - Indexed for performance

## 🔒 Security Features

- **Rate Limiting**: 5 submissions per hour per IP address
- **Input Validation**: Client-side and server-side validation
- **Data Sanitization**: All inputs are sanitized before storage
- **SQL Injection Protection**: Prepared statements used throughout
- **Type Safety**: Full TypeScript coverage
- **CORS Protection**: Same-origin policy enforced

## 📊 Database Schema

```sql
CREATE TABLE contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  industry TEXT,
  service TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 Database Queries

### View all submissions
```bash
npx wrangler d1 execute humam-contact-db --command="SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10"
```

### Count total submissions
```bash
npx wrangler d1 execute humam-contact-db --command="SELECT COUNT(*) as total FROM contact_submissions"
```

### View pending submissions
```bash
npx wrangler d1 execute humam-contact-db --command="SELECT * FROM contact_submissions WHERE status='pending'"
```

### Update submission status
```bash
npx wrangler d1 execute humam-contact-db --command="UPDATE contact_submissions SET status='contacted', updated_at=datetime('now') WHERE id='SUBMISSION_ID'"
```

### Export submissions (for remote database)
```bash
npx wrangler d1 export humam-contact-db --remote --output=submissions.sql
```

## 🚢 Deployment

### Deploy to Cloudflare Pages
```bash
npm run deploy
```

This command will:
1. Build your Next.js application
2. Upload to Cloudflare Pages
3. Connect to your D1 database

### Verify Deployment
1. Check deployment status: `npx wrangler deployments list`
2. View logs: `npx wrangler tail`
3. Test the contact form on your deployed URL

## 🧪 Testing

### Test Locally
1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/contact`
3. Submit a test form
4. Check database: 
```bash
npx wrangler d1 execute humam-contact-db --command="SELECT * FROM contact_submissions"
```

### Test API Endpoint
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## 📈 Monitoring

### View Recent Submissions
```bash
npx wrangler d1 execute humam-contact-db --remote --command="SELECT id, name, email, status, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 20"
```

### Check Database Size
```bash
npx wrangler d1 info humam-contact-db
```

### View Logs
```bash
npx wrangler tail
```

## 🐛 Troubleshooting

### Database Not Found
- Ensure you're logged in: `npx wrangler login`
- List databases: `npx wrangler d1 list`
- Recreate if needed: `npx wrangler d1 create humam-contact-db`

### Form Submission Fails
1. Check browser console for errors
2. Verify API endpoint: `http://localhost:3000/api/contact`
3. Check D1 binding in `wrangler.jsonc`
4. Restart dev server

### Local Development Issues
- Clear cache: `rm -rf .wrangler .next`
- Reinstall dependencies: `npm install`
- Restart server: `npm run dev`

### Production Issues
- Run migration on remote: `npx wrangler d1 execute humam-contact-db --remote --file=./lib/db/schema.sql`
- Check logs: `npx wrangler tail`
- Verify environment: `npx wrangler whoami`

## 🎯 Next Steps

### Optional Enhancements

1. **Email Notifications**
   - Set up Cloudflare Email Workers
   - Send notification on new submission
   - Auto-reply to user

2. **Admin Dashboard**
   - Create admin interface to view submissions
   - Add authentication (Cloudflare Access)
   - Enable status updates

3. **Analytics**
   - Track submission metrics
   - Monitor conversion rates
   - A/B test form variations

4. **Spam Prevention**
   - Add reCAPTCHA
   - Implement honeypot fields
   - Use Cloudflare Turnstile

5. **CRM Integration**
   - Integrate with HubSpot/Salesforce
   - Auto-create leads
   - Sync contact data

## 📚 Resources

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext.js Cloudflare](https://opennext.js.org/)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Cloudflare D1 documentation
3. Check Next.js API routes documentation
4. Review the code comments for implementation details
