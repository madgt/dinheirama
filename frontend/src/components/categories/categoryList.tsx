import { useEffect, useState } from 'react';
import { type Category, getCategories } from '../../data/categoryData';
import CategoryItem from './categoryItem';
import BackHome from '../Home/buttonBackHome';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="category-list">
      <div className="list-header-container">
        <h2 className="list-header-title">Category List</h2>
        <p className="list-header-link"> Add new category</p>
      </div>
      {/* {loading && <p>Loading...</p>} */}
      <table className="list-inside">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading && <p>Loading...</p>}
          {categories &&
            categories.map((category) => <CategoryItem category={category} />)}
          {/* {!categories && <p>No categories found.</p>} */}
        </tbody>
      </table>
      <BackHome />
    </section>
  );
}
