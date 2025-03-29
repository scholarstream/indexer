import { ponder } from "ponder:registry";
import {
  Stream,
  StreamStatus,
  Transaction,
  TransactionType,
} from "ponder:schema";
import { zeroAddress } from "viem";

ponder.on("ScholarStream:StreamCreated", async ({ event, context }) => {
  await context.db.insert(Stream).values({
    id: event.args.streamId,
    payContract: event.log.address,
    payer: event.args.from,
    awardee: event.args.to,
    amountPerSec: event.args.amountPerSec,
    status: StreamStatus.ACTIVE,
    streamId: event.args.streamId,
    startTimestamp: event.block.timestamp,
    lastWithdrawTimestamp: event.block.timestamp,
  });

  await context.db.insert(Transaction).values({
    id: event.log.id,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    hash: event.transaction.hash,
    from: event.transaction.from,
    to: event.transaction.to ?? zeroAddress,
    type: TransactionType.STREAM_CREATED,
    amount: 0n,
    stream: event.args.streamId,
    payContract: event.log.address,
  });
});

ponder.on("ScholarStream:StreamCancelled", async ({ event, context }) => {
  await context.db
    .update(Stream, {
      id: event.args.streamId,
    })
    .set({
      status: StreamStatus.CANCELLED,
    });

  await context.db.insert(Transaction).values({
    id: event.log.id,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    hash: event.transaction.hash,
    from: event.transaction.from,
    to: event.transaction.to ?? zeroAddress,
    type: TransactionType.STREAM_CANCELLED,
    amount: 0n,
    stream: event.args.streamId,
    payContract: event.log.address,
  });
});

ponder.on("ScholarStream:Withdraw", async ({ event, context }) => {
  await context.db
    .update(Stream, {
      id: event.args.streamId,
    })
    .set((stream) => ({
      amountReceived: stream.amountReceived + event.args.amount,
      lastWithdrawTimestamp: event.block.timestamp,
    }));

  await context.db.insert(Transaction).values({
    id: event.log.id,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    hash: event.transaction.hash,
    from: event.transaction.from,
    to: event.transaction.to ?? zeroAddress,
    type: TransactionType.WITHDRAW,
    amount: event.args.amount,
    payContract: event.log.address,
    stream: event.args.streamId,
  });
});

// Payer related events
ponder.on("ScholarStream:Deposit", async ({ event, context }) => {
  await context.db.insert(Transaction).values({
    id: event.log.id,
    hash: event.transaction.hash,
    from: event.transaction.from,
    to: event.transaction.to ?? zeroAddress,
    type: TransactionType.DEPOSIT,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    amount: event.args.amount,
    payContract: event.log.address,
  });
});

ponder.on("ScholarStream:WithdrawPayer", async ({ event, context }) => {
  await context.db.insert(Transaction).values({
    id: event.log.id,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    hash: event.transaction.hash,
    from: event.args.payer,
    to: event.args.payer,
    type: TransactionType.WITHDRAW_PAYER,
    amount: event.args.amount,
    payContract: event.log.address,
  });
});
