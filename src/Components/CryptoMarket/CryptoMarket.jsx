import React, { useState, useEffect } from "react";
import Chart from "../Chart/chart";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
// import imgPath from '../../Assets/images/coins';

function CryptoMarket() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [activeWallet, setActiveWallet] = useState(null);
  useEffect(() => {
    setLoading(true);
    async function fetchMarketData() {
      try {
        const response = await fetch(
          "https://api.coinlore.net/api/ticker/?id=90,2679,2,257,80,1,89,2713,2321,58,48543,118"
        );
        const data = await response.json();
        setMarketData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    }

    fetchMarketData();
  }, []);

  const activeWallet = {
    id: 1,
    coin_symbol: "ETH",
    coin_name: "Bitcoin",
    balance: 0.05,
    usd_balance: 1467.5, // This can be calculated based on the current price of the coin
    coin_logo: {
      url: "/assets/images/btc_logo.png",
      alt: "Bitcoin Logo",
    },
    status: "active", // Wallet status
    last_transaction_date: "2024-07-15", // Last transaction date
    transactions: [
      {
        id: 101,
        date: "2024-07-10",
        type: "Deposit",
        amount: 0.01,
        usd_value: 294.5,
      },
      {
        id: 102,
        date: "2024-07-08",
        type: "Withdrawal",
        amount: 0.005,
        usd_value: 147.25,
      },
    ],
  };

  return loading ? (
    <>
      <Spinner />
    </>
  ) : (
    <>
      <div className="market_pro_list">
        {marketData.map((coin) => (
          <Link
            key={coin.id}
            className="pro_item"
            to={`/business?coin=${coin.id}&type=crypto`}
          >
            <div className="pro_base">
              <img
                src={`/assets/images/coins/${coin.symbol.toLowerCase()}-logo.png`}
                className="pro_base_icon"
                alt={`${coin.symbol} Logo`}
              />
              <div>
                <div className="pro_title ff_NunitoBold fc-353F52">
                  {coin.symbol} Coin
                </div>
                <div className="pro_subtitle fc-5F6775">
                  {coin.symbol} Wallet
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
                  <Chart
                    one={coin?.percent_change_1h}
                    seven={coin?.percent_change_7d}
                    four={coin?.percent_change_24h}
                  />
                </div>
              </div>
            </div>
            <div className="pro_detail">
              <div className="pro_price fs-15 fc-353F52">
                US$ {parseFloat(coin.price_usd).toFixed(3)}
              </div>
              <div className="pro_change">
                <span
                  className="change_value fc-8CC351 m-r-10"
                  style={{
                    color:
                      coin.percent_change_24h < 0
                        ? "rgb(207, 32, 47)"
                        : "rgb(19, 178, 111)",
                  }}
                >
                  {coin.percent_change_24h}%{" "}
                </span>
                <span className="period">24 Hrs</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default CryptoMarket;
