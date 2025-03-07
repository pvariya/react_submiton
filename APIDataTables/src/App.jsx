import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {products.map((ele) => (
        <div key={ele.id}>
          <h1>{ele.title}</h1> 
          <p>{ele.description}</p>
          <p>Price: ${ele.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
