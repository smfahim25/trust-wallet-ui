import React, { useState } from "react";

/* ── Coin config ─────────────────────────────────────────────── */
const COINS = [
  { symbol: "USDT", label: "USDT", color: "#26a17b" },
  { symbol: "BTC", label: "BTC", color: "#f7931a" },
  { symbol: "ETH", label: "ETH", color: "#627eea" },
];

/* ── Coin Logo using your real image assets ──────────────────── */
const CoinLogo = ({ symbol, size = 36, selected = false, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      padding: 0,
      border: selected ? "2.5px solid #7c3aed" : "2.5px solid transparent",
      boxShadow: selected ? "0 0 0 2px #ede9fe" : "none",
      background: "none",
      cursor: onClick ? "pointer" : "default",
      flexShrink: 0,
      transition: "border 0.2s, box-shadow 0.2s",
    }}
  >
    <img
      src={`/assets/images/coins/${symbol.toLowerCase()}-logo.png`}
      alt={symbol}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        display: "block",
      }}
      onError={(e) => {
        // Fallback to colored circle if image missing
        e.target.style.display = "none";
        e.target.parentNode.style.background =
          COINS.find((c) => c.symbol === symbol)?.color || "#ccc";
      }}
    />
  </button>
);

/* ── Shield icon ─────────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
    <path
      d="M10 1L2 4.5v6C2 15.1 5.5 19.6 10 21c4.5-1.4 8-5.9 8-10.5v-6L10 1z"
      fill="#22c55e"
      opacity=".15"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <path
      d="M7 11l2 2 4-4"
      stroke="#22c55e"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Check icon ──────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="flex-shrink-0 mt-0.5"
  >
    <circle cx="8" cy="8" r="7" fill="#6366f1" opacity=".12" />
    <path
      d="M5 8l2 2 4-4"
      stroke="#6366f1"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Up-Down arrows ──────────────────────────────────────────── */
const ArrowsUpDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M5 2L3 4l2 2M3 4h7M9 12l2-2-2-2M11 10H4"
      stroke="#6366f1"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ════════════════════════════════════════════════════════════════
   HOSTING WORK PAGE  (Image 1)
   ════════════════════════════════════════════════════════════════ */
const HostingWorkPage = ({ onGoToArbitrage, onBack }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* ── Hero gradient header ── */}
    <div
      className="relative overflow-hidden flex flex-col items-center pt-5 pb-10 px-5"
      style={{
        background:
          "linear-gradient(145deg,#7c3aed 0%,#a855f7 45%,#ec4899 100%)",
        minHeight: 220,
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20"
        style={{
          background: "#fff",
          filter: "blur(48px)",
          transform: "translate(30%,-30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-15"
        style={{
          background: "#a5b4fc",
          filter: "blur(36px)",
          transform: "translate(-20%,40%)",
        }}
      />

      {/* Nav row */}
      <div className="w-full flex items-center justify-between mb-3 relative z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 14L6 9l5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" />
            <rect x="10" y="1" width="5" height="5" rx="1.2" fill="white" />
            <rect x="1" y="10" width="5" height="5" rx="1.2" fill="white" />
            <rect x="10" y="10" width="5" height="5" rx="1.2" fill="white" />
          </svg>
        </div>
      </div>

      {/* Title + amount */}
      <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-1 relative z-10">
        Hosting work
      </p>
      <div
        className="text-white font-black text-5xl mb-6 relative z-10"
        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-1px" }}
      >
        US$ <span style={{ fontVariantNumeric: "tabular-nums" }}>0</span>
      </div>

      {/* Hosting Order button */}
      <button
        onClick={onGoToArbitrage}
        className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-white font-bold text-base relative z-10 transition-transform active:scale-95"
        style={{
          background: "linear-gradient(90deg,#f472b6,#a855f7)",
          boxShadow: "0 8px 24px rgba(168,85,247,0.45)",
        }}
      >
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
          <rect
            x="0"
            y="8"
            width="4"
            height="8"
            rx="1"
            fill="white"
            opacity=".8"
          />
          <rect
            x="7"
            y="4"
            width="4"
            height="12"
            rx="1"
            fill="white"
            opacity=".9"
          />
          <rect x="14" y="0" width="4" height="16" rx="1" fill="white" />
        </svg>
        Hosting Order
      </button>
    </div>

    {/* ── Stats card ── */}
    <div
      className="mx-4 -mt-2 rounded-3xl overflow-hidden shadow-xl"
      style={{
        background:
          "linear-gradient(135deg,#3b4fd8 0%,#6366f1 60%,#818cf8 100%)",
      }}
    >
      <div className="px-5 pt-5 pb-4">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-indigo-200 text-xs font-medium mb-1">
              Total Arbitrage
            </p>
            <p className="text-white font-bold text-lg">
              0{" "}
              <span className="text-indigo-200 text-sm font-normal">USDT</span>
            </p>
          </div>
          <div>
            <p className="text-indigo-200 text-xs font-medium mb-1">
              Today Earnings
            </p>
            <p className="text-white font-bold text-lg">
              0{" "}
              <span className="text-indigo-200 text-sm font-normal">USDT</span>
            </p>
          </div>
        </div>

        {/* Introduction row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-cyan-300 text-xl font-bold mb-0.5">
              Introduction
            </p>
            <p className="text-indigo-100 text-sm">How does AI robot work</p>
          </div>
          {/* Isometric chart illustration */}
          <div className="relative w-24 h-20 flex-shrink-0">
            <div
              className="absolute bottom-0 right-0 w-16 h-16 rounded-xl flex items-end justify-center pb-1"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="flex items-end gap-1">
                <div
                  className="w-2.5 rounded-t"
                  style={{ height: 24, background: "rgba(165,180,252,0.8)" }}
                />
                <div
                  className="w-2.5 rounded-t"
                  style={{ height: 36, background: "rgba(199,210,254,0.9)" }}
                />
                <div
                  className="w-2.5 rounded-t"
                  style={{ height: 20, background: "rgba(165,180,252,0.8)" }}
                />
                <div
                  className="w-2.5 rounded-t"
                  style={{ height: 44, background: "white" }}
                />
              </div>
            </div>
            {/* Little person */}
            <div className="absolute bottom-1 right-0 w-5 h-5 rounded-full bg-orange-300 flex items-center justify-center text-xs">
              👤
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── Arbitrage Products ── */}
    <div className="px-4 pt-6 pb-4">
      <p
        className="text-gray-900 font-extrabold text-lg mb-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Arbitrage Products
      </p>

      {/* Product card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top accent */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg,#7c3aed,#ec4899)" }}
        />

        <div className="px-5 pt-4 pb-5">
          {/* Days badge + description */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div
              className="px-3 py-1 rounded-xl text-sm font-bold"
              style={{
                background: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
                color: "#7c3aed",
              }}
            >
              3 Days
            </div>
            <p className="text-gray-600 text-sm leading-snug">
              Financial product — redeemable within three days
            </p>
          </div>

          {/* Amount + Daily income */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-xs mb-1">Amount</p>
              <p className="text-gray-800 font-semibold text-sm">
                1,000 – 1,000,000
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Daily income</p>
              <p className="font-bold text-sm" style={{ color: "#7c3aed" }}>
                1–3%
              </p>
            </div>
          </div>

          {/* Coin types + Check button */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-2">Arbitrage coin types</p>
              <div className="flex items-center gap-1.5">
                {COINS.map((coin) => (
                  <CoinLogo key={coin.symbol} symbol={coin.symbol} size={36} />
                ))}
              </div>
            </div>
            <button
              onClick={onGoToArbitrage}
              className="px-6 py-2.5 rounded-xl text-white font-bold text-sm transition-transform active:scale-95"
              style={{
                background: "linear-gradient(90deg,#f472b6,#a855f7)",
                boxShadow: "0 4px 14px rgba(168,85,247,0.35)",
              }}
            >
              Check
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   ARBITRAGE DETAIL PAGE  (Images 2 & 3)
   ════════════════════════════════════════════════════════════════ */
const ArbitragePage = ({ onBack }) => {
  const [amount, setAmount] = useState(0);
  const [sliderVal, setSliderVal] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const maxBalance = 0;

  const expectedEarnings = (amount * 0.02).toFixed(2);

  const benefits = [
    "Daily income is sent to your USDT, BTC, ETH wallet",
    "Zero risk of your investment funds",
    "You can get your funds back anytime",
    "Artificial intelligence works 24 hours a day",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Gradient header ── */}
      <div
        className="relative overflow-hidden flex flex-col items-center pt-5 pb-16 px-5"
        style={{
          background:
            "linear-gradient(145deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%)",
          minHeight: 160,
        }}
      >
        <div
          className="absolute top-0 right-0 w-52 h-52 rounded-full opacity-20"
          style={{
            background: "#fff",
            filter: "blur(48px)",
            transform: "translate(30%,-30%)",
          }}
        />
        <div className="w-full flex items-center gap-3 relative z-10">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 14L6 9l5-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p
            className="text-white font-extrabold text-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Arbitrage
          </p>
        </div>
      </div>

      {/* ── Hero banner card ── */}
      <div className="mx-4 -mt-8 relative z-10">
        <div
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{
            background:
              "linear-gradient(135deg,#3b4fd8 0%,#6366f1 55%,#818cf8 100%)",
          }}
        >
          <div className="px-5 py-5 flex items-center justify-between">
            <div>
              <p
                className="text-cyan-300 text-2xl font-extrabold mb-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Join AI Arbitrage
              </p>
              <p className="text-indigo-200 text-sm">Zero risk, fast return</p>
            </div>
            <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <div className="relative">
                <div
                  className="w-12 h-14 rounded-2xl flex flex-col items-center justify-center gap-1"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  </div>
                  <div className="w-6 h-1.5 rounded-full bg-cyan-400" />
                  <p className="text-indigo-600 text-xs font-bold">HI!</p>
                </div>
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full opacity-40"
                  style={{ background: "#6366f1", filter: "blur(6px)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main detail card ── */}
      <div className="mx-4 mt-4 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div
          className="h-1"
          style={{ background: "linear-gradient(90deg,#7c3aed,#ec4899)" }}
        />
        <div className="px-5 py-5">
          {/* AI Arbitrage header row */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShieldIcon />
              <span className="text-gray-800 font-bold text-base">
                AI Arbitrage
              </span>
            </div>
            <div
              className="px-3 py-1 rounded-xl text-sm font-bold"
              style={{
                background: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
                color: "#7c3aed",
              }}
            >
              3 Days
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-5 pb-5 border-b border-gray-100">
            <div>
              <p className="text-gray-400 text-xs mb-1">Amount (USD)</p>
              <p className="text-gray-800 font-semibold text-sm">
                1,000 – 1,000,000
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Daily income</p>
              <p
                className="font-extrabold text-sm"
                style={{ color: "#7c3aed" }}
              >
                1–3%
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">
                Balance ({selectedCoin})
              </p>
              <p className="text-gray-800 font-semibold text-sm">0</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Expected earnings</p>
              <p
                className="font-extrabold text-sm"
                style={{ color: "#22c55e" }}
              >
                {amount > 0 ? expectedEarnings : "0.00"}
              </p>
            </div>
          </div>

          {/* ── Coin selector (clickable) ── */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <p className="text-gray-500 text-xs font-medium mb-3">
              Arbitrage coin types
            </p>
            <div className="flex items-center gap-3">
              {COINS.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex flex-col items-center gap-1"
                >
                  <CoinLogo
                    symbol={coin.symbol}
                    size={40}
                    selected={selectedCoin === coin.symbol}
                    onClick={() => setSelectedCoin(coin.symbol)}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color:
                        selectedCoin === coin.symbol ? "#7c3aed" : "#9ca3af",
                    }}
                  >
                    {coin.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hosting amount input */}
          <div className="mb-4">
            <p className="text-gray-700 font-semibold text-sm mb-3">
              Hosting Amount
            </p>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all"
              style={{
                borderColor: amount > 0 ? "#7c3aed" : "#e5e7eb",
                background: "#fafafa",
              }}
            >
              {/* Show selected coin logo in input */}
              <CoinLogo symbol={selectedCoin} size={36} />
              <div className="flex items-center gap-1 text-indigo-400">
                <ArrowsUpDown />
              </div>
              <input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="flex-1 bg-transparent text-gray-800 font-bold text-lg outline-none"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {/* Show selected coin symbol label */}
              <span className="text-gray-400 text-sm font-medium">
                {selectedCoin}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-2">
            <input
              type="range"
              min={0}
              max={100}
              value={sliderVal}
              onChange={(e) => {
                setSliderVal(e.target.value);
                setAmount(Math.round((e.target.value / 100) * maxBalance));
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #7c3aed ${sliderVal}%, #e5e7eb ${sliderVal}%)`,
                accentColor: "#7c3aed",
              }}
            />
          </div>

          {/* Balance status */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-red-500 text-xs font-semibold">
              Insufficient balance
            </p>
            <button className="text-gray-500 text-xs font-medium underline underline-offset-2">
              Recharge
            </button>
          </div>

          {/* Hosting now button */}
          <button
            className="w-full py-4 rounded-2xl text-white font-extrabold text-base transition-transform active:scale-98"
            style={{
              background: "linear-gradient(90deg,#f472b6,#a855f7)",
              boxShadow: "0 8px 24px rgba(168,85,247,0.4)",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.3px",
            }}
          >
            Hosting now
          </button>
        </div>
      </div>

      {/* ── Benefits list ── */}
      <div className="mx-4 mt-4 mb-8 bg-white rounded-3xl shadow-sm border border-gray-100 px-5 py-5">
        <div className="flex flex-col gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckIcon />
              <p className="text-gray-600 text-sm leading-snug">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   ROOT — switches between pages
   ════════════════════════════════════════════════════════════════ */
export default function ArbitrageRoot() {
  const [page, setPage] = useState("hosting"); // "hosting" | "arbitrage"

  if (page === "arbitrage") {
    return <ArbitragePage onBack={() => setPage("hosting")} />;
  }
  return (
    <HostingWorkPage
      onGoToArbitrage={() => setPage("arbitrage")}
      onBack={() => {}}
    />
  );
}
