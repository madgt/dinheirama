import { useEffect, useState } from 'react';
import {
  type CategoryType,
  getCategoryTypes,
} from '../../data/categoryTypeData';
import DropDown from '../inputs/DropDown';

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
      <select name="categoryType" value={value} onChange={onChange} required>
        {categoryTypes &&
          categoryTypes.map((categoryType) => (
            // <DropDown key={categoryType.id} value={categoryType.name} />
            <option key={categoryType.id} value={categoryType.id}>
              {categoryType.name}
            </option>
          ))}
        <option value="teste">add category type</option>
      </select>
    </span>
  );
}
