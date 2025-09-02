import { useEffect, useState } from 'react';
import {
  type CategoryType,
  getCategoryTypes,
} from '../../data/categoryTypeData';
import CategoryTypeItem from './categoryTypeItem';
import BackHome from '../Home/buttonBackHome';

export default function CategoryTypeList() {
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategoryTypes().then(setCategoryTypes);
  }, []);

  console.log(categoryTypes);

  return (
    <section id="category-list">
      <div className="list-header-container">
        <h2 className="list-header-title">Category List</h2>
        <p className="list-header-link"> Add new category type</p>
      </div>
      <table className="list-inside">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categoryTypes &&
            categoryTypes.map((categoryType) => (
              <CategoryTypeItem categoryType={categoryType} />
            ))}
          {/* {!categories && <p>No categories found.</p>} */}
        </tbody>
      </table>
      <BackHome />
    </section>
  );
}
