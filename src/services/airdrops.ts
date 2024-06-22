import { Context } from "elysia";
import { AirDropsRepository } from "../repositories/airdrops"
import { ResponseResult } from "../shared/response-result";
import { GetAllAirDropsQuery } from "../shared/interfaces/query";

export const AirDropsService = {
    async getAirDrops({ query }: { query: GetAllAirDropsQuery }) {
        const result = await AirDropsRepository.getAll();
        return ResponseResult.success(result);
    },

    async getNewAirDrops(context: Context) {
        const result = await AirDropsRepository.getAll();
        return ResponseResult.success(result);
    },

    async getHottestAirDrops(context: Context) {
        const result = await AirDropsRepository.getAll();
        return ResponseResult.success(result);
    },

    async getConfirmedAirDrops(context: Context) {
        const result = await AirDropsRepository.getAll();
        return ResponseResult.success(result);
    },

    async getChainAirDrops(context: Context) {
        const result = await AirDropsRepository.getAll();
        return ResponseResult.success(result);
    },

    async getClaimableAirDrops(context: Context) {
        const result = await AirDropsRepository.getAll();
        return ResponseResult.success(result);
    }
}