import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addtask } from "../redux/taskSlice";

const Addtask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    let data = {
      title,
      description,
    };
    dispatch(addtask(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
        <input type="submit" value="click" />
      </form>
    </div>
  );
};

export default Addtask;
