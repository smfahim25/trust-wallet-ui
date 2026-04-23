import React, { useEffect, useState } from "react";
import imgWallet from "../../Assets/images/img_wallet.png";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import useWallets from "../../hooks/useWallets";
import { useUser } from "../../context/UserContext";
import useCryptoTradeConverter from "../../hooks/userCryptoTradeConverter";

function Account() {
  const { user } = useUser();
  const { wallets } = useWallets(user?.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [coinValues, setCoinValues] = useState({});
  const { convertUSDTToCoin } = useCryptoTradeConverter();

  useEffect(() => {
    const fetchConvertedValues = async () => {
      if (wallets?.length > 0) {
        const newCoinValues = {};
        for (const wallet of wallets) {
          try {
            const convertedCoin = await convertUSDTToCoin(
              wallet?.coin_amount,
              wallet.coin_id,
            );
            newCoinValues[wallet.coin_id] = convertedCoin;
          } catch (error) {
            newCoinValues[wallet.coin_id] = null;
          }
        }
        setCoinValues(newCoinValues);
      }
    };
    fetchConvertedValues();
  }, [wallets]);

  const filtered = wallets?.filter((w) =>
    w.coin_symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header pageTitle={""} />

      {/* ── Purple gradient banner ── */}
      <div
        className="relative overflow-hidden px-5 pt-6 pb-6 mx-4 mt-4 rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)",
        }}
      >
        <div
          className="absolute bottom-0 left-0 w-56 h-40 rounded-full opacity-20"
          style={{
            background: "#a5b4fc",
            filter: "blur(40px)",
            transform: "translate(-20%,30%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
          style={{
            background: "#f9a8d4",
            filter: "blur(36px)",
            transform: "translate(20%,-20%)",
          }}
        />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <h1 className="text-white text-2xl font-extrabold leading-tight mb-1">
              Send Crypto Now
            </h1>
            <p className="text-white/80 text-sm leading-snug">
              Choose a wallet to send crypto from
            </p>
          </div>
          <img
            src={imgWallet}
            alt="Wallet"
            className="w-28 h-24 object-contain flex-shrink-0"
            style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))" }}
          />
        </div>
      </div>

      {/* ── Select + Search ── */}
      <div className="px-4 py-4 flex items-center gap-3">
        <h2 className="text-gray-900 font-extrabold text-lg whitespace-nowrap">
          Select a wallet
        </h2>
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-gray-100">
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            className="flex-shrink-0"
          >
            <circle cx="7" cy="7" r="5" stroke="#9ca3af" strokeWidth="1.5" />
            <path
              d="M11 11l3 3"
              stroke="#9ca3af"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Search"
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ── Wallet list ── */}
      <div className="px-4 bg-white rounded-3xl mx-4 shadow-sm border border-gray-100 overflow-hidden">
        {filtered?.map((wallet, idx) => (
          <Link
            key={wallet.id}
            to="/funds"
            state={{ wallet, coinAmount: coinValues[wallet.coin_id] }}
            className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-contain"
                src={`/assets/images/coins/${wallet.coin_symbol.toLowerCase()}-logo.png`}
                alt={wallet.coin_symbol}
              />
              <div>
                <p className="text-gray-900 font-bold text-base leading-tight">
                  {wallet.coin_symbol} Wallet
                </p>
                <p className="text-gray-400 text-sm mt-0.5">
                  {wallet.coin_symbol} Coin
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-900 font-semibold text-sm">
                US$ {parseFloat(wallet.coin_amount || 0).toFixed(4)}
              </p>
              <p className="text-gray-400 text-sm mt-0.5">
                {coinValues[wallet.coin_id] !== undefined
                  ? coinValues[wallet.coin_id]
                  : "0.0000"}{" "}
                {wallet.coin_symbol}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Account;
