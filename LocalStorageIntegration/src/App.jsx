import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
 
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("count")) || 0;
  });

  
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <div className="container text-center mt-5">
      <h2>Counter with LocalStorage</h2>
      <h1>{count}</h1>
      <button className="btn btn-success mx-2" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button className="btn btn-danger mx-2" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button className="btn btn-secondary mx-2" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default App;
