import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from "redux-persist/es/persistStore";
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import App from "./App";

import { SignUp } from "./pages/Signup";
import { LoginForm } from "./pages/LoginForm";
import ProductListPage from "./components/ProductLists";
import { ProductDetails } from "./pages/ProductDetails";
import HomePage from "./components/HomePage";
import Cart from "./pages/Cart";
import WhistList from "./pages/Whishlist";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Dashboard } from "./pages/Dashboard";
import { PageNotFound } from "./pages/PageNotFound";
import { NoProductFound } from "./pages/NoProductFound";
import { Error } from "./components/Error";
import { AddressForm } from "./pages/AddOrEditAddress";
import { ManageAddress } from "./pages/ManageAddress";
import { OrderHistory } from "./pages/OrderHistory";
import OpenRoute from "./hooks/OpenRoutes";
import PrivateRoute from "./hooks/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const router = createBrowserRouter([
  { path: "", element: <HomePage /> },
  { path: "login", element: (<OpenRoute> <LoginForm /> </OpenRoute> )},
  { path: "signup", element: <OpenRoute><SignUp /></OpenRoute> },
  { path: "verify-email/:actionParam", element: <OpenRoute><VerifyEmail /></OpenRoute> },

  // { path: "cart/", element: <Cart /> },
  { path: "dashboard/wishlist/", element: (<WhistList />) },
  { path: "dashboard/my-profile", element: <PrivateRoute><Dashboard /></PrivateRoute> },

  { path: "dashboard/address-management", element:<PrivateRoute> <ManageAddress /></PrivateRoute> },
  { path: "dashboard/cart/checkout", element: <Cart />},
  { path: "dashboard/my-orders", element: <PrivateRoute> <OrderHistory /></PrivateRoute> },
  
  { path: "no_product_found", element: <NoProductFound /> },
  { path: "page_not_found", element: <PageNotFound /> },
  { path: "product-details/:brand/:productId", element: <ProductDetails /> },
  { path: "productlist/:userSelectedBrand", element: <ProductListPage /> },
  { path: "error", element: <Error /> },

]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

let persistor = persistStore(store)

root.render(
  <Provider store={store}>
    <Toaster position="top-center"/>
    <PersistGate persistor={persistor}>

      <RouterProvider router={router} />
      {/* <App /> */}

    </PersistGate>
  </Provider>
);
