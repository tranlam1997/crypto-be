import { asc, between, count, desc, eq, ilike, inArray, or } from 'drizzle-orm';
import { db } from '../db/connection';
import {
  airDropDetails,
  airDrops,
  NewAirDrop,
  NewAirDropDetail,
} from '../db/schema';
import {
  GetAirDropByConditions,
  GetAirDropsQuery,
} from '../shared/interfaces/airdrop';
import { defaultPagination, skip } from '../shared/pagination';
import { ObjUtils } from '../shared/utils/obj-utils';
import { TimeUtils } from '../shared/utils/time-utils';

export const AirDropsRepository = {
  async getAll(params?: GetAirDropsQuery) {
    const { page, take, order, orderBy, search } = {
      ...(params
        ? { ...defaultPagination(), ...params }
        : { ...defaultPagination(), search: '' }),
    };
    const orderOptions =
      order === 'ASC'
        ? asc((airDrops as any)[orderBy])
        : desc((airDrops as any)[orderBy]);

    const dataQuery = db
      .select({
        ...airDrops,
        detailInfo: {
          ...airDropDetails,
        },
      } as any)
      .from(airDrops)
      .leftJoin(airDropDetails, eq(airDrops.id, airDropDetails.airDropId))
      .limit(take)
      .offset(skip(take, page))
      .orderBy(orderOptions);

    const dataCount = db.select({ total: count() }).from(airDrops);

    if (search) {
      dataQuery.where(
        or(
          ilike(airDrops.name, search),
          ilike(airDrops.chain, search),
          ilike(airDrops.reward, search),
          ilike(airDrops.winner, search),
          ilike(airDrops.mission, search),
        ),
      );

      dataCount.where(
        or(
          ilike(airDrops.name, search),
          ilike(airDrops.chain, search),
          ilike(airDrops.reward, search),
          ilike(airDrops.winner, search),
          ilike(airDrops.mission, search),
        ),
      );
    }

    const [data, [{ total }]] = await Promise.all([dataQuery, dataCount]);

    return { data, total, page, take };
  },

  async getById(id: number) {
    return await db.select().from(airDrops).where(eq(airDrops.id, id));
  },

  async getByConditions(params: GetAirDropByConditions) {
    const { page, take, order, orderBy } = {
      ...(params
        ? { ...defaultPagination(), ...params }
        : { ...defaultPagination() }),
    };

    const orderOptions =
      order === 'ASC'
        ? asc((airDrops as any)[orderBy])
        : desc((airDrops as any)[orderBy]);

    const dataQuery = db
      .select({
        ...airDrops,
        detailInfo: {
          ...airDropDetails,
        },
      } as any)
      .from(airDrops)
      .leftJoin(airDropDetails, eq(airDrops.id, airDropDetails.airDropId));
    const dataCount = db.select({ total: count() }).from(airDrops);

    if (params?.duration === 'day') {
      const now = new Date();

      dataQuery
        .where(
          between(
            airDrops.createdAt,
            TimeUtils.getDate24hoursBeforeNow(now),
            now,
          ),
        )
        .orderBy(orderOptions);

      dataCount.where(
        between(
          airDrops.createdAt,
          TimeUtils.getDate24hoursBeforeNow(now),
          now,
        ),
      );
    }

    if (params?.duration === 'week') {
      const now = new Date();

      dataQuery
        .where(
          between(
            airDrops.createdAt,
            TimeUtils.getDateOneWeekBeforeNow(now),
            now,
          ),
        )
        .orderBy(orderOptions);

      dataCount.where(
        between(
          airDrops.createdAt,
          TimeUtils.getDateOneWeekBeforeNow(now),
          now,
        ),
      );
    }

    if (params?.chain) {
      dataQuery.where(eq(airDrops.chain, params.chain)).orderBy(orderOptions);
      dataCount.where(eq(airDrops.chain, params.chain));
    }

    if (params?.isClaimable) {
      dataQuery.where(eq(airDrops.claimable, true)).orderBy(orderOptions);
      dataCount.where(eq(airDrops.claimable, true));
    }

    if (params?.isConfirmed) {
      dataQuery.where(eq(airDrops.confirmed, true)).orderBy(orderOptions);
      dataCount.where(eq(airDrops.confirmed, true));
    }

    if (params?.isHottest) {
      dataQuery.orderBy(desc(airDrops.vote));
    }

    dataQuery.limit(take).offset(skip(take, page));

    const [data, [{ total }]] = await Promise.all([dataQuery, dataCount]);

    return { data, total, page, take };
  },

  async existEntity(id: number) {
    const [{ total }] = await db
      .select({ total: count() })
      .from(airDrops)
      .where(eq(airDrops.id, id));

    return total ? true : false;
  },

  async create(data: {
    airDrop: NewAirDrop;
    airDropDetail: Omit<NewAirDropDetail, 'airDropId'>;
  }) {
    const { airDrop, airDropDetail } = data;

    return await db.transaction(async (tx) => {
      const [{ id: airDropId }] = await tx
        .insert(airDrops)
        .values({ ...airDrop, deadline: new Date(airDrop.deadline) })
        .returning({ id: airDrops.id });

      let airDropDetailId = null;

      if (!ObjUtils.isEmptyObj(airDropDetail)) {
        [{ id: airDropDetailId }] = await tx
          .insert(airDropDetails)
          .values({ ...airDropDetail, airDropId })
          .returning({ id: airDropDetails.id });
      }

      return { airDropId, airDropDetailId };
    });
  },

  async update(data: {
    id: number;
    airDrop: NewAirDrop;
    airDropDetail: Omit<NewAirDropDetail, 'airDropId'>;
  }) {
    const { id, airDrop, airDropDetail } = data;

    return await db.transaction(async (tx) => {
      await tx
        .update(airDrops)
        .set({
          ...airDrop,
        })
        .where(eq(airDrops.id, id));

      if (airDropDetail && !ObjUtils.isEmptyObj(airDropDetail)) {
        await tx
          .update(airDropDetails)
          .set({ ...airDropDetail })
          .where(eq(airDropDetails.airDropId, id));
      }
    });
  },

  async delete(ids: number[]) {
    return await db.transaction(async (tx) => {
      await tx
        .delete(airDropDetails)
        .where(inArray(airDropDetails.airDropId, ids));
      await tx.delete(airDrops).where(inArray(airDrops.id, ids));
    });
  },
};
