import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryList from './components/categories/categoryList.tsx';
import TransactionsList from './components/transaction/transactionList.tsx';
import Home from './components/Home/home.tsx';
import CategoryEdit from './components/categories/categoryEdit.tsx';
import CategoryTypeList from './components/categoryTypes/categoryTypesList.tsx';
import CategoryTypeEdit from './components/categoryTypes/categoryTypeEdit.tsx';
import TransactionEdit from './components/transaction/transactionEdit.tsx';
import SimpleContainer from './components/Layout/SimpleContainer.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route element={<SimpleContainer />}>
          <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:categoryId" element={<CategoryEdit />} />
        <Route path="/transactions" element={<TransactionsList />} />
        <Route
          path="/transactions/:transactionId"
          element={<TransactionEdit />}
        />
        <Route path="/categoryType" element={<CategoryTypeList />} />
        <Route
          path="/categoryType/:categoryTypeId"
          element={<CategoryTypeEdit />}
        />
         </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
