import {
  NetworkType,
  SupportedContract,
  SupportedToken,
} from "@gearbox-protocol/sdk";
import { BalancerLPToken } from "@gearbox-protocol/sdk/lib/tokens/balancer";

import { AdapterConfig } from "./adapters";
import { LinearIRMParams } from "./linearIRM";

export interface RatesAndLimits {
  minRate: number;
  maxRate: number;
  quotaIncreaseFee: number;
  limit: bigint;
}

export interface CollateralToken {
  token: SupportedToken;
  lt: number;
}

export interface CreditManagerV3DeployConfig {
  degenNft: boolean;
  minDebt: bigint;
  maxDebt: bigint;
  expirationDate?: number;
  collateralTokens: Array<CollateralToken>;
  adapters: Array<AdapterConfig>;
  poolLimit: bigint;
}

export interface PoolV3DeployConfig {
  id: string;
  symbol: string;
  name: string;
  network: NetworkType;

  underlying: SupportedToken;
  supportsQuotas: boolean;
  accountAmount: bigint;

  irm: LinearIRMParams;
  expectedLiquidityLimit: bigint;
  withdrawalFee: number;

  ratesAndLimits: Partial<Record<SupportedToken, RatesAndLimits>>;

  creditManagers: Array<CreditManagerV3DeployConfig>;
}
