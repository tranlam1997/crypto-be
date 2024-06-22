import Elysia, { t } from "elysia";
import { AirDropsService } from "../services/airdrops";
import { PaginationSchema } from "../schemas/pagination";

export const AirDropsController = new Elysia({ prefix: '/airdrops' })
    .get('/', AirDropsService.getAirDrops, {
        query: PaginationSchema
    })
    .get('/new', AirDropsService.getNewAirDrops)
    .get('/hottest', AirDropsService.getHottestAirDrops)
    .get('/confirmed', AirDropsService.getConfirmedAirDrops)
    .get('/by-chain', AirDropsService.getChainAirDrops)
    .get('/claimable', AirDropsService.getClaimableAirDrops)