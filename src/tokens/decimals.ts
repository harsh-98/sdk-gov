import { SupportedToken } from "./token";

export const decimals: Record<SupportedToken, number> = {
  "1INCH": 18,
  AAVE: 18,
  COMP: 18,
  CRV: 18,
  DAI: 18,
  DPI: 18,
  FEI: 18,
  LINK: 18,
  SNX: 18,
  UNI: 18,
  USDC: 6,
  USDC_e: 6,
  USDT: 6,
  WBTC: 8,
  WETH: 18,
  YFI: 18,
  STETH: 18,
  wstETH: 18,
  CVX: 18,
  FRAX: 18,
  FXS: 18,
  LDO: 18,
  LUSD: 18,
  sUSD: 18,
  GUSD: 2,
  LQTY: 18,
  OHM: 9,
  MIM: 18,
  SPELL: 18,
  GMX: 18,
  ARB: 18,
  RDNT: 18,
  BAL: 18,
  MKR: 18,
  RPL: 18,
  APE: 18,
  AURA: 18,
  SWISE: 18,
  WLD: 18,
  OP: 18,
  GHO: 18,
  osETH: 18,
  weETH: 18,
  ezETH: 18,
  rsETH: 18,
  frxETH: 18,
  sfrxETH: 18,
  rswETH: 18,
  cbETH: 18,
  USDe: 18,
  PENDLE: 18,
  "3Crv": 18,
  crvFRAX: 18,
  OHMFRAXBP: 18,
  steCRV: 18,
  crvPlain3andSUSD: 18,
  FRAX3CRV: 18,
  LUSD3CRV: 18,
  gusd3CRV: 18,
  MIM_3LP3CRV: 18,
  crvCRVETH: 18,
  crvCVXETH: 18,
  crvUSDTWBTCWETH: 18,
  LDOETH: 18,
  USDeUSDC: 18,
  FRAXUSDe: 18,
  USDecrvUSD: 18,
  USDeDAI: 18,
  MtEthena: 18,
  GHOUSDe: 18,
  wstETHCRV: 18,
  crvUSD: 18,
  crvUSDUSDC: 18,
  crvUSDUSDT: 18,
  crvUSDETHCRV: 18,
  crvUSDFRAX: 18,
  crvUSDC: 18,
  crvUSDC_e: 18,
  crvUSDT: 18,
  "2CRV": 18,
  "3c-crvUSD": 18,
  "3CRV": 18,
  cvx3Crv: 18,
  cvxcrvFRAX: 18,
  cvxsteCRV: 18,
  cvxFRAX3CRV: 18,
  cvxLUSD3CRV: 18,
  cvxcrvPlain3andSUSD: 18,
  cvxgusd3CRV: 18,
  cvxOHMFRAXBP: 18,
  cvxMIM_3LP3CRV: 18,
  cvxcrvCRVETH: 18,
  cvxcrvCVXETH: 18,
  cvxcrvUSDTWBTCWETH: 18,
  cvxLDOETH: 18,
  cvxcrvUSDUSDC: 18,
  cvxcrvUSDUSDT: 18,
  cvxcrvUSDFRAX: 18,
  cvxcrvUSDETHCRV: 18,
  stkcvx3Crv: 18,
  stkcvxcrvFRAX: 18,
  stkcvxsteCRV: 18,
  stkcvxFRAX3CRV: 18,
  stkcvxLUSD3CRV: 18,
  stkcvxcrvPlain3andSUSD: 18,
  stkcvxgusd3CRV: 18,
  stkcvxOHMFRAXBP: 18,
  stkcvxMIM_3LP3CRV: 18,
  stkcvxcrvCRVETH: 18,
  stkcvxcrvCVXETH: 18,
  stkcvxcrvUSDTWBTCWETH: 18,
  stkcvxLDOETH: 18,
  stkcvxcrvUSDUSDC: 18,
  stkcvxcrvUSDUSDT: 18,
  stkcvxcrvUSDFRAX: 18,
  stkcvxcrvUSDETHCRV: 18,
  yvDAI: 18,
  yvUSDC: 6,
  yvUSDT: 6,
  yvOP: 18,
  yvWETH: 18,
  yvWBTC: 8,
  yvCurve_stETH: 18,
  yvCurve_FRAX: 18,

  dDAI: 18,
  dUSDC: 6,
  dWBTC: 8,
  dWETH: 18,
  dFRAX: 18,
  dwstETH: 18,

  dUSDCV3: 6,
  dWBTCV3: 8,
  dWETHV3: 18,
  sdUSDCV3: 6,
  sdWBTCV3: 8,
  sdWETHV3: 18,

  dUSDTV3: 6,
  dGHOV3: 18,
  dDAIV3: 18,
  sdUSDTV3: 6,
  sdGHOV3: 18,
  sdDAIV3: 18,

  GEAR: 18,

  "50OHM_50DAI": 18,
  "50OHM_50WETH": 18,
  OHM_wstETH: 18,
  USDC_DAI_USDT: 18,
  BPT_rETH_ETH: 18,
  BPT_ROAD: 18,
  BPT_WSTETH_ETH: 18,
  ECLP_wstETH_WETH: 18,
  B_rETH_STABLE: 18,
  weETH_rETH: 18,
  osETH_wETH_BPT: 18,
  B_80BAL_20WETH: 18,
  "50WETH_50AURA": 18,
  wstETH_rETH_cbETH: 18,
  wstETH_rETH_sfrxETH: 18,
  wstETH_WETH_BPT: 18,
  rETH_WETH_BPT: 18,
  ezETH_WETH_BPT: 18,
  weETH_ezETH_rswETH: 18,
  "33AURA_33ARB_33BAL": 18,
  GHO_USDT_USDC: 18,

  auraB_rETH_STABLE: 18,
  auraB_rETH_STABLE_vault: 18,
  auraweETH_rETH: 18,
  auraweETH_rETH_vault: 18,
  auraosETH_wETH_BPT: 18,
  auraosETH_wETH_BPT_vault: 18,
  auraBPT_rETH_ETH: 18,
  auraBPT_rETH_ETH_vault: 18,
  auraBPT_WSTETH_ETH: 18,
  auraBPT_WSTETH_ETH_vault: 18,
  aurarETH_WETH_BPT: 18,
  aurarETH_WETH_BPT_vault: 18,
  aurawstETH_rETH_cbETH: 18,
  aurawstETH_rETH_cbETH_vault: 18,
  aurawstETH_rETH_sfrxETH: 18,
  aurawstETH_rETH_sfrxETH_vault: 18,
  aurawstETH_WETH_BPT: 18,
  aurawstETH_WETH_BPT_vault: 18,

  aDAI: 18,
  aUSDC: 6,
  aUSDT: 6,
  aWETH: 18,
  waDAI: 18,
  waUSDC: 6,
  waUSDT: 6,
  waWETH: 18,
  cDAI: 18,
  cUSDC: 6,
  cUSDT: 6,
  cLINK: 18,
  cETH: 18,
  SHIB: 18,
  fUSDC: 8,
  sDAI: 18,
  sUSDe: 18,
  YieldETH: 18,
  rETH: 18,
  rETH_f: 18,
};
