"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";

import styles from "./page.module.css";

import Calendar from "@/components/Calendar";

export default function Home() {
  // determine month/year from default parameters, defaulting to 01/2024
  const [calendarMonth, setCalendarMonth] = useState(1);
  const [calendarYear, setCalendarYear] = useState(2020);

  // check for month/year params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('month')) {
    let paramMonth = urlParams('month');
    let regexMonth = /(1[0-2])|([0-9])/g;
   
    if (paramMonth.match(regexMonth)) {
      setCalendarMonth(paramMonth);
    }  else {
      console.log(`month param of ${paramMonth} is invalid`)
    }   
  }

  if (urlParams.has('year')) {
    let paramYear = urlParams('year');
    let regexYear = /(19[0-9]{2}|2[0-9]{3})/g; 
   
    if (paramYear.match(regexYear)) {
      setCalendarYear(paramYear);
    } else {
      console.log(`year param of ${paramYear} is invalid`)
    }   
  }

  console.log(`passed date: ${calendarMonth}/${calendarYear} `)

  return (
    <main className={styles.main}>
      <div>
        <h1>Upcoming Releases</h1>
      </div>
      <Calendar
        calendarMonth={calendarMonth} 
        calendarYear={calendarYear}
      />     
    </main>
  );
}
