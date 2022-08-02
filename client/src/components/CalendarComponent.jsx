import axios from 'axios';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {
  
  const [date, setDate] = useState(new Date())
  

function getReservations() {
  return axios.get(`http://localhost:8001/reservations`)
  .then((response) => {
    setDate([...response.data])
  })
}


  const onChange = date => {
    setDate(date);
    // getReservations();
  }

  return (
    <div className="calendar">

  <Calendar onChange={onChange} date={date} selectRange/>
          {console.log(date)}
          {/* {date.toString()} */}


<div>{date.toString()}</div>

    </div>
  );
}

