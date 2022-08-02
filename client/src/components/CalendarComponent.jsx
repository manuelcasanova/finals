import axios from 'axios';
import e from 'cors';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {
  
  const [date, setDate] = useState([])
  



function onSubmitForm(date) {

const reservation_start_date = date[0].toLocaleDateString("en-ca")
const reservation_end_date = date[1].toLocaleDateString("en-ca")

console.log("start date:", reservation_start_date)
console.log("end date:", reservation_end_date)
  
  const reservation = {
    reservation_start_date,
    reservation_end_date
  }
  createReservation(reservation)
}


function createReservation(reservation) {
  return axios.post(`http://localhost:8001/reservations`, reservation)
  .then ((response) => {
    // console.log("response", response)
  })
}

// function getReservations() {
//   return axios.get(`http://localhost:8001/reservations`)
//   .then((response) => {
//     setDate([...response.data])
//   })
// }


  const onChange = date => {
    setDate(date);
    onSubmitForm(date);
  }

  return (
    <div className="calendar">

  <Calendar 
  onChange={onChange} 
  date={date} 
  selectRange
  
  />
          {console.log(date)}
          {/* {date.toString()} */}


<div>{date.toString()}</div>

    </div>
  );
}

