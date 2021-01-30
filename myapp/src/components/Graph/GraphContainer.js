import React, { useRef } from 'react';
import './Graph.css';
import LineGraph from './LineGraph';
import { getDaysArray } from '../../utils/dates'

const GraphContainer = ({ this_week_purchases, week }) => {

    let days_in_week = getDaysArray(week.startDate, week.endDate);
    let week_dir = {};
    for (let i=0; i < days_in_week.length; i++) {
        week_dir[days_in_week[i].getDate()] = 0;
    }
    
    let sorted_data = this_week_purchases.sort(function(a,b) { return new Date(a.date) - new Date(b.date)});
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
    /*let sorted_data = this_week_purchases.sort(function(a,b) { return new Date(a.date) - new Date(b.date)});
    let cumsum = 0;
    console.log(sorted_data);
    let data = sorted_data.map((purchase) => {
        
        let dataset = { value: cumsum, time: purchase.date };
        return dataset;
    });
    */
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

    console.log(data);


    return (
        <div className='graph'>
            <LineGraph
                title='This Week'
                data={data}
                color="#fffffff">
            </LineGraph>
        </div>
    );
};

export default GraphContainer;

