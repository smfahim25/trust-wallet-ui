import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
const generateRandomData = (numPoints, min, max) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    const randomValue = (Math.random() * (max - min) + min).toFixed(2); // Generate random data between min and max
    data.push(parseFloat(randomValue));
  }
  return data;
};

const BusinessChart = () => {
  const data = {
    labels: [
      "2024-08-01",
      "2024-08-02",
      "2024-08-03",
      "2024-08-04",
      "2024-08-05",
      "2024-08-06",
      "2024-08-07",
      "2024-08-08",
      "2024-08-09",
      "2024-08-10",
      "2024-08-11",
      "2024-08-12",
      "2024-08-01",
      "2024-08-02",
    ],
    datasets: [
      {
        data: generateRandomData(14, 1.0, 2.0),
        borderColor: "#bd4044",
        backgroundColor: "#bd4044",
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        display: false, // Hide the y-axis
      },
      x: {
        display: false, // Hide the x-axis
      },
    },
    tension: 0.4,
    responsive: true,
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default BusinessChart;
