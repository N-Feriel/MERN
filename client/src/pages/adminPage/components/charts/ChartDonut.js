import React from "react";
import { useSelector } from "react-redux";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ChartDonut() {
  const { status, statOneToOne } = useSelector((state) => state.stat);
  const data02 = [];
  if (status === "idle") {
    statOneToOne.map((stat) =>
      data02.push({ name: stat._id, value: stat.total })
    );
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#28d8ff",
    "#ff286d",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start w-1/3 h-full mt-6 space-y-6 text-xs">
      <h2 className="text-lg text-center text-purple-900 uppercase">
        OneToOne time
      </h2>
      <PieChart width={300} height={400}>
        <Pie
          data={data02}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data02.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 2,
            backgroundColor: "#EBEEF1",
            border: "2px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default ChartDonut;
