"use client";

import React, { useEffect, useState } from 'react';
import DateCard from './DateCard';
// import * as util from '../apis/util.js';

const Calendar = (props) => {
    var startDate = new Date(`${props.calendarMonth}/1/${props.calendarYear}`);
    var currMonth = startDate.toLocaleString('default', { month: 'long'});
    var nextMonth, nextParams, nextYear, prevMonth, prevParams, prevYear;

    // set control params
    switch (props.calendarMonth) {
        case 1: {            
            prevMonth = 12;
            prevYear = props.calendarYear - 1;
        }
        case 12: {            
            nextMonth = 1;
            nextYear = props.calendarYear + 1;
        }
        default: {
            prevMonth = props.calendarMonth - 1;
            prevYear = props.calendarYear;
            nextMonth = props.calendarMonth + 1;
            nextYear = props.calendarYear;
        }
    } 

    // irritating
    let currHref;
    nextParams = `${currHref}&month=${nextMonth}&year=${nextYear}`;
    prevParams = `${currHref}&month=${prevMonth}&year=${prevYear}`;

    console.log("url: " + window.location.href);
    console.log(prevParams, nextParams)


    const generateDates = () => {        
        const dateArray = [];

        // create dateArray from valid dates
        var startMonth = startDate.getMonth();

        for (let date = 1; date <= 32; date++) {
            let keyValue = `day-${date}`;
            if (startDate.getMonth() === startMonth) {
                dateArray.push(<div className="calendarCell" key={keyValue}>{date}</div>)
            }
            startDate.setDate(startDate.getDate() + 1);
        }
        
        return dateArray;
    }

    return (
        <div className="calendarContainer">
            <div className="calendarHeader">
                <div className="calendarControl leftControl"><a href={prevParams}>&lt;</a></div>
                <div className="calendarLabel">{currMonth}</div>
                <div className="calendarControl rightControl"><a href={nextParams}>&gt;</a></div>
            </div>
            <div className="calendarBody">
                {generateDates()}
            </div>
        </div>
    )

}

export default Calendar;