/**
 * Database Connection Helper
 * Provides D1 database instance from environment
 * 
 * For local development, use: npm run dev:wrangler
 * This ensures D1 is properly bound
 */

export function getDatabase(): D1Database | null {
  // Get database from environment (works in production and wrangler dev)
  const env = process.env as any;
  
  if (env.DB) {
    return env.DB as D1Database;
  }

  // Database not available
  return null;
}

export function isDatabaseAvailable(): boolean {
  return getDatabase() !== null;
}
