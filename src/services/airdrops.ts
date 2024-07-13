import { NotFoundError } from 'elysia';
import { AirDropsRepository } from '../repositories/airdrops';
import {
  CreateAirDropsBody,
  DeleteAirDropsBody,
  GetAirDropsQuery,
  GetChainAirDropsQuery,
  GetClaimableAirDropsQuery,
  GetConfirmedAirDropsQuery,
  GetHottestAirDropsQuery,
  GetNewAirDropsQuery,
  UpdateAirDropBody,
} from '../shared/interfaces/airdrop';
import { paginationResult } from '../shared/pagination';
import { responseResult } from '../shared/response-result';

export const AirDropsService = {
  async getAirDrops({ query }: { query: GetAirDropsQuery }) {
    const result = await AirDropsRepository.getAll(query);
    return paginationResult(result);
  },

  async createAirDrops({ body }: { body: CreateAirDropsBody[] }) {
    const result = await Promise.all(
      body.map(async (item) => {
        const airDropDetail = item.airDropDetail;

        delete item.airDropDetail;

        const airDrop = item;

        const result = await AirDropsRepository.create({
          airDrop,
          airDropDetail,
        });

        return {
          airDrop: { ...airDrop, id: result.airDropId },
          airDropDetail: { ...airDropDetail, id: result.airDropDetailId },
        };
      }),
    );

    return responseResult.success(result);
  },

  async updateAirDrop({ body }: { body: UpdateAirDropBody }) {
    const id = body.airDropId;

    if (!(await AirDropsRepository.existEntity(id))) {
      throw new NotFoundError(`AirDrop id ${id} not found`);
    }

    const airDropDetail = body.airDropDetail;

    body.airDropDetail ? delete body.airDropDetail : null;
    delete body.airDropId;

    const airDrop = body;

    await AirDropsRepository.update({
      id,
      airDrop,
      airDropDetail,
    });

    return responseResult.success();
  },

  async deleteAirDrops({ body }: { body: DeleteAirDropsBody }) {
    const ids = body.airDropIds;

    await AirDropsRepository.delete(ids);

    return responseResult.success();
  },

  async getNewAirDrops({ query }: { query: GetNewAirDropsQuery }) {
    const result = await AirDropsRepository.getByConditions(query);
    return paginationResult(result);
  },

  async getHottestAirDrops({ query }: { query: GetHottestAirDropsQuery }) {
    const result = await AirDropsRepository.getByConditions({
      ...query,
      isHottest: true,
    });
    return paginationResult(result);
  },

  async getConfirmedAirDrops({ query }: { query: GetConfirmedAirDropsQuery }) {
    const result = await AirDropsRepository.getByConditions({
      ...query,
      isConfirmed: true,
    });

    return paginationResult(result);
  },

  async getClaimableAirDrops({ query }: { query: GetClaimableAirDropsQuery }) {
    const result = await AirDropsRepository.getByConditions({
      ...query,
      isClaimable: true,
    });

    return paginationResult(result);
  },

  async getChainAirDrops({ query }: { query: GetChainAirDropsQuery }) {
    const result = await AirDropsRepository.getByConditions(query);

    return paginationResult(result);
  },
};
