import { type Transaction } from '../../data/transactionData';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const navigate = useNavigate();
  const { category, description, amount, date } = transaction;
  const { id, name } = category;
  const goToEditTransaction = (transactionId: string) => {
    navigate(`/transactions/${transactionId}`);
  };

  return (
    <tr>
      <th>{name}</th>
      <th className="font-mono">{description}</th>
      <th>{amount}</th>
      <th>{date}</th>
      <th>
        <button onClick={() => goToEditTransaction(transaction.id)}>
          <PencilSquareIcon className="size-6 text-blue-700 hover:text-green-600" />
        </button>
        <button></button>
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
