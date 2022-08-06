export default function (props) {
  const { reservation, reservations, setReservations, deleteReservation } =
    props;

  return (
    <div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button-delete"
        data-toggle="modal"
        data-target={`#newtoolmodal${reservation.reservation_id}`}
      >
        Cancel
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`newtoolmodal${reservation.reservation_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <h6 className="modal-title">
              Are you sure you want to cancel the reservation?
            </h6>
            <div className="modal-body">
              {/* <button type="button" className="button-close" data-dismiss="modal">Close</button> */}
              <button
                className="button-submit"
                type="submit"
                data-dismiss="modal"
                onClick={() => deleteReservation(reservation.reservation_id)}
              >
                Confirm
              </button>

              <button
                className="button-submit"
                type="submit"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
