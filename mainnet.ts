


import {contractsByNetwork, contractParams, CurveParams} from './src/contracts/contracts'
import {tokenDataByNetwork, SupportedToken, TickerInfo, tickerInfoTokensByNetwork} from './src/tokens/token'
import {priceFeedsByToken} from './src/oracles/priceFeeds'
import {curveTokens} from './src/tokens/curveLP'
import { yearnTokens } from './src/tokens/yearn';
import { convexTokens } from './src/tokens/convex';
import { balancerLpTokens } from './src/tokens/balancer';
import { PriceFeedType , PriceFeedData, PriceFeedEntry, PriceFeed} from './src/oracles/pricefeedType';
import {convexLpTokens} from './src/tokens/convex';


export function removeNotDeployed(obj: Record<string, string>) {
  for (const key in obj) {
    if (obj[key] == 'NOT DEPLOYED' || obj[key] == '0xNOT DEPLOYED') {
      delete obj[key];
    }
  }
}

export  type RR = Record<
string,
string | Record<string, string | number | Object>
>;
export  function mainnet(obj : RR ) {
  obj['network'] = 'mainnet';
  //
  var exchanges : Record<string, string>= contractsByNetwork.Mainnet;
  removeNotDeployed(exchanges);

  // //
  exchanges['steCRV_POOL'] = '0xDC24316b9AE028F1497c275EB9192a3Ea0f67022';
  exchanges['UNISWAPV2_FACTORY'] = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  exchanges['UNISWAPV3_QUOTER'] = '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6';
  exchanges['UNISWAPV3_FACTORY'] = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
  exchanges['GEARBOX_WETH_POOL'] = '0xB03670c20F87f2169A7c4eBE35746007e9575901';
  exchanges['WETH_GATEWAY'] = '0x4F952c4C5415B2609899AbDC2F8F352F600d14D6';
  exchanges['GEARBOX_WSTETH_POOL'] = '0xB8cf3Ed326bB0E51454361Fb37E9E8df6DC5C286';
  exchanges['WSTETH_GATEWAY'] = '0x5a97e3E43dCBFe620ccF7865739075f92E93F5E4';
  obj['exchanges'] =exchanges;
  //
  //
  var tokens: Record<string, string> = tokenDataByNetwork.Mainnet;
  removeNotDeployed(tokens);

  // //
  tokens['ETH']= '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  tokens['yvSTETH'] ='0x15a2B3CfaFd696e1C783FE99eed168b78a3A371e';
  tokens['GMX'] ='0x00eee00eee00eee00eee00eee00eee00eee00eee'; // gmx token
  tokens['OP'] ='0x00fff00fff00fff00fff00fff00fff00fff00fff'; // gmx token
  tokens['weETH/ETH'] = '0x8C23b9E4CB9884e807294c4b4C33820333cC613c';
  obj['tokens'] = tokens;
  //
  {
    obj['farmingPools'] = {} as Record<string, string>;
    // farming tokens
     ['sdUSDCV3', 'sdWETHV3', 'sdWBTCV3', 'sdDAIV3','sdUSDTV3','sdGHOV3'].forEach((t) => {
      if (tokens[t] && "NOT DEPLOYED" != tokens[t]) {
        (obj['farmingPools'] as Record<string, string>)[t] = tokens[t];
  }
})
    }

    obj['ids'] = {} ;
    Object.entries(convexLpTokens).forEach(([key, value]) => {
    (obj['ids'] as Record<string, number>)[value.symbol] = value.pid;
    })

    {
      let curveSymbols = Object.keys(curveTokens);
      let curvePools = Object.entries(curveTokens).reduce((arr, [curvetoken, data]) =>
        Object.assign(arr, { [curvetoken]: (contractParams[data.pool] as CurveParams).tokens.length })
      , {});
  // for liquidator solidity pathfinder
  obj['groups'] = {
    'curvePools' : curvePools,
    'yearnCurveTokens': Object.entries(yearnTokens)
    .filter(([, data]) => curveSymbols.includes(data.underlying))
    .reduce((obj, [token, data]) => 
      Object.assign(obj, { [token]: data.underlying }),
      {}),
    'convexCurveTokens': Object.entries(convexTokens)
    .filter(([, data]) => curveSymbols.includes(data.underlying))
    .reduce((obj, [token, data]) => 
      Object.assign(obj, { [token]: data.underlying }),
      {}),
    'balancerTokens': Object.entries(balancerLpTokens).reduce((obj, [baltoken, data]) =>
      Object.assign(obj, { [baltoken]: data.underlying.length })
    ,{}),
  }
    }
  //

  { // redstone 
    var mains ={
      osETH: {
      type: 15,
      dataServiceId: 'redstone-primary-prod',
      dataId: 'osETH',
      signersThreshold: 5,
    },
    weETH: {
      type: 15,
      dataServiceId: 'redstone-primary-prod',
      dataId: 'weETH',
      signersThreshold: 5,
    },
    ezETH: {
      type: 15,
      dataServiceId: 'redstone-primary-prod',
      dataId: 'ezETH',
      signersThreshold: 5,
    }
   } as Record<string, AA>;
   var composite = {} as Record<string, AAB>;
    for (const [token, details] of Object.entries(priceFeedsByToken)) {
     let networkRS = details.Mainnet;
     if (networkRS == undefined) {
        continue;
     }
     var  fields = [networkRS?.Main as PriceFeedData];
     if (networkRS?.Reserve != undefined) {
        fields.push(networkRS?.Reserve) ;
     }
     //

     fields.forEach((main) => {
      if (main.type == PriceFeedType.REDSTONE_ORACLE) {
        mains[token] = {
          type:main.type,
          dataServiceId:main.dataServiceId,
          dataId: main.dataId,
          signersThreshold:main.signersThreshold
        };
      }
      //
      if (main.type == PriceFeedType.COMPOSITE_ORACLE && main.targetToBasePriceFeed.type == PriceFeedType.REDSTONE_ORACLE) {
        let target = main.targetToBasePriceFeed;
        composite[token] = {
          type:target.type,
          dataServiceId:target.dataServiceId,
          dataId: target.dataId,
          signersThreshold:target.signersThreshold,
          token: (tickerInfoTokensByNetwork["Mainnet"][token as SupportedToken] as TickerInfo).address,
        };
      }
     })
     //
    }
    mains['weETH/ETH'] = {
      type: PriceFeedType.REDSTONE_ORACLE,
      dataServiceId:'redstone-primary-prod',
      dataId: 'weETH_FUNDAMENTAL',
      signersThreshold:5,
    };
    obj['redstone'] = mains;
    obj['compositeRedstone'] = composite;
  }
}

export type AA =  {
  type: number;
  dataServiceId: string;
  dataId: string;
  signersThreshold: number; 
}
export type AAB =  {
  type: number;
  dataServiceId: string;
  dataId: string;
  signersThreshold: number; 
  token: string;
}