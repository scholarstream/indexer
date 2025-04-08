import { parseAbiItem } from "abitype";
import { createConfig, factory } from "ponder";
import { http } from "viem";
import { arbitrumSepolia, eduChain } from "viem/chains";
import { ScholarStreamYieldFactoryAbi } from "./abis/ScholarStreamYieldFactoryAbi";
import { ScholarStreamYieldAbi } from "./abis/ScholarStreamYieldAbi";

const factoryEvent = parseAbiItem(
  "event ScholarStreamCreated(address token, address vault, address scholarStream)"
);

const ADDRESS_BOOK = {
  // Only On Arbitrum
  ScholarStreamFactory: "0xE023c88784F331620e1A1c1eCca7002a84348469",
  // Sepolia Arbitrum
  // ScholarStreamYieldFactory: "0xCfcA7408e182d3Efe84cC291423a2e67e1423faA",
  // EduChain
  ScholarStreamYieldFactory: "0xd1692D06C088a71dcD8f056923469747331a7444",
} as const;

export default createConfig({
  networks: {
    // arbitrum: {
    //   chainId: arbitrum.id,
    //   transport: http(process.env.PONDER_RPC_URL_42161),
    // },
    educhain: {
      chainId: eduChain.id,
      transport: http(process.env.PONDER_RPC_URL_41923),
    },
  },
  contracts: {
    ScholarStreamYieldFactory: {
      network: "educhain",
      address: ADDRESS_BOOK.ScholarStreamYieldFactory,
      abi: ScholarStreamYieldFactoryAbi,
      startBlock: 11594119,
    },
    ScholarStreamYield: {
      network: "educhain",
      abi: ScholarStreamYieldAbi,
      startBlock: 11594119,
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
