

import {RR , mainnet} from './mainnet';
import {arbitrum} from './arbitrum';
import {optimism} from './optimism';

let networkName = process.argv[2].toLocaleLowerCase();

function run () {
  var obj: RR = {};
  switch (networkName) {
    case "mainnet":

      mainnet(obj);
      if (networkName == "mainnet") {
        var data = (obj["tokens"] as Record<string, string >);
        data["G-BLOCK"] = "0xf568F6C71aE0439B8d3FFD60Ceba9B1DcB5819bF";
        data["G-OBS"] = "0x26F7D7509490B292AFBB0443A7A371d345B5f684";
      }
      obj = change(obj);
      (((obj.redstone as Record<string, any>)['3CRV'] as Record<string, any>)['dataId'] as string) = '3Crv';
      break;
    case "arbitrum":
      arbitrum(obj);
      obj = change(obj)
      break;
    case "optimism":
      optimism(obj);
      obj = change(obj)
      break;
    default:
        console.log("wrong network");
        process.exit(1);
  }
  console.log(JSON.stringify(obj));
}



run();
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