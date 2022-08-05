import axios from "axios";
import { useState, useEffect } from "react";

export default function ShowReservations() {
  // const [ reservations, setReservations ]  = useEffect([]);
  const [reservations, setReservations] = useState([]);

  console.log("reservations in component: ", reservations)

  useEffect(() => {
    axios.get(`http://localhost:8001/my_reservations`).then(function (res) {
      const myReservations = res.data;
      setReservations([...myReservations]);
      console.log("my reservations after SET: ", myReservations)
    });
  }, []);


  function humanizeDate(date = new Date()) {
    return `
    ${date.getDate()}-
    ${date.getMonth()}-
    ${date.getFullYear()}
      `
    ;
  }

  return (
    <div className="show-reservations">
      <div className="show-title">My Reservations</div>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Owner</th>
 
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 &&
          reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
            {console.log("Type Of: ", typeof reservation.reservation_end_date)}
            <td>{reservation.tool_name}</td>
            <td>{humanizeDate(new Date(reservation.reservation_start_date))}</td>
            <td>{humanizeDate(new Date(reservation.reservation_end_date))}</td>
            <td>{reservation.owner_name}</td>
            
            <td><button className="button-delete">Cancel</button></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
