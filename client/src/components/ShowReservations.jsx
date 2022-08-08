import Confirm from "./DeleteReservation";

import axios from "axios";
import { useState, useEffect } from "react";
import DeleteReservation from "./DeleteReservation";

export default function ShowReservations() {
  // const [ reservations, setReservations ]  = useEffect([]);
  const [reservations, setReservations] = useState([]);

  console.log("reservations in component: ", reservations);

  useEffect(() => {
    axios.get(`http://localhost:8001/my_reservations`).then(function (res) {
      const myReservations = res.data;
      setReservations([...myReservations]);
      console.log("my reservations after SET: ", myReservations);
    });
  }, []);

  function deleteReservation(id) {
    axios
      .delete(`http://localhost:8001/my_reservations/delete/${id}`)
      .then((res) => {
        setReservations(
          reservations.filter(
            (reservation) => reservation.reservation_id !== id
          )
        );
        console.log("reservations after delete: ", reservations);
      });
  }

  function humanizeDate(date = new Date()) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `
    ${date.getDate()}-
    ${monthNames[date.getMonth()]}-
    ${date.getFullYear()}
      `;
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
                <td>{reservation.tool_name}</td>
                <td>
                  {humanizeDate(new Date(reservation.reservation_start_date))}
                </td>
                <td>
                  {humanizeDate(new Date(reservation.reservation_end_date))}
                </td>
                <a href={`mailto:${reservation.owner_email}`}>
                  <td>{reservation.owner_name}</td>
                </a>
                <td>
                  <DeleteReservation
                    reservation={reservation}
                    deleteReservation={deleteReservation}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
