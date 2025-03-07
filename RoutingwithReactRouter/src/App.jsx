import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./Home";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
