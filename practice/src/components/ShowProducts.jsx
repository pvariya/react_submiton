import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct, statusChang } from "../redux/productSlice";
import { useNavigate } from "react-router";

const ShowProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleDelet = (id) => {
    dispatch(deleteProduct(id));
    alert(`Productdeleted`);
  };
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleStatusChange = (id, status) => {
    const data = {
      status: status,
    };
    dispatch(statusChang({ id, data }));
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((ele) => (
          <div
            key={ele.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {ele.name}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">${ele.price}</p>
            <div className="mt-3 flex gap-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                onClick={() => handleDelet(ele.id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                onClick={() => handleUpdate(ele.id)}
              >
                Update
              </button>
              <select name="status" id="cars" className="bg-white" onSelect={handleStatusChange(ele.id, ele.status)}>
                <option value="pending">peding</option>
                <option value="complate">complate</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
