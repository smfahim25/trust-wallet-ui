const numberFormat = (number, decimals = 0, decPoint = '.', thousandsSep = ',') => {
    // Convert the input to a number if it's not already
    const num = parseFloat(number);

    if (!isFinite(num)) {
        return '';
    }

    const fixedNumber = num.toFixed(decimals);
    const parts = fixedNumber.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
    return parts.join(decPoint);
};

export default numberFormat;
