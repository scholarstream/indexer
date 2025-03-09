import { parseAbiItem } from "abitype";
import { createConfig, factory } from "ponder";

import { http } from "viem";
import { arbitrum } from "viem/chains";
import { ScholarStreamAbi } from "./abis/ScholarStreamAbi";
import { ScholarStreamFactoryAbi } from "./abis/ScholarStreamFactoryAbi";

const scholarStreamFactoryEvent = parseAbiItem(
  "event ScholarStreamCreated(address token, address scholarStream)"
);

const ADDRESS_BOOK = {
  ScholarStreamFactory: "0xE023c88784F331620e1A1c1eCca7002a84348469",
} as const;

export default createConfig({
  networks: {
    arbitrum: {
      chainId: arbitrum.id,
      transport: http(process.env.PONDER_RPC_URL_42161),
    },
  },
  contracts: {
    ScholarStreamFactory: {
      network: "arbitrum",
      address: ADDRESS_BOOK.ScholarStreamFactory,
      abi: ScholarStreamFactoryAbi,
      startBlock: 313753576,
    },
    ScholarStream: {
      network: "arbitrum",
      abi: ScholarStreamAbi,
      startBlock: 313753576,
      address: factory({
        address: ADDRESS_BOOK.ScholarStreamFactory,
        event: scholarStreamFactoryEvent,
        parameter: "scholarStream",
      }),
    },
  },
});
