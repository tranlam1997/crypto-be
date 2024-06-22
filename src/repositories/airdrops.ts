import { db } from '../db/connection';
import { airDrops } from '../db/schema';

export const AirDropsRepository = {
    getAll() {
        return db.select().from(airDrops)
    }
}