import axios from 'axios';
import { useState } from 'react';



export default function EditTool (props) {
  const { tool, tools, categories, setTools } = props;

  const [tool_name, setToolName] = useState(tool.tool_name);
  const [tool_description, setToolDescription] = useState(tool.tool_description);
  const [tool_picture, setToolPicture] = useState(tool.tool_picture);
  const [tool_category_id, setToolCategory] = useState(tool.tool_category_id);
  const [tool_owner_id, setToolOwnerId] = useState(1);
  const [tool_available, setTooAvailibilty] = useState(true);

  const editTool = async (e) => {
    e.preventDefault();
    try {
      const body = { tool_name, tool_picture, tool_category_id, tool_available};
      const response = await fetch(`http://localhost:8001/tools/edit/${tool.tool_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      axios.get(`http://localhost:8001/tools`)
        .then(function (res) {
          setTools([...res.data])
        })
      // const editedTool = {... body, tool_id: tool.tool_id};
      // const updatedTools = tools.map( tool => {
      //   if (tool.tool_id !== editedTool.tool_id) {
      //     return tool
      //   } else {
      //     return {...tool, ...editedTool}
      //   }
      // })
      //   setTools(updatedTools)
    } catch (err) {
      console.error(err.message)
    }
  }


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
 
             <label className="add_tool_title" htmlFor="title">Name</label>
             <input
             className="form-control"
             type="text"
             name="title"
             value={tool_name}
             onChange={e => setToolName(e.target.value)}
             />
            <p></p>
 
             {/* <label className="add_tool_title" htmlFor="title">Description</label>
             <input
             className="form-control"
             type="text"
             name="title"
             onChange={e => setToolDescription(e)}
             />
             <p></p> */}

             <label className="add_tool_title" htmlFor="title">Picture</label>
             <input className="form-control"
             type="text"
             name="title"
             value={tool_picture}
             onChange={e => setToolPicture(e.target.value)}
             />
             <p></p>
 
             {/* <div className="level_input">
               <label className="add_tool_title" htmlFor="title">Category</label>
               <select className="form-control"
               >
 
               </select>
             </div> */}

            <div className="level_input">
                <label className="add_tool_title" htmlFor="title">Category</label>
                <select className="form-control"
                  value={tool_category_id}
                  onChange={e => setToolCategory(e.target.value)}
                  >
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
               <label className="add_tool_title" htmlFor="title">Availibility</label>
               <select className="form-control"
                      value={tool_available}
                      onChange={e => setTooAvailibilty(e.target.value)} >
               </select>
             </div>
           </div>
 
           <div className="modal-footer">
            <button type="button" className="button_close" data-dismiss="modal">Close</button>
             <button
               className="button_submit"
               type="Submit"
               data-dismiss="modal"
               onClick={e => editTool(e)}
             >Edit</button>
           </div>
         </div>
       </div>
     </div>
    </div>
  )
}