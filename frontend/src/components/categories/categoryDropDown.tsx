import { useEffect, useState } from 'react';
import { type Category, getCategories } from '../../data/categoryData';

export default function CategoryDropDown({
  value,
  onChange,
}: {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <span>
      <select name="categoryType" value={value} onChange={onChange} required>
        {categories &&
          categories.map((category) => (
            // <DropDown key={category.id} value={category.name} />
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        <option value="teste">add category </option>
      </select>
    </span>
  );
}
