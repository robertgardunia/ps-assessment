import React from 'react';
import ReleasePromo from './ReleasePromo';

const DateCard = (props) => {    
    var hasData = props.hasData;
    var dataObject = props.dataObject;

    console.log("boo")

    return (
        <>
            {props.inMonth &&
                <div className="calendarCellContents">
                    {props.hasData &&
                        <div className="calendarData">
                            <div className="calendarImage hasData">
                                <p>hi {dataObject.id}</p>
                                {/* {<img src={'images/' + props.dataObject.imageFilenameThumb + '.webp'}></img>} */}
                            </div>
                            <div className="calendarCellDate hasData"><span>{props.date}</span></div>
                        </div>
                    }
                    {!props.hasData &&
                        <div className="calendarCellDate"><span>{props.date}</span></div>
                    }
                </div>
            }
            {!props.inMonth && 
                <div className="calendarCellContents emptyCell">{props.inMonth}</div>
            }
        </>
    )
}

export default DateCard;