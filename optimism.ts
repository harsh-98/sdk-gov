import {
  contractsByNetwork,
  contractParams,
  CurveParams,
} from "./src/contracts/contracts";
import { tokenDataByNetwork } from "./src/tokens/token";
import { priceFeedsByToken } from "./src/oracles/priceFeeds";
import { curveTokens } from "./src/tokens/curveLP";
import { yearnTokens } from "./src/tokens/yearn";
import { convexTokens } from "./src/tokens/convex";
import { balancerLpTokens } from "./src/tokens/balancer";
import { PriceFeedType, PriceFeedData } from "./src/oracles/pricefeedType";
import { RR, removeNotDeployed, AA } from "./mainnet";
import { convexLpTokens } from "./src/tokens/convex";

export function optimism(obj: RR) {
  obj["network"] = "optimism";
  //
  var exchanges: Record<string, string> = contractsByNetwork.Optimism;
  removeNotDeployed(exchanges);
  obj["exchanges"] = exchanges;
  //
  //
  var tokens: Record<string, string> = tokenDataByNetwork.Optimism;
  removeNotDeployed(tokens);

  // //
  tokens["ETH"] = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  obj["tokens"] = tokens;
  //
  {
    obj["farmingPools"] = {} as Record<string, string>;
    // farming tokens
    [
      "sdUSDCV3",
      "sdWETHV3",
      "sdWBTCV3",
      "sdDAIV3",
      "sdUSDTV3",
      "sdGHOV3",
    ].forEach(t => {
      if (tokens[t]) {
        (obj["farmingPools"] as Record<string, string>)[t] = tokens[t];
      }
    });
    // obj['farmingPools']['sdWETHV3'] = '0x6773fF780Dd38175247795545Ee37adD6ab6139a';
  }

  obj["ids"] = {};
  Object.entries(convexLpTokens).forEach(([key, value]) => {
    (obj["ids"] as Record<string, number>)[value.symbol] = value.pid;
  });

  {
    let curveSymbols = Object.keys(curveTokens);
    let curvePools = Object.entries(curveTokens).reduce(
      (arr, [curvetoken, data]) =>
        Object.assign(arr, {
          [curvetoken]: (contractParams[data.pool] as CurveParams).tokens
            .length,
        }),
      {},
    );
    // for liquidator solidity pathfinder
    obj["groups"] = {
      curvePools: curvePools,
      yearnCurveTokens: Object.entries(yearnTokens)
        .filter(([, data]) => curveSymbols.includes(data.underlying))
        .reduce(
          (obj, [token, data]) =>
            Object.assign(obj, { [token]: data.underlying }),
          {},
        ),
      convexCurveTokens: Object.entries(convexTokens)
        .filter(([, data]) => curveSymbols.includes(data.underlying))
        .reduce(
          (obj, [token, data]) =>
            Object.assign(obj, { [token]: data.underlying }),
          {},
        ),
      balancerTokens: Object.entries(balancerLpTokens).reduce(
        (obj, [baltoken, data]) =>
          Object.assign(obj, { [baltoken]: data.underlying.length }),
        {},
      ),
    };
  }
  //

  {
    // redstone
    var mains = {} as Record<string, AA>;
    for (const [token, details] of Object.entries(priceFeedsByToken)) {
      let networkRS = details.Optimism;
      if (networkRS?.Main.type == PriceFeedType.REDSTONE_ORACLE) {
        let main = networkRS?.Main;
        mains[token] = {
          type: main.type,
          dataServiceId: main.dataServiceId,
          dataId: main.dataId,
          signersThreshold: main.signersThreshold,
        };
      }
      if (networkRS?.Reserve?.type == PriceFeedType.REDSTONE_ORACLE) {
        let main = networkRS?.Reserve;
        mains[token] = {
          type: main.type,
          dataServiceId: main.dataServiceId,
          dataId: main.dataId,
          signersThreshold: main.signersThreshold,
        };
      }
    }
    obj["redstone"] = mains;
  }
}
