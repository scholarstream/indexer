import { ponder } from "ponder:registry";
import { PayContract, Token } from "ponder:schema";
import { erc20Abi } from "viem";

ponder.on(
  "ScholarStreamFactory:ScholarStreamCreated",
  async ({ event, context }) => {
    console.log(
      `Handling ScholarStreamCreated event from ScholarStreamFactory @ ${event.log.address}`
    );

    // Fetch token data from the blockchain
    const [name, symbol, decimals] = await context.client.multicall({
      allowFailure: false,
      contracts: [
        {
          abi: erc20Abi,
          address: event.args.token,
          functionName: "name",
        },
        {
          abi: erc20Abi,
          address: event.args.token,
          functionName: "symbol",
        },
        {
          abi: erc20Abi,
          address: event.args.token,
          functionName: "decimals",
        },
      ],
    });

    // Create the Token
    await context.db.insert(Token).values({
      id: event.args.token,
      name,
      symbol,
      decimals,
    });

    // Create the PayContract with reference to the token
    await context.db.insert(PayContract).values({
      id: event.args.scholarStream,
      tokenId: event.args.token,
    });
  }
);
