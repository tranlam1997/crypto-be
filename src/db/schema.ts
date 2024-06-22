import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const airDrops = sqliteTable('air_drops', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    chain: text('chain').notNull(),
    vote: integer('vote', { mode: 'number' }).notNull(),
    reward: text('reward').notNull(),
    winner: text('winner').notNull(),
    deadline: text('deadline').default(sql`(CURRENT_TIMESTAMP)`),
    confirmed: integer('confirmed', { mode: 'boolean' }).default(false),
    claimable: integer('claimable', { mode: 'boolean' }).default(false),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`)
})

export const airDropDetails = sqliteTable('air_drop_details', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    airDropId: integer("air_drop_id").references(() => airDrops.id),
    step: text('step'),
    description: text('description'),
    previousPhase: text('previous_phase'),
    website: text('website'),
    twitter: text('twitter'),
    telegram: text('telegram'),
    discord: text('discord'),
    blog: text('blog'),
    github: text('github'),
    otherInfo: text('other_info', { mode: 'json' }),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`)
})