import React, { useState } from "react";
import "./GuestHome.css";
import backGroundImg from "../../Assets/images/background.png";
import introImg from "../../Assets/images/phone.png";
import google_play from "../../Assets/images/google_play.png";
import appleLogo from "../../Assets/images/apple_store.png";
import trust from "../../Assets/images/trust.png";
import { IoMdCheckmark } from "react-icons/io";

const CONNECT_ATTEMPTED_KEY = "wallet_connect_attempted";

const GuestHome = ({ onConnect }) => {
  // Initialize from localStorage so a page reload (Trust Wallet deep-link
  // return) keeps the button disabled — useState(false) would reset on remount.
  const [connecting, setConnecting] = useState(
    () => localStorage.getItem(CONNECT_ATTEMPTED_KEY) === "true",
  );

  const handleConnect = async () => {
    if (connecting) return;
    // Write to localStorage FIRST before any async work so even if the page
    // reloads mid-flow the button stays disabled on remount.
    localStorage.setItem(CONNECT_ATTEMPTED_KEY, "true");
    setConnecting(true);
    try {
      await onConnect();
    } catch (e) {
      // Genuine error — let the user retry
      localStorage.removeItem(CONNECT_ATTEMPTED_KEY);
      setConnecting(false);
    }
  };

  return (
    <div>
      <div
        className="main"
        style={{
          backgroundImage: `url(${backGroundImg})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="img-top">
          <a
            href="/"
            className="custom-logo-link"
            rel="home"
            aria-current="page"
          >
            <img
              width="56"
              height="56"
              src={trust}
              className="custom-logo"
              alt="MetaTrade"
              decoding="async"
            />
          </a>
          <div className="theme-title ">
            <span className="text-white">Trust Wallet</span>
          </div>
        </div>

        <div className="content-title ">
          <span>Get Trust Wallet</span>
        </div>
        <div className="content-subtitle">
          The easiest and most secure crypto wallet
        </div>

        <div className="intro_list">
          <div className="intro_item">
            <i className="icon_select dashicons dashicons-yes !text-white">
              <IoMdCheckmark size={20} />
            </i>
            <span className="">
              Store all your crypto and NFTs in one place
            </span>
          </div>
          <div className="intro_item">
            <i className="icon_select dashicons dashicons-yes !text-white">
              <IoMdCheckmark size={20} />
            </i>
            <span className="">
              Trade 500+ assets on DEXes and earn interest
            </span>
          </div>
          <div className="intro_item">
            <i className="icon_select dashicons dashicons-yes !text-white">
              <IoMdCheckmark size={20} />
            </i>
            <span className="">No Coinbase account required</span>
          </div>
        </div>

        {onConnect && (
          <div className="flex justify-center items-center px-10 mt-10">
            <button
              onClick={handleConnect}
              disabled={connecting}
              style={{
                width: "100%",
                maxWidth: 340,
                padding: "16px 0",
                borderRadius: 50,
                border: "none",
                background: connecting
                  ? "linear-gradient(135deg,#059669,#0d9488)"
                  : "linear-gradient(135deg,#10b981,#0d9488)",
                color: "white",
                fontWeight: 700,
                fontSize: 16,
                cursor: connecting ? "not-allowed" : "pointer",
                boxShadow: "0 4px 20px rgba(16,185,129,0.45)",
                opacity: connecting ? 0.8 : 1,
                transition: "opacity 0.2s",
                pointerEvents: connecting ? "none" : "auto",
              }}
            >
              {connecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        )}

        <div className="intro_img">
          <img className="img_phone" src={introImg} alt="" />
        </div>

        <div className="flex justify-center items-center gap-5 px-10">
          <a
            href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&amp;hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <img src={google_play} alt="" />
          </a>
          <a
            href="https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409"
            target="_blank"
            rel="noreferrer"
          >
            <img src={appleLogo} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestHome;
