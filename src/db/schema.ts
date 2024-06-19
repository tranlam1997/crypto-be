import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const airDrops = sqliteTable('air_drops', {
    id: text('id').primaryKey().$defaultFn(createId),
    name: text('name').notNull(),
    chain: text('chain').notNull(),
    vote: int('vote').notNull(),
    reward: text('reward').notNull(),
    winner: text('winner').notNull(),
    deadline: text('deadline').notNull(),
    confirmed: int('confirmed').notNull(),
    claimable: int('claimable').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updatedAt').notNull()
})