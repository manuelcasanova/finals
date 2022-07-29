import axios from "axios"
import AddTool from "./AddTool"
import EditTool from "./EditTool"
import { useNavigate } from "react-router-dom"

export default function ShowTools({ tools, setTools, categories }) {

  console.log("tools", tools)
  const navigate = useNavigate();

  //  const { tools } = props;
  function deleteTool(id) {
    return axios.delete(`http://localhost:8001/tools/delete/${id}`)
      .then(res => {
        setTools(tools.filter(tool => tool.tool_id !== id))
      })
  };
  return (
    
    <div className="show-tools">
      <div className="show-title">My items</div>
      < AddTool tools={tools} categories={categories} setTools={setTools} />
      <table className="tools-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Owner</th>
            <th>Picture</th>
            <th>Description</th>
            <th>Availability</th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {tools.length > 0 && tools.map(tool =>
            <tr key={tool.tool_id}>
              <td
                className="td-tool-name"
                onClick={() => {
                  navigate(`/inventory/${tool.tool_id}`)
                }}
              >{tool.tool_name}</td>
              <td>{tool.category_name}</td>
              <td>{tool.tool_owner_id}</td>
              <td
              className="td-image"
               onClick={() => {
                navigate(`/inventory/${tool.tool_id}`)
              }}
              ><img src={tool.tool_picture}/></td>
              <td>{tool.tool_description}</td>
              <td>{tool.tool_available}</td>
              <td>< EditTool tool={tool} tools={tools} categories={categories} setTools={setTools}/></td>
              <td><button className="button-delete" onClick={() => deleteTool(tool.tool_id)}>Delete</button></td>
              
            </tr>)}

            {tools.length == 0 && (<div>No tools found</div>)}
        </tbody>
      </table>
    </div>
  )
}