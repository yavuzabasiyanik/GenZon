import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/Login/LoginForm';
import SignUpForm from './components/auth/Signup/SignUpForm';
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ProductForm from './components/ProductForm/ProductForm';
import { productLoad } from './store/product';
import Home from './components/Home/Home';
import UpdateForm from './components/ProductForm/UpdateForm';
import UserProducts from './components/UserProducts';
import AllProductsPage from './components/AllProducts/AllProducts';
import SingleProduct from './components/SingleProduct';
import { shoppingcartLoad } from './store/shoppingcart';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/ShoppingCart/checkout';
import { getAllReviews } from './store/review';
import Orders from './components/Orders';
import { orderLoad } from './store/order';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user?.id);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());

      setLoaded(true);
    })();

    dispatch(productLoad());
    dispatch(getAllReviews());

  }, [dispatch]);

  // Cart and orders are per-user, so (re)load them whenever someone logs in
  useEffect(() => {
    if (!userId) return;
    dispatch(shoppingcartLoad());
    dispatch(orderLoad());
  }, [dispatch, userId]);

  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/product/sell'>
          <ProductForm />
        </ProtectedRoute>
        <ProtectedRoute path='/product/update/:product_id' >
          <UpdateForm />
        </ProtectedRoute>
        <ProtectedRoute path='/user/products'>
          <UserProducts />
        </ProtectedRoute>
        <ProtectedRoute path='/user/cart' exact={true}>
          <ShoppingCart />
        </ProtectedRoute>
        <ProtectedRoute path='/checkout' exact={true}>
          <Checkout />
        </ProtectedRoute>
        <Route exact path={'/allproducts/:tagNumber'}>
          <AllProductsPage />
        </Route>
        <Route exact path={'/productpage/:productId'}>
          <SingleProduct />
        </Route>
        <ProtectedRoute exact path={'/orders'}>
          <Orders />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Home />
        </Route>
      </Switch>
      {/* <Footer /> */}

    </BrowserRouter>
  );
}

export default App;
