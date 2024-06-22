export interface PaginationParams {
    take: number;
    page: number;
    order: 'ASC' | 'DESC';
    orderBy: string;
} 