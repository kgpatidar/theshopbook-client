import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { random } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const labels = [
    "Jan 1",
    "Jan 2",
    "Jan 3",
    "Jan 4",
    "Jan 5",
    "Jan 6",
    "Jan 7",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Orders ",
        data: labels.map(() => random(0, 20)),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(54, 162, 235, 1)",
        tension: 0.2,
      },
    ],
  };
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      }}
      data={data}
    />
  );
};

export default LineChart;
