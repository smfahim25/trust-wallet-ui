import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart component from react-chartjs-2

// Import Chart.js modules
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
import API_BASE_URL from "../../api/getApiURL";
import Spinner from "../Spinner/Spinner";
import numberFormat from "../utils/numberFormat";
import { Link } from "react-router-dom";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Import dynamic images
const forexImages = require.context(
  "../../Assets/images/coins",
  false,
  /\.(png|jpe?g|svg)$/
);

// Helper function to get image paths
const getImagePath = (symbol) => {
  try {
    return forexImages(`./${symbol.toLowerCase()}-logo.png`);
  } catch (error) {
    console.error("Image not found:", symbol);
    return "/assets/images/default-forex-logo.png"; // Default image if not found
  }
};

// TopMarket Component
const TopMarket = () => {
  const [forexMarkets, setForexMarkets] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Forex market data
    setLoading(true);
    const fetchForexMarkets = async () => {
      const response = await fetch(
        `${API_BASE_URL}/market/forex`
      );
      const data = await response.json();
      if (data) {
        setForexMarkets(data);
        setLoading(false);
      }
    };


    // Fetch Wallet data (simulating WordPress get_posts)
    const fetchWallet = async () => {
      
      const walletData = {
        id: 1,
        coin_symbol: "ETH",
        status: "active",
      };
      setWallet(walletData);
    };

    fetchForexMarkets();
    fetchWallet();
  }, []);

  return (
    loading ? (<Spinner/>) : (
      <div className="market_pro_list">
      {forexMarkets.map((fx, index) => {
        const meta = fx.response[0].meta;
        const timestamps = fx.response[0].timestamp;
        const closePrices = fx.response[0].indicators.quote[0].close;
        const symbol = meta.symbol.replace("=X", "");
        const imagePath = getImagePath(symbol);
        const marketPrice = meta.regularMarketPrice;
        const previousClose = meta.previousClose;
        const priceChange = (marketPrice - previousClose);

        // Prepare data for the chart
        const chartData = {
          labels: timestamps.map((timestamp) =>
            new Date(timestamp * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          ),
          datasets: [
            {
              label: `${symbol} Price`,
              data: closePrices,
              borderColor: "rgb(19, 178, 111)", // Line color
              backgroundColor: "rgba(19, 178, 111, 0.2)", // Fill color
              tension: 0.1, // Smooth the line
              fill: true,
            },
          ],
        };

        const chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (USD)",
              },
            },
          },
        };

        return (
          <Link
            key={index}
            className="pro_item"
            to={`/business?coin=${symbol}&type=forex`}
          >
            <div className="pro_base">
              <img
                src={imagePath}
                className="pro_base_icon"
                alt={`${symbol} Logo`}
              />
              <div>
                <div className="pro_title ff_NunitoBold fc-353F52">
                  {symbol.replace(meta.currency, ` / ${meta.currency}`)}
                </div>
                <div className="pro_subtitle fc-5F6775">
                  {wallet ? `${wallet.coin_symbol} Wallet` : ""}
                </div>
              </div>
            </div>
            <div className="pro_line">
              <div
                className="lineBoard"
                style={{
                  userSelect: "none",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  position: "relative",
                }}
              >
                <div className="chart-wrapper">
                  {/* Render the Line chart */}
                  {/* <Line data={chartData} options={chartOptions} /> */}
                </div>
              </div>
            </div>
            <div className="pro_detail">
              <div className="pro_price fs-15 fc-353F52">
                US$ {marketPrice}
              </div>
              <div className="pro_change">
                <span
                  className="change_value fc-8CC351 m-r-10"
                  style={{
                    color:
                      priceChange < 0 ? "rgb(207, 32, 47)" : "rgb(19, 178, 111)",
                  }}
                >
                  {numberFormat(priceChange,5)}
                </span>
                <span className="period">24 Hrs</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
    )
  );
};

export default TopMarket;
