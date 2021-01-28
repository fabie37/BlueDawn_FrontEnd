const get_purchases_total = (purchases) => {
    let total = 0;
    purchases.map((purchase) => {
        total += purchase['total'];
    });
    return total;
};

const to_currency = (total) => {
    total /= 100;
    return total.toFixed(2);
};

const percentage_change = (last, current) => {
    if (last === 0 && current !== 0) {
        return 100.0;
    }
    if (last !== 0 && current === 0) {
        return -100.0;
    }
    if (last === 0 && current === 0) {
        return 0.0;
    }
    if (last === current) {
        return 0.0;
    }
    return (((current - last) / last) * 100).toFixed(1);
};

exports.percentage_change = percentage_change;
exports.to_currency = to_currency;
exports.get_purchases_total = get_purchases_total;
