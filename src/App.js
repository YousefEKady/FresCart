import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './components/Home/Home'
import AllProducts from './components/Products/AllProducts'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import AuthLayout from './layouts/AuthLayout'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './context/CartContext'
import { ToastContainer } from 'react-toastify';

export default function App() {
  let routes = createBrowserRouter ([
    {
      path: '/', element: <MainLayout />, children: [
        {index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes>},
        {path: 'Home', element: <ProtectedRoutes> <Home /> </ProtectedRoutes>},
        {path: 'Products', element: <ProtectedRoutes> <AllProducts /> </ProtectedRoutes>},
        {path: 'Cart', element: <ProtectedRoutes> <Cart /> </ProtectedRoutes>},
        {path: 'Categories', element: <ProtectedRoutes> <Categories /> </ProtectedRoutes>},
        {path: 'Brands', element: <ProtectedRoutes> <Brands /> </ProtectedRoutes>},
        {path: 'Product-Details/:ProductID', element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes>},
        {path: '*', element: <NotFound />},
      ]
    },
    {
      path: '/', element: <AuthLayout />, children: [
        {path: 'Signin', element: <Signin />},
        {path: 'Signup', element: <Signup />},
      ]
    }
  ])
  return (
    <div>
      <CartContextProvider>
        <RouterProvider router = { routes } />
      </CartContextProvider>

      <ToastContainer theme='colored' autoClose={600} />
    </div>
  )
}
