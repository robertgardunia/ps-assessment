import React from 'react';
import ReleasePromo from './ReleasePromo';

const DateCard = (props) => {
    return (
        <div className="calendarCellContents">
            <div className="calendarCellDate"><span>{props.date}</span></div>
        </div>
    )
}

export default DateCard;