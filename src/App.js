import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/response").then((res) => {
      const a = Object.keys(res.data).map((key) => ({
        ...res.data[key],
        name: key.split(" ")[1],
      }));
      console.log(a);
      setList(a);
    });
  }, []);

  return;
}

export default App;
