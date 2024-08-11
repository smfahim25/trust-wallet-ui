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
        default:
            data = "";
            break;
    }
    return data;
};

export default getMetalCoinName;
