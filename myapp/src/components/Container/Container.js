import React from 'react';
import Title from '../Title/Title';
import './Container.css';
import { get_week_range, get_purchases_in_date_range } from '../../utils/dates';
import GraphContainer from '../Graph/GraphContainer';

const Container = ({ purchases }) => {
    let this_week_purchases = [];
    let last_week_purchases = [];
    let week = {};
    let lastweek = {};

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

        return (
            <div className='container'>
                {}<Title
                    this_week_purchases={this_week_purchases}
                    last_week_purchases={last_week_purchases}
                    week={week}
                ></Title>
                <GraphContainer week={week} this_week_purchases={this_week_purchases}></GraphContainer>
            </div>
        );
    } else {
        return (<div className='container'>
            Loading...
        </div>);
    }


};

export default Container;
