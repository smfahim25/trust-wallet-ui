import React, { useEffect, useState } from "react";
import imgWallet from "../../Assets/images/img_wallet.png";
import ethLogo from "../../Assets/images/coins/eth-logo.png";

import usdtLogo from "../../Assets/images/coins/usdt.png";
import btcLogo from "../../Assets/images/coins/btc-logo.png";
import solLogo from "../../Assets/images/coins/sol-logo.png";
import Header from "../Header/Header";

// A utility function to fetch data
async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

function Account() {
  const [wallets, setWallets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  // Fetch user and wallet data from the API
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch user data
        const user = await fetchData("/api/get_user");
        setUser(user);

        // Fetch wallet posts
        const posts = await fetchData("/api/get_wallets");
        setWallets(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    loadData();
  }, []);

  // Filter wallets based on the search term
  //   const filteredWallets = wallets.filter(wallet =>
  //     wallet.coin_symbol.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const filteredWallets = [
    {
      id: 1,
      post_name: "BTC Wallet",
      coin_symbol: "BTC",
      coin_logo: {
        url: btcLogo,
        alt: "Bitcoin Logo",
      },
      usd_value: "12,345.67", // USD value of the wallet
      coin_amount: "0.05", // Amount of cryptocurrency in the wallet
    },
    {
      id: 2,
      post_name: "ETH Wallet",
      coin_symbol: "ETH",
      coin_logo: {
        url: ethLogo,
        alt: "Ethereum Logo",
      },
      usd_value: "2,345.89",
      coin_amount: "1.2",
    },
    {
      id: 3,
      post_name: "USDT Wallet",
      coin_symbol: "USDT",
      coin_logo: {
        url: usdtLogo,
        alt: "Ripple Logo",
      },
      usd_value: "345.67",
      coin_amount: "500.0",
    },
    {
      id: 4,
      post_name: "SOL Wallet",
      coin_symbol: "SOL",
      coin_logo: {
        url: solLogo,
        alt: "Litecoin Logo",
      },
      usd_value: "456.78",
      coin_amount: "3.5",
    },
  ];

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

        {filteredWallets.length > 0 && (
          <div className="wallet_list">
            {filteredWallets.map((wallet) => (
              <a href={`/`} key={wallet.id} className="wallet_item">
                <div className="item_info">
                  {wallet.coin_logo ? (
                    <img
                      className="icon"
                      src={wallet.coin_logo.url}
                      alt={wallet.coin_logo.alt}
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
                    US$ {wallet.usd_value}
                  </div>
                  <div className="value_num fs-26 fc-5B616E ff_InterMedium">
                    {wallet.coin_amount} {wallet.coin_symbol}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
