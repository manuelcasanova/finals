import axios from "axios";
import { useState, useEffect } from "react";
import "./styling/modal.css";

export default function AddGroup(props) {
  const { groups, setGroups } = props;

  const [group_name, setGroupName] = useState("");
  const [group_description, setGroupDescription] = useState("");
  const [group_icon, setGroupIcon] = useState("");
  const [group_owner_id, setGroupOwnerId] = useState(1);

  function onSubmitForm(e) {
    e.preventDefault();
    const group = {
      group_name,
      group_description,
      group_icon,
      group_owner_id,
    };
    addGroup(group);
    resetForm();
  }

  const handleKeypress = (event) => {
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      onSubmitForm(event);
    }
  };

  function addGroup(group) {
    return axios
      .post(`http://localhost:8001/groups`, group)
      .then((response) => {
        const newGroup = response.data;
        setGroups([newGroup, ...groups]);
      });
  }

  function resetForm() {
    setGroupName("");
    setGroupDescription("");
    setGroupIcon("");
  }

  return (
    <div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button-add"
        data-toggle="modal"
        data-target={`#newgroupmodal${groups.group_id}`}
      >
        Add group
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`newgroupmodal${groups.group_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 className="modal-title" id="exampleModalLabel">
                Add a new group
              </h5>
            </div>

            <div className="modal-body">
              <label className="add_tool_title" htmlFor="title">
                Name
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={group_name}
                onChange={(e) => setGroupName(e.target.value)}
                onKeyPress={handleKeypress}
              />

              <label className="add_tool_title" htmlFor="title">
                Description
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={group_description}
                onChange={(e) => setGroupDescription(e.target.value)}
                onKeyPress={handleKeypress}
              />

              <label className="add_tool_title" htmlFor="title">
                Icon
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={group_icon}
                onChange={(e) => setGroupIcon(e.target.value)}
                onKeyPress={handleKeypress}
              />

              <div className="modal-footer">
                {/* <button type="button" className="button_close" data-dismiss="modal">Close</button> */}
                <button
                  className="button-submit"
                  type="Submit"
                  data-dismiss="modal"
                  onClick={onSubmitForm}
                >
                  Add a group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
