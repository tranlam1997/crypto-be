import { db } from '../db/connection';
import { airDropDetails } from '../db/schema';

export const AirDropDetailsRepository = {
    getAll() {
        return db.select().from(airDropDetails)
    }
}