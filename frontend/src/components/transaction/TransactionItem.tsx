import { type Transaction } from '../../data/categoryData';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <tr>
      <th>{transaction.category.name}</th>
      <th className="font-mono">{transaction.description}</th>
      <th>{transaction.amount}</th>
      <th>
        {' '}
        <button>Edit</button>
      </th>
      <th>
        {' '}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>{' '}
      </th>
    </tr>
  );
}
