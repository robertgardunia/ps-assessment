"use client";

import React, { useEffect, useState } from 'react';
import DateCard from './DateCard';

const Calendar = (props) => { 
    const [urlProtocol, setUrlProtocol] = useState("");
    const [urlHost, setUrlHost] = useState("");   
    const dayArray = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    var startDate = new Date(`${props.calendarMonth}/1/${props.calendarYear}`);
    var currMonthLabel = startDate.toLocaleString('default', { month: 'long'});
    var currMonth = parseInt(props.calendarMonth);
    var currYear = parseInt(props.calendarYear);
    var nextMonth, nextParams, nextYear, prevMonth, prevParams, prevYear;

    useEffect(() => {
        setUrlProtocol(window.location.protocol);
        setUrlHost(window.location.host);
    }, []);

    // set control params
    if (currMonth == 1) {         
        prevMonth = 12;
        prevYear = currYear - 1;
        nextMonth = currMonth + 1;
        nextYear = currYear;
    } else if (currMonth == 12) { 
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
    let protocol = urlProtocol;
    let host = urlHost;
    let urlString = `${protocol}//${host}`;
    nextParams = `${urlString}${paramLead}month=${nextMonth}&year=${nextYear}`;
    prevParams = `${urlString}${paramLead}month=${prevMonth}&year=${prevYear}`;

    // if (props.selectedAirplane != null) {
    //     if (props.selectedAirplane.airplaneFuelTanks.length > 0) {
    //       fuelTanksFilteredList = props.selectedAirplane.airplaneFuelTanks;
    
    //       fuelTanksRowsList = fuelTanksFilteredList.map((tank, index) =>
    //         <tr key={index}>
    //           <td>{tank.sortOrder}</td>
    //           <td>{tank.fuelTankId}</td>
    //           <td>{tank.fuelTankName}</td>
    //           <td>{tank.maxGallons}</td>
    //         </tr>
    //       )
    //     }
    //   }

    const generateDayLabels = () => {
        let dayArrayMap = dayArray.map((day, index) => <div className="calendarDayLabel" key={index}>{day}</div>)
        
        return dayArrayMap;
    }

    const generateDates = () => {        
        const dateArray = [];

        // console.log("genDates: " + props.returnedDataSet)

        // create dateArray from valid dates
        var startMonth = startDate.getMonth();

        for (let date = 1; date <= 42; date++) {
            if (startDate.getMonth() === startMonth) {
                dateArray.push(
                    <div className="calendarCell" key={date}>
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
        <>
            {(props.calendarMonth !== undefined && props.calendarYear !== undefined) &&
                <div className="calendarContainer">
                    <div className="calendarHeader">
                        <div className="calendarControl leftControl"><a href={prevParams}>&lt;</a></div>
                        <div className="calendarLabel">{currMonthLabel} {currYear}</div>
                        <div className="calendarControl rightControl"><a href={nextParams}>&gt;</a></div>
                    </div>
                    <div className="calendarBody">
                        {generateDayLabels()}
                        {generateDates()}
                    </div>
                </div>
            }
        </>
    )

}

export default Calendar;