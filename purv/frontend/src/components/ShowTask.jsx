import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../redux/taskSlice";
import { Link } from "react-router";

const ShowTask = () => {
  const dispatch = useDispatch();
  const { tasks,loading,error } = useSelector((state) => state.task);
  console.log("tasks from redux:", tasks, Array.isArray(tasks));

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    dispatch(getTask());
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((ele) => (
          <div
            key={ele._id}
            className="border rounded-lg p-4 shadow-md bg-white flex justify-between items-center"
          >
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {ele.title}
              </h1>
              <p className="text-gray-600">{ele.description}</p>
            </div>
            <div className="flex gap-2 ml-5">
              <Link
                to={`/edit/${ele._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(ele._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTask;
