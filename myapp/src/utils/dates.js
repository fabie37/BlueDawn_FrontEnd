const get_purchases_in_date_range = (startDate, endDate, purchases) => {
    let inRangePurchases = new Array();

    purchases['data'].forEach((purchase) => {
        const purchaseDate = new Date(purchase['date'].split('T')[0]);
        if (
            startDate.getTime() <= purchaseDate.getTime() &&
            endDate.getTime() >= purchaseDate.getTime()
        ) {
            inRangePurchases.push(purchase);
        }
    });

    return inRangePurchases;
};

const get_week_range = (offset = 0) => {
    let week = {};
    let now = new Date();
    now.setTime(Date.now());
    now.setDate(now.getDate() + offset);
    let day = now.getDay();

    let startDate = new Date();
    let endDate = new Date();

    startDate.setDate(now.getDate() - day + 1);
    endDate.setDate(now.getDate() + (7 - day));

    week['startDate'] = startDate;
    week['endDate'] = endDate;

    return week;
};

const date_to_daymonth = (date) => {
    const month = format_month(date.getMonth() + 1);
    const day = date.getDate();
    return day + '/' + month;
};

const format_month = (month) => {
    let monthString = month.toString();
    if (monthString.length == 1) {
        monthString = '0' + monthString;
    }
    return monthString;
};

exports.date_to_daymonth = date_to_daymonth;
exports.get_purchases_in_date_range = get_purchases_in_date_range;
exports.get_week_range = get_week_range;
exports.format_month = format_month;
