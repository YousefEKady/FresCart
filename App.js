import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import AuthLayout from './layouts/AuthLayout'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
export default function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <MainLayout />, children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'cart', element: <Cart /> },
        { path: 'categories', element: <Categories /> },
        { path: 'brands', element: <Brands /> },
        { path: '*', element: <NotFound /> },
      ]
    },
    {
      path: '/', element: <AuthLayout />, children: [

        { path: 'signup', element: <Signup /> },
        { path: 'signin', element: <Signin /> },

      ]
    }
  ])

  return (
    <div>


      <RouterProvider router={routes} />
    </div>
  )
}
