// metalCoinName.js
const getMetalCoinName = (coinSymbol) => {
    let data = '';

    switch (coinSymbol) {
        case 'ES':
            data = "S&P Futures";
            break;
        case 'GC':
            data = "Gold (XAU)";
            break;
        case 'SI':
            data = "Silver (XAG)";
            break;
        case 'CL':
            data = "Crude Oil (WTI)";
            break;
        case 'PL':
            data = "Platinum (XPT)";
            break;
        case 'AUDUSD':
            data = "AUD/USD";
            break;

        case 'GBPUSD':
            data = "GBP/USD";
            break;

        case 'CHFUSD':
            data = "CHF/USD";
            break;

        case 'EURUSD':
            data = "EUR/USD";
            break;

        case 'CADUSD':
            data = "CAD/USD";
            break;

        case 'JPYUSD':
            data = "JPY/USD";
            break;

        case '90':
            data = "Bitcoin";
            break;
        case '2679':
            data = "EOS";
            break;

        case '2':
            data = "Dogecoin";
            break;

        case '257':
            data = "ADA";
            break;

        case '80':
            data = "ETH Coin";
            break;

        case '1':
            data = "LTC Coin";
            break;

        case '89':
            data = "XLM Coin";
            break;

        case '2713':
            data = "TRX Coin";
            break;

        case '2321':
            data = "BCH Coin";
            break;
        case '58':
            data = "XRP Coin";
            break;

        case '48543':
            data = "SOL Coin";
            break;
            
        case '118':
            data = "ETC Coin";
            break;
            
        default:
            data = "";
            break;
    }
    return data;
};

export default getMetalCoinName;
