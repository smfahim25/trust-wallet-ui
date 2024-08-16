import React, { useState } from "react";
import Header from "../Header/Header";
import useCryptoTradeConverter from "../../hooks/userCryptoTradeConverter";

const Converter = () => {
  const [coin, setCoin] = useState(null);
  const [usdt, setUSDT] = useState(null);
  const { convertCoinToUSDT, convertUSDTToCoin, loading } = useCryptoTradeConverter();
  
  const convert = async () => {
    try {
      const convertedCoin = await convertUSDTToCoin(500, 90);
      setCoin(convertedCoin);
      console.log("Converted coin:", convertedCoin);
    } catch (error) {
      console.error("Error converting coin:", error);
    }
  };

  const ConvertToUSD = async () => {
    try {
      const convertedCoin = await convertCoinToUSDT(coin, 90);
      setUSDT(convertedCoin);
      console.log("Converted coin:", convertedCoin);
    } catch (error) {
      console.error("Error converting coin:", error);
    }
  };

  return (
    <div>
      <Header pageTitle="Converter" />
      <button onClick={convert}>Convert</button>
      <h2>Converted coin = {coin}</h2>
      <button onClick={ConvertToUSD}>ConvertToUSD</button>
      <h2>Converted coin = {usdt}</h2>
    </div>
  );
};

export default Converter;
