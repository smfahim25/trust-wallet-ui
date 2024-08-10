import React, { useState } from "react";
import Header from "../Header/Header";

const Funds = () => {
  // Mock data
  const [activeTab, setActiveTab] = useState('deposit');
  const [rechargeModal, setRechargeModal] = useState(false);
  const handleSwitchTab = (tab) => {
      setActiveTab(tab);
    };

    const handleSwitchRechargeModal = () => {
        setRechargeModal(!rechargeModal);
      };
  const fundCoin = "bitcoin"; 
  const user = {
    id: 1,
    wallet: "user_wallet_address",
  };
  const post = {
    ID: 123,
    coin_symbol: "BTC",
    coin_name: "Bitcoin",
    wallet_network: "BTC Network",
    wallet_address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    coin_logo: {
      url: "assets/images/coins/btc-logo.png",
      alt: "Bitcoin Logo",
    },
    wallet_qr: {
      url: "/path/to/qr_code.png",
      alt: "QR Code",
    },
  };

  const balance = {
    coin_amount: "0.12345678",
  };

  const depositLimit = 50; // USD
  const withdrawLimit = 10; // USD
  const withdrawalFee = 0.001; // 0.1%

  const handleRechargeSubmit = () => {
    // Implement recharge submit functionality
    alert("Recharge Submitted");
  };

  const handleSend = () => {
    // Implement send functionality
    alert("Funds Sent");
  };

  return (
    <div className="recharge">
      <div id="coin" style={{ display: "none" }}>{fundCoin}</div>
      <div id="coin_amount" style={{ display: "none" }}>
        {balance ? balance.coin_amount : "0.0000000"}
      </div>
      <Header/>

      <div className="amount">
        <div className="money_symbol ff_InterSemiBold"></div>
        <div className="us_num ff_InterSemiBold">
          US$ {parseFloat(balance.coin_amount).toFixed(2)} {/* Mock conversion */}
        </div>
        <div className="coin_num flex align-center">
          {post.coin_logo.url ? (
            <img
              className="coin_icon"
              src={post.coin_logo.url}
              alt={post.coin_logo.alt}
            />
          ) : (
            <img src="" alt="" className="coin_icon" />
          )}
          <div className="tl">
            <span>
              Available: {balance.coin_amount} {post.coin_symbol}
            </span>
            <div className="fc-5F6775 fs12 m-t-5">
              <span>
                Frozen: 0.0000000 {post.coin_symbol}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="switch_container">
        <div className="switch_content">
          <div
            className={`switch_item ${activeTab === 'deposit' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('deposit')}
          >
            Deposit
          </div>
          <div
            className={`switch_item ${activeTab === 'withdraw' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('withdraw')}
          >
            Withdraw
          </div>
        </div>
      </div>

      {/* <div className="switch_container">
        <div className="switch_content">
          <div className="switch_item active" id="switch_receive">
            Deposit
          </div>
          <div className="switch_item" id="switch_send">
            Withdraw
          </div>
        </div>
      </div> */}
 {activeTab === 'deposit' ? (
    //   Deposit Section 
        <div id="recharge-receive">
        <div className="main_container">
          <div className="main_content">
            <div className="title title-recharge">
              <div className="left">
                <span className="left_icon"></span>
                <span>Deposit funds</span>
              </div>
              <div className="right">
              <div className="recharge-modal">
              <span onClick={handleSwitchRechargeModal} className="recharge-btn">Recharge</span>
                {rechargeModal && (
                
                <form id="recharge-form" onSubmit={handleRechargeSubmit}>
                <div className="ssb-overlay"></div>
                <div
                    className="ssb-popup ssb-popup--round ssb-popup--bottom"
                    style={{ width: "100%", height: "100%", zIndex: 2016 }}
                >
                    <div className="pop-box">
                    <div className="modal-title">
                        <span>Submit Recharge Order</span>
                    </div>
                    <div className="content-wrapper">
                        <div className="info-box">
                        <div className="line">
                            <div className="title">Coin Name</div>
                            <div className="label">{post.coin_name}</div>
                        </div>
                        <div className="line">
                            <div className="title">Currency</div>
                            <div className="label">{post.coin_symbol}</div>
                        </div>
                        <div className="line">
                            <div className="title">Network</div>
                            <div className="label">{post.wallet_network}</div>
                        </div>
                        <div className="line">
                            <div className="title">Address</div>
                            <div className="address-label">
                            <span>{post.wallet_address}</span>
                            </div>
                        </div>

                        <div className="line">
                            <div className="title">
                            Amount <br /> <span>(USD)</span>
                            </div>
                            <div>
                            <div
                                style={{
                                display: "flex",
                                alignItems: "center",
                                }}
                            >
                                <input
                                type="number"
                                inputMode="numeric"
                                name="amount"
                                placeholder="0.00"
                                required
                                />
                            </div>
                            <div className="input_warning">
                                <span>Minimum Deposit Amount: </span>
                                <div id="deposit_limit_coin" style={{ display: "none" }}>
                                {depositLimit}
                                </div>
                                <span> (US$ {depositLimit})</span>
                            </div>
                            </div>
                        </div>
                        <div className="upload-title">Upload Screenshot</div>
                        <div className="upload">
                            <div className="upload_wrap">
                            <div className="ssb-uploader">
                                <div className="ssb-uploader__wrapper">
                                <div className="ssb-uploader__upload">
                                    <img
                                    className="ssb-uploader__upload_img"
                                    src="/assets/images/icon_camera.svg"
                                    alt=""
                                    />
                                    <input
                                    type="file"
                                    name="documents"
                                    accept="image/*"
                                    className="ssb-uploader__input"
                                    />
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="tip">
                            Please upload a screenshot of your successful
                            transfer
                        </div>
                        <button
                            type="submit"
                            className="submit ssb-button ssb-button--default ssb-button--normal"
                        >
                            <div className="ssb-button__content">
                            <span className="ssb-button__text">Submit</span>
                            </div>
                        </button>
                        </div>
                        <div className="list-box" style={{ display: "none" }}></div>
                    </div>
                    </div>
                    <div
                    onClick={handleSwitchRechargeModal}
                    role="button"
                    tabIndex="0"
                    className="ssb-icon ssb-popup__close-icon ssb-popup__close-icon--top-right"
                    >
                    <img
                        src="/assets/images/icon_close.svg"
                        className="ssb-icon__image"
                        alt="Close"
                    />
                    </div>
                </div>
                </form>
                
                )}
               </div>
              </div>
            </div>
            <div>
              <div className="light-tab-container">
                <div className="light-tab-content">
                  <div className="light-tab-item active">
                    {post.coin_symbol}
                  </div>
                </div>
              </div>
              <div className="qr_content">
                {post.wallet_qr.url ? (
                  <img
                    className="qr_code"
                    src={post.wallet_qr.url}
                    alt={post.wallet_qr.alt}
                  />
                ) : (
                  <img src="" alt="" className="qr_code" />
                )}
                <div
                  className="address text-color ff_NunitoRegular"
                  id="wallet_address"
                >
                  {post.wallet_address}
                </div>
                <div className="copy link-text-color ff_NunitoSemiBold">
                  <span>Copy address</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tips">
            <div className="tips_title h3-color ff_NunitoSemiBold">Do you know?</div>
            <div className="tips_content">
              <div>
                Please do not send other types of assets to the above address.
                This operation may cause the loss of your assets. After the
                sending is successful, the network node needs to confirm to
                receive the corresponding assets. So when you complete the
                transfer, please contact the online customer service in time to
                verify the arrival.
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        //  Withdraw Section 
      <div id="recharge-send">
      <div className="main_container">
        <div className="main_content">
          <div className="title title-recharge">
            <div className="left">
              <span className="left_icon"></span>
              <span>Withdrawal</span>
            </div>
          </div>
          <div className="coin_type">
            <div className="coin_item active">{post.coin_symbol}</div>
          </div>
          <div className="input_content ff_NunitoSemiBold">
            <div className="address">
              <input
                type="text"
                id="receiver_account"
                placeholder="Receiving Address"
                className="address_input"
              />
              <img
                src="/assets/images/icon_delete.svg"
                className="icon_delete"
                alt="Delete"
              />
            </div>
            <div className="address">
              {post.coin_logo.url ? (
                <img
                  className="coin_icon receiver_amount_input"
                  src={post.coin_logo.url}
                  alt={post.coin_logo.alt}
                />
              ) : (
                <img src="" alt="" className="coin_icon" />
              )}
              <input
                type="number"
                inputMode="numeric"
                id="receiver_amount"
                placeholder="0.00"
                className="send-am-input"
              />
              <span className="coin_symbol receiver_amount_input">
                {post.coin_symbol} <span className="all"> | Max </span>
              </span>
            </div>
            <div className="input_warning">
              <span>Minimum Withdrawal Amount: </span>
              <div id="withdraw_limit_coin" style={{ display: "none" }}>
                {/* Convert USD to Coin Amount */}
                {(withdrawLimit / parseFloat(balance.coin_amount)).toFixed(8)}
              </div>
              <span>
                {(withdrawLimit / parseFloat(balance.coin_amount)).toFixed(8)}{" "}
                {post.coin_symbol} <span> (US$ {withdrawLimit}) </span>
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="send_action fs-16 ff_NunitoBold"
              onClick={handleSend}
            >
              Send now
            </button>
          </div>
          <div className="send_tips ff_NunitoRegular">
            <div>
              Please check if your receiving address is correct before sending, so as not to cause loss of assets
            </div>
            <div>Withdrawal fee is {withdrawalFee * 100}%</div>
          </div>
        </div>
        <div className="tips" style={{ textAlign: "center" }}>
          <div className="tips_content">
            <p>Please do not transfer funds to strangers</p>
          </div>
        </div>
      </div>
    </div>
      )}
     
      

      
    </div>
  );
};

export default Funds;
