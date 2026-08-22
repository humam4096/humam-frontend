// Authentication and authorization tables
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // UUID
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("CLIENT"), // ADMIN | EDITOR | CLIENT | GUEST
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(), // UUID
  userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: text("expires_at").notNull(), // ISO 8601 datetime
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(), // e.g., "login:192.168.1.1" or "register:user@example.com"
  count: integer("count").notNull().default(0),
  windowStart: text("window_start").notNull(), // ISO 8601 datetime
  expiresAt: text("expires_at").notNull(), // ISO 8601 datetime for automatic cleanup
});
