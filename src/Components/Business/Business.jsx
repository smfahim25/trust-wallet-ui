import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link, useSearchParams } from "react-router-dom";
import fetchMarketData from "../utils/getMarketData";
import numberFormat from "../utils/numberFormat";
import BusinessChart from "../Chart/BusinessChart";
import getMetalCoinName from "../utils/getMetalCoinName";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import useWallets from "../../hooks/useWallets";

const Business = ({wallet}) => {
  // Using react-router hooks to get the URL search params
  const [searchParams] = useSearchParams();
  const coin = searchParams.get("coin");
  const type = searchParams.get("type");

  const [market, setMarket] = useState(null);
  const { wallets, loading, error } = useWallets();
  // const [user] = useUser();
  const [userBalance, setUserBalance] = useState("0.0000");
  const [timePopupVisible, setTimePopupVisible] = useState(false);
  const [coinPopupVisible, setCoinPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("60S");
  const [selectedType, setSelectedType] = useState("Buy");
  const [selectedProfit, setSelectedProfit] = useState("");
  const [selectedMiniUsdt, setSelectedMiniUsdt] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [tradeCoinId, setTradeCoinId] = useState(coin);
  const [selectedTrade, setSelectedTrade] = useState("Buy");

  const repeaterItems = [
    {
      timer_profit: {
        timer: "60S",
        profit: "*10%",
        mini_usdt: "10",
      },
    },
    {
      timer_profit: {
        timer: "120S",
        profit: "*35%",
        mini_usdt: "1000",
      },
    },
    {
      timer_profit: {
        timer: "12H",
        profit: "*87%",
        mini_usdt: "10000",
      },
    },
    {
      timer_profit: {
        timer: "36H",
        profit: "*205%",
        mini_usdt: "50000",
      },
    },
    {
      timer_profit: {
        timer: "7D",
        profit: "*305%",
        mini_usdt: "100000",
      },
    },
  ];

  useEffect(() => {
    // if(user){
    //   console.log("user details", user);
    // }

    const loadData = async () => {
      if (coin && type) {
        const marketData = await fetchMarketData(coin, type);

        if (marketData && wallets.length > 0) {
          if (type === "crypto") {
            setMarket(marketData[0]);
          } else {
            setMarket(marketData[0]?.meta);
          }
          // setWallets(walletsData);

          const currentUser = get_ssb_crypto_trade_landing_wallet_user(
            sessionStorage.getItem("user_wallet")
          );
        

          const balance = get_ssb_crypto_trade_landing_user_wallet_balance(
            currentUser.id,
            get_post_meta(wallets[0].ID, "coin_id", true)
          );
          setUserBalance(balance ? balance.coin_amount : "0.0000");

          // Repeater items for initial popup values
          const repeaterItems = get_option("ssb_crypto_trade_timer_profit");
          if (repeaterItems) {
            setSelectedTime(repeaterItems[0].timer_profit.timer);
            setSelectedProfit(repeaterItems[0].timer_profit.profit);
            setSelectedMiniUsdt(repeaterItems[0].timer_profit.mini_usdt);
          }
          setSelectedWallet(wallets[0]);
        }
      }
    };

    loadData();
  }, [coin, type,wallets]);

  const handleTradeClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handlePopupTime = () => {
    setTimePopupVisible(!timePopupVisible);
  };

  const handleSelectTimer = (item) => {
    setSelectedTime(item.timer_profit.timer);
    setSelectedProfit(item.timer_profit.profit);
    setSelectedMiniUsdt(item.timer_profit.mini_usdt);
    handlePopupTime();
  };

  

  const handlePopupCoin = () => {
    setCoinPopupVisible(!coinPopupVisible);
  };

  const handleSelectCoin = (item) => {
    setSelectedWallet(item);
    handlePopupCoin();
  };


  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);

  const [formData, setFormData] = useState({
    order_type: '',
    order_position: '',
    wallet_coin_id: '',
    trade_coin_id: '',
    amount: 0,
    delivery_time: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAmount(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!user) {
    //   setResponseMessage('Session is not existed. Do login. Or Refresh Page.');
    //   setRedirect(true);
    //   return;
    // }

    // const {
    //   order_type,
    //   order_position,
    //   wallet_coin_id,
    //   trade_coin_id,
    //   amount,
    //   delivery_time,
    // } = formData;

    // const trade_amount_limit = 10; // Replace with API call to get limit if needed
    // const coin_amount_str = await axios.get(`/api/coin-amount?coin_id=${wallet_coin_id}`);
    // const coin_amount = parseFloat(coin_amount_str.data.replace(',', ''));

    // // Validation
    // if (
    //   !type ||
    //   !order_position ||
    //   !wallet_coin_id ||
    //   !trade_coin_id ||
    //   !delivery_time
    // ) {
    //   setResponseMessage('Something is wrong. Try Again!');
    // } else if (amount <= 0) {
    //   setResponseMessage('Amount should be a number without 0.');
    // } else if (amount < trade_amount_limit) {
    //   setResponseMessage(`Minimum deposit amount is ${trade_amount_limit} USDT`);
    // } else if (amount > coin_amount) {
    //   setResponseMessage('Amount shouldn\'t be greater than your balance');
    // } else {
      // try {
    //     const balance = await axios.get(`/api/balance?user_id=${user.id}&coin_id=${wallet_coin_id}`);
    //     const wallet_amount = await axios.get(`/api/usdt-to-coin?amount=${amount}&coin_id=${wallet_coin_id}`);
    //     const timer_profit = await axios.get(`/api/timer-profit?delivery_time=${delivery_time}`);

    //     const profit_level = timer_profit.data.find(tp => tp.timer === delivery_time)?.profit || 0;
    //     const percent = profit_level / 100;
    //     const profit_amount = amount * percent;
    //     const wallet_profit_amount = wallet_amount * percent;

    //     let purchase_price = 0;

    //     if (order_type === 'crypto') {
    //       const market = await axios.get(`/api/crypto-market?coin_id=${trade_coin_id}`);
    //       purchase_price = market?.data[0].price_usd;
    //     } else if (order_type === 'forex') {
    //       const market = await axios.get(`/api/forex-market?coin_id=${trade_coin_id}`);
    //       purchase_price = market?.data[0].meta.regularMarketPrice;
    //     } else if (order_type === 'metal') {
    //       const market = await axios.get(`/api/metal-market?coin_id=${trade_coin_id}`);
    //       purchase_price = market?.data[0].meta.regularMarketPrice;
    //     }
    try {
        const order_id = Math.floor(100000 + Math.random() * 900000);
        const percent = selectedProfit / 100;
        const profit_amount = amount * percent;
        // Create the trade order
        const tradeOrderResponse = await axios.post('/api/trade-order', {
          order_id,
          order_type:type,
          order_position: selectedType.toLowerCase(),
          user_id: user.id,
          user_wallet: wallet,
          wallet_coin_id:80,
          trade_coin_id:coin,
          amount,
          wallet_amount:50,
          profit_amount:20,
          purchase_price:10,
          wallet_profit_amount:10,
          delivery_time:selectedTime,
          profit_level:selectedProfit,
          is_profit: user.is_profit,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        // Update user balance
        // const new_balance = balance.data.coin_amount - wallet_amount;
        // await axios.put(`/api/balance`, {
        //   user_id: user.id,
        //   coin_id: wallet_coin_id,
        //   coin_amount: new_balance,
        // });

        setResponseMessage('Trade Order request successfully sent.');
        setRedirect(true);
      } catch (error) {
        console.error('Error submitting trade order:', error);
        setResponseMessage('Something is wrong. Try Again!');
      }
    // }
  };


  if (!market || wallets.length === 0) return null;

  return (
    <div className="business">
      <Header />

      <div className="pro_info">
        <div className="info">
          <div className="base_info">
            {type === "crypto" ? (
              <img
                src={`/assets/images/coins/${market?.symbol.toLowerCase()}-logo.png`}
                className="icon"
                alt={`${market?.symbol} logo`}
              />
            ) : type === "metal" ? (
              <img
                src={`/assets/images/coins/${market?.symbol
                  .split("=")[0]
                  .trim()
                  .toLowerCase()}-logo.png`}
                className="icon"
                alt={`${market?.symbol} logo`}
              />
            ) : (
              <img
                src={`/assets/images/coins/${market?.symbol
                  .split("=")[0]
                  .trim()
                  .toLowerCase()}-logo.png`}
                className="icon"
                alt={`${market?.symbol} logo`}
              />
            )}
            <div>
              <div className="fs-16 ff_NunitoBold">
                {type === "crypto"
                  ? market?.symbol
                  : type === "metal"
                  ? getMetalCoinName(market?.symbol.split("=")[0].trim())
                  : market?.shortName}
              </div>
              <div className="fc-5B616E ff_NunitoSemiBold">
                {wallets.length > 0
                  ? get_post_meta(wallets[0].ID, "coin_symbol", true)
                  : ""}
                Wallet
              </div>
            </div>
          </div>
          <div className="value_info">
            <div className="fs-22 ff_InterSemiBold">
              US${" "}
              {type === "crypto"
                ? numberFormat(market?.price_usd, 2)
                : numberFormat(market?.regularMarketPrice, 2)}
            </div>
            {type === "crypto" && (
              <div
                className="change fs-15 ff_InterRegular"
                style={{
                  color:
                    market?.percent_change_24h < 0
                      ? "rgb(207, 32, 47)"
                      : "rgb(19, 178, 111)",
                }}
              >
                {market?.price_usd * (market?.percent_change_24h / 100)} (
                {market?.percent_change_24h}%)
              </div>
            )}
            {type !== "crypto" && (
              <div
                className="change fs-15 ff_InterRegular"
                style={{
                  color:
                    market?.regularMarketPrice - market?.previousClose < 0
                      ? "rgb(207, 32, 47)"
                      : "rgb(19, 178, 111)",
                }}
              >
                {(market?.regularMarketPrice - market?.previousClose).toFixed(5)}
              </div>
            )}
          </div>
        </div>
        <div className="action">
          <Link to="/profit-stat">
            <img src="/assets/images/icon_record.svg" alt="Profit Stats" />
          </Link>
        </div>
      </div>

      <div className="pro_trend">
        <div className="k_container">
          <div id="k_trend" className="k_line">
            <BusinessChart />
          </div>
          <div className="time_select ff_NunitoBold">
            <div className="time_item">5M</div>
            <div className="time_item">15M</div>
            <div className="time_item active">1H</div>
            <div className="time_item">6H</div>
            <div className="time_item">1D</div>
            <div className="time_item">1W</div>
          </div>
        </div>
      </div>

      {type === "crypto" && (
        <div className="pro_other">
          <div className="other_title fs-20 fc-353F52 ff_NunitoBold">
            Functions
          </div>
          <div className="other_list">
            <div className="other_item ff_NunitoSemiBold">
              <div className="item_info">
                <img
                  src="/assets/images/icon_volume.svg"
                  className="item_icon"
                  alt="24h volume"
                />
                <span className="fs-16 fc-353F52">24h volume</span>
              </div>
              <div className="item_value fs-16 fc-5B616E">
                {market?.volume24.toLocaleString()}
              </div>
            </div>
            <div className="other_item ff_NunitoSemiBold">
              <div className="item_info">
                <img
                  src="/assets/images/icon_market_cap.svg"
                  className="item_icon"
                  alt="Market Cap"
                />
                <span className="fs-16 fc-353F52">Market Cap</span>
              </div>
              <div className="item_value fs-16 fc-5B616E">
                US$ {numberFormat(market?.market_cap_usd, 2)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="submit_container">
        <button
          className="submit_btn ssb-button ssb-button--default ssb-button--normal"
          id="trade_popup_btn"
          onClick={handleTradeClick}
        >
          <div className="ssb-button__content">
            <span className="ssb-button__text">Trade</span>
          </div>
        </button>
      </div>

      {popupVisible && (
        <div className="popup_container">
          <div className="ssb-overlay" onClick={handlePopupClose}></div>
          <div
            className="ssb-popup ssb-popup--round ssb-popup--bottom"
            style={{ width: "100%", height: "100%", zIndex: 2017 }}
          >
            <div id="dealBox" className="deal-wrapper">
              <div className="deal">
                <div className="title fs-18 fc-353F52">
                  <span>
                    {type === "crypto"
                      ? market?.symbol
                      : type === "metal"
                      ? getMetalCoinName(market?.symbol.split("=")[0].trim())
                      : market?.symbol.split("=")[0].trim()}
                    <span> Delivery</span>
                  </span>
                  <img
                    src="/assets/images/icon_close.svg"
                    className="icon_close"
                    alt="Close"
                    onClick={handlePopupClose}
                  />
                </div>
                <div className="deal_pro_info">
                  <div className="base_info">
                    {type === "crypto" ? (
                      <img
                        src={`/assets/images/coins/${market?.symbol.toLowerCase()}-logo.png`}
                        className="pro_icon"
                        alt={`${market?.symbol} logo`}
                      />
                    ) : type === "metal" ? (
                      <img
                        src={`/assets/images/coins/${market?.symbol
                          .split("=")[0]
                          .trim()
                          .toLowerCase()}-logo.png`}
                        className="pro_icon"
                        alt={`${market?.symbol} logo`}
                      />
                    ) : (
                      <img
                        src={`/assets/images/coins/${market?.symbol
                          .split("=")[0]
                          .trim()
                          .toLowerCase()}-logo.png`}
                        className="pro_icon"
                        alt={`${market?.symbol} logo`}
                      />
                    )}
                    <div className="pro_name">
                      <input
                        type="hidden"
                        name="trade_coin_id"
                        id="trade_coin_id"
                        value={tradeCoinId}
                      />
                      <div className="coin_name">
                        {type === "crypto"
                          ? market?.symbol
                          : type === "metal"
                          ? getMetalCoinName(
                              market?.symbol.split("=")[0].trim()
                            )
                          : market?.symbol.split("=")[0].trim()}
                      </div>
                      <div>
                        <span className="mr-6">Market Order: </span>
                        <span className="fc-13B26F ff_NunitoSemiBold order_position">
                          {selectedType}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="time_info">
                    <div className="time">
                      <img
                        src="/assets/images/icon_time.svg"
                        className="icon_time"
                        alt="Time"
                      />
                      <span className="fc-353F52 fs-15 ff_NunitoSemiBold">
                        {selectedTime}
                      </span>
                    </div>
                    <input
                      type="hidden"
                      name="order_type"
                      id="order_type"
                      value="crypto"
                    />
                    <input
                      type="hidden"
                      name="coin_amount"
                      id="coin_amount"
                      value={get_ssb_crypto_trade_landing_current_user_usdt_convert_coin(
                        get_post_meta(selectedWallet.ID, "coin_id", true)
                      )}
                    />
                    <div className="amount fc-353F52 ff_NunitoSemiBold limit-amount">
                      <span className="coin_amount">
                        {get_ssb_crypto_trade_landing_current_user_usdt_convert_coin(
                          get_post_meta(selectedWallet.ID, "coin_id", true),
                          ","
                        )}
                      </span>{" "}
                      USDT
                    </div>
                  </div>
                </div>
                <div className="time_select">
                  <div className="select_title fs-16 fc-353F52 ff_NunitoSemiBold">
                    Delivery time
                  </div>
                  <div className="time_select_container">
                    <div className="time_select_content" onClick={handlePopupTime}>
                      <div className="value">
                        <img
                          src="/assets/images/icon_time.svg"
                          className="icon_time"
                          alt="Time"
                        />
                        <span id="delivery_time">{selectedTime}</span>
                      </div>
                      <img
                        src="/assets/images/icon_arrow_down.svg"
                        className="icon_arrow"
                        alt="Arrow"
                      />
                    </div>
                    <div className="type_select_content fs-16 ff_NunitoSemiBold">
                      <div
                        className={`type_item ${
                          selectedType === "Buy" ? "up active" : "up"
                        }`}
                        onClick={() => setSelectedType("Buy")}
                      >
                        Buy
                      </div>
                      <div
                        className={`type_item ${
                          selectedType === "Sell" ? "down active" : "down"
                        }`}
                        onClick={() => setSelectedType("Sell")}
                      >
                        Sell
                      </div>
                    </div>
                  </div>
                </div>
                <div className="range_select">
                  <div className="select_title fs-16 fc-353F52 ff_NunitoSemiBold">
                    Profit level
                  </div>
                  <div className="range_select_container">
                    <div className="range_info fs-16 ff_NunitoSemiBold">
                      <span className="fc-5B616E">({selectedProfit})</span>
                    </div>
                    <img
                      src="/assets/images/icon_arrow_down.svg"
                      className="icon_arrow"
                      alt="Arrow"
                    />
                  </div>
                </div>
                <div className="coin_select">
                  <div className="flex">
                    <div className="select_title fs-16 fc-353F52 ff_NunitoSemiBold flex1">
                      Purchase price
                    </div>
                    <div className="fs-12">Fee: 0.1%</div>
                  </div>
                  <div className="coin_select_container">
                    <div className="coin_select_content" onClick={handlePopupCoin}>
                      <div className="value">
                        {selectedWallet && (
                          <>
                            <img
                              className="icon_time"
                              src={`/assets/images/coins/${selectedWallet.coin_symbol.toLowerCase()}-logo.png` || ""}
                              alt={selectedWallet.coin_symbol || ""}
                            />
                            <input
                              type="hidden"
                              id="wallet_coin_id"
                              name="wallet_coin_id"
                              value={get_post_meta(
                                selectedWallet.ID,
                                "coin_id",
                                true
                              )}
                            />
                            <span className="fc-131F30 ff_NunitoBold">
                              {selectedWallet.coin_symbol}
                            </span>
                            <img
                              src="/assets/images/icon_arrow_down.svg"
                              className="icon_arrow"
                              alt="Arrow"
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="amount_input">
                      <input
                        onChange={handleInputChange}
                        type="number"
                        inputMode="numeric"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                      />
                      <span className="all">Max</span>
                    </div>
                  </div>
                </div>
                <div className="balance fs-26 ff_NunitoRegular">
                  <div className="balalce_value fc-353F52">
                    Available:{" "}
                    <span className="coin_amount">
                      {get_ssb_crypto_trade_landing_current_user_usdt_convert_coin(
                        get_post_meta(selectedWallet.ID, "coin_id", true),
                        ","
                      )}
                    </span>{" "}
                    USDT
                  </div>
                </div>
                <div className="balance fs-26 ff_NunitoRegular">
                  <div className="balalce_value fc-353F52">
                    Minimum: <span id="balance_limit">{selectedMiniUsdt}</span>{" "}
                    USDT
                  </div>
                  <div className="expect_value fc-1652F0">Estimation: 0.00</div>
                </div>
                <div className="submit_container">
                  <button
                    type="button"
                    className="submit fs-18 ff_NunitoBold"
                    style={
                      selectedType === "Buy"
                        ? {
                            backgroundColor: "rgb(19, 178, 111)",
                            lineHeight: 0,
                          }
                        : selectedType === "Sell"
                        ? { backgroundColor: "#cf202f", lineHeight: 0 }
                        : {
                            backgroundColor: "rgb(19, 178, 111)",
                            lineHeight: 0,
                          }
                    }
                  >
                    Trade
                  </button>
                </div>

                
                  {timePopupVisible && 
                  <div id="select_time_popup">
                  <div className="ssb-overlay" style={{ zIndex: 2021 }}></div>
                  <div
                    className="select_popup ssb-popup ssb-popup--round ssb-popup--bottom"
                    style={{ zIndex: 2022, height: "auto" }}
                  >
                    <div className="range_title">
                      <img
                        src="/assets/images/icon_close.svg"
                        className="icon_close"
                        alt="Close"
                        onClick={handlePopupTime}
                      />
                    </div>
                    <div className="coin_list">
                      {repeaterItems.map((item, index) => (
                        <div className="coin_item" key={index}>
                          <div
                            onClick={()=>handleSelectTimer(item)}
                            className="name"
                            data-mini_usdt={item.timer_profit.mini_usdt}
                            data-profit_level={item.timer_profit.profit}
                          >
                            {item.timer_profit.timer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                  }
                  
                
                {coinPopupVisible &&
                <div id="select_coin_popup">
                <div className="ssb-overlay" style={{ zIndex: 2023 }}></div>
                <div
                  className="select_popup ssb-popup ssb-popup--round ssb-popup--bottom"
                  style={{ zIndex: 2024, height: "auto" }}
                >
                  <div className="range_title">
                    <img
                      src="/assets/images/icon_close.svg"
                      className="icon_close"
                      alt="Close"
                      onClick={handlePopupCoin}
                    />
                  </div>
                  <div className="coin_list">
                    {wallets.map((wallet, index) => {
                      return (
                        <div className="coin_item" key={index}>
                          <div
                            className="name"
                            data-coin_id={get_post_meta(
                              wallet.ID,
                              "coin_id",
                              true
                            )}
                            data-coin_logo={wallet.coin_logo}
                            data-coin_symbol={wallet.coin_symbol}
                            onClick={() => handleSelectCoin(wallet)}
                          >
                            <img
                              src={`/assets/images/coins/${wallet.coin_symbol.toLowerCase()}-logo.png`}
                              alt={wallet.coin_symbol}
                            />
                            {` ${wallet.coin_symbol}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
                }
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const get_posts = (args) => {
  // Mock data; replace with actual API call
  return [
    {
      ID: 1,
      post_type: "ssb-crypto-wallet",
      coin_id: "1",
      coin_symbol: "ETH",
      coin_logo: "/assets/images/coins/eth-logo.png",
    },
  ];
};

const get_ssb_crypto_trade_landing_wallet_user = (userWallet) => {
  // Mock data; replace with actual API call
  return { id: 1 };
};

const get_ssb_crypto_trade_landing_user_wallet_balance = (userId, coinId) => {
  // Mock data; replace with actual API call
  return { coin_amount: "0.1234" };
};

const get_ssb_crypto_trade_landing_current_user_usdt_convert_coin = (
  coinId,
  format = ""
) => {
  // Mock data; replace with actual API call
  return "10,000.00";
};

const get_post_meta = (postId, metaKey, single) => {
  // Mock data; replace with actual API call
  return {
    coin_id: "1",
    coin_symbol: "ETH",
    coin_logo: "/assets/images/coins/btc-logo.png",
  }[metaKey];
};

const get_option = (option) => {
  // Mock data; replace with actual API call
  return [
    {
      timer_profit: {
        timer: "60S",
        profit: "*10%",
        mini_usdt: "10",
      },
    },
  ];
};

// Export the component
export default Business;
