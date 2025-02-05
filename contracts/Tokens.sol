// SPDX-License-Identifier: UNLICENSED
// Gearbox. Generalized leverage protocol that allows to take leverage and then use it across other DeFi protocols and platforms in a composable way.
// (c) Gearbox Foundation, 2023
pragma solidity ^0.8.17;

/// @dev c-Tokens and LUNA are added for unit test purposes
enum Tokens {
    NO_TOKEN,
    LUNA,
    _1INCH,
    AAVE,
    COMP,
    CRV,
    DAI,
    DPI,
    FEI,
    LINK,
    SNX,
    UNI,
    USDC,
    USDT,
    WBTC,
    WETH,
    YFI,
    WLD,
    OP,
    STETH,
    CVX,
    FRAX,
    FXS,
    LDO,
    LUSD,
    sUSD,
    GUSD,
    LQTY,
    OHM,
    MIM,
    SPELL,
    GMX,
    ARB,
    RDNT,
    BAL,
    SHIB,
    crvUSD,
    MKR,
    RPL,
    APE,
    rETH,
    AURA,
    osETH,
    weETH,
    SWISE,
    ezETH,
    wstETH,
    _3Crv,
    crvFRAX,
    steCRV,
    crvPlain3andSUSD,
    crvCRVETH,
    crvCVXETH,
    crvUSDTWBTCWETH,
    LDOETH,
    crvUSDUSDC,
    crvUSDUSDT,
    crvUSDFRAX,
    crvUSDETHCRV,
    rETH_f,
    wstETHCRV,
    FRAX3CRV,
    LUSD3CRV,
    gusd3CRV,
    MIM_3LP3CRV,
    OHMFRAXBP,
    cvx3Crv,
    cvxcrvFRAX,
    cvxsteCRV,
    cvxFRAX3CRV,
    cvxLUSD3CRV,
    cvxcrvPlain3andSUSD,
    cvxgusd3CRV,
    cvxOHMFRAXBP,
    cvxMIM_3LP3CRV,
    cvxcrvCRVETH,
    cvxcrvCVXETH,
    cvxcrvUSDTWBTCWETH,
    cvxLDOETH,
    cvxcrvUSDUSDC,
    cvxcrvUSDUSDT,
    cvxcrvUSDFRAX,
    cvxcrvUSDETHCRV,
    stkcvx3Crv,
    stkcvxcrvFRAX,
    stkcvxsteCRV,
    stkcvxFRAX3CRV,
    stkcvxLUSD3CRV,
    stkcvxcrvPlain3andSUSD,
    stkcvxgusd3CRV,
    stkcvxOHMFRAXBP,
    stkcvxMIM_3LP3CRV,
    stkcvxcrvCRVETH,
    stkcvxcrvCVXETH,
    stkcvxcrvUSDTWBTCWETH,
    stkcvxLDOETH,
    stkcvxcrvUSDUSDC,
    stkcvxcrvUSDUSDT,
    stkcvxcrvUSDFRAX,
    stkcvxcrvUSDETHCRV,
    yvDAI,
    yvUSDC,
    yvWETH,
    yvWBTC,
    yvUSDT,
    yvOP,
    yvCurve_stETH,
    yvCurve_FRAX,
    _50WETH_50AURA,
    B_80BAL_20WETH,
    _50OHM_50DAI,
    _50OHM_50WETH,
    OHM_wstETH,
    USDC_DAI_USDT,
    B_rETH_STABLE,
    weETH_rETH,
    osETH_wETH_BPT,
    BPT_rETH_ETH,
    BPT_WSTETH_ETH,
    BPT_ROAD,
    ECLP_wstETH_WETH,
    aDAI,
    aUSDC,
    aUSDT,
    aWETH,
    waDAI,
    waUSDC,
    waUSDT,
    waWETH,
    cDAI,
    cUSDC,
    cUSDT,
    cETH,
    cLINK,
    fUSDC,
    sDAI,
    YieldETH,
    auraB_rETH_STABLE,
    auraosETH_wETH_BPT,
    auraweETH_rETH,
    auraBPT_rETH_ETH,
    auraBPT_WSTETH_ETH,
    auraB_rETH_STABLE_vault,
    auraosETH_wETH_BPT_vault,
    auraweETH_rETH_vault,
    auraBPT_rETH_ETH_vault,
    auraBPT_WSTETH_ETH_vault,
    dDAI,
    dUSDC,
    dWBTC,
    dWETH,
    dwstETH,
    dFRAX,
    dUSDCV3,
    dWBTCV3,
    dWETHV3,
    sdUSDCV3,
    sdWBTCV3,
    sdWETHV3,
    GEAR
}

enum TokenType {
    NO_TOKEN,
    NORMAL_TOKEN,
    CURVE_LP_TOKEN,
    YEARN_ON_NORMAL_TOKEN,
    YEARN_ON_CURVE_TOKEN,
    CONVEX_LP_TOKEN,
    CONVEX_STAKED_TOKEN,
    DIESEL_LP_TOKEN,
    GEAR_TOKEN,
    COMPOUND_V2_C_TOKEN,
    BALANCER_LP_TOKEN,
    AAVE_V2_A_TOKEN,
    WRAPPED_AAVE_V2_TOKEN,
    ERC4626_VAULT_TOKEN,
    WRAPPED_TOKEN,
    AURA_LP_TOKEN,
    AURA_STAKED_TOKEN
}
