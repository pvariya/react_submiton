import { useState } from "react";

import Product from "./pages/Product";

function App() {
  const [count, setCount] = useState(0);

  return <Product index />;
}

export default App;
