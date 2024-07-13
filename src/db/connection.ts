import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  db: process.env.DB_NAME,
});

export const db = drizzle(queryClient);
