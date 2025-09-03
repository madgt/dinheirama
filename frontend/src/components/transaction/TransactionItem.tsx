import { type Transaction } from '../../data/categoryData';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

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
        <button>
          <PencilSquareIcon className="size-6 text-blue-700 hover:text-green-600" />
        </button>
      </th>
      <th>
        {' '}
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>{' '}
      </th>
    </tr>
  );
}
