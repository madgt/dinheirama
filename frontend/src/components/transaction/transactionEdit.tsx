import { useEffect, useState } from 'react';
import {
  getOneCategory,
  updateCategory,
  type Category,
} from '../../data/categoryData';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryTypeDropDown from '../categoryTypes/categoryTypeDropDown';

export default function CategoryEdit() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>();
  const [form, setForm] = useState({ title: '', type: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (!categoryId) return;
    if (categoryId)
      getOneCategory(categoryId)
        .then((cat) => {
          setCategory(cat);
          setForm({
            title: cat.name,
            type: cat.categoryType?.id?.toString() || '',
          });
        })
        .finally(() => setLoading(false));
  }, [categoryId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: event.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, type: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!categoryId) return;
    try {
      setSaving(true);
      setError(null);
      await updateCategory(categoryId, {
        name: form.title,
        type: Number(form.type),
      });
      navigate('/categories', {
        state: {
          flash: { type: 'success', message: 'Category updated successfully!' },
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
      <h2 className="text-base/7 font-semibold text-black">Edit Category</h2>
      {loading && <p className="mt-1 text-sm/6 text-gray-400">Loading...</p>}
      {category && (
        <form onSubmit={handleSubmit}>
          <div className=" container mx-auto py-6 space-y-4">
            <div className="nameInput">
              <div className="flex flex-grow space-x-10">
                <label
                  htmlFor="categoryName"
                  className="block text-sm/6 font-medium text-black flex"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  value={form.title}
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
                    Category{' '}
                  </label>
                </div>
                <CategoryTypeDropDown
                  value={form.type}
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
      {!category && !loading && (
        <p className="text-red-600">Something went worng! No data to edit!</p>
      )}
    </div>
  );
}
