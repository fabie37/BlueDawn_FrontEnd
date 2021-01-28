import React from 'react';
import Card from '../Card/Card';
import Title from '../Title/Title';
import './Container.css';
import { get_week_range, get_purchases_in_date_range } from '../../utils/dates';

const Container = ({ purchases }) => {
    let this_week_purchases;
    let last_week_purchases;
    let week;

    console.log(purchases);
    if (purchases) {
        week = get_week_range();
        this_week_purchases = get_purchases_in_date_range(
            week['startDate'],
            week['endDate'],
            purchases
        );
        let lastweek = get_week_range(-7);
        last_week_purchases = get_purchases_in_date_range(
            lastweek['startDate'],
            lastweek['endDate'],
            purchases
        );
    }

    return (
        <div className='container'>
            <Title
                this_week_purchases={this_week_purchases}
                last_week_purchases={last_week_purchases}
                week={week}
            ></Title>
        </div>
    );
};

export default Container;
