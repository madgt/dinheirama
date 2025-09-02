import { useEffect, useState } from 'react';
import {
  type CategoryType,
  getCategoryTypes,
} from '../../data/categoryTypeData';

export default function CategoryTypeDropDown({
  value,
  onChange,
}: {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategoryTypes().then(setCategoryTypes);
  }, []);

  return (
    <span>
      <select name="categoryType" value={value} onChange={onChange}>
        {categoryTypes &&
          categoryTypes.map((categoryType) => (
            <option value={categoryType.id}>{categoryType.name}</option>
          ))}
        <option value="teste">add category type</option>
      </select>
    </span>
  );
}
