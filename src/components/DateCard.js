import React from 'react';
import ReleasePromo from './ReleasePromo';

const DateCard = (props) => {
    return (
        <div className="calendarCellContents">
            <p className="calendarCellDate">{props.date}</p>
        </div>
    )
}

export default DateCard;