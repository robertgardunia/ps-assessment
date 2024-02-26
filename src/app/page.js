"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";

import  "./page.css";

import Calendar from "@/components/Calendar";

export default function Home() {
  // determine month/year from default parameters, defaulting to 01/2024
  const [calendarMonth, setCalendarMonth] = useState(1);
  const [calendarYear, setCalendarYear] = useState(2020);  
  
  // check for month/year params
  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('month')) {
      let paramMonth = urlParams.get('month');
      let regexMonth = /(1[0-2]{1})|([1-9]{1})/g;
    
      if (paramMonth.match(regexMonth) && parseInt(paramMonth) >= 1 && parseInt(paramMonth) <= 12) {
        console.log("month match")
        setCalendarMonth(paramMonth);
      }  else {
        console.log("month fail")
        alert(`month param of ${paramMonth} is invalid, defaulting to 1/2020`)
        window.location.replace("http://localhost:3000/?month=1&year=2020");
      }   
    }

    if (urlParams.has('year')) {
      let paramYear = urlParams.get('year');
      let regexYear = /(19[0-9]{2}|2[0-9]{3})/g; 
    
      if (paramYear.match(regexYear)) {
        console.log("year match")
        setCalendarYear(paramYear);
      } else {
        alert(`year param of ${paramYear} is invalid, defaulting to 1/2020`);
        window.location.replace("http://localhost:3000/?month=1&year=2020");
      }   
    }
  
    return;
  }

  useEffect(() => {
    getUrlParams();
  }, [])  

  return (
    <main>
      <Calendar
        calendarMonth={calendarMonth} 
        calendarYear={calendarYear}
      />     
    </main>
  );
}
