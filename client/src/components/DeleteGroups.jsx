export default function DeleteGroups(props) {
  const { group, groups, setGroups, deleteGroup } =
    props;

    return <div className="add-tool-button-div">
    {/* <!-- Button trigger modal --> */}
    <button
      type="button"
      className="button-delete"
      data-toggle="modal"
      data-target={`#deletegroupmodal${group.group_id}`}
    >
      Delete
    </button>
  
    {/* <!-- Modal --> */}
    <div
      className="modal fade"
      id={`deletegroupmodal${group.group_id}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <h6 className="modal-title">
            Are you sure you want to remove this group?
          </h6>
          <div className="modal-body">
            {/* <button type="button" className="button-close" data-dismiss="modal">Close</button> */}
            <button
              className="button-submit"
              type="submit"
              data-dismiss="modal"
              onClick={() => deleteGroup(group.group_id)}
            >
              Delete
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
  }