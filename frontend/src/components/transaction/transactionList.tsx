import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { type Transaction, getTransactions } from '../../data/transactionData';
import TransactionItem from './transactionItem';
import GoToHome from '../Home/buttonBackHome';

export default function TransactionsList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const flash = (
    location.state as {
      flash?: { type: 'success' | 'error'; message: string };
    } | null
  )?.flash;

  useEffect(() => {
    setLoading(true);
    getTransactions()
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(
      () => navigate('.', { replace: true, state: null }),
      2800
    );
    return () => clearTimeout(t);
  }, [flash, navigate]);

  // console.log(transactions);
  return (
    <section>
      <div>
        <h2>Transactions List</h2>
      </div>
      {flash?.type === 'success' && (
        <div className="mb-4 rounded-lg bg-green-100 text-green-800 px-4 py-2">
          {flash.message}
        </div>
      )}
      {flash?.type === 'error' && (
        <div className="mb-4 rounded-lg bg-red-100 text-red-800 px-4 py-2">
          {flash.message}
        </div>
      )}
      <table className="table-auto w-full odd:bg-slate-50">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">
              <span className="text-xl">Type</span>
            </th>
            <th className="text-left px-4 py-2">Description</th>
            <th className="text-left px-4 py-2">Amount</th>
            <th className="text-left px-4 py-2">Date</th>
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
            <td colSpan={5} className="text-right px-4 py-3">
              <span className="">+ transaction</span>
            </td>
          </tr>
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      <GoToHome />
    </section>
  );
}
