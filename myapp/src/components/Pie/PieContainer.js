import React from 'react';
import './Pie.css';
import PieChart from './PieChart';
import {to_pie_format} from '../../utils/graph_stuff';

const PieContainer = ({purchases}) => {

    const data = to_pie_format(purchases);


    return <div className='pie-container'>
        <PieChart data={data} ></PieChart>
    </div>;
};

export default PieContainer;
