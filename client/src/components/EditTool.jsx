import axios from "axios";
import { useState, useEffect } from "react";

export default function EditTool(props) {
  const { tool, tools, categories, setTools, groups } = props;

// console.log("tool", tool)
// console.log("tools", tools)

  const [tool_name, setToolName] = useState(tool.tool_name);
  const [tool_description, setToolDescription] = useState(
    tool.tool_description
  );
  const [tool_picture, setToolPicture] = useState(tool.tool_picture);
  const [tool_category_id, setToolCategory] = useState(tool.tool_category_id);
  const [tool_group_id, setToolGroup] = useState(tool.tool_group_id);
  const [tool_owner_id, setToolOwnerId] = useState(1);
  const [tool_available, setToolAvailibilty] = useState(true);
  const [formErros, setFormErrors] = useState({});

  const toolFromTheForm = {
    tool_name,
    tool_description,
    tool_picture,
    tool_category_id,
    tool_group_id,
    tool_owner_id,
    tool_available,
  };

  // console.log("toolFromTheForm", toolFromTheForm)

  // const check = (formValues) => {
  //   const errors = {};
  //   if (!formValues.tool_name) {
  //     errors.tool_name = "Name is required";
  //   }

  //   return errors;
  // };

  // const errors = check(toolFromTheForm);
  // const validate = function (e) {
  //   e.preventDefault();
  //   if (Object.keys(errors).length === 0) {
  //     editTool();
  //     document.getElementById("edittoolmodal1").click();
  //   } else {
  //     setFormErrors(errors);
  //   }
  // };

  const editTool = async () => {
    try {
      const body = {
        tool_name,
        tool_description,
        tool_picture,
        tool_category_id,
        tool_group_id,
        tool_available,
      };

      const response = await fetch(
        `http://localhost:8001/tools/edit/${tool.tool_id}/1`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      axios.get(`http://localhost:8001/user_items`).then(function (res) {
        // console.log("1 >>tools", tools)
        setTools([...res.data]);
        // console.log("2 >> tools after st", tools)
        // console.log("3 res data", res.data)
      });
      // console.log("4 outside axios >> tools after st", tools)
    } catch (err) {
      console.error(err.message);
    }
  };

  function resetForm() {
    setToolName(tool.tool_name);
    setFormErrors({});
  }

  return (
    <div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button-edit"
        data-toggle="modal"
        data-target={`#edittoolmodal${tool.tool_id}`}
      >
        Edit
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`edittoolmodal${tool.tool_id}`}
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
                <span className="test" aria-hidden="true">
                  &times;
                </span>
              </button>
              <h5 className="modal-title" id="exampleModalLabel">
                Edit item
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
                value={tool_name}
                onChange={(e) => setToolName(e.target.value)}
              />
              <p className="form-error">{formErros.tool_name}</p>

              <label className="add_tool_title" htmlFor="title">
                Description
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={tool_description}
                onChange={(e) => setToolDescription(e.target.value)}
              />

              <label className="add_tool_title" htmlFor="title">
                Picture
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={tool_picture}
                onChange={(e) => setToolPicture(e.target.value)}
              />

              {/* <div className="level_input">
               <label className="add_tool_title" htmlFor="title">Category</label>
               <select className="form-control-add"
               >
 
               </select>
             </div> */}

              <div className="level_input">
                <label className="add_tool_title" htmlFor="title">
                  Category
                </label>
                <select
                  className="form-control-add"
                  value={tool_category_id}
                  onChange={(e) => setToolCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="level_input">
                <label className="add_tool_title" htmlFor="title">
                  Group
                </label>
                <select
                  className="form-control-add"
                  value={tool_group_id}
                  onChange={(e) => setToolGroup(e.target.value)}
                >
                  {groups.map((group) => (
                    <option key={group.group_id} value={group.group_id}>
                      {group.group_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="level_input">
                <label className="add_tool_title" htmlFor="title">
                  Availibility
                </label>
                <select
                  className="form-control-add"
                  value={tool_available}
                  onChange={(e) => setToolAvailibilty(e.target.value)}
                >
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="button-submit"
                  type="Submit"
                  data-dismiss="modal"
                  onClick={(e) => editTool()}
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
