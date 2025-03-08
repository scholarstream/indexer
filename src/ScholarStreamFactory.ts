import { ponder } from "ponder:registry";
import { PayContract } from "ponder:schema";

ponder.on(
  "ScholarStreamFactory:ScholarStreamCreated",
  async ({ event, context }) => {
    console.log(
      `Handling ScholarStreamCreated event from ScholarStreamFactory @ ${event.log.address}`
    );

    await context.db.insert(PayContract).values({
      id: event.args.scholarStream,
      token: event.args.token,
    });
  }
);
