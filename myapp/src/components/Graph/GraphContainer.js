import React, { useRef, useState, useEffect } from 'react';
import './Graph.css';
import LineGraph from './LineGraph';
import { week_to_data } from '../../utils/graph_stuff';
import { getDaysArray } from '../../utils/dates'

const GraphContainer = ({ this_week_purchases, week, last_week_purchases, lastweek }) => {
    var [data, setData] = useState(1);

    const timerClear = useRef();

    var days_in_week = getDaysArray(week.startDate, week.endDate);
    var this_data = week_to_data(this_week_purchases, days_in_week);

    var days_in_last_week = getDaysArray(lastweek.startDate, lastweek.endDate);
    var last_data = week_to_data(last_week_purchases, days_in_last_week);

    useEffect(() => {
        timerClear.current = setTimeout(() => {
            setData(prevState => (prevState^1))
        }, 10000);
        return () => clearTimeout(timerClear);
    }, [data])

        return (
            <div className='graph'>
                <LineGraph
                    title={data == 1 ? 'This Week' : 'Last Week'}
                    data={data == 1 ? this_data : last_data}
                    color="#fffffff">
                </LineGraph>
            </div>
        );

    
};

export default GraphContainer;

