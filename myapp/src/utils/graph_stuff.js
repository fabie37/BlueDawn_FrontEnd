

const week_to_data = (purchases, days_in_week) => {
    let week_dir = {};
    for (let i=0; i < days_in_week.length; i++) {
        week_dir[days_in_week[i].getDate()] = 0;
    }
    
    let sorted_data = purchases.sort(function(a,b) { return new Date(a.date) - new Date(b.date)});
    sorted_data.forEach(purchase => {
        let date = new Date(purchase.date).getDate();
        week_dir[date] += purchase.total/100
    });
    let cumsum = 0;
    for (let i=0; i < days_in_week.length; i++) {
        let this_val = week_dir[days_in_week[i].getDate()];
        week_dir[days_in_week[i].getDate()] += cumsum;
        cumsum += this_val;
    }

   let data = [];
   for (var time in week_dir) {
       for (var date of days_in_week) {
           let temp = new Date(date);
           temp.setHours(0,0,0,0);
           if (date.getDate() == time) {
            data.push({ 'value': week_dir[time], 'time': temp })
           }
       }
   }

   return data;
};

exports.week_to_data = week_to_data;