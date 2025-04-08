import { parseAbiItem } from "abitype";
import { createConfig, factory } from "ponder";

import { http } from "viem";
import { arbitrum, arbitrumSepolia } from "viem/chains";

const factoryEvent = parseAbiItem(
  "event ScholarStreamCreated(address token, address vault, address scholarStream)"
);

const ADDRESS_BOOK = {
  // Only On Arbitrum
  ScholarStreamFactory: "0xE023c88784F331620e1A1c1eCca7002a84348469",
  // Sepolia Arbitrum
  ScholarStreamYieldFactory: "0xCfcA7408e182d3Efe84cC291423a2e67e1423faA",
} as const;

export default createConfig({
  networks: {
    // arbitrum: {
    //   chainId: arbitrum.id,
    //   transport: http(process.env.PONDER_RPC_URL_42161),
    // },
    arbitrumSepolia: {
      chainId: arbitrumSepolia.id,
      transport: http(process.env.PONDER_RPC_URL_421614),
    },
  },
  contracts: {
    ScholarStreamYieldFactory: {
      network: "arbitrumSepolia",
      address: ADDRESS_BOOK.ScholarStreamYieldFactory,
      abi: ScholarStreamYieldFactoryAbi,
      startBlock: 140115232,
    },
    ScholarStreamYield: {
      network: "arbitrumSepolia",
      abi: ScholarStreamYieldAbi,
      startBlock: 140115232,
      address: factory({
        address: ADDRESS_BOOK.ScholarStreamYieldFactory,
        event: factoryEvent,
        parameter: "scholarStream",
      }),
    },

    // ScholarStreamFactory: {
    //   network: "arbitrum",
    //   address: ADDRESS_BOOK.ScholarStreamFactory,
    //   abi: ScholarStreamFactoryAbi,
    //   startBlock: 313753576,
    // },
    // ScholarStream: {
    //   network: "arbitrum",
    //   abi: ScholarStreamAbi,
    //   startBlock: 313753576,
    //   address: factory({
    //     address: ADDRESS_BOOK.ScholarStreamFactory,
    //     event: scholarStreamFactoryEvent,
    //     parameter: "scholarStream",
    //   }),
    // },
  },
});
