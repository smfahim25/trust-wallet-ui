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

const Chart = ({ one, four, seven }) => {
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
    ],
    datasets: [
      {
        data: [
          one || 1.2, // Fallback value
          1.3,
          1.25,
          1.28,
          1.27,
          four || 1.3, // Fallback value
          1.32,
          1.31,
          1.29,
          1.3,
          1.33,
          seven || 1.34, // Fallback value
        ],
        borderColor: "#bd4044",
        backgroundColor: "#bd4044",
        borderWidth: 3,
        pointRadius: 0, // Hide the points
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
    responsive: true,
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;