import { useEffect, useState } from 'react';
import {
  getOneTransaction,
  updateTransaction,
  type Transaction,
} from '../../data/transactionData';

import { useParams, useNavigate } from 'react-router-dom';
import CategoryDropDown from '../categories/categoryDropDown';

export default function TransactionEdit() {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState<Transaction>();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (!transactionId) return;
    if (transactionId)
      getOneTransaction(transactionId)
        .then((t) => {
          setTransaction(t);
          setForm({
            description: t.description,
            amount: t.amount.toString(),
            date: t.date,
            category: t.category?.id?.toString() || '',
          });
        })
        .finally(() => setLoading(false));
  }, [transactionId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, category: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!transactionId) return;
    try {
      setSaving(true);
      setError(null);
      await updateTransaction(transactionId, {
        description: form.description,
        amount: form.amount,
        date: form.date,
        category: form.category.id,
      });
      navigate('/transactions', {
        state: {
          flash: {
            type: 'success',
            message: 'Transaction updated successfully!',
          },
        },
        replace: true,
      });
    } catch (error: any) {
      setError('Edit failed. Try it again!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-base/7 font-semibold text-black">Edit Transaction</h2>
      {loading && <p className="mt-1 text-sm/6 text-gray-400">Loading...</p>}
      {transaction && (
        <form onSubmit={handleSubmit}>
          <div className=" container mx-auto py-6 space-y-4">
            <div className="nameInput">
              <div className="flex flex-grow space-x-10">
                <label
                  htmlFor="Description"
                  className="block text-sm/6 font-medium text-black flex"
                >
                  Transaction Description
                </label>
                <input
                  name="description"
                  type="text"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="amountInput">
              <div className="flex flex-grow space-x-10">
                <label
                  htmlFor="Amount"
                  className="block text-sm/6 font-medium text-black flex"
                >
                  Amount
                </label>
                <input
                  name="amount"
                  type="text"
                  value={form.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="dateInput">
              <div className="flex flex-grow space-x-10">
                <label
                  htmlFor="date"
                  className="block text-sm/6 font-medium text-black flex"
                >
                  Date
                </label>
                <input
                  name="date"
                  type="text"
                  value={form.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div id="categoryInput">
              <div className="flex flex-grow space-x-10">
                <div>
                  <label
                    htmlFor="categoryName"
                    className="block text-sm/6 font-medium text-black flex-1"
                  >
                    Category
                  </label>
                </div>
                <CategoryDropDown
                  value={form.category}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
            <div>
              <button
                className="bg-purple-900 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      )}
      {!transaction && !loading && (
        <p className="text-red-600">Something went worng! No data to edit!</p>
      )}
    </div>
  );
}
