import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const gotoCategories = () => {
    navigate('/categories');
  };

  const gotoTransactions = () => {
    navigate('/transactions');
  };

  const goToCategoryTypes = () => {
    navigate('/category-types');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <button onClick={gotoCategories}>Go to Categories</button>
      <button onClick={gotoTransactions}>Go to Transactions</button>
      <button onClick={goToCategoryTypes}>Go to Category Types</button>
    </div>
  );
}
