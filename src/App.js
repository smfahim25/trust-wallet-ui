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
import { createMetaCtUser } from "./Components/utils/createMetaCtUser";
import { useUser } from "./context/UserContext";
import Spinner from "./Components/Spinner/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Converter from "./Components/Converter/Converter";
import Layout from "./Components/AdminComponents/Layout";
import AdminLogin from "./Components/AdminComponents/AdminLogin/AdminLogin";
import AdminRoute from "./Components/AdminComponents/AdminRoute";
import TradeviewChart from "./Components/Chart/TradeviewChart";
import ChatPopup from "./Components/ChatPopup/ChatPopup";
function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [setNetworkIds] = useState(null);
  const [isTrustWallet, setIsTrustWallet] = useState(false);
  const [referral] = useState("");
  const [web3, setWeb3] = useState(null);
  const { setUser, loading, setLoading } = useUser();
  const [isChatVisible, setChatVisible] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.replace(`${window.location.href}#/`);
    }

    if (window.ethereum) {
      const ethereumProvider = window.ethereum;
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

  useEffect(() => {
    if (isConnected && isTrustWallet) {
      const initializeUser = async () => {
        try {
          await createMetaCtUser(account, referral, setUser, setLoading);
        } catch (error) {
          console.error("Failed to initialize user:", error);
        }
      };

      initializeUser();
    }
  }, [isConnected, isTrustWallet, account, referral, setUser, setLoading]);

  const handleChatClick = () => {
    setChatVisible(true);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  return (
    <div>
      {loading && (
        <div id="global-loader">
          <Spinner />
        </div>
      )}
      <div className="app">
        {/* <Routes> */}
        {isConnected && isTrustWallet ? (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile walletId={account} />} />
              <Route path="/account" element={<Account />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/profit-stat" element={<ProfitStatistics />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/business" element={<Business wallet={account} />} />
              <Route path="/referral-list" element={<ReferralList />} />
              <Route path="/converter" element={<Converter />} />
              <Route
                path="/referral-history"
                element={<ReferralBonusHistory />}
              />
              <Route path="/contact-us" element={<Contact />} />
            </Routes>
            <ChatPopup visible={isChatVisible} onClose={handleCloseChat} />
            <div className="c-chat" onClick={handleChatClick}>
              <div className="c-chat-wrap">
                <div className="arrow-icon">
                  <svg
                    color="inherit"
                    width="100%"
                    height="100%"
                    viewBox="0 0 32 32"
                    className="c-svg"
                  >
                    <path
                      fill="#FFFFFF"
                      d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"
                    ></path>
                    <path
                      fill="#2000F0"
                      d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z"
                      className="lc-1adcsh3 e1nep2br0"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<GuestHome />} />
              <Route path="/admin-login" element={<AdminLogin />}></Route>
              <Route
                path="/cradmin/*"
                element={
                  <AdminRoute>
                    <Layout />
                  </AdminRoute>
                }
              />
            </Routes>
          </>
        )}
        {/* </Routes> */}
      </div>
      <ToastContainer autoClose={2000} position="bottom-center" />
      {/* Chat Icon */}

      {/* Chat Popup */}
    </div>
  );
}

export default App;
