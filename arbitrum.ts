


import {contractsByNetwork, contractParams, CurveParams} from './src/contracts/contracts'
import {tokenDataByNetwork, SupportedToken, TickerInfo, tickerInfoTokensByNetwork} from './src/tokens/token'
import {priceFeedsByToken} from './src/oracles/priceFeeds'
import {curveTokens} from './src/tokens/curveLP'
import { yearnTokens } from './src/tokens/yearn';
import { convexTokens } from './src/tokens/convex';
import { balancerLpTokens } from './src/tokens/balancer';
import { PriceFeedType , PriceFeedData} from './src/oracles/pricefeedType';
import {RR, removeNotDeployed, AA, AAB} from './mainnet';
import {convexLpTokens} from './src/tokens/convex';

export  function arbitrum(obj : RR ) {
  obj['network'] = 'arbitrum';
  //
  var exchanges : Record<string, string>= contractsByNetwork.Arbitrum;
  removeNotDeployed(exchanges);

  // //
  // exchanges['steCRV_POOL'] = '0xDC24316b9AE028F1497c275EB9192a3Ea0f67022';
  // exchanges['UNISWAPV2_FACTORY'] = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  // exchanges['UNISWAPV3_QUOTER'] = '0xb27308f9f90d607463bb33ea1bebb41c27ce5ab6';
  // exchanges['UNISWAPV3_FACTORY'] = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
  // exchanges['GEARBOX_WETH_POOL'] = '0xB03670c20F87f2169A7c4eBE35746007e9575901';
  // exchanges['WETH_GATEWAY'] = '0x4F952c4C5415B2609899AbDC2F8F352F600d14D6';
  // exchanges['GEARBOX_WSTETH_POOL'] = '0xB8cf3Ed326bB0E51454361Fb37E9E8df6DC5C286';
  // exchanges['WSTETH_GATEWAY'] = '0x5a97e3E43dCBFe620ccF7865739075f92E93F5E4';
  obj['exchanges'] =exchanges;
  //
  //
  var tokens: Record<string, string> = tokenDataByNetwork.Arbitrum;
  removeNotDeployed(tokens);

  // //
  tokens['ETH']= '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  obj['tokens'] = tokens;
  //
  {
    obj['farmingPools'] = {} as Record<string, string>;
    // farming tokens
    ['sdUSDCV3', 'sdWETHV3', 'sdWBTCV3', 'sdDAIV3','sdUSDTV3','sdGHOV3'].forEach((t) => {
      if (tokens[t]) {
        (obj['farmingPools'] as Record<string, string>)[t] = tokens[t];
    }
    })
    if (Object.keys(obj['farmingPools']).length == 0) {
      obj['farmingPools']= {
        'sdUSDCV3': '0x608F9e2E8933Ce6b39A8CddBc34a1e3E8D21cE75',
        'sdWETHV3': '0x6773fF780Dd38175247795545Ee37adD6ab6139a',
      };
    }
    // obj['farmingPools']['sdWETHV3'] = '0x6773fF780Dd38175247795545Ee37adD6ab6139a';
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
    var mains =  {} as Record<string, AA>;
    var composite = {} as Record<string, AAB>;
    for (const [token, details] of Object.entries(priceFeedsByToken)) {
      let networkRS= details.Arbitrum;
      if (networkRS == undefined) {
        if  (details.AllNetworks != undefined) {
          networkRS = details.AllNetworks
        } else {
          continue;
        }
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
          token: (tickerInfoTokensByNetwork["Arbitrum"][token as SupportedToken] as Array<TickerInfo>)[0]?.address,
        };
       }
      })
      //
     }
    obj['redstone'] = mains;
    obj['compositeRedstone'] = composite;
  }
}
