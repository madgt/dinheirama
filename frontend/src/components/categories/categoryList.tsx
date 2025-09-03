import { useEffect, useState } from 'react';
import { type Category, getCategories } from '../../data/categoryData';
import CategoryItem from './categoryItem';
import BackHome from '../Home/buttonBackHome';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CategoryList() {
  const navigate = useNavigate();
  const location = useLocation();
  const flash = (
    location.state as {
      flash?: { type: 'success' | 'error'; message: string };
    } | null
  )?.flash;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(
      () => navigate('.', { replace: true, state: null }),
      2500
    );
    return () => clearTimeout(t);
  }, [flash, navigate]);

  return (
    <section id="category-list">
      <div className="list-header-container">
        <h2 className="list-header-title">Category List</h2>
        <p className="list-header-link"> Add new category</p>
      </div>
      {/* {loading && <p>Loading...</p>} */}
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
      <div className="mx-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            {/* {!categories && <p>No categories found.</p>} */}
          </tbody>
        </table>
      </div>
      {loading && <p>Loading...</p>}
      <BackHome />
    </section>
  );
}
