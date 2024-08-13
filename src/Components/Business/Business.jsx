import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link, useSearchParams } from "react-router-dom";
import fetchMarketData from "../utils/getMarketData";
import numberFormat from "../utils/numberFormat";
import BusinessChart from "../Chart/BusinessChart";
import getMetalCoinName from "../utils/getMetalCoinName";
import axios from "axios";
import useWallets from "../../hooks/useWallets";
import { useUser } from "../../context/UserContext";
import useCryptoTradeConverter from "../../hooks/userCryptoTradeConverter";
import { useFetchUserBalance } from "../../hooks/useFetchUserBalance";
import { useUpdateUserBalance } from "../../hooks/useUpdateUserBalance";
import API_BASE_URL from "../../api/getApiURL";

const Business = () => {
  // Using react-router hooks to get the URL search params
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const coin = searchParams.get("coin");
  const type = searchParams.get("type");

  const [market, setMarket] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState(null);
  const { wallets, loading, error } = useWallets();
  const { convertCoinToUSDT, convertUSDTToCoin } = useCryptoTradeConverter();
 
  const {updateUserBalance,success} = useUpdateUserBalance();

  const [userBalance, setUserBalance] = useState(0.0000);
  const [userCoinBalance, setUserCoinBalance] = useState(0.0000);
  const [timePopupVisible, setTimePopupVisible] = useState(false);
  const [coinPopupVisible, setCoinPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("60S");
  const [selectedType, setSelectedType] = useState("Buy");
  const [selectedProfit, setSelectedProfit] = useState("");
  const [selectedMiniUsdt, setSelectedMiniUsdt] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
  const [tradeCoinId, setTradeCoinId] = useState(coin);
  const [walletAmount, setWalletAmount] = useState(0.0000000);

  const timerProfits = [
    {
      timer_profit: {
        timer: "60S",
        profit: "10",
        mini_usdt: "10",
      },
    },
    {
      timer_profit: {
        timer: "120S",
        profit: "35",
        mini_usdt: "1000",
      },
    },
    {
      timer_profit: {
        timer: "12H",
        profit: "87",
        mini_usdt: "10000",
      },
    },
    {
      timer_profit: {
        timer: "36H",
        profit: "205",
        mini_usdt: "50000",
      },
    },
    {
      timer_profit: {
        timer: "7D",
        profit: "305",
        mini_usdt: "100000",
      },
    },
  ];
  const {balance} = useFetchUserBalance(user?.id,selectedWallet?.coin_id);
  useEffect(() => {
    const loadData = async () => {
      if (coin && type) {
        const marketData = await fetchMarketData(coin, type);

        if(user?.id && selectedWallet?.coin_id){
          setUserBalance(balance ? balance.usd_amount : "0.0000");
          setUserCoinBalance(balance ? balance.coin_amount : "0.0000");
        }

        if (marketData && wallets.length > 0) {
          if (type === "crypto") {
            setPurchasePrice(marketData[0].price_usd)
            setMarket(marketData[0]);
          } else {
            setMarket(marketData[0]?.meta);
            setPurchasePrice(marketData[0]?.meta.regularMarketPrice);
          }
          // setWallets(walletsData);

          
          if (timerProfits) {
            setSelectedTime(timerProfits[0].timer_profit.timer);
            setSelectedProfit(timerProfits[0].timer_profit.profit);
            setSelectedMiniUsdt(timerProfits[0].timer_profit.mini_usdt);
          }
          setSelectedWallet(wallets[0]);
        }
      }
    };

    loadData();
  }, [coin, type,wallets,user,balance]);

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

  const [amount, setAmount] = useState(0);

  const [responseMessage, setResponseMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  // const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmount(value);
    
  };
  
  const handleConvertToCoin = async () => {
    
    const result = await convertUSDTToCoin(amount, selectedWallet.coin_id);
    setWalletAmount(result);
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleConvertToCoin();
    // Validation
    if (
      !type ||
      !selectedType ||
      !selectedWallet.coin_id ||
      !coin ||
      !selectedTime
    ) {
      setResponseMessage('Something is wrong. Try Again!');
      console.log('Something is wrong. Try Again!');
    } else if (amount <= 0) {
      setResponseMessage('Amount should be a number without 0.');
      console.log('Amount should be a number without 0.');
    } else if (amount < selectedMiniUsdt) {
      setResponseMessage(`Minimum deposit amount is ${selectedMiniUsdt} USDT`);
      console.log(`Minimum deposit amount is ${selectedMiniUsdt} USDT`);
    } else if (amount > userBalance) {
      setResponseMessage('Amount shouldn\'t be greater than your balance');
      console.log('Amount shouldn\'t be greater than your balance');
    } else {
    
    try {
        const order_id = Math.floor(100000 + Math.random() * 900000);
        const percent = parseInt(selectedProfit)/ 100;
        const profit_amount = amount * percent;
        const wallet_profit_amount = parseFloat(userCoinBalance)* percent;
        // Create the trade order
        const tradeOrderResponse = await axios.post(`${API_BASE_URL}/tradeorder`, {
          order_id,
          order_type:type,
          order_position: selectedType.toLowerCase(),
          user_id: user.id,
          user_wallet: user.user_wallet,
          wallet_coin_id:selectedWallet.coin_id,
          trade_coin_id:coin,
          amount,
          wallet_amount:walletAmount,
          profit_amount,
          purchase_price:purchasePrice,
          wallet_profit_amount,
          delivery_time:selectedTime,
          profit_level:selectedProfit,
          is_profit: user.is_profit,
        });

        // Update user balance
        const new_balance = userCoinBalance - walletAmount;
        updateUserBalance(user.id,selectedWallet.coin_id,new_balance);

        console.log('Trade Order request successfully sent.');
        setRedirect(true);
      } catch (error) {
        console.error('Error submitting trade order:', error);
        setResponseMessage('Something is wrong. Try Again!');
      }
    }
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
                      value={userBalance}
                    />
                    <div className="amount fc-353F52 ff_NunitoSemiBold limit-amount">
                      <span className="coin_amount">
                        {userBalance}
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
                      <span className="fc-5B616E">(*{selectedProfit}%)</span>
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
                      {userBalance}
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
                    onClick={handleSubmit}
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
                      {timerProfits.map((item, index) => (
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
        profit: "10%",
        mini_usdt: "10",
      },
    },
  ];
};

// Export the component
export default Business;
