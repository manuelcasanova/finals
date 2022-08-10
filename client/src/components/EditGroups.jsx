import axios from "axios";
import { useState, useEffect } from "react";

export default function EditGroups(props) {
  const { group, groups, setGroups, user, admin } = props;

  const [group_name, setGroupName] = useState(group.group_name);
  const [group_description, setGroupDescription] = useState(
    group.group_description
  );
  const [group_icon, setGroupIcon] = useState(group.group_icon);
  const [group_owner_id, setGroupOwnerId] = useState("1")
  const [formErros, setFormErrors] = useState({});

  const groupFromTheForm = {
    group_name,
    group_description,
    group_icon,
    group_owner_id
  }

  const check = (formValues) => {
    const errors = {};
    if (!formValues.group_name) {
      errors.group_name = "Name is required";
    }
    return errors;
  };

  const errors = check(groupFromTheForm);
  const validate = function (e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      editGroup();
      document.getElementById("editgroupmodal1").click(); //HERE
    } else {
      setFormErrors(errors);
    }
  };

  const editGroup = async () => {
    // e.preventDefault();
    try {
      // console.log(">>group", group);
      const body = {
        group_name,
        group_description,
        group_icon,
        group_owner_id
      };
      const response = await fetch(
        `http://localhost:8001/groups/edit/${group.group_id}`, //HERE
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      axios.get(`http://localhost:8001/groups`).then(function (res) {
        setGroups([...res.data]);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  function resetForm() {
    setGroupName(group.group_name);
    setFormErrors({});
  }

  return (
<div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className={user.loggedIn ? "button-edit" : "hide"}
        data-toggle="modal"
        data-target={`#editgroupmodal${group.group_id}`}
      >
        Edit
      </button>

      

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`editgroupmodal${group.group_id}`}
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
                onClick={resetForm}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 className="modal-title" id="exampleModalLabel">
                Edit group
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
              />
              <p className="form-error">{formErros.group_name}</p>

              <label className="add_tool_title" htmlFor="title">
                Description
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={group_description}
                onChange={(e) => setGroupDescription(e.target.value)}
              />

              <label className="add_tool_title" htmlFor="title">
                Picture
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={group_icon}
                onChange={(e) => setGroupIcon(e.target.value)}
              />

              <div className="modal-footer">
                {/* <button type="button" className="button_close" data-dismiss="modal">Close</button> */}
                <button
                  className="button-submit"
                  type="Submit"
                  // data-dismiss="modal"
                  onClick={(e) => validate(e)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
