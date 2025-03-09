import { onchainTable, relations } from "ponder";

export const PayContract = onchainTable("payContract", (t) => ({
  id: t.text().primaryKey(),
  tokenId: t.text().notNull(),
}));

export const PayContractRelations = relations(PayContract, ({ many, one }) => ({
  streams: many(Stream),
  token: one(Token, {
    fields: [PayContract.tokenId],
    references: [Token.id],
  }),
}));

export const Token = onchainTable("token", (t) => ({
  id: t.text().primaryKey(),
  name: t.text().notNull(),
  symbol: t.text().notNull(),
  decimals: t.integer().notNull(),
}));

export const StreamStatus = {
  ACTIVE: "active",
  CANCELLED: "cancelled",
} as const;

export const Stream = onchainTable("stream", (t) => ({
  id: t.text().primaryKey(),
  payContract: t.text().notNull(),
  payer: t.text().notNull(),
  awardee: t.text().notNull(),
  status: t.text().notNull(),
  amountPerSec: t.bigint().notNull(),
  streamId: t.text().notNull(),
  amountReceived: t.bigint().notNull().default(0n),
}));

export const StreamRelations = relations(Stream, ({ one }) => ({
  payContract: one(PayContract, {
    fields: [Stream.payContract],
    references: [PayContract.id],
  }),
}));

// event Deposit(address indexed payer, uint256 amount);
// event StreamCreated(address indexed from, address indexed to, uint256 amountPerSec, bytes32 streamId);
// event StreamCancelled(address indexed from, address indexed to, uint256 amountPerSec, bytes32 streamId);
// event Withdraw(address indexed from, address indexed to, uint256 amount, bytes32 streamId);
// event WithdrawPayer(address indexed payer, uint256 amount);

export const Transaction = onchainTable("transaction", (t) => ({
  id: t.text().primaryKey(),
  stream: t.text(),
  payer: t.text(),
  awardee: t.text(),
  amount: t.bigint(),
}));
