import React, { useState } from "react";
import imgWallet from "../../Assets/images/img_wallet.png";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import useWallets from "../../hooks/useWallets";
import { useUser } from "../../context/UserContext";

function Account() {
  const { user } = useUser();
  const { wallets } = useWallets(user?.id);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="main">
      <div className="account">
        <Header pageTitle={""} />

        <div className="title_container">
          <div className="title_info">
            <div className="title fs-20 ff_NunitoBold">Send Crypto Now</div>
            <div className="subtitle fs-14 fc-5B616E ff_NunitoSemiBold">
              Choose a wallet to send crypto from
            </div>
          </div>
          <img src={imgWallet} alt="Wallet" className="title_img" />
        </div>

        <div className="wallet_select">
          <div className="title">
            <div className="select_line"></div>
            <div className="value fs-26 fc-5B616E ff_NunitoSemiBold">
              Select a wallet
            </div>

            <div className="ssb-search search-input">
              <div className="ssb-search__content ssb-search__content--square">
                <div className="ssb-cell ssb-cell--borderless ssb-field">
                  <div className="ssb-field__left-icon">
                    <i className="ssb-icon dashicons dashicons-search"></i>
                  </div>
                  <div className="ssb-cell__value ssb-cell__value--alone ssb-field__value">
                    <div className="ssb-field__body">
                      <input
                        type="search"
                        placeholder="Search"
                        className="ssb-field__control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {wallets?.length > 0 && (
          <div className="wallet_list">
            {wallets?.map((wallet) => (
              <Link
                key={wallet.id}
                to="/funds"
                state={{ wallet }}
                className="wallet_item"
              >
                <div className="item_info">
                  {wallet.coin_logo ? (
                    <img
                      className="icon"
                      src={`/assets/images/coins/${wallet.coin_symbol.toLowerCase()}-logo.png`}
                      alt={wallet.coin_symbol || ""}
                    />
                  ) : (
                    <img src="" alt="No Icon" className="icon" />
                  )}

                  <div className="info">
                    <div className="fs-32 fc-353F52 ff_NunitoBold">
                      {wallet.coin_symbol} Wallet
                    </div>
                    <div className="subtitle fs-26 fc-5B616E ff_NunitoSemiBold">
                      {wallet.coin_symbol} Coin
                    </div>
                  </div>
                </div>
                <div className="item_value">
                  <div className="value_us fs-32 fc-353F52 ff_InterSemiBold">
                    {parseFloat(wallet?.coin_amount).toFixed(3)}{" "}
                    {wallet.coin_symbol}
                  </div>
                  <div className="value_num fs-26 fc-5B616E ff_InterMedium">
                    {parseFloat(wallet?.coin_amount).toFixed(2) || "0.00"}{" "}
                    {wallet.coin_symbol}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
