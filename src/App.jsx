import { Routes, Route } from 'react-router';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductList from './pages/ProductList';
import Register from './pages/Register';

import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/shop"
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/about-us"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/checkouts"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        ></Route>
        {/* Temporarily routed the register component here for easier navigation during development */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
