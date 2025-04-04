import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addtask } from "../redux/taskSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;
    dispatch(addtask({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mb-10">
      <h1 className="text-3xl text-center mb-5">add task</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 shadow-md rounded-lg w-96 mx-auto border"
      >
        <input
          type="text"
          value={title}
          className="border p-2 rounded-md outline-none focus:border-blue-500"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
        <input
          type="text"
          value={description}
          className="border p-2 rounded-md outline-none focus:border-blue-500"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
