import React,{ useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import Home from "./components/Home";
import UpdateTask from "./components/UpdateTask";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<UpdateTask/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
