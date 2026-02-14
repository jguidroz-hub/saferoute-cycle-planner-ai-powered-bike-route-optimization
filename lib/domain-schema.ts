// @ts-nocheck
import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default(true),
  weeklyDigest: boolean('weekly_digest').default(true),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Saved bicycle routes with AI safety and scenic scoring
export const routes = pgTable('routes', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  startLocation: jsonb('start_location').notNull(),
  endLocation: jsonb('end_location').notNull(),
  routePoints: jsonb('route_points').notNull(),
  safetyScore: text('safety_score').notNull().default('0.0'),
  scenicScore: text('scenic_score').notNull().default('0.0'),
  distanceKm: text('distance_km').notNull(),
  estimatedTime: integer('estimated_time').notNull(),
  preferredType: text('preferred_type').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// User feedback and ratings for specific routes
export const routeReviews = pgTable('route_reviews', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  routeId: text('route_id').references(() => routes.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  difficultyLevel: text('difficulty_level').notNull(),
  reviewText: text('review_text'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
