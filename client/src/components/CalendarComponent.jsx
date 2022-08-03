import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent({ toolIdParam }) {

  const [date, setDate] = useState([])
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8001/reservations/`)
      .then(function (response) {
        console.log("response axios get", response)
        setReservations([...response.data])
      });
  }, []);

  console.log("reservations", reservations)

  function onSubmitForm(date) {

    const reservation_start_date = date[0].toLocaleDateString("en-ca")
    const reservation_end_date = date[1].toLocaleDateString("en-ca")
    const tool_id = toolIdParam

    console.log("start date:", reservation_start_date)
    console.log("end date:", reservation_end_date)
    console.log("tool id", toolIdParam)

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
        console.log("response", response)


        setReservations([...reservations, reservation])


      })
  }



  const onChange = date => {
    setDate(date);
    onSubmitForm(date);
  }

        
  const foundReservations = reservations.filter((r) => {
    return r.reservation_tool_id === Number(toolIdParam)
  })

  console.log("found reservations", foundReservations)

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

      {foundReservations.map((reservation) => (
        <div>{reservation.reservation_start_date.toString()}</div>
      ))


      }

    </div>
  );
}

