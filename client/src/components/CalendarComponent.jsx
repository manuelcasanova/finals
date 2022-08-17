import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import './styling/calendar.css'
import './styling/modal-calendar.css'
//import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent({ toolIdParam, user, admin, userEmail, userName }) {

  const [date, setDate] = useState([])
  const [reservations, setReservations] = useState([])
  const reservationsForOneItem = reservations.filter((r) => {
    return r.reservation_tool_id === Number(toolIdParam)
  })


  useEffect(() => {
    axios.get(`http://localhost:8001/reservations/`)
      .then(function (response) {
        // console.log("response axios get", response)
        setReservations([...response.data])
      });
  }, []);

function notifyOwner(email){
  console.log(`Tool has been booked by ${userName}`, email)
}


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
    notifyOwner(userEmail)
  }


  function tileDisabled({ date, view }) {

    if (view === 'month') {

      const isDateInReservationRange = [];
    
      //For each reservation with tool_id = idParam we push the value to the array

      for (const reservation of reservationsForOneItem) {
        const resStartDate = new Date (reservation.reservation_start_date) 
        const resEndDate = new Date (reservation.reservation_end_date)


        //If both are true, pushes TRUE. Otherwise, pushes false
        isDateInReservationRange.push(date >= resStartDate && date <= resEndDate)


        // console.log("res date range", date, resStartDate, resEndDate)
        // console.log("is date >", date >= resStartDate)

        // console.log("is date <", date <= resEndDate)
        // console.log("is date > and <", date >= resStartDate && date <= resEndDate )

        // console.log("type of date", typeof date);
        // console.log("type of reservation", typeof reservation.reservation_start_date);

      }

      const isAnyTrue = isDateInReservationRange.some(element => element)

      // console.log("array isDateInRes...", isDateInReservationRange)
      // console.log("is Any True", isAnyTrue)

      return isAnyTrue;

    }    
  }

// const isDateInReservationRange = function (reservation, date) {
//   const resStartDate = new Date (reservation.reservation_start_date)
//   const resEndDate = new Date (reservation.reservation_end_date)
//   return resStartDate <= date && resEndDate >= date
// }





  return (
<>

{/* <!-- Button trigger modal --> */}


<div className={user.loggedIn || admin.loggedIn ? "hide" : "log-in-to-book-item"}  >
  Log in to book item
</div>

<div className='button-book-container'>
<button type="button" className={user.loggedIn || admin.loggedIn ? "button-open-book-modal" : "hide"} data-toggle="modal" data-target="#exampleModalCenter">
  Book item
</button>
</div>


{/* <button type="button" className={"button-open-book-modal"} data-toggle="modal" data-target="#exampleModalCenter">
  Book item
</button> */}



{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      
      <div className="modal-calendar-body">
        

      <div className="temporary"> 
        <Calendar
          onChange={onChange}
          date={date}
          selectRange
          tileDisabled={tileDisabled}
        />
        </div>

      </div>

    </div>
  </div>
</div>



</>


  );
}






// return (
//   <>
  
//   {/* <!-- Button trigger modal --> */}
//   <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#calendar-modal">
//     Book Item
//   </button>
  
//   {/* <!-- Modal --> */}
//   <div className="modal fade" id="calendar-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div className="modal-calendar-dialog" role="document">
//       <div className="modal-calendar-content">
//         <div className="modal-calendar-header">
//           <h5 className="modal-calendar-title" id="exampleModalLabel">Calendar</h5>
//           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div className="modal-calendar-body">
         
//         <div className={user.loggedIn || admin.loggedIn ? "hide" : "book-title-above-calendar"}>Log in to see the item's availability</div>
  
//   <div className={user.loggedIn || admin.loggedIn ? "book-title-above-calendar" : "hide"}>Book by clicking on the desired dates</div>
  
//       {/* <div className={user.loggedIn || admin.loggedIn ? "calendar" : "hide"}> */}
//       <div className="temporary"> 
//         <Calendar
//           onChange={onChange}
//           date={date}
//           selectRange
//           tileDisabled={tileDisabled}
//         />
  
//         {/* {date.toString()} */}
  
  
  
  
//         {/* <div>{date.toString()}</div> */}
  
  
  
//         {/* {reservationsForOneItem.map((reservation) => (
//           <div className="this-item-is-booked">This item is booked from {reservation.reservation_start_date} to {reservation.reservation_end_date}</div>
//         ))
  
//         } */}
//       </div>
//       {/* </div> */}
  
  
//         </div>
//       </div>
//     </div>
//   </div>
  
  
//   </>
  
  
//     );