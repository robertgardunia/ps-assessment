"use client";

import React, { useEffect, useState } from 'react';
import Calendar from "@/components/Calendar";
import * as api from '../api/api.js';
import "./page.css";

export default function Home() {
  const [calendarMonth, setCalendarMonth] = useState();
  const [calendarYear, setCalendarYear] = useState();  
  const [returnedDataSet, setReturnedDataSet] = useState([]);

  // retrieve events
  const getData = async () => {
    let returnedAPIData = await api.apiCall({
        operation: 'GET'
    })

    setReturnedDataSet(returnedAPIData);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('month')) { 
      setCalendarMonth(urlParams.get('month'))      
    } else { 
      setCalendarMonth(1);
    };

    if (urlParams.has('year')) { 
      setCalendarYear(urlParams.get('year'))       
    } else {
      setCalendarYear(2023);
    };

    
    getData();
  }, [])  

  return (
    <main>
      <Calendar
        calendarMonth={calendarMonth} 
        calendarYear={calendarYear}
        returnedDataSet={returnedDataSet}
      />     
    </main>
  );
}
