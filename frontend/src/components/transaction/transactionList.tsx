import { useEffect, useState } from 'react';

import { type Transaction, getTransactions } from '../../data/TransactionData';
import TransactionItem from './TransactionItem';
import GoToHome from '../Home/buttonBackHome';

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTransactions()
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, []);

  console.log(transactions);
  return (
    <section>
      <div>
        <h2>Transactions List</h2>
      </div>
      <table className="table-auto w-full odd:bg-slate-50">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">
              <span className="text-xl">Type</span>
            </th>
            <th className="text-left px-4 py-2">Description</th>
            <th className="text-left px-4 py-2">Amount</th>
            <th className="text-left px-4 py-2">Edit</th>
            <th className="text-left px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          {/* {!categories && <p>No categories found.</p>} */}
          <tr>
            <td colspan={5} className="text-right px-4 py-3">
              <span className="">
                <PencilSquareIcon className="size-6 text-blue-500" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      <GoToHome />
    </section>
  );
}
