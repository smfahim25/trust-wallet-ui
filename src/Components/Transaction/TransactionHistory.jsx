import React from 'react';
import iconClose from '../../Assets/images/icon_close.svg';
import coinLogo from '../../Assets/images/coins/btc-logo.png';

const TransactionHistory = ({ details, onClose }) => {
  return (
    <div className="popup_container">
      <div className="ssb-overlay" style={{ zIndex: 2016 }}></div>
      <div
        className="ssb-popup ssb-popup--round ssb-popup--bottom"
        style={{ width: '100%', height: '100%', zIndex: 2017 }}
      >
        <div id="transaction-history" className="transaction-history-wrapper">
          <div className="history">
            <div className="title fs-18 fc-353F52">
              <span>Transaction Details</span>
              <img
                src={iconClose}
                alt="Close"
                className="icon_close"
                onClick={onClose}
              />
            </div>
            <div className="history_info">
              <div className="history-coin-details">
                <img src={coinLogo} alt="Coin Logo" className="coin_logo" id="coin_logo" />
                <span className="ff_NunitoSemiBold" id="coin_symbol">
                  {details && details.transactionHash}
                </span>
                <span className="ff_NunitoRegular" id="entry"></span>
              </div>
              <div className="history-content">
                <div className="history-label">Sender</div>
                <div className="history-value" id="sender">
                  {details && details.sender}
                </div>
              </div>
              <div className="history-content">
                <div className="history-label">Receiver</div>
                <div className="history-value" id="receiver">
                  {details && details.receiver}
                </div>
              </div>
              <div className="history-content">
                <div className="history-label">Amount</div>
                <div className="history-value" id="amount">
                  {details && details.amount}
                </div>
              </div>
              <div className="history-content">
                <div className="history-label">Transaction Hash</div>
                <div className="history-value" id="trans_hash">
                  {details && details.transactionHash}
                </div>
              </div>
              <div className="history-content">
                <div className="history-label">Status</div>
                <div className="history-value" id="status">
                  {details && details.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
