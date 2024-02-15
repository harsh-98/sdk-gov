

import {contractsByNetwork, contractParams, CurveParams} from './src/contracts/contracts'
import {tokenDataByNetwork} from './src/tokens/token'
import {curveTokens} from './src/tokens/curveLP'
import { yearnTokens } from './src/tokens/yearn';
import { convexTokens } from './src/tokens/convex';
import { balancerLpTokens } from './src/tokens/balancer';

let networkName = process.argv[2].toLocaleLowerCase();

type RR = Record<
string,
string | Record<string, string | number | Object>
>
var obj: RR = {};
switch (networkName) {
  case "mainnet":
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
    obj['tokens'] = tokens;

    obj['ids'] = {"cvxFRAX3CRV":32,"cvxsteCRV":25,"cvxcrvFRAX":100,"cvxgusd3CRV":10,"cvxcrvPlain3andSUSD":4,"cvx3Crv":9,"cvxLUSD3CRV":33,"cvxOHMFRAXBP":138,"cvxMIM_3LP3CRV":40,"cvxcrvCRVETH":61,"cvxcrvCVXETH":64,"cvxcrvUSDTWBTCWETH":188,"cvxLDOETH":149}

    let curveSymbols = Object.keys(curveTokens);
    let curvePools = Object.entries(curveTokens).reduce((arr, [curvetoken, data]) =>
      Object.assign(arr, { [curvetoken]: (contractParams[data.pool] as CurveParams).tokens.length })
    , {});
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
    break;
    
    default:
      console.log("wrong network");
      process.exit(1);

}
if (networkName == "mainnet") {
  obj["tokens"]["G-BLOCK"] = "0xf568F6C71aE0439B8d3FFD60Ceba9B1DcB5819bF";
  obj["tokens"]["G-OBS"] = "0x26F7D7509490B292AFBB0443A7A371d345B5f684";
}

console.log(JSON.stringify(change(obj)));

function change(obj: any)  {
if (Array.isArray(obj)) {
  let ans = obj as Array<any>;
  for (let i =0; i < ans.length; i++) {
    ans[i]= change(ans[i]);
  }
  return ans
  } else if (typeof obj == 'object') {
    let ans = obj as Record<string, any>;
    for (const key in ans) {
      let x = change(key);
      if (x != key) {
        ans[x] = ans[key];
        delete ans[key];
      }
     ans[x] = change(ans[x]);
    }
    return ans
   }else  if (typeof obj == 'string') {
      return check(obj as string)
  } else {
    return obj
  }
}
// function change(tokens: RR, oldName: string, newName: string){
//   tokens[newName] = tokens[oldName];
//   delete tokens[oldName];
// }

function removeNotDeployed(obj: Record<string, string>) {
    for (const key in obj) {
      if (obj[key] == 'NOT DEPLOYED') {
        delete obj[key];
      }
    }
}
function check(a : string) {
 let  obj = {
    'CURVE_LUSD_POOL':'LUSD3CRV_POOL',
    'CURVE_FRAX_POOL':'FRAX3CRV_POOL',
    'CURVE_GUSD_POOL':'GUSD3CRV_POOL',
    'CURVE_SUSD_DEPOSIT':'crvPlain3andSUSD_DEPOSIT',
    'CURVE_3CRV_POOL':'3CRV_POOL',
    'UNISWAP_V2_ROUTER':'UNISWAPV2_ROUTER',
    'UNISWAP_V3_ROUTER':'UNISWAPV3_ROUTER',
    'yvCurve_FRAX':'yvCURVE_FRAX',
    'gusd3CRV':'GUSD3CRV',
    '3Crv':'3CRV',
    'sUSD':'SUSD',
    'STETH':'stETH',
  } as Record<string, string>;
  if (obj[a]) {
    return obj[a];
  } else {
    return a;
  }
}