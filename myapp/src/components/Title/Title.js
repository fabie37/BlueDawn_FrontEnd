import React from 'react';
import './Title.css';
import { BiCaretUp, BiCaretDown, BiMinus } from 'react-icons/bi';
import { date_to_daymonth } from '../../utils/dates';
import {
    get_purchases_total,
    to_currency,
    percentage_change,
} from '../../utils/totals';

const Title = ({
    this_time_purchases,
    last_time_purchases,
    date_range,
    timeframe,
}) => {
    // Managing The Dates
    let start = '';
    let end = '';

    if (date_range) {
        start = date_to_daymonth(date_range['startDate']);
        end = date_to_daymonth(date_range['endDate']);
    }

    // Managing the totals
    let thisTotal;
    let lastTotal;

    if (this_time_purchases) {
        thisTotal = get_purchases_total(this_time_purchases);
        thisTotal = to_currency(thisTotal);
    }

    if (last_time_purchases) {
        lastTotal = get_purchases_total(last_time_purchases);
        lastTotal = to_currency(lastTotal);
    }

    // Managing the percent change
    let percentDelta = 0;

    if (thisTotal && lastTotal) {
        percentDelta = percentage_change(lastTotal, thisTotal);
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
            <div className='main'>Total: £{thisTotal ? thisTotal : '0.00'}</div>
            <div className={class_name}>
                {symbol}
                {percentDelta}%
            </div>
            <div className='secondary'>
                Last {timeframe}: £{lastTotal ? lastTotal : '0.00'}
            </div>

            <div className='date'>
                {start} {date_range ? '-' : ''} {end}
            </div>
        </div>
    );
};

export default Title;
