import { t } from 'elysia';
import { PaginationSchema } from './pagination';

export const GetAirDropsSchema = t.Object({
  ...PaginationSchema.properties,
  search: t.Optional(t.String()),
});

export const CreateAirDropSchema = t.Array(
  t.Partial(
    t.Object({
      name: t.String(),
      chain: t.String(),
      vote: t.Number(),
      reward: t.String(),
      winner: t.String(),
      mission: t.String(),
      deadline: t.String({
        default: new Date(),
      }),
      confirmed: t.Boolean(),
      claimable: t.Boolean(),
      airDropDetail: t.Partial(
        t.Object({
          step: t.String(),
          image: t.String(),
          banner: t.String(),
          description: t.String(),
          previousPhase: t.String(),
          website: t.String(),
          twitter: t.String(),
          telegram: t.String(),
          discord: t.String(),
          blog: t.String(),
          github: t.String(),
          otherInfo: t.String(),
        }),
      ),
    }),
  ),
);

export const UpdateAirDropSchema = t.Object({
  ...CreateAirDropSchema.items.properties,
  airDropId: t.Number(),
});

export const DeleteAirDropSchema = t.Object({
  airDropIds: t.Array(t.Number()),
});

export const GetNewAirDropSchema = t.Object({
  ...PaginationSchema.properties,
  duration: t.String({
    default: 'day',
    description: "Values can be 'day' or 'week'",
  }),
});

export const GetHottestAirDropSchema = t.Object({
  ...PaginationSchema.properties,
});

export const GetConfirmedAirDropSchema = t.Object({
  ...PaginationSchema.properties,
});

export const GetClaimableAirDropSchema = t.Object({
  ...PaginationSchema.properties,
});

export const GetChainAirDropSchema = t.Object({
  ...PaginationSchema.properties,
  chain: t.String(),
});
