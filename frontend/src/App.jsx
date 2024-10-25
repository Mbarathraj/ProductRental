import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login'
import UserHome from './User Components/UserHome'
import ShowProductDetails from './User Components/ShowProductDetails'
import Register from './Register'
import AdminHome from './Admin Components/AdminHome'
import SellerHome from './Seller Components/SellerHome'
import { ProductProvider } from './User Components/ProductContext'
import ShowProducts from './Seller Components/ShowProducts'
function App() {


  return (
    <BrowserRouter>
    <ProductProvider>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/user' element={<UserHome/>}/>
      <Route path='/barathadmin' element={<AdminHome/>}/>
      <Route path='/seller' element={<SellerHome/>}/>
      <Route path='/register' element={<Register/>}/> 
      <Route path='/user/showproduct' element={<ShowProductDetails/>}/>
      <Route path='/seller/showproducts' element={<ShowProducts/>}/>
     </Routes>
    </ProductProvider>
    </BrowserRouter>
  )
}

export default App
