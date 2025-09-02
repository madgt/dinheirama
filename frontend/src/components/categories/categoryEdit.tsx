import { useEffect, useState } from 'react';
import { getOneCategory, type Category } from '../../data/categoryData';
import { useParams } from 'react-router-dom';
import CategoryTypeDropDown from '../categoryTypes/categoryTypeDropDown';

export default function CategoryEdit() {
  const { categoryId } = useParams<{ categoryId: string }>();
  console.log(categoryId);

  const [category, setCategory] = useState<Category>();
  const [form, setForm] = useState({ title: '', type: '' });

  useEffect(() => {
    if (categoryId) getOneCategory(categoryId).then(setCategory);
  }, [categoryId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: event.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, type: event.target.value });
  };

  return (
    <div>
      <h2>Edit Category</h2>
      {category && (
        <>
          <div>
            <form>
              <p>
                <label>Category Title</label>
                <input
                  type="text"
                  defaultValue={category.name}
                  onChange={handleInputChange}
                  required
                />
              </p>
              <p>
                <label>Category </label>
                <CategoryTypeDropDown
                  value={form.type}
                  onChange={handleSelectChange}
                />
              </p>
              <button>Save</button>
            </form>
          </div>
        </>
      )}
      {!category && <p>Algo deu Errado!</p>}
    </div>
  );
}
