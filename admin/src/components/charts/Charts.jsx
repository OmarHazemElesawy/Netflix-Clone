import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import classes from "./Charts.module.css";

const Charts = (props) => {
  const { data, title, dataKey, grid } = props;
  return (
    <div className={classes.chart}>
      <h3 className={classes.title}>{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#5550bd"
            activeDot={{ r: 6 }}
          />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray={"3 3"} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
