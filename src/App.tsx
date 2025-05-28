import { Routes, Route, Navigate  } from 'react-router-dom';
import Header from './components/Header/Header';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CatalogCategoriesPage from './pages/CatalogCategoriesPage/CatalogCategoriesPage';
import ProductPage from './pages/ProductPage/ProductPage';


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/categories" element={<CatalogCategoriesPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartStub />} />
      </Routes>
    </div>
  );
}

// Заглушка для корзины
const CartStub = () => (
  <div className="container">
    <h1>Корзина</h1>
    <p>Раздел в разработке...</p>
  </div>
);


export default App;