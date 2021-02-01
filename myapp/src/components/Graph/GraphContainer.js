import React, { useRef, useState, useEffect } from 'react';
import './Graph.css';
import LineGraph from './LineGraph';
import { range_to_data } from '../../utils/graph_stuff';
import { getDaysArray } from '../../utils/dates';

const GraphContainer = ({
    this_time_purchases,
    date_range,
    last_time_purchases,
    last_date_range,
    timeframe,
}) => {
    var [data, setData] = useState(1);

    const timerClear = useRef();

    var days_in_range = getDaysArray(date_range.startDate, date_range.endDate);
    var this_data = range_to_data(this_time_purchases, days_in_range);

    var days_in_last_range = getDaysArray(
        last_date_range.startDate,
        last_date_range.endDate
    );
    var last_data = range_to_data(last_time_purchases, days_in_last_range);

    var this_max = Math.max.apply(
        Math,
        this_data.map(function (date) {
            return date.value;
        })
    );
    var last_max = Math.max.apply(
        Math,
        last_data.map(function (date) {
            return date.value;
        })
    );
    var max = Math.round(Math.max(this_max, last_max));

    useEffect(() => {
        timerClear.current = setTimeout(() => {
            setData((prevState) => prevState ^ 1);
        }, 10000);
        return () => clearTimeout(timerClear);
    }, [data]);

    return (
        <div className='graph'>
            <div className='graph-title'>
                {data === 1 ? 'This ' + timeframe : 'Last ' + timeframe}
            </div>
            <LineGraph
                title={data === 1 ? 'This ' + timeframe : 'Last ' + timeframe}
                data={data === 1 ? this_data : last_data}
                color='#fffffff'
                max={max}
            ></LineGraph>
        </div>
    );
};

export default GraphContainer;
