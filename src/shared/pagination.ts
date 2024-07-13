import { responseResult } from './response-result';

export function skip(take: number, page: number) {
  return page !== 0 ? take * (page - 1) : 0;
}

export function defaultPagination() {
  return {
    take: 10,
    page: 1,
    order: 'DESC',
    orderBy: 'createdAt',
  };
}

export function paginationResult({
  total,
  data,
  page,
  take,
}: {
  total: number;
  data: any[];
  page: number;
  take: number;
}) {
  return responseResult.success({
    total,
    items: data,
    page,
    take,
  });
}
