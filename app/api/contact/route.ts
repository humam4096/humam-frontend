/**
 * Contact Form API Route
 * Handles contact form submissions with Cloudflare D1
 */

import { NextRequest, NextResponse } from 'next/server';
import { ContactRepository } from '@/lib/db/contact-repository';
import { ContactValidator } from '@/lib/validation/contact-validator';
import { ContactFormData, ContactFormResponse } from '@/types/contact';

// D1 types are available globally via cloudflare-env.d.ts
type DB = D1Database;

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 submissions per hour per IP

// In-memory rate limiting (for production, use D1 or KV)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('cf-connecting-ip') || 
               request.headers.get('x-forwarded-for') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: 'Too many submissions. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json() as any;

    // Validate input
    const validation = ContactValidator.validate(body);
    if (!validation.isValid) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: validation.errors[0].message,
        },
        { status: 400 }
      );
    }

    // Sanitize input data
    const formData: ContactFormData = {
      name: ContactValidator.sanitize(body.name),
      email: ContactValidator.sanitize(body.email).toLowerCase(),
      company: body.company ? ContactValidator.sanitize(body.company) : undefined,
      message: ContactValidator.sanitize(body.message),
      industry: body.industry || undefined,
      service: body.service || undefined,
    };

    // Get D1 database using helper (works in both dev and production)
    const { getDatabase } = await import('@/lib/db/get-db');
    const db = getDatabase();

    if (!db) {
      console.error('D1 Database not available');
      
      // In development, provide helpful error message
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json<ContactFormResponse>(
          {
            success: false,
            error: 'Development database not available. Please use: npm run dev:wrangler (or see DEV-SETUP.md)',
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          error: 'Service temporarily unavailable. Please try again later.',
        },
        { status: 503 }
      );
    }

    // Create repository and save submission
    const repository = new ContactRepository(db);
    const submission = await repository.create(formData);

    // Log submission (in production, consider using proper logging service)
    console.log('Contact submission created:', {
      id: submission.id,
      email: submission.email,
      timestamp: submission.createdAt,
    });

    // Return success response
    return NextResponse.json<ContactFormResponse>(
      {
        success: true,
        message: 'Thank you for your submission! We will respond within 24 hours.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
