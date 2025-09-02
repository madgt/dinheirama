import { API_URL } from '../utils/connection';

export interface Transaction {
  id: string;
  description: string;
  type: string;
  amount: number;
  category: {
    name: string;
  };
  date: string;
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  const transactions: Transaction[] = await response.json();
  return transactions;
}

export async function getOneTransaction(
  transactionId: string
): Promise<Transaction> {
  const response = await fetch(`${API_URL}/transactions/${transactionId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction');
  }
  const transaction: Transaction = await response.json();
  return transaction;
}
