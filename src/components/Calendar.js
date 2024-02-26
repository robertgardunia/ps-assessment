"use client";

import React, { useEffect, useState } from 'react';
import DateCard from './DateCard';
// import * as util from '../apis/util.js';

const Calendar = (props) => {
    var startDate = new Date(`${props.calendarMonth}/1/${props.calendarYear}`);
    var currMonthLabel = startDate.toLocaleString('default', { month: 'long'});
    var currMonth = parseInt(props.calendarMonth);
    var currYear = parseInt(props.calendarYear);
    var nextMonth, nextParams, nextYear, prevMonth, prevParams, prevYear;

    console.log(currMonth, currYear)

    // set control params
    if (currMonth == 1) {  
        console.log("jan");        
        prevMonth = 12;
        prevYear = currYear - 1;
        nextMonth = currMonth + 1;
        nextYear = currYear;
    } else if (currMonth == 12) { 
        console.log("dec"); 
        prevMonth = currMonth - 1;
        prevYear = currYear;           
        nextMonth = 1;
        nextYear = currYear + 1;
    } else {
        prevMonth = currMonth - 1;
        prevYear = currYear;
        nextMonth = currMonth + 1;
        nextYear = currYear;
    };

    // ideally this would check for existing params and append on any existing ones 
    let paramLead = '?';
    let protocol = window.location.protocol;
    let host = window.location.host;
    let urlString = `${protocol}//${host}`;
    nextParams = `${urlString}${paramLead}month=${nextMonth}&year=${nextYear}`;
    prevParams = `${urlString}${paramLead}month=${prevMonth}&year=${prevYear}`;

    const generateDates = () => {        
        const dateArray = [];

        // create dateArray from valid dates
        var startMonth = startDate.getMonth();

        for (let date = 1; date <= 32; date++) {
            let keyValue = `day-${date}`;
            if (startDate.getMonth() === startMonth) {
                dateArray.push(
                    <div className="calendarCell" key={keyValue}>
                        <DateCard
                            date={date}
                        />
                    </div>
                )
            }
            startDate.setDate(startDate.getDate() + 1);
        }
        
        return dateArray;
    }

    return (
        <div className="calendarContainer">
            <div className="calendarHeader">
                <div className="calendarControl leftControl"><a href={prevParams}>&lt;</a></div>
                <div className="calendarLabel">{currMonthLabel} {currYear}</div>
                <div className="calendarControl rightControl"><a href={nextParams}>&gt;</a></div>
            </div>
            <div className="calendarBody">
                {generateDates()}
            </div>
        </div>
    )

}

export default Calendar;