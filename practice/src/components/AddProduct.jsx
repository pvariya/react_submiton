import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import { useNavigate } from 'react-router';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    let newProduct = { name, price,status: "pending" };
    dispatch(addProduct(newProduct));
    navigate('/');
    e.target.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form 
        onSubmit={handleAddProduct} 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Add New Product</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
