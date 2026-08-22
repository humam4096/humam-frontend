// src/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  industry: text("industry"),
  service: text("service"),
  status: text("status").notNull().default("new"), // new | read | replied
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Export authentication tables
export { users, sessions, rateLimits } from "./schema-auth";

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;