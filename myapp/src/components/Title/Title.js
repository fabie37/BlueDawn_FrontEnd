import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Title.css';
import { BiCaretUp, BiCaretDown, BiMinus } from 'react-icons/bi';
import { format_month, date_to_daymonth } from '../../utils/dates';
import {
    get_purchases_total,
    to_currency,
    percentage_change,
} from '../../utils/totals';

const Title = ({ this_week_purchases, last_week_purchases, week }) => {
    // Managing The Dates
    let start = '';
    let end = '';

    if (week) {
        start = date_to_daymonth(week['startDate']);
        end = date_to_daymonth(week['endDate']);
    }

    // Managing the totals
    let thisWeekTotal;
    let lastWeekTotal;

    if (this_week_purchases) {
        thisWeekTotal = get_purchases_total(this_week_purchases);
        thisWeekTotal = to_currency(thisWeekTotal);
    }

    if (last_week_purchases) {
        lastWeekTotal = get_purchases_total(last_week_purchases);
        lastWeekTotal = to_currency(lastWeekTotal);
    }

    // Managing the percent change
    let percentDelta = 0;

    if (thisWeekTotal && lastWeekTotal) {
        percentDelta = percentage_change(lastWeekTotal, thisWeekTotal);
    }

    let symbol;
    let class_name = 'ticker ';
    if (percentDelta === 0) {
        class_name += 'same';
        symbol = <BiMinus viewBox='0 0 24 15' />;
    } else if (percentDelta > 0) {
        class_name += 'increase';
        symbol = <BiCaretUp viewBox='0 0 24 15' />;
    } else {
        class_name += 'decrease';
        symbol = <BiCaretDown viewBox='0 0 24 15' />;
    }

    return (
        <div className='title'>
            <div className='main'>
                Total: £{thisWeekTotal ? thisWeekTotal : '0.00'}
            </div>
            <div className={class_name}>
                {symbol}
                {percentDelta}%
            </div>
            <div className='secondary'>
                Last Week: £{lastWeekTotal ? lastWeekTotal : '0.00'}
            </div>

            <div className='date'>
                {start} {week ? '-' : ''} {end}
            </div>
        </div>
    );
};

export default Title;
