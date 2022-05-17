export interface TransactionHistory {
  transactionId: number;
  transactionDate: string;
  status: number;
  description: string;
  account: Account;
  pointChange: number;
}
