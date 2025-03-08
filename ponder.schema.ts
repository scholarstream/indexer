import { onchainTable } from "ponder";

export const PayContract = onchainTable("payContract", (t) => ({
  id: t.text().primaryKey(),
  token: t.text(),
}));
