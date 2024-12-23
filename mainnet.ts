


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
  let tmpTokens = {
    'COMP': '0xc00e94Cb662C3520282E6f5717214004A7f26888',
'DPI': '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b',
'FEI': '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
'OHM': '0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5',
'MIM': '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
'SPELL': '0x090185f2135308BaD17527004364eBcC2D37e5F6',
'OHMFRAXBP': '0x5271045F7B73c17825A7A7aee6917eE46b0B7520',
'MIM_3LP3CRV': '0x5a6A4D54456819380173272A5E8E9B9904BdF41B',
'cvxOHMFRAXBP': '0xd8F1B275c320819c7D752ef79988d0780bf00446',
'cvxMIM_3LP3CRV': '0xabB54222c2b77158CC975a2b715a3d703c256F05',
'stkcvxOHMFRAXBP': '0x888407AabAfa936B90acF65C4Db19370A01d9bd8',
'stkcvxMIM_3LP3CRV': '0x1aAbe1B22a290cCB39FD77440D5eb96Cf40079f4',
'50OHM_50DAI': '0x76FCf0e8C7Ff37A47a799FA2cd4c13cDe0D981C9',
'50OHM_50WETH': '0xD1eC5e215E8148D76F4460e4097FD3d5ae0A3558',
'OHM_wstETH': '0xd4f79CA0Ac83192693bce4699d0c10C66Aa6Cf0F',
'CURVE_MIM_POOL': '0x5a6A4D54456819380173272A5E8E9B9904BdF41B',
'CURVE_OHMFRAXBP_POOL': '0xFc1e8bf3E81383Ef07Be24c3FD146745719DE48D',
'CONVEX_OHMFRAXBP_POOL': '0x27A8c58e3DE84280826d615D80ddb33930383fE9',
'CONVEX_MIM3CRV_POOL': '0xFd5AbF66b003881b88567EB9Ed9c651F14Dc4771',
'scrvUsUSDe': '0xd29f8980852c2c76fC3f6E96a7Aa06E0BedCC1B1',

  };
  for (const [key, value] of Object.entries(tmpTokens)) {
    console.log("here");
    tokens[key] = value;
  }

  obj['tokens'] = tokens;
  //
  {
    obj['farmingPools'] = {} as Record<string, string>;
    // farming tokens
     ['sdUSDCV3', 'sdWETHV3', 'sdWBTCV3', 'sdDAIV3','sdUSDTV3','sdGHOV3', 'sdcrvUSDV3'].forEach((t) => {
      if (tokens[t] && "NOT DEPLOYED" != tokens[t]) {
        (obj['farmingPools'] as Record<string, string>)[t] = tokens[t];
  }
})
    }

    obj['ids'] = {} ;
    Object.entries(convexLpTokens).forEach(([key, value]) => {
    (obj['ids'] as Record<string, number>)[value.symbol] = value.pid;
    })
    Object.entries({
      'cvxOHMFRAXBP': 138,
'cvxMIM_3LP3CRV': 40,
'MIM_3LP3CRV': 2,
'OHMFRAXBP': 2,
    }).forEach(([key, value]) => {
    (obj['ids'] as Record<string, number>)[key] =value;
    })

    {
      let curveSymbols = Object.keys(curveTokens);
      let curvePools = Object.entries(curveTokens).reduce((arr, [curvetoken, data]) =>
        Object.assign(arr, { [curvetoken]: (contractParams[data.pool] as CurveParams).tokens.length })
      , {});
  // for liquidator solidity pathfinder
  obj['groups'] = {
    'curvePools' : {
      ...curvePools, 'scrvUsUSDe': 2,
},
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
    Object.entries({
      'cvxOHMFRAXBP': 'OHMFRAXBP',
'cvxMIM_3LP3CRV': 'MIM_3LP3CRV',
'stkcvxOHMFRAXBP': 'OHMFRAXBP',
'stkcvxMIM_3LP3CRV': 'MIM_3LP3CRV',
    }).forEach(([key, value]) => {
     ( (obj['groups']as Record<string, string | number | Object>)['convexCurveTokens'] as Record<string, string>)[key] = value;
    });

    Object.entries({
      'OHM_wstETH': 2,
'50OHM_50DAI': 2,
'50OHM_50WETH': 2,
    }).forEach(([key, value]) => {
      ((obj['groups']as Record<string, string | number | Object>)['balancerTokens'] as Record<string, number>)[key] = value;
    });
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
          token: (tickerInfoTokensByNetwork["Mainnet"][token as SupportedToken] as Array<TickerInfo>)[0].address,
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
    mains['stETH'] =      {
            type: 15,
            dataServiceId: 'redstone-primary-prod',
            dataId: 'stETH',
            signersThreshold: 5,
          };
          mains['WBTC'].dataId= 'BTC';
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