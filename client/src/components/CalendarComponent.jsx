import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns'

export default function CalendarComponent({ toolIdParam }) {

  const [date, setDate] = useState([])
  const [reservations, setReservations] = useState([])




  useEffect(() => {
    axios.get(`http://localhost:8001/reservations/`)
      .then(function (response) {
        // console.log("response axios get", response)
        setReservations([...response.data])
      });
  }, []);



  function onSubmitForm(date) {

    const reservation_start_date = date[0].toLocaleDateString("en-ca")
    const reservation_end_date = date[1].toLocaleDateString("en-ca")
    const tool_id = toolIdParam



    const reservation = {
      reservation_start_date,
      reservation_end_date,
      tool_id
    }
    createReservation(reservation)
  }

  function createReservation(reservation) {
    return axios.post(`http://localhost:8001/reservations`, reservation)
      .then((response) => {
        setReservations([...reservations, response.data])
      })
  }




  const onChange = date => {
    setDate(date);
    onSubmitForm(date);
  }

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

  function tileDisabled({ date, view }) {
    // console.log("date", date)
    // console.log('view', view)
    if (view === 'month') {


      const isDateInReservationRange = [];
    

      //For each reservation we push the value to the array


      for (const reservation of reservations) {
        const resStartDate = new Date (reservation.reservation_start_date) 
        const resEndDate = new Date (reservation.reservation_end_date)

        isDateInReservationRange.push(date >= resStartDate && date <= resEndDate)

        console.log("res date range", date, resStartDate, resEndDate)
        console.log("is date >", date >= resStartDate)

        console.log("is date <", date <= resEndDate)
        console.log("is date > and <", date >= resStartDate && date <= resEndDate )

        // console.log("type of date", typeof date);
        // console.log("type of reservation", typeof reservation.reservation_start_date);

      }
      // return disabledDates.find(dDate => isSameDay(dDate, date))



      const isAnyTrue = isDateInReservationRange.some(element => element)

      console.log("array isDateInRes...", isDateInReservationRange)
      console.log("is Any True", isAnyTrue)

      return isAnyTrue;

    }    
  }

const isDateInReservationRange = function (reservation, date) {
  const resStartDate = new Date (reservation.reservation_start_date)
  const resEndDate = new Date (reservation.reservation_end_date)
  return resStartDate <= date && resEndDate >= date
}


  const reservationsForOneItem = reservations.filter((r) => {
    return r.reservation_tool_id === Number(toolIdParam)
  })



  return (
    <div className="calendar">

      <Calendar
        onChange={onChange}
        date={date}
        selectRange
        tileDisabled={tileDisabled}
      />

      {/* {date.toString()} */}




      {/* <div>{date.toString()}</div> */}



      {reservationsForOneItem.map((reservation) => (
        <div className="this-item-is-booked">This item is booked from {reservation.reservation_start_date} to {reservation.reservation_end_date}</div>
      ))

      }

    </div>
  );
}

