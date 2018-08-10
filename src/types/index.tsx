export interface ITransaction {
  id: string;
  amount: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITransactions {
  transactions: ITransaction[];
}