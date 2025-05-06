import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CatalogCategoriesPage from './pages/CatalogCategoriesPage/CatalogCategoriesPage';
import ProductPage from './pages/ProductPage/ProductPage';


function App() {
  return (
    <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/catalog/" element={<CatalogCategoriesPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;