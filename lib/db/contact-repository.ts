/**
 * Contact Repository
 * Clean database access layer for contact submissions
 */

import { ContactFormData, ContactSubmission } from '@/types/contact';

// D1 types are available globally via cloudflare-env.d.ts
type DB = D1Database;

export class ContactRepository {
  constructor(private db: DB) {}

  /**
   * Create a new contact submission
   */
  async create(data: ContactFormData): Promise<ContactSubmission> {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO contact_submissions 
      (id, name, email, company, message, industry, service, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    await stmt.bind(
      id,
      data.name,
      data.email,
      data.company || null,
      data.message,
      data.industry || null,
      data.service || null,
      createdAt,
      createdAt
    ).run();

    return {
      id,
      ...data,
      createdAt,
      status: 'pending',
    };
  }

  /**
   * Get submission by ID
   */
  async findById(id: string): Promise<ContactSubmission | null> {
    const stmt = this.db.prepare(`
      SELECT 
        id,
        name,
        email,
        company,
        message,
        industry,
        service,
        status,
        created_at as createdAt
      FROM contact_submissions
      WHERE id = ?
    `);

    const result = await stmt.bind(id).first<ContactSubmission>();
    return result || null;
  }

  /**
   * Get all submissions with pagination
   */
  async findAll(
    limit = 50,
    offset = 0
  ): Promise<ContactSubmission[]> {
    const stmt = this.db.prepare(`
      SELECT 
        id,
        name,
        email,
        company,
        message,
        industry,
        service,
        status,
        created_at as createdAt
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);

    const result = await stmt.bind(limit, offset).all<ContactSubmission>();
    return result.results || [];
  }

  /**
   * Update submission status
   */
  async updateStatus(
    id: string,
    status: 'pending' | 'contacted' | 'resolved'
  ): Promise<boolean> {
    const stmt = this.db.prepare(`
      UPDATE contact_submissions 
      SET status = ?, updated_at = ?
      WHERE id = ?
    `);

    const result = await stmt.bind(
      status,
      new Date().toISOString(),
      id
    ).run();

    return result.success;
  }

  /**
   * Get submissions by status
   */
  async findByStatus(
    status: 'pending' | 'contacted' | 'resolved',
    limit = 50
  ): Promise<ContactSubmission[]> {
    const stmt = this.db.prepare(`
      SELECT 
        id,
        name,
        email,
        company,
        message,
        industry,
        service,
        status,
        created_at as createdAt
      FROM contact_submissions
      WHERE status = ?
      ORDER BY created_at DESC
      LIMIT ?
    `);

    const result = await stmt.bind(status, limit).all<ContactSubmission>();
    return result.results || [];
  }

  /**
   * Count submissions
   */
  async count(): Promise<number> {
    const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM contact_submissions
    `);

    const result = await stmt.first<{ count: number }>();
    return result?.count || 0;
  }
}
