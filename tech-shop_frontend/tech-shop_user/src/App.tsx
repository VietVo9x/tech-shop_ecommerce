import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';
import SingleProduct from './pages/SingleProduct';
import { Auth, getCartQuantity } from './utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from './redux/slice/auth.slice';
import { setTotalCart } from './redux/slice/cart.slice';
import { useEffect, useState } from 'react';
import { RootState } from './redux/store/configureStore';
import Account from './pages/Account';
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        setIsLoading(true);
        const res = await Auth();
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        if (res) {
          dispatch(loginSuccess(res));
          const cart = await getCartQuantity();
          if (cart) dispatch(setTotalCart(cart));
        }
      } catch (error) {
        setIsLoading(false);
        dispatch(logout());
        dispatch(setTotalCart(0));
      }
    };

    handleLogin();
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={isLogin ? <Cart /> : <Login />} />
            <Route path="/account" element={isLogin ? <Account /> : <Login />} />
            <Route path="/checkout" element={isLogin ? <Checkout /> : <Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
