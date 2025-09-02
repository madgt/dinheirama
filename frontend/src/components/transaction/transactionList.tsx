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
    <section id="category-list">
      <div className="list-header-container">
        <h2 className="list-header-title">Transactions List</h2>
        <p className="list-header-link"> Add new transaction</p>
      </div>
      <table className="list-inside">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading && <p>Loading...</p>}
          {transactions &&
            transactions.map((transaction) => (
              <TransactionItem transaction={transaction} />
            ))}
          {/* {!categories && <p>No categories found.</p>} */}
        </tbody>
      </table>
      <GoToHome />
    </section>
  );
}
