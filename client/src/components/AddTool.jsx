import axios from 'axios';
import { useState, useEffect } from 'react';


export default function AddTool(props) {
  const { tools, categories, setTools } = props;

  const [tool_name, setToolName] = useState("");
  const [tool_description, setToolDescription] = useState("");
  const [tool_picture, setToolPicture] = useState("");
  const [tool_category_id, setToolCategory] = useState(1);
  const [tool_owner_id, setToolOwnerId] = useState(1);
  const [tool_available, setTooAvailibilty] = useState(true);

useEffect (() => {
  const foundCategory = categories.find((category) => {
    return category.category_id === tool_category_id
  })
  if (!foundCategory && categories.length) {
    setToolCategory(categories[0].category_id)
  }
}, [categories, tool_owner_id])

  function onSubmitForm(e) {
    e.preventDefault();
    const tool = {
      tool_name,
      tool_description,
      tool_picture,
      tool_category_id,
      tool_owner_id,
      tool_available
    }
    addTool(tool);
    resetForm()
  }

  function addTool(tool) {
    console.log("tool added", tool);
    return axios.post(`http://localhost:8001/tools`, tool)
      .then((response) => {
        const newTool = response.data;
        const toolCategory = categories.find(category => {
          return category.category_id === newTool.tool_category_id
        })
        newTool.category_name = toolCategory.category_name;
        setTools([newTool, ...tools])
      })
  }

  function resetForm() {
    setToolName("");
    setToolDescription("");
    setToolPicture("")
  }



  return (

    <div>
      {/* <!-- Button trigger modal --> */}
      <button type="button"
        className="button_add" data-toggle="modal" data-target={`#newtoolmodal${tools.tool_id}`}>Add tool
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id={`newtoolmodal${tools.tool_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add a new tool</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">

              <label className="add_tool_title" htmlFor="title">Name</label>
              <input className="form-control"
                type="text"
                name="title"
                value={tool_name}
                onChange={e => setToolName(e.target.value)} />
              <p></p>

              <label className="add_tool_title" htmlFor="title">Description</label>
              <input className="form-control" type="text" name="title"
                value={tool_description}
                onChange={e => setToolDescription(e.target.value)}
              />
              <p></p>

               {/* <label className="add_tool_title" htmlFor="title">Owner</label>
              <input className="form-control"
                type="text"
                name="title"
                value={tool_owner_id} 
                {/* // onChange={e => setToolName(e.target.value)} 
  <p></p> */}

              <label className="add_tool_title" htmlFor="title">Picture</label>
              <input className="form-control" type="text" name="title"
                value={tool_picture}
                onChange={e => setToolPicture(e.target.value)}
              />
              <p></p>

              <div className="level_input">
                <label className="add_tool_title" htmlFor="title">Category</label>
                <select className="form-control"
                  value={tool_category_id}
                  onChange={e => setToolCategory(e.target.value)}>

                  {categories.map(category =>
                    <option
                      key={category.category_id}
                      value={category.category_id}>
                      {category.category_name}
                    </option>
                  )}
                </select>
              </div>

              <div className="level_input">
                <label className="add_tool_title" htmlFor="title">Availibilty</label>
                <select className="form-control"
                  value={tool_available}
                  onChange={e => setTooAvailibilty(e.target.value)}
                >
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="button_close" data-dismiss="modal">Close</button>
                <button
                  className="button_submit"
                  type="Submit"
                  data-dismiss="modal"
                  onClick={onSubmitForm}
                >Add a tool</button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>



  )
}