import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import Home from "./Components/Home/Home";
import GuestHome from "./Components/GuestHome/GuestHome";
import Profile from "./Components/Profile/Profile";
import Account from "./Components/Account/Account";
import Notification from "./Components/Notification/Notification";
import Transaction from "./Components/Transaction/Transaction";
import ProfitStatistics from "./Components/ProfitStatistics/ProfitStatistics";
import Funds from "./Components/Funds/Funds";
import Business from "./Components/Business/Business";
import ReferralList from "./Components/Refferal/ReferralList";
import ReferralBonusHistory from "./Components/Refferal/ReferralBonusHistory";
import Contact from "./Components/Contact/Contact";
import { Route, Routes } from "react-router";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [networkIds, setNetworkIds] = useState(null);
  const [isTrustWallet, setIsTrustWallet] = useState(false);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // Detect if the user is accessing via a wallet provider (including Trust Wallet)
    if (window.ethereum) {
      const ethereumProvider = window.ethereum;

      // Check for Trust Wallet specific properties or methods
      const isTrustWallet =
        ethereumProvider.isTrust ||
        (ethereumProvider &&
          ethereumProvider.isMetaMask === undefined &&
          ethereumProvider.isTrustWallet === undefined);

      if (isTrustWallet) {
        setIsTrustWallet(true);
        connectWallet();
      } else {
        setWeb3(new Web3(ethereumProvider));
      }
    } else {
      console.log("No Ethereum provider detected.");
      console.log(account);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);

        // Initialize Web3 with the provider
        if (web3) {
          const networkId = await web3.eth.net.getId();
          setNetworkIds(networkId);
          const balance = await web3.eth.getBalance(accounts[0]);
          console.log(
            "Account Balance:",
            Web3.utils.fromWei(balance, "ether"),
            "ETH"
          );
        }
      } catch (error) {
        console.error(
          "User rejected the connection request or there was an error."
        );
      }
    } else {
      alert("Please install Trust Wallet or another Ethereum wallet.");
    }
  };

  return !isConnected && !isTrustWallet ? (
    <div className="">
      <GuestHome />
    </div>
  ) : (
    <div className="">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile walletId={account} />} />
          <Route path="/account" element={<Account />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/profit-stat" element={<ProfitStatistics />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/business" element={<Business />} />
          <Route path="/referral-list" element={<ReferralList />} />
          <Route path="/referral-history" element={<ReferralBonusHistory />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
