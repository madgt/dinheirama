import { useEffect, useState } from 'react';
import { getOneCategory, type Category } from '../../data/categoryData';
import { useParams } from 'react-router-dom';

export default function CategoryTypeEdit() {
  const { categoryId } = useParams<{ categoryId: string }>();
  console.log(categoryId);

  const [category, setCategory] = useState<Category>();
  useEffect(() => {
    if (categoryId) getOneCategory(categoryId).then(setCategory);
  }, [categoryId]);
  console.log(category);
  return (
    <div>
      <h2>Edit Category</h2>
      {category && (
        <>
          <div>
            <form>
              <p>
                <label>Category Title</label>
                <input type="text" value={category.name} />
              </p>
            </form>
          </div>
        </>
      )}
      {!category && <p>Something went wrong!</p>}
    </div>
  );
}
