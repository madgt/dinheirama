// interface Category {
//   id: string;
//   user_id: string;
//   name: string;
//   type: string;
//   created_at: string;
//   updated_at: string;
// }
// interface Category {
//   id: string;
//   user_id: string;
//   name: string;
//   type: string;
//   created_at: string;
//   updated_at: string;
// }
import type { Category } from '../../data/categoryData';
import { useNavigate } from 'react-router-dom';

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const navigate = useNavigate();

  const goToEditCategory = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  console.log(category);
  return (
    <tr>
      <th className="font-mono">{category.name}</th>
      <th>{category.categoryType.name}</th>
      <th>
        {' '}
        <button onClick={() => goToEditCategory(category.id)}>Edit</button>
      </th>
      <th>
        {' '}
        <button>Delete</button>{' '}
      </th>
    </tr>
  );
}
