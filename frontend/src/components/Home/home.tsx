import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

export default function Home() {
  const navigate = useNavigate();

  const gotoCategories = () => {
    navigate('/categories');
  };

  const gotoTransactions = () => {
    navigate('/transactions');
  };

  const goToCategoryTypes = () => {
    navigate('/categoryType');
  };

  return (
    <>
      <Header />
      <div>
        <h3 className="prose lg:prose-xl">
          Controle seus gastos e planeje seu orçamento!
        </h3>
        <div className="flex flex-row">
          <div className="basis-2x">
            <button
              className="mt-4 rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
              onClick={gotoCategories}
            >
              Go to Categories
            </button>
          </div>
          <div
            className="basis-2x lg:tooltip"
            data-tip="See the transaction list"
          >
            <button className="btn btn-primary" onClick={gotoTransactions}>
              Go to Transactions
            </button>
          </div>
          <button
            className="mt-4 rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            onClick={goToCategoryTypes}
          >
            Go to Category Types
          </button>
        </div>
      </div>
    </>
  );
}
