import React, { useState } from "react";
import Header from "../Header/Header";
import useCryptoTradeConverter from "../../hooks/userCryptoTradeConverter";

const Converter = () => {
  const [coin, setCoin] = useState(null);
  const [usdt, setUSDT] = useState(null);
  const { convertCoinToUSDT, convertUSDTToCoin, loading } = useCryptoTradeConverter();
  
  const convert = async () => {
    try {
      const convertedCoin = await convertUSDTToCoin(800, 90);
      setCoin(convertedCoin);
      console.log("Converted coin:", convertedCoin);
    } catch (error) {
      console.error("Error converting coin:", error);
    }
  };

  const ConvertToUSD = async () => {
    try {
      const convertedCoin = await convertCoinToUSDT(coin, 90);
      setUSDT(convertedCoin);
      console.log("Converted coin:", convertedCoin);
    } catch (error) {
      console.error("Error converting coin:", error);
    }
  };

   // Mock data

  const [coinPopupVisible, setCoinPopupVisible] = useState(false);
   const mockMarket = { symbol: "BTC" };
   const mockType = "crypto"; // Can be 'crypto' or 'metal'
   const mockSelectedTime = "1 Hour";
   const mockSelectedType = "Buy"; // Can be 'Buy' or 'Sell'
   const mockUserBalance = 1000.00;
   const mockSelectedMiniUsdt = 50.00;
   const mockSelectedWallet = {
     ID: 1,
     coin_symbol: "BTC",
     coin_logo: "/assets/images/coins/btc-logo.png",
   };
   const mockTimerProfits = [
     { timer_profit: { timer: "1 Hour", mini_usdt: 50.00, profit: 5 } },
     { timer_profit: { timer: "4 Hours", mini_usdt: 200.00, profit: 10 } },
   ];
   const mockWallets = [
     { coin_symbol: "BTC", coin_logo: "/assets/images/coins/btc-logo.png" },
     { coin_symbol: "ETH", coin_logo: "/assets/images/coins/eth-logo.png" },
   ];
 
   // Mock event handlers
   const handlePopupClose = () => {
     console.log("Popup closed");
   };
 
   const handlePopupTime = () => {
     console.log("Popup time select opened");
   };
 
   const handlePopupCoin = () => {
    setCoinPopupVisible(!coinPopupVisible);
  };
 
   const handleSelectTimer = (item) => {
     console.log("Selected Timer:", item);
   };
 
   const handleSelectCoin = (wallet) => {
     console.log("Selected Coin:", wallet);
   };
 
   const handleSubmit = () => {
     console.log("Trade submitted");
   };

  return (
    <div>
      <Header pageTitle="Converter"/>
      <div className="">
      
      <div className="" ></div>
      <div
        className="ssb-popup--round ssb-popup--bottom"
        style={{ width: "100%"}}
      >
        <div id="dealBox" className="deal-wrapper">
          <div className="deal">
          
            <div className="deal_pro_info">
              <div className="base_info">
                <img
                  src={`/assets/images/coins/btc-logo.png`}
                  className="pro_icon"
                  alt={`${mockMarket.symbol} logo`}
                />
                <div className="pro_name">
                  <div className="coin_name">{mockMarket.symbol}</div>
                  <div>
                    <span>BTC Coin: </span>
                    <span className="fc-13B26F ff_NunitoSemiBold order_position">
                      0.005135
                    </span>
                  </div>
                </div>
              </div>
              <div className="base_info">
                
                <div className="pro_name">
                  <div className="coin_name">USDT</div>
                  <div>
                    <span>USDT Coin: </span>
                    <span className="fc-13B26F ff_NunitoSemiBold order_position">
                      200
                    </span>
                  </div>
                </div>
               
              </div>
            </div>
            <div className="flex justify-between">
            <div className="time_select">
              <div className="select_title fs-16 fc-353F52 ff_NunitoSemiBold">
                From coin
              </div>
              <div className="time_select_container">
                <div
                  className="time_select_content"
                  onClick={handlePopupCoin}
                >
                  <div className="value">
                    <img
                      src={mockSelectedWallet.coin_logo || ""}
                      className="icon_time"
                      alt="Time"
                    />
                    <span id="delivery_time">Bitcoin</span>
                  </div>
                  <img
                    src="/assets/images/icon_arrow_down.svg"
                    className="icon_arrow"
                    alt="Arrow"
                  />
                </div>
              </div>
            </div>
             <div className="time_select">
              <div className="select_title fs-16 fc-353F52 ff_NunitoSemiBold">
                To coin
              </div>
              <div className="time_select_container">
                <div
                  className="time_select_content"
                  onClick={handlePopupCoin}
                >
                  <div className="value">
                    <img
                      src={"/assets/images/coins/usdt-logo.png"}
                      className="icon_time"
                      alt="Time"
                    />
                    <span id="delivery_time">USDT</span>
                  </div>
                  <img
                    src="/assets/images/icon_arrow_down.svg"
                    className="icon_arrow"
                    alt="Arrow"
                  />
                </div>
              </div>
            </div>
            </div>
            
            {/* <div className="coin_select">
              <div className="flex">
                <div className="select_title fs-16 fc-353F52 ff_NunitoSemiBold flex1">
                  Purchase price
                </div>
                <div className="fs-12">Fee: 0.1%</div>
              </div>
              <div className="coin_select_container">
                <div
                  className="coin_select_content"
                  onClick={handlePopupCoin}
                >
                  <div className="value">
                    <img
                      className="icon_time"
                      src={mockSelectedWallet.coin_logo || ""}
                      alt={mockSelectedWallet.coin_symbol || ""}
                    />
                    <span className="fc-131F30 ff_NunitoBold">
                      {mockSelectedWallet.coin_symbol}
                    </span>
                    <img
                      src="/assets/images/icon_arrow_down.svg"
                      className="icon_arrow"
                      alt="Arrow"
                    />
                  </div>
                </div>
                <div className="amount_input">
                  <input
                    type="number"
                    inputMode="numeric"
                    name="amount"
                    id="amount"
                    value={mockUserBalance}
                    placeholder="Amount"
                  />
                  <span
                    className="all"
                    onClick={() => console.log("Max amount selected")}
                  >
                    Max
                  </span>
                </div>
              </div>
            </div>
            <div className="balance fs-26 ff_NunitoRegular">
              <div className="balalce_value fc-353F52">
                Available:
                <span className="coin_amount">
                  {parseFloat(mockUserBalance).toFixed(2)}
                </span>
                USDT
              </div>
            </div>
            <div className="balance fs-26 ff_NunitoRegular">
              <div className="balalce_value fc-353F52">
                Minimum: <span id="balance_limit">{mockSelectedMiniUsdt}</span>{" "}
                USDT
              </div>
              <div className="expect_value fc-1652F0">Estimation: 0.00</div>
            </div> */}
            <div className="submit_container">
              <button
                onClick={handleSubmit}
                type="button"
                className="submit fs-18 ff_NunitoBold"
                style={
                  mockSelectedType === "Buy"
                    ? {
                        backgroundColor: "rgb(19, 178, 111)",
                        lineHeight: 0,
                      }
                    : mockSelectedType === "Sell"
                    ? { backgroundColor: "#cf202f", lineHeight: 0 }
                    : {
                        backgroundColor: "rgb(19, 178, 111)",
                        lineHeight: 0,
                      }
                }
              >
                Convert
              </button>
            </div>

            {/* Time Popup */}
            {false && (
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
                    {mockTimerProfits.map((item, index) => (
                      <div className="coin_item" key={index}>
                        <div
                          onClick={() => handleSelectTimer(item)}
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
            )}

            {/* Coin Popup */}
            {coinPopupVisible && (
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
                    {mockWallets.map((wallet, index) => {
                      return (
                        <div className="coin_item" key={index}>
                          <div
                            className="name"
                            onClick={() => handleSelectCoin(wallet)}
                          >
                            <img
                              src={wallet.coin_logo}
                              alt={wallet.coin_symbol}
                            />
                            <div
                              style={{ marginLeft: "5px" }}
                            >{` ${wallet.coin_symbol}`}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Converter;
