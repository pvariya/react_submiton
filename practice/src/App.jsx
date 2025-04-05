import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import AddProduct from './components/AddProduct'
import NavBar from './components/NavBar'
import ShowProducts from './components/ShowProducts'
import UpdateProduct from './components/UpdateProduct'
import NotFound from './components/NotFound'

function App() {
  return (
  <BrowserRouter>
  <NavBar/>
    <Routes>
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/" element={<ShowProducts />} />
      <Route path="/update/:id" element={<UpdateProduct/>} />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  </BrowserRouter>
  )
}

export default App
