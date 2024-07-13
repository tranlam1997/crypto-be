import { PaginationParams } from './pagination';

export interface GetAirDropsQuery extends PaginationParams {
  search?: string;
}

export interface CreateAirDropsBody {
  name?: string;
  chain?: string;
  vote?: number;
  reward?: string;
  winner?: string;
  mission?: string;
  deadline?: Date;
  confirmed?: boolean;
  claimable?: boolean;
  airDropDetail: {
    image?: string;
    banner?: string;
    step?: string;
    description?: string;
    previousPhase?: string;
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    blog?: string;
    github?: string;
    otherInfo?: any;
  };
}

export interface UpdateAirDropBody extends CreateAirDropsBody {
  airDropId: number;
}

export interface DeleteAirDropsBody {
  airDropIds: number[];
}

export interface GetAirDropByConditions extends PaginationParams {
  duration?: 'day' | 'week';
  chain?: string;
  isHottest?: boolean;
  isClaimable?: boolean;
  isConfirmed?: boolean;
}

export interface GetNewAirDropsQuery extends PaginationParams {
  duration: 'day' | 'week';
}

export interface GetHottestAirDropsQuery extends PaginationParams {}

export interface GetConfirmedAirDropsQuery extends PaginationParams {}

export interface GetClaimableAirDropsQuery extends PaginationParams {}

export interface GetChainAirDropsQuery extends PaginationParams {
  chain: string;
}

