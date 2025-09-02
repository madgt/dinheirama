import type { CategoryType } from '../../data/categoryTypeData';
import { useNavigate } from 'react-router-dom';

interface CategoryTypeItemProps {
  categoryType: CategoryType;
}

export default function CategoryTypeItem({
  categoryType,
}: CategoryTypeItemProps) {
  const navigate = useNavigate();

  const goToEditCategoryType = (categoryId: string) => {
    navigate(`/categoryTypes/${categoryId}`);
  };

  console.log(categoryType);
  return (
    <tr>
      <th>{categoryType.name}</th>
      <th>
        {' '}
        <button onClick={() => goToEditCategoryType(categoryType.id)}>
          Edit
        </button>
      </th>
      <th>
        {' '}
        <button>Delete</button>{' '}
      </th>
    </tr>
  );
}
