import { NetworkType } from "../core/chains";
import { NOT_DEPLOYED } from "../core/constants";

export const ADDRESS_PROVIDER: Record<NetworkType, string> = {
  Mainnet: "0x9ea7b04Da02a5373317D745c1571c84aaD03321D",
  Arbitrum: NOT_DEPLOYED,
  Optimism: NOT_DEPLOYED,
};

export const TIMELOCK: Record<NetworkType, string> = {
  Mainnet: "0xa133C9A92Fb8dDB962Af1cbae58b2723A0bdf23b",
  Arbitrum: NOT_DEPLOYED,
  Optimism: NOT_DEPLOYED,
};

export const GOVERNOR: Record<NetworkType, string> = {
  Mainnet: "0x29B97F37B3E0C704bCFD785F5b7bBa2A0B7df2c7",
  Arbitrum: NOT_DEPLOYED,
  Optimism: NOT_DEPLOYED,
};

export const BLACKLIST_HELPER: Record<NetworkType, string> = {
  Mainnet: "0xFfbF344741654a1B9Ab1286Cf05A42f275F67839",
  Arbitrum: NOT_DEPLOYED,
  Optimism: NOT_DEPLOYED,
};

export const DEGEN_NFT: Record<NetworkType, string> = {
  Mainnet: "0xB829a5b349b01fc71aFE46E50dD6Ec0222A6E599",
  Arbitrum: NOT_DEPLOYED,
  Optimism: NOT_DEPLOYED,
};

export const CREATE2FACTORY: Record<NetworkType, string> = {
  Mainnet: "0x45d146CAA25aa565Cfc7434926633f4F1C97c873",
  Arbitrum: NOT_DEPLOYED,
  Optimism: NOT_DEPLOYED,
};

export const MULTISIG: Record<NetworkType, string> = {
  Mainnet: "0xA7D5DDc1b8557914F158076b228AA91eF613f1D5",
  Arbitrum: NOT_DEPLOYED,
  Optimism: "0x8bA8cd6D00919ceCc19D9B4A2c8669a524883C4c",
};

export const VETO_ADMIN: Record<NetworkType, string> = {
  Mainnet: "0xbb803559B4D58b75E12dd74641AB955e8B0Df40E",
  Arbitrum: NOT_DEPLOYED,
  Optimism: "0x9744f76dc5239Eb4DC2CE8D5538e1BA89C8FA90f",
};

export const TREASURY: Record<NetworkType, string> = {
  Mainnet: "0x7b065fcb0760df0cea8cfd144e08554f3cea73d1",
  Arbitrum: NOT_DEPLOYED,
  Optimism: "0x1ACc5BC353f23B901801f3Ba48e1E51a14263808",
};
