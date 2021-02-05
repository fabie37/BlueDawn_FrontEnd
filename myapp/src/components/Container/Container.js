import React, { useState, useEffect, useRef } from 'react';
import Title from '../Title/Title';
import './Container.css';
import {
    get_week_range,
    get_purchases_in_date_range,
    get_month_range,
    get_year_range
} from '../../utils/dates';
import GraphContainer from '../Graph/GraphContainer';
import PieContainer from '../Pie/PieContainer';

const Container = ({ purchases }) => {
    let this_week_purchases = [];
    let last_week_purchases = [];
    let this_month_purchases = [];
    let last_month_purchases = [];
    let this_year_purchases = [];
    let last_year_purchases = [];
    let week = {};
    let lastweek = {};
    let month = {};
    let lastmonth = {};
    let year = {};
    let lastyear = {};
    
    const timer = useRef();
    var [timerIQ, setTimerIQ] = useState(100);

    /*useEffect(() => {
        timer.current = setTimeout(() => {
            console.log(timerIQ)
            console.log("Dones");
            document.querySelector('div.slider').scrollBy({
                top: 100,
                left: timerIQ,
                behavior: 'smooth'
              })
              setTimerIQ((prev) => {
                
                  if (prev == 100) { return -100;} else {return 100;}
              });
        }, 5000);
        return () => clearTimeout(timer);
    }, [timerIQ]) */

    if (purchases) {
        week = get_week_range();
        this_week_purchases = get_purchases_in_date_range(
            week['startDate'],
            week['endDate'],
            purchases
        );

        lastweek = get_week_range(-7);
        last_week_purchases = get_purchases_in_date_range(
            lastweek['startDate'],
            lastweek['endDate'],
            purchases
        );

        month = get_month_range();
        this_month_purchases = get_purchases_in_date_range(
            month['startDate'],
            month['endDate'],
            purchases
        );
        lastmonth = get_month_range(-1);
        last_month_purchases = get_purchases_in_date_range(
            lastmonth['startDate'],
            lastmonth['endDate'],
            purchases
        );

        year = get_year_range();
        this_year_purchases = get_purchases_in_date_range(
            year['startDate'],
            year['endDate'],
            purchases
        );

        lastyear = get_year_range(-1);
        last_year_purchases = get_purchases_in_date_range(
            lastyear['startDate'],
            lastyear['endDate'],
            purchases
        );

        console.log(this_month_purchases);


        return (
            <div className='slider'>
            <div className='container'>
                <Title
                    this_time_purchases={this_month_purchases}
                    last_time_purchases={last_month_purchases}
                    date_range={month}
                    timeframe={'Month'}
                ></Title>
                <GraphContainer
                    date_range={month}
                    last_date_range={lastmonth}
                    timeframe={'Month'}
                    this_time_purchases={this_month_purchases}
                    last_time_purchases={last_month_purchases}
                ></GraphContainer>
                <PieContainer purchases={this_month_purchases}></PieContainer>
            </div>
            
            </div>
        );
    } else {
        return <div className='container'>Loading...</div>;
    }
};

export default Container;
