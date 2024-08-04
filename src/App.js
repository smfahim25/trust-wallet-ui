import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

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

  if (isTrustWallet) {
    return !isConnected ? (
      <div className="trust-wallet-connect">
        <h1>Connecting to Trust Wallet...</h1>
      </div>
    ) : (
      <div className="trust-wallet-ui">
        <h1>Welcome Trust Wallet User</h1>
        <p>Account: {account}</p>
        <p>ID: {networkIds}</p>
        {/* Different UI for Trust Wallet Users */}
      </div>
    );
  }

  return (
    <div className="standard-ui">
      <h1>Welcome to My DApp</h1>
      {/* Standard UI */}
    </div>
  );
}

export default App;
