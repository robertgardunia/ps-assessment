"use client";

import React, { useEffect, useState } from 'react';
import DateCard from './DateCard';

const Calendar = (props) => { 
    const [renderModal, setRenderModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState();
    const [urlProtocol, setUrlProtocol] = useState("");
    const [urlHost, setUrlHost] = useState("");  
        
    const dayLabelArray = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    
    var startDate = new Date(`${props.calendarMonth}/1/${props.calendarYear}`);
    var currMonthLabel = startDate.toLocaleString('default', { month: 'long'});
    var currMonth = parseInt(props.calendarMonth);
    var currYear = parseInt(props.calendarYear);
    var nextMonth, nextParams, nextYear, prevMonth, prevParams, prevYear;


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

    const checkData = (passedFormattedDate) => {       
        if (props.returnedDataSet.length > 0) {
            let data = props.returnedDataSet;
            let filteredData = data.filter((event) => {
                let formattedEventDate = event.launchDate.split('T')[0];

                if (formattedEventDate === passedFormattedDate) {
                    return event.id;
                }
            });

            if (filteredData.length > 0) {
                return filteredData;
            } 
            
            
        }
    }

    const generateDayLabels = () => {
        let dayArrayMap = dayLabelArray.map((day, index) => <div className="calendarDayLabel" key={index}>{day}</div>)
        
        return dayArrayMap;
    }

    const generateDates = () => {   
        const dateArray = [];

        // create dateArray from valid dates
        var startMonth = startDate.getMonth();
        var inMonth = false;
        var hasData = false;        
        let dayCounter = 1;        
        let firstDaySeed = new Date(`${props.calendarMonth}/1/${props.calendarYear}`);
        let firstDay;
        let dataObject = {};
        let calendarCellModalAnchor = "calendarCell";

        // find first day of month
        for (let d = 1; d <= 7; d++) {            
            if (firstDaySeed.getDay() === 1) {
                firstDay = d;
            }
            firstDaySeed.setDate(firstDaySeed.getDate() + 1);
        }

        for (let i = 1; i <= 42; i++) {                
            if (i === firstDay) {
                inMonth = true;
            } 

            if (inMonth) {                
                let formattedDate = startDate.toISOString().split('T')[0];
                dataObject = checkData(formattedDate);

                if (dataObject !== undefined) {
                    hasData = true;
                } else {
                    hasData = false;
                }   

                if (i === 14) {
                    calendarCellModalAnchor = "calendarCell eventModalAnchor";
                } else {
                    calendarCellModalAnchor = "calendarCell";
                }
                
                dateArray.push(
                    <div className={calendarCellModalAnchor} key={i}>
                        <p>{hasData}</p>
                        <DateCard
                            date={dayCounter}
                            inMonth={true}
                            hasData={hasData}
                            dataObject={dataObject}
                            setSelectedEvent={setSelectedEvent}
                            openEventModal={openEventModal}
                        />
                    </div>
                )

                dayCounter++;
            } else {
                dataObject = {};
                dateArray.push(
                    <div className={calendarCellModalAnchor} key={i}>
                        <DateCard 
                            date={dayCounter}
                            inMonth={false}
                            hasData={false}
                            dataObject={undefined}
                        />
                    </div>
                )
            }

            if (i === 14) {
                dateArray.push(
                    <>
                        {eventModal()}
                    </>
                );
            }
            
            if (inMonth) {
                if (inMonth) {                
                    startDate.setDate(startDate.getDate() + 1);
                }
                if (startDate.getMonth() !== startMonth) {
                    inMonth = false;
                }
            }
        }
        
        return dateArray;
    }

    const openEventModal = () => {
        setRenderModal(true);
    }

    const closeEventModal = (e) => { 
        e.preventDefault();
        
        setRenderModal(false);
        setSelectedEvent();
    }
    
    useEffect(() => {
        setUrlProtocol(window.location.protocol);
        setUrlHost(window.location.host);
    }, []);

    const eventModal = () => {
        if (renderModal) {
            let date = new Date(selectedEvent.launchDate);
            let dateWithSuffix = date.getDate();

            if (dateWithSuffix === "1") {
                dateWithSuffix += 'st';
            } else if (dateWithSuffix === "2") {
                dateWithSuffix += 'nd';
            } else if (dateWithSuffix === "3") {
                dateWithSuffix += 'rd';
            } else {
                dateWithSuffix += 'th';
            };

            return (
                <div className="eventModal">   
                    <div className="eventModalData>">
                        <div className="eventModalImage" onClick={(e) => closeEventModal(e)}>
                            <img src={'images/' + selectedEvent.imageFilenameFull + '.webp'}></img>
                        </div>

                        <div className="eventModalInfo">
                            <div className="eventModalText">
                                <span className="eventModalTitle">{selectedEvent.title}: </span>{selectedEvent.summary}
                            </div>
                            <div className="eventModalAvailability">
                                Available {date.toLocaleString('default', { month: 'long'})} {dateWithSuffix} {date.getYear()}
                            </div>
                            <div className="eventModalButtonGroup">
                                <a href={selectedEvent.learnMoreLink} target="_blank" className="learnMore">Learn More</a>
                                <a href={selectedEvent.purchaseLink} target="_blank" className="preOrder">Pre-order Now</a>                        
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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