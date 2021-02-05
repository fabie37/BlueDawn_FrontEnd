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

const get_year_range = (offset = 0) => {
    let year = {};
    let now = new Date();
    now.setTime(Date.now());
    now.setFullYear(now.getFullYear() + offset);
    now.setHours(0, 0, 0, 0);

    let startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(0);
    startDate.setFullYear(now.getFullYear())
    startDate.setHours(0, 0, 0, 0);

    let endDate = new Date(now.getFullYear(), 11, 31);
    endDate.setHours(0, 0, 0, 0);

    year['startDate'] = startDate;
    year['endDate'] = endDate;

    console.log(year)

    return year;
};

const get_month_range = (offset = 0) => {
    let month = {};
    let now = new Date();
    now.setTime(Date.now());
    now.setMonth(now.getMonth() + offset);
    now.setHours(0, 0, 0, 0);

    let startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(now.getMonth());
    startDate.setHours(0, 0, 0, 0);

    let endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endDate.setHours(0, 0, 0, 0);

    month['startDate'] = startDate;
    month['endDate'] = endDate;

    return month;
};

const get_week_range = (offset = 0) => {
    let week = {};
    let now = new Date();
    now.setTime(Date.now());
    now.setDate(now.getDate() + offset);
    now.setHours(0, 0, 0, 0);
    let day = now.getDay();

    let startDate = new Date();
    let endDate = new Date();

    startDate.setDate(now.getDate() - day + 1);
    startDate.setMonth(now.getMonth());
    startDate.setHours(0, 0, 0, 0);
    endDate.setMonth(startDate.getMonth());
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(0, 0, 0, 0);

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
    if (monthString.length === 1) {
        monthString = '0' + monthString;
    }
    return monthString;
};

const getDaysArray = function (start, end) {
    for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
    ) {
        arr.push(new Date(dt));
    }
    return arr;
};

exports.getDaysArray = getDaysArray;
exports.date_to_daymonth = date_to_daymonth;
exports.get_purchases_in_date_range = get_purchases_in_date_range;
exports.get_week_range = get_week_range;
exports.format_month = format_month;
exports.get_month_range = get_month_range;
exports.get_year_range = get_year_range;
