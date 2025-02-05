import type { ERC4626VaultContract } from "../contracts/contracts";
import { TradeAction, TradeType } from "../pathfinder/tradeTypes";
import { PartialRecord } from "../utils/types";
import type { CurveLPToken } from "./curveLP";
import { NormalToken } from "./normal";
import type { TokenBase } from "./token";
import { TokenNetwork, TokenType } from "./tokenType";

export type ERC4626LPToken = "sDAI" | "YieldETH";

export type ERC4626VaultTokenData = {
  symbol: ERC4626LPToken;
  type: PartialRecord<TokenNetwork, TokenType.ERC4626_VAULT_TOKEN>;
  underlying: NormalToken;
  vault: ERC4626VaultContract;
} & TokenBase;

export type ERC4626VaultOfCurveLPTokenData = {
  symbol: ERC4626LPToken;
  type: PartialRecord<TokenNetwork, TokenType.ERC4626_VAULT_TOKEN>;
  underlying: CurveLPToken;
  vault: ERC4626VaultContract;
} & TokenBase;

export const erc4626Tokens: Record<
  ERC4626LPToken,
  ERC4626VaultTokenData | ERC4626VaultOfCurveLPTokenData
> = {
  // YEARN TOKENS
  sDAI: {
    name: "Maker DSR",
    symbol: "sDAI",
    type: { AllNetworks: TokenType.ERC4626_VAULT_TOKEN },
    underlying: "DAI",
    vault: "MAKER_DSR_VAULT",
  },

  YieldETH: {
    name: "Yearn yvUSDC",
    symbol: "YieldETH",
    type: { AllNetworks: TokenType.ERC4626_VAULT_TOKEN },
    underlying: "WETH",
    vault: "YIELD_ETH_VAULT",
  },
};

export const isERC4626LPToken = (t: unknown): t is ERC4626LPToken =>
  typeof t === "string" && !!erc4626Tokens[t as ERC4626LPToken];
