import { Routes, Route, Navigate  } from 'react-router-dom';
import Header from './components/Header/Header';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CatalogCategoriesPage from './pages/CatalogCategoriesPage/CatalogCategoriesPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage'; // Новый компонент
import { CartProvider } from './pages/contexts/CartContext'; // Импорт провайдера
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';

function App() {
  return (
  <CartProvider>
    <div className="background-image"></div>
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace/>}/>
        <Route path="/catalog" element={<CatalogPage/>}/>
        <Route path="/catalog/categories" element={<CatalogCategoriesPage/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="/cart" element={<CartPage/>}/> {/* Обновленный роут */}
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path="/contacts" element={<ContactsPage/>}/>
      </Routes>
    </div>
  </CartProvider>
  );
}


export default App;