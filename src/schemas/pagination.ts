import { t } from "elysia";

export const PaginationSchema = t.Partial(t.Object({
    take: t.Number(),
    page: t.Number(),
    order: t.Enum({ASC: 'ASC', DESC: 'DESC'}),
    orderBy: t.String()
})); 