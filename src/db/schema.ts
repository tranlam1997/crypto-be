import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export type NewAirDrop = typeof airDrops.$inferInsert;

export type NewAirDropDetail = typeof airDropDetails.$inferInsert;

export const airDrops = pgTable('air_drops', {
  id: serial('id').primaryKey(),
  name: text('name'),
  chain: text('chain'),
  vote: integer('vote'),
  reward: text('reward'),
  winner: text('winner'),
  mission: text('mission'),
  deadline: timestamp('deadline', { mode: 'date' }).defaultNow(),
  confirmed: boolean('confirmed').default(false),
  claimable: boolean('claimable').default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const airDropDetails = pgTable('air_drop_details', {
  id: serial('id').primaryKey(),
  airDropId: integer('air_drop_id')
    .notNull()
    .references(() => airDrops.id),
  image: text('image'),
  banner: text('banner'),
  step: text('step'),
  description: text('description'),
  previousPhase: text('previous_phase'),
  website: text('website'),
  twitter: text('twitter'),
  telegram: text('telegram'),
  discord: text('discord'),
  blog: text('blog'),
  github: text('github'),
  otherInfo: jsonb('other_info'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
