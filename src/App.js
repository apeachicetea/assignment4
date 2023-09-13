import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [list, setList] = useState([]);
  const [district, setDistrict] = useState("");
  const labels = ["성북구", "강남구", "노원구", "중랑구"];

  useEffect(() => {
    axios.get("http://localhost:4000/response").then((res) => {
      const data = Object.keys(res.data).map((key) => ({
        ...res.data[key],
        name: key.split(" ")[1],
      }));
      setList(data);
    });
  }, []);

  return (
    <Fragment>
      <ResponsiveContainer width="100%" height={600}>
        <ComposedChart
          data={list}
          margin={{
            top: 100,
            right: 100,
            bottom: 100,
            left: 100,
          }}
        >
          <CartesianGrid stroke="#ffffff" />
          <XAxis dataKey="name" scale="band" />
          <YAxis
            dataKey="value_bar"
            orientation="right"
            label={{ value: "Bar", angle: 90, position: "insideRight" }}
          />
          <YAxis
            yAxisId="area"
            dataKey="value_area"
            domain={[0, (max) => Math.max(max * 2, 200)]}
            orientation="left"
            label={{ value: "Area", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value_bar"
            fill="tomato"
            onClick={(data) => setDistrict(data.id)}
          >
            {list.map((el) => (
              <Cell
                fill={el.id === district ? "tomato" : "lightgrey"}
                key={el.id}
              />
            ))}
          </Bar>
          <Area
            yAxisId="area"
            type="step"
            dataKey="value_area"
            fill="teal"
            stroke="teal"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="btn-box">
        {labels.map((label) => (
          <button
            key={label}
            style={{
              backgroundColor: label === district ? "teal" : "",
            }}
            onClick={() => setDistrict(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </Fragment>
  );
}

export default App;
