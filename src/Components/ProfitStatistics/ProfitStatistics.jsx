import React, { useEffect, useState } from "react";
import imgNoData from "../../Assets/images/img_nodata.png";
import iconMenuArrow from "../../Assets/images/icon_menu_arrow.svg";
import iconClose from "../../Assets/images/icon_close.svg";
import Header from "../Header/Header";
import { useUser } from "../../context/UserContext";
import API_BASE_URL from "../../api/getApiURL";

const ProfitStatistics = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [runningOrders, setRunningOrders] = useState([]);
  const [finishOrders, setFinishOrders] = useState([]);
  const { setLoading, user } = useUser();

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const openPopup = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const getFormattedDeliveryTime = (createdAt, deliveryTimeInSeconds) => {
    const date = new Date(createdAt);
    date.setSeconds(date.getSeconds() + deliveryTimeInSeconds);
    return date.toISOString().split("T").join(" ").slice(0, 19); // Format as 'YYYY-MM-DD HH:mm:ss'
  };
  useEffect(() => {
    setLoading(true);
    async function fetchMarketData() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/tradeorder/user/${user?.id}`
        );
        const data = await response.json();
        if (response.status !== 404) {
          setRunningOrders(data);
          setFinishOrders(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setLoading(false);
      }
    }

    fetchMarketData();
  }, [setLoading, user]);

  return (
    <div
      className="profit"
      style={{ backgroundColor: "white", height: "100vh" }}
    >
      <Header pageTitle="Profit Statistics" />

      <div className="switch_container">
        <div className="switch_content">
          <div
            className={`switch_item ${activeTab === "active" ? "active" : ""}`}
            onClick={() => switchTab("active")}
          >
            Active Order
          </div>
          <div
            className={`switch_item ${
              activeTab === "finished" ? "active" : ""
            }`}
            onClick={() => switchTab("finished")}
          >
            Finished Order
          </div>
        </div>
      </div>

      <div id="profit-active_order">
        <div className="main_container">
          <div className="main_content">
            <div>
              {activeTab === "active" ? (
                runningOrders.length === 0 ? (
                  <div
                    className="no_data_content ff_NunitoSemiBold"
                    style={{ minHeight: "calc(-260px + 100vh)" }}
                  >
                    <img
                      src={imgNoData}
                      alt="No Data"
                      className="img_no_data"
                    />
                    <div>No Data</div>
                  </div>
                ) : (
                  <div className="profit-history">
                    {runningOrders?.map((order) => {
                      const tradeCoin =
                        order.order_type === "crypto"
                          ? order.trade_coin_id
                          : order.order_type === "forex"
                          ? order.trade_coin_id.replace("USD", "")
                          : order.order_type === "metal"
                          ? getMetalCoinSymbol(order.trade_coin_id)
                          : "";

                      const symbol =
                        order.order_type === "crypto"
                          ? order.trade_coin_id
                          : order.trade_coin_id;

                      return (
                        <div className="profit-content" key={order.id}>
                          <div className="profit-details">
                            <div className="profit-coin-details">
                              <img
                                className="coin-symbol"
                                src={`./assets/images/coins/${symbol.toLowerCase()}-logo.png`}
                                alt={order.coin_name}
                              />
                              <span className="coin-name ff_NunitoSemiBold">
                                {tradeCoin}/{order.coin_symbol}
                              </span>
                              <span className="profit-date ff_NunitoRegular">
                                {order.created_at}
                              </span>
                            </div>
                            <div className="profit-details-amount">
                              <span className="profit-text">Running</span>
                              <span
                                className="countdown"
                                data-time={order.created_at}
                                data-delivery_time={getFormattedDeliveryTime(
                                  order.created_at,
                                  order.delivery_time
                                )}
                              >
                                00:00:00
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : finishOrders.length === 0 ? (
                <div
                  className="no_data_content ff_NunitoSemiBold"
                  style={{ minHeight: "calc(-260px + 100vh)" }}
                >
                  <img src={imgNoData} alt="No Data" className="img_no_data" />
                  <div>No Data</div>
                </div>
              ) : (
                <div className="profit-history">
                  {finishOrders?.map((order) => {
                    const tradeCoin =
                      order.order_type === "crypto"
                        ? order.trade_coin_id
                        : order.order_type === "forex"
                        ? order.trade_coin_id.replace("USD", "")
                        : order.order_type === "metal"
                        ? getMetalCoinSymbol(order.trade_coin_id)
                        : "";

                    const symbol =
                      order.order_type === "crypto"
                        ? order.trade_coin_id
                        : order.trade_coin_id;

                    return (
                      <div
                        className="profit-content profit-content-pop"
                        key={order.id}
                        data-logo={`./assets/images/coins/${symbol.toLowerCase()}-logo.png`}
                        data-trade={`${tradeCoin}/${order.coin_symbol}`}
                        data-entry={order.created_at}
                        data-amount={order.amount.toFixed(2)}
                        data-direction={order.order_position}
                        data-purchase_price={order.purchase_price.toFixed(2)}
                        data-contract={order.delivery_time}
                        data-profit_amount={order.profit_amount.toFixed(2)}
                        data-is_profit={order.is_profit}
                        data-delivery_price={order.delivery_price.toFixed(2)}
                        data-status="Finished"
                        data-delivery_time={getFormattedDeliveryTime(
                          order.created_at,
                          order.delivery_time
                        )}
                        onClick={() => openPopup(order)}
                      >
                        <div className="profit-details">
                          <div className="profit-coin-details">
                            <img
                              className="coin-symbol"
                              src={`./assets/images/coins/${symbol.toLowerCase()}-logo.png`}
                              alt={order.coin_name}
                            />
                            <span className="coin-name ff_NunitoSemiBold">
                              {tradeCoin}/{order.coin_symbol}
                            </span>
                            <span className="profit-date ff_NunitoRegular">
                              {order.created_at}
                            </span>
                          </div>
                          <div className="profit-details-amount">
                            <span className="profit-text">
                              {order.is_profit ? "Profit" : "Loss"}
                            </span>
                            <span
                              className="profit-amount"
                              style={{
                                color: order.is_profit ? "green" : "red",
                              }}
                            >
                              US$ {order.profit_amount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="profit-icon">
                          <img src={iconMenuArrow} alt="Details" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPopup && selectedOrder && (
        <div className="popup_container">
          <div className="ssb-overlay" style={{ zIndex: 2016 }}></div>
          <div
            className="ssb-popup ssb-popup--round ssb-popup--bottom"
            style={{ width: "100%", height: "100%", zIndex: 2017 }}
          >
            <div id="profit-history" className="profit-history-wrapper">
              <div className="history">
                <div className="title fs-18 fc-353F52">
                  <span>History</span>
                  <img
                    src={iconClose}
                    alt="Close"
                    className="icon_close"
                    onClick={closePopup}
                  />
                </div>
                <div className="history_info">
                  <div className="history-coin-details">
                    <img
                      src={`./assets/images/coins/${selectedOrder.trade_coin_id.toLowerCase()}-logo.png`}
                      alt={selectedOrder.coin_name}
                      className="coin_logo"
                      id="coin_logo"
                    />
                    <span className="ff_NunitoSemiBold" id="trade_symbol">
                      {selectedOrder.trade_coin_id}/{selectedOrder.coin_symbol}
                    </span>
                    <span className="ff_NunitoRegular" id="trade_entry">
                      {selectedOrder.created_at}
                    </span>
                  </div>
                  <div className="history-content">
                    <div className="history-label">Purchase Amount</div>
                    <div className="history-value" id="amount">
                      {selectedOrder.amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="history-content">
                    <div className="history-label">Direction</div>
                    <div className="history-value" id="direction">
                      {selectedOrder.order_position}
                    </div>
                  </div>
                  <div className="history-content">
                    <div className="history-label">Purchase price</div>
                    <div className="history-value" id="purchase_price">
                      {selectedOrder.purchase_price.toFixed(2)}
                    </div>
                  </div>
                  <div className="history-content">
                    <div className="history-label">Contract</div>
                    <div className="history-value" id="contract">
                      {selectedOrder.delivery_time} seconds
                    </div>
                  </div>
                  <div className="history-content">
                    <div className="history-label" id="profit_status">
                      {selectedOrder.is_profit ? "Profit" : "Loss"}
                    </div>
                    <div className="history-value" id="profit_amount">
                      {selectedOrder.profit_amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="history-content">
                    <div className="history-label">Delivery Price</div>
                    <div className="history-value" id="delivery_price">
                      {selectedOrder.delivery_price.toFixed(2)}
                    </div>
                  </div>
                  <div className="history-content">
                    <div className="history-label">Delivery time</div>
                    <div className="history-value" id="delivery_time">
                      {getFormattedDeliveryTime(
                        selectedOrder.created_at,
                        selectedOrder.delivery_time
                      )}
                    </div>
                  </div>
                  <div className="history-content">
                    <div className="history-label">Status</div>
                    <div className="history-value" id="status">
                      Finished
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getMetalCoinSymbol = (coinId) => {
  // Replace with actual function to get metal coin symbol
  return coinId; // Placeholder
};

export default ProfitStatistics;
