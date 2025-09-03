import { API_URL } from '../utils/connection';

export interface Transaction {
  id: string;
  description: string;
  type: string;
  amount: number;
  category: {
    id: string;
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

export async function updateTransaction(
  transactionId: string,
  data: { description: string; amount: number; category: string; date: string }
) {
  const response = await fetch(
    `${API_URL}/transactions/edit/${transactionId}`,
    {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  console.log(data);
  return response.json;
}
