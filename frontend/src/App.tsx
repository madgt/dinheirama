import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryList from './components/categories/categoryList.tsx';
import TransactionsList from './components/transaction/transactionList.tsx';
import Home from './components/Home/home.tsx';
import CategoryEdit from './components/categories/categoryEdit.tsx';
import CategoryTypeList from './components/categoryTypes/categoryTypesList.tsx';
import CategoryTypeEdit from './components/categoryTypes/categoryTypeEdit.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/:categoryId" element={<CategoryEdit />} />
        <Route path="/transactions" element={<TransactionsList />} />
        <Route path="/categoryType" element={<CategoryTypeList />} />
        <Route
          path="/categoryType/:categoryTypeId"
          element={<CategoryTypeEdit />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
