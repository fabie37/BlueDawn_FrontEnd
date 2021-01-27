import React, { useEffect, useState } from 'react';

const Title = ({ purchases }) => {
    let t = 0;

    if (purchases) {
        t = 0;
        purchases.data.forEach((purchase) => {
            t += purchase.total;
        });
        t /= 100;
    }

    return (
        <div>
            <h1>Total Spent: £{t ? t : 0}</h1>
        </div>
    );
};

export default Title;
