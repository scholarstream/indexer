import { onchainTable, relations } from "ponder";

export const PayContract = onchainTable("payContract", (t) => ({
  id: t.text().primaryKey(),
  token: t.text().notNull(),
  vault: t.text().notNull(),
  createdAtTimestamp: t.bigint().notNull(),
}));

export const PayContractRelations = relations(PayContract, ({ many, one }) => ({
  streams: many(Stream),
  token: one(Token, {
    fields: [PayContract.token],
    references: [Token.id],
  }),
  vault: one(Token, {
    fields: [PayContract.vault],
    references: [Token.id],
  }),
  transactions: many(Transaction),
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
  startTimestamp: t.bigint().notNull(),
  lastWithdrawTimestamp: t.bigint().notNull().default(0n),
  amountReceived: t.bigint().notNull().default(0n),
}));

export const StreamRelations = relations(Stream, ({ one, many }) => ({
  payContract: one(PayContract, {
    fields: [Stream.payContract],
    references: [PayContract.id],
  }),
  transactions: many(Transaction),
}));

export const TransactionType = {
  DEPOSIT: "Deposit",
  STREAM_CREATED: "StreamCreated",
  STREAM_CANCELLED: "StreamCancelled",
  WITHDRAW: "Withdraw",
  WITHDRAW_PAYER: "WithdrawPayer",
  PAY_CONTRACT_CREATED: "PayContractCreated",
} as const;

export const Transaction = onchainTable("transaction", (t) => ({
  id: t.text().primaryKey(),
  hash: t.text().notNull(),
  from: t.text().notNull(),
  timestamp: t.bigint().notNull(),
  blockNumber: t.bigint().notNull(),
  to: t.text().notNull(),
  type: t.text().notNull(),
  amount: t.bigint(),
  stream: t.text(),
  payContract: t.text(),
}));

export const TransactionRelations = relations(Transaction, ({ one }) => ({
  stream: one(Stream, {
    fields: [Transaction.stream],
    references: [Stream.id],
  }),
  payContract: one(PayContract, {
    fields: [Transaction.payContract],
    references: [PayContract.id],
  }),
}));
