import axios from "axios"
import AddTool from "./AddTool"
import EditTool from "./EditTool"
import { useNavigate } from "react-router-dom"

export default function ShowTools({ tools, setTools, categories }) {

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
      < AddTool tools={tools} categories={categories} setTools={setTools} />
      <table className="tools-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Owner</th>
            <th>Picture</th>
            <th>Description</th>
            <th>Available?</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tools.map(tool =>
            <tr key={tool.tool_id}>
              <td
                className="td-tool-name"
                onClick={() => {
                  navigate(`/inventory/${tool.tool_id}`)
                }}
              >{tool.tool_name}</td>
              <td>{tool.category_name}</td>
              <td>{tool.user_name}</td>
              <td
               onClick={() => {
                navigate(`/inventory/${tool.tool_id}`)
              }}
              ><img src={tool.tool_picture}/></td>
              <td>{tool.tool_description}</td>
              <td>{tool.tool_available}</td>
              <td><button onClick={() => deleteTool(tool.tool_id)}>Delete</button></td>
              <td>< EditTool tool={tool} tools={tools} categories={categories} setTools={setTools}/></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}