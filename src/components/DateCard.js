import React from 'react';
import ReleasePromo from './ReleasePromo';

const DateCard = (props) => {
    return (
        <>
            {props.inMonth &&
                <div className="calendarCellContents">
                    <div className="calendarCellDate"><span>{props.date}</span></div>
                </div>
            }
            {!props.inMonth && 
                <div className="calendarCellContents emptyCell">{props.inMonth}</div>
            }
        </>
    )
}

export default DateCard;