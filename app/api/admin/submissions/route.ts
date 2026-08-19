/**
 * Admin API Route - View Contact Submissions
 * This is a basic implementation without authentication
 * In production, add proper authentication/authorization
 */

import { NextRequest, NextResponse } from 'next/server';
import { ContactRepository } from '@/lib/db/contact-repository';

// D1 types are available globally via cloudflare-env.d.ts
type DB = D1Database;

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'pending' | 'contacted' | 'resolved' | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get D1 database using helper
    const { getDatabase } = await import('@/lib/db/get-db');
    const db = getDatabase();

    if (!db) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      );
    }

    // Create repository
    const repository = new ContactRepository(db);

    // Fetch submissions
    let submissions;
    if (status) {
      submissions = await repository.findByStatus(status, limit);
    } else {
      submissions = await repository.findAll(limit);
    }

    // Get total count
    const totalCount = await repository.count();

    return NextResponse.json({
      success: true,
      data: submissions,
      meta: {
        total: totalCount,
        limit,
        status: status || 'all',
      },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json() as any;
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id, status' },
        { status: 400 }
      );
    }

    if (!['pending', 'contacted', 'resolved'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Get D1 database using helper
    const { getDatabase } = await import('@/lib/db/get-db');
    const db = getDatabase();

    if (!db) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      );
    }

    // Create repository and update status
    const repository = new ContactRepository(db);
    const success = await repository.updateStatus(id, status);

    if (!success) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
