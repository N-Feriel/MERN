import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ChartBar() {
  const { status, statClients, statVolenteers } = useSelector(
    (state) => state.stat
  );

  let dataVolen = [],
    dataCLient = [];

  if (status === "idle") {
    statVolenteers.map((user) => {
      if (user._id) {
        dataVolen[0] = user.count;
      } else {
        dataVolen[1] = user.count;
      }
    });

    statClients.map((user) => {
      if (user._id) {
        dataCLient[0] = user.count;
      } else {
        dataCLient[1] = user.count;
      }
    });
  }

  const data = [
    {
      name: "Volenteers",
      Actives: dataVolen[0],
      Archives: dataVolen[1],
    },
    {
      name: "Clients",
      Actives: dataCLient[0],
      Archives: dataCLient[1],
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start w-1/3 h-full space-y-6 text-xs">
      <h2 className="text-lg text-center text-purple-900 uppercase">
        Total members
      </h2>
      <BarChart
        width={350}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 60,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          width={100}
          wrapperStyle={{
            top: 4,
            right: 2,
            backgroundColor: "#EBEEF1",
            border: "2px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />

        <Bar dataKey="Actives" fill="#8884d8" barSize={40} />
        <Bar dataKey="Archives" fill="#82ca9d" barSize={40} />
      </BarChart>
    </div>
  );
}

export default ChartBar;
