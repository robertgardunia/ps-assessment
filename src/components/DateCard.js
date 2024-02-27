"use client";

import React, { useState } from 'react';
import ReleasePromo from './ReleasePromo';

const DateCard = (props) => { 
    var dataObjectRef = {}
    
    if(props.hasData) {
        dataObjectRef = props.dataObject[0];
    }   

    const handleEventSelect = (e, selectedDataObj) => {
        e.preventDefault();

        props.setSelectedEvent(selectedDataObj);
        props.openEventModal();
    }

    return (
        <>
            {(props.inMonth) &&
                <div className="calendarCellContents">
                    {props.hasData &&
                        <div className="calendarCellData" onClick={(e) => handleEventSelect(e, dataObjectRef)}>
                            <div className="calendarCellImage hasData">
                                {<img src={'images/' + dataObjectRef.imageFilenameThumb + '.webp'}></img>}
                            </div>
                            <div className="calendarCellDate hasData">
                                <span>{props.date}</span>
                            </div>
                        </div>
                    }
                    {!props.hasData &&
                        <div className="calendarCellDate">
                            <span>{props.date}</span>
                        </div>
                    }
                </div>
            }
            {!props.inMonth && 
                <div className="calendarCellContents emptyCell"></div>
            }
        </>
    )
}

export default DateCard;