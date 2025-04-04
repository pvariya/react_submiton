import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import { getTaskBtId, updateTask } from "../redux/taskSlice";

const UpdateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { taskDetails } = useSelector((state) => state.task);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getTaskBtId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (taskDetails) {
      setTitle(taskDetails.title);
      setDescription(taskDetails.description);
    }
  }, [taskDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { id, title, description };
    dispatch(updateTask(updatedTask));
    navigate("/");
  };

  return (
    <div className="mb-10">
      <h1 className="text-3xl text-center mb-5">Edit Task</h1>
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
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
