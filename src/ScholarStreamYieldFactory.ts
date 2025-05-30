import { ponder } from "ponder:registry";
import {
  PayContract,
  Token,
  Transaction,
  TransactionType,
} from "ponder:schema";
import { erc20Abi, zeroAddress } from "viem";

ponder.on(
  "ScholarStreamYieldFactory:ScholarStreamCreated",
  async ({ event, context }) => {
    console.log(
      `Handling ScholarStreamCreated event from ScholarStreamYieldFactory @ ${event.log.address}`
    );

    // Fetch token data from the blockchain
    const name = await context.client.readContract({
      abi: erc20Abi,
      address: event.args.token,
      functionName: "name",
    });

    const symbol = await context.client.readContract({
      abi: erc20Abi,
      address: event.args.token,
      functionName: "symbol",
    });

    const decimals = await context.client.readContract({
      abi: erc20Abi,
      address: event.args.token,
      functionName: "decimals",
    });

    // Fetch token data from the blockchain
    const vaultName = "Staked Mock USDC";
    const vaultSymbol = "sUSDC";
    const vaultDecimals = 18;

    // Create the Token
    await context.db
      .insert(Token)
      .values({
        id: event.args.token,
        name,
        symbol,
        decimals,
      })
      .onConflictDoNothing();

    // Create the Vault Token
    await context.db
      .insert(Token)
      .values({
        id: event.args.vault,
        name: vaultName,
        symbol: vaultSymbol,
        decimals: vaultDecimals,
      })
      .onConflictDoNothing();

    // Create the PayContract with reference to the token
    await context.db.insert(PayContract).values({
      id: event.args.scholarStream,
      token: event.args.token,
      vault: event.args.vault,
      createdAtTimestamp: event.block.timestamp,
    });

    await context.db.insert(Transaction).values({
      id: event.log.id,
      blockNumber: event.block.number,
      timestamp: event.block.timestamp,
      hash: event.transaction.hash,
      from: event.transaction.from,
      to: event.transaction.to ?? zeroAddress,
      type: TransactionType.PAY_CONTRACT_CREATED,
      amount: 0n,
      payContract: event.args.scholarStream,
    });
  }
);
