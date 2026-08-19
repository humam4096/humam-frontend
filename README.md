# Humam Website

Modern, bilingual Next.js application for Humam Food Safety & Quality Consulting, deployed on Cloudflare Workers.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 📚 Documentation

### For Developers

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Quick start guide for local development
- **[docs/BACKEND.md](./docs/BACKEND.md)** - Complete backend architecture & implementation guide
- **[docs/API.md](./docs/API.md)** - API reference with examples
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment procedures & checklist

### Quick Links

| I want to...                      | Read this                                    |
|-----------------------------------|----------------------------------------------|
| Set up local environment          | [DEVELOPMENT.md](./DEVELOPMENT.md)           |
| Understand the backend            | [docs/BACKEND.md](./docs/BACKEND.md)         |
| Use the API                       | [docs/API.md](./docs/API.md)                 |
| Deploy to production              | [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)   |
| Fix an issue                      | [docs/BACKEND.md#troubleshooting](./docs/BACKEND.md#troubleshooting) |

## 🛠️ Technology Stack

### Frontend
- **Next.js 16.3.1** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **next-intl** - Internationalization (EN/AR)

### Backend
- **Cloudflare Workers** - Serverless runtime
- **Cloudflare D1** - SQLite database
- **Drizzle ORM** - Type-safe database queries
- **OpenNext Cloudflare** - Next.js adapter for Cloudflare

### Development Tools
- **Turbopack** - Fast bundler
- **ESLint** - Code linting
- **Wrangler** - Cloudflare CLI
- **Drizzle Kit** - Database migrations

## 🌍 Features

- ✅ Bilingual support (English & Arabic)
- ✅ RTL layout support
- ✅ Serverless architecture
- ✅ Edge runtime (global low-latency)
- ✅ Contact form with database storage
- ✅ Type-safe API
- ✅ Responsive design
- ✅ SEO optimized

## 📁 Project Structure

```
humam-server/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form endpoint
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/              # Layout components
│   ├── sections/            # Page sections
│   └── ui/                  # Reusable UI components
├── db/                      # Database
│   ├── client.ts            # Drizzle client
│   ├── schema.ts            # Database schema
│   └── migrations/          # SQL migrations
├── docs/                    # Documentation
│   ├── BACKEND.md           # Backend documentation
│   ├── API.md               # API reference
│   ├── DEPLOYMENT.md        # Deployment guide
│   └── README.md            # Documentation index
├── i18n/                    # Internationalization
│   ├── routing.ts           # Locale routing
│   └── request.ts           # Request handling
├── lib/                     # Utilities
│   ├── validation.ts        # Input validation
│   └── analytics.ts         # Analytics helpers
├── messages/                # Translations
│   ├── en.json              # English translations
│   └── ar.json              # Arabic translations
├── public/                  # Static assets
├── types/                   # TypeScript types
├── middleware.ts            # Next.js middleware
├── next.config.mjs          # Next.js configuration
├── wrangler.jsonc           # Cloudflare Workers config
├── drizzle.config.ts        # Drizzle ORM config
└── package.json             # Dependencies & scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint

# Deployment
npm run preview          # Build and preview locally
npm run deploy           # Deploy to Cloudflare
npm run upload           # Upload for gradual deployment

# Database
npx drizzle-kit generate # Generate migration
npx wrangler d1 migrations apply humam-contact-db  # Apply migrations
```

## 🗄️ Database Schema

### contacts Table

| Column      | Type    | Description                    |
|-------------|---------|--------------------------------|
| id          | INTEGER | Primary key (auto-increment)   |
| name        | TEXT    | Contact name                   |
| email       | TEXT    | Contact email                  |
| company     | TEXT    | Company name (optional)        |
| industry    | TEXT    | Industry type (enum)           |
| service     | TEXT    | Service type (enum)            |
| status      | TEXT    | Status: new/read/replied       |
| message     | TEXT    | Message content                |
| created_at  | TEXT    | Creation timestamp             |

## 🌐 API Endpoints

### POST /api/contact

Submit a contact form inquiry.

**Request:**
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "company": "Al-Noor Restaurant",
  "industry": "restaurants",
  "service": "consultancy",
  "message": "We need HACCP certification assistance"
}
```

**Response:**
```json
{
  "success": true
}
```

See [docs/API.md](./docs/API.md) for complete API documentation.

## 🚀 Deployment

### Production

```bash
npm run deploy
```

Or use Cloudflare Workers Builds (CI/CD) by pushing to `main` branch.

### Environment Variables

Required in Cloudflare Dashboard:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_DATABASE_ID`
- `CLOUDFLARE_D1_TOKEN`

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete deployment guide.

## 🔒 Security

- ✅ Input validation & sanitization
- ✅ SQL injection prevention (Drizzle ORM)
- ✅ XSS prevention
- ✅ HTTPS enforced
- ✅ Cloudflare DDoS protection
- ✅ Type-safe database operations

## 🌍 Internationalization

Supported languages:
- **English (en)** - Default
- **Arabic (ar)** - RTL support

URL structure:
- `/en/contact` - English
- `/ar/contact` - Arabic

## 📊 Performance

- **Cold start:** ~100-200ms
- **Warm request:** ~10-50ms
- **Database query:** ~20-50ms
- **Global latency:** <100ms (Cloudflare Edge)

## 🐛 Troubleshooting

### Common Issues

**Issue: `getCloudflareContext` error**
```bash
# Ensure next.config.mjs exists (not .ts)
# Restart dev server
npm run dev
```

**Issue: Database connection failed**
```bash
# Check authentication
npx wrangler whoami

# Verify database access
npx wrangler d1 info humam-contact-db
```

See [docs/BACKEND.md#troubleshooting](./docs/BACKEND.md#troubleshooting) for more solutions.

## 📖 Learn More

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [next-intl](https://next-intl-docs.vercel.app/)

### Project Documentation
- [Backend Architecture](./docs/BACKEND.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Development Setup](./DEVELOPMENT.md)

## 🤝 Contributing

1. Read the [Backend Documentation](./docs/BACKEND.md)
2. Set up [local development](./DEVELOPMENT.md)
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

Proprietary - All rights reserved

## 📞 Support

For technical issues:
1. Check the [documentation](./docs/)
2. Review [troubleshooting guide](./docs/BACKEND.md#troubleshooting)
3. Contact the development team

---

**Maintained by:** Humam Development Team  
**Last Updated:** August 19, 2026


# Documentation

## Available Documentation

### 📘 [BACKEND.md](./BACKEND.md)
**Comprehensive Backend Documentation**

Complete guide covering:
- Architecture & technology stack
- Database schema & migrations
- API routes & endpoints
- Validation & security
- Deployment workflows
- Development best practices
- Troubleshooting guide
- Performance optimization

**Read this if you need to:**
- Understand the backend architecture
- Work with the database
- Create new API endpoints
- Debug issues

---

### 🚀 [API.md](./API.md)
**API Reference Documentation**

Complete API documentation for developers:
- Endpoint specifications
- Request/response formats
- Validation rules
- Error handling
- Code examples (cURL, JavaScript, TypeScript, React)
- Postman collection
- TypeScript types

**Read this if you need to:**
- Integrate with the API
- Understand request/response formats
- See code examples
- Test endpoints

---

### 🚢 [DEPLOYMENT.md](./DEPLOYMENT.md)
**Deployment Checklist & Guide**

Step-by-step deployment procedures:
- Pre-deployment checklist
- Database migration steps
- Deployment procedures
- Post-deployment verification
- Rollback procedures
- Emergency protocols
- Common issues & solutions

**Read this if you need to:**
- Deploy to production
- Run database migrations
- Troubleshoot deployment issues
- Perform rollbacks

---

### 🛠️ [../DEVELOPMENT.md](../DEVELOPMENT.md)
**Quick Start Development Guide**

Quick reference for:
- Initial setup
- Running dev server
- Database operations
- Common tasks

**Read this if you need to:**
- Set up local development
- Run the development server
- Work with the database locally

---

## Quick Links

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [next-intl](https://next-intl-docs.vercel.app/)

### Project Files

- `wrangler.jsonc` - Cloudflare Workers configuration
- `next.config.mjs` - Next.js configuration
- `db/schema.ts` - Database schema
- `app/api/contact/route.ts` - Contact API endpoint
- `lib/validation.ts` - Input validation

---

## Need Help?

1. Check [BACKEND.md](./BACKEND.md) - Comprehensive documentation
2. Check [Troubleshooting](./BACKEND.md#troubleshooting) - Common issues
3. Check Cloudflare Docs - Platform-specific issues
4. Contact the development team

---

**Last Updated:** August 19, 2026
