import { ponder } from "ponder:registry";
import { Stream, StreamStatus } from "ponder:schema";

ponder.on("ScholarStream:StreamCreated", async ({ event, context }) => {
  await context.db.insert(Stream).values({
    id: event.args.streamId,
    payContract: event.log.address,
    payer: event.args.from,
    awardee: event.args.to,
    amountPerSec: event.args.amountPerSec,
    status: StreamStatus.ACTIVE,
    streamId: event.args.streamId,
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
});

ponder.on("ScholarStream:Withdraw", async ({ event, context }) => {
  await context.db
    .update(Stream, {
      id: event.args.streamId,
    })
    .set((stream) => ({
      amountReceived: stream.amountReceived + event.args.amount,
    }));
});

// Payer related events
ponder.on("ScholarStream:Deposit", async ({ event, context }) => {});
ponder.on("ScholarStream:WithdrawPayer", async ({ event, context }) => {});
