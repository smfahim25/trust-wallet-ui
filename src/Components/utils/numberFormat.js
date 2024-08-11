// numberFormat.js
const numberFormat = (number, decimals = 0, decPoint = '.', thousandsSep = ',') => {
    if (!isFinite(number)) {
        return '';
    }
    const fixedNumber = number.toFixed(decimals);
    const parts = fixedNumber.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
    return parts.join(decPoint);
};

export default numberFormat;
