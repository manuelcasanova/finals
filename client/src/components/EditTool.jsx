import axios from "axios";
import { useState, useEffect } from "react";

export default function EditTool(props) {
  const { tool, tools, categories, setTools, groups } = props;

const [tool_name, setToolName] = useState(tool.tool_name);
const [tool_description, setToolDescription] = useState(tool.tool_description);
const [tool_picture, setToolPicture] = useState(tool.tool_picture);
const [tool_category_id, setToolCategory_id] = useState(tool.tool_category_id);
const [tool_group_id, setToolGroupId] = useState(tool.tool_group_id);
const [tool_available, setToolAvailable] = useState(tool.tool_available);


  return (
    <div>

      {/* <!-- Button trigger modal --> */}
      <button type="button"
        className="button_edit" data-toggle="modal" data-target={`#edittoolmodal${tool.tool_id}`}>Edit
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id={`edittoolmodal${tool.tool_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit tool</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">

              <label className="add_movie_title" htmlFor="title">Name</label>
              <input
                className="form-control"
                type="text"
                name="title"
              />
              <p></p>

              <label className="add_movie_title" htmlFor="title">Description</label>
              <input
                className="form-control"
                type="text"
                name="title"
              />
              <p></p>

              <label className="add_movie_title" htmlFor="title">Picture</label>
              <input
                className="form-control"
                type="text"
                name="title"
              />
              <p></p>

              <div className="level_input">
                <label className="add_movie_title" htmlFor="title">Category</label>
                <select className="form-control"
                >

                </select>
              </div>

              <div className="level_input">
                <label className="add_movie_title" htmlFor="title">Group</label>
                <select className="form-control"
                >

                </select>
              </div>

              <div className="level_input">
                <label className="add_movie_title" htmlFor="title">Availability</label>
                <select className="form-control"
                >

                </select>
              </div>


            </div>


            <div className="modal-footer">

              <button type="button" className="button_close" data-dismiss="modal">Close</button>
              <button
                className="button_submit"
                type="Submit"
                onClick={e => editMovie(e)}
                data-dismiss="modal"
              >Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
