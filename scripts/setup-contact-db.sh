#!/bin/bash

# Contact Form Database Setup Script
# This script automates the setup of Cloudflare D1 for the contact form

set -e  # Exit on error

echo "🚀 Contact Form Database Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI is not installed${NC}"
    echo "Installing wrangler..."
    npm install -g wrangler
fi

echo -e "${BLUE}Step 1: Checking Wrangler authentication${NC}"
if ! wrangler whoami &> /dev/null; then
    echo -e "${RED}❌ Not logged in to Cloudflare${NC}"
    echo "Please log in:"
    wrangler login
else
    echo -e "${GREEN}✅ Already authenticated${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Creating D1 Database${NC}"
if wrangler d1 list | grep -q "humam-contact-db"; then
    echo -e "${GREEN}✅ Database 'humam-contact-db' already exists${NC}"
else
    echo "Creating database..."
    wrangler d1 create humam-contact-db
    echo ""
    echo -e "${RED}⚠️  IMPORTANT: Copy the database_id from above and update wrangler.jsonc${NC}"
    echo ""
    read -p "Press enter once you've updated wrangler.jsonc..."
fi

echo ""
echo -e "${BLUE}Step 3: Running database migration${NC}"
if [ -f "./lib/db/schema.sql" ]; then
    echo "Migrating local database..."
    wrangler d1 execute humam-contact-db --file=./lib/db/schema.sql
    echo -e "${GREEN}✅ Local database migrated${NC}"
    
    echo ""
    read -p "Do you want to migrate the remote database too? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Migrating remote database..."
        wrangler d1 execute humam-contact-db --remote --file=./lib/db/schema.sql
        echo -e "${GREEN}✅ Remote database migrated${NC}"
    fi
else
    echo -e "${RED}❌ Schema file not found at ./lib/db/schema.sql${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 4: Verifying setup${NC}"
echo "Checking if table exists..."
if wrangler d1 execute humam-contact-db --command="SELECT name FROM sqlite_master WHERE type='table' AND name='contact_submissions'" | grep -q "contact_submissions"; then
    echo -e "${GREEN}✅ Table 'contact_submissions' created successfully${NC}"
else
    echo -e "${RED}❌ Table creation verification failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Start the dev server: npm run dev"
echo "  2. Visit http://localhost:3000/contact"
echo "  3. Test the contact form"
echo ""
echo "Useful commands:"
echo "  - View submissions: npm run db:query -- --command='SELECT * FROM contact_submissions'"
echo "  - Check database info: npm run db:info"
echo "  - Deploy to production: npm run deploy"
echo ""
echo "📚 Read README-CONTACT-SETUP.md for detailed documentation"
