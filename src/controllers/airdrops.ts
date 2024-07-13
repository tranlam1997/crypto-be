import Elysia from 'elysia';
import { AirDropsService } from '../services/airdrops';
import {
  CreateAirDropSchema,
  DeleteAirDropSchema,
  GetAirDropsSchema,
  GetChainAirDropSchema,
  GetClaimableAirDropSchema,
  GetConfirmedAirDropSchema,
  GetHottestAirDropSchema,
  GetNewAirDropSchema,
  UpdateAirDropSchema,
} from '../shared/dtos/airdrop';

export const AirDropsController = new Elysia({
  prefix: '/airdrops',
  tags: ['AirDrops'],
})
  .error({})
  .onError(({ set, code, error }) => {
    return {
      statusCode: set.status,
      message: error.toString(),
      code,
    };
  })
  .get('/', AirDropsService.getAirDrops, {
    query: GetAirDropsSchema,
  })
  .post('/', AirDropsService.createAirDrops, {
    body: CreateAirDropSchema,
  })
  .put('/', AirDropsService.updateAirDrop, {
    body: UpdateAirDropSchema,
  })
  .delete('/', AirDropsService.deleteAirDrops, {
    body: DeleteAirDropSchema,
  })
  .get('/new', AirDropsService.getNewAirDrops, {
    query: GetNewAirDropSchema,
  })
  .get('/hottest', AirDropsService.getHottestAirDrops, {
    query: GetHottestAirDropSchema,
  })
  .get('/confirmed', AirDropsService.getConfirmedAirDrops, {
    query: GetConfirmedAirDropSchema,
  })
  .get('/claimable', AirDropsService.getClaimableAirDrops, {
    query: GetClaimableAirDropSchema,
  })
  .get('/by-chain', AirDropsService.getChainAirDrops, {
    query: GetChainAirDropSchema,
  });
