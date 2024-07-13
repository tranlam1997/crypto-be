import { t } from "elysia";

export const PaginationSchema = t.Partial(
  t.Object({
    take: t.Numeric({
      default: 10,
    }),
    page: t.Numeric({
      default: 1,
    }),
    order: t.Enum({ ASC: 'ASC', DESC: 'DESC' }, { default: 'DESC' }),
    orderBy: t.String({ default: 'createdAt' }),
  }),
); 