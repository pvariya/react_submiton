import React, { useState } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [count, setCount] = useState(0);

  const inc = () => {
    setCount(count + 1);
  };

  const dic = () => {
    if (count <= 0) return;
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <button className="counter-btn" onClick={dic}>
        -
      </button>
      <span className="counter-value">{count}</span>
      <button className="counter-btn" onClick={inc}>
        +
      </button>
    </div>
  );
}

export default App;
