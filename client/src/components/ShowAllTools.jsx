import { useNavigate } from "react-router-dom"

export default function ShowAllTools({ tools }) {

  const navigate = useNavigate();



  return (
    <div className="show-tools">
      <table className="tools-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Category</th>
            <th>Availability</th>

          </tr>
        </thead>
        <tbody>
          { tools.length > 0 && tools.map(tool =>
            <tr key={tool.tool_id}>
              <td
                onClick={() => {
                  navigate(`/inventory/${tool.tool_id}`)
                }}
              ><img src={tool.tool_picture}/></td>
              <td
                onClick={() => {
                  navigate(`/inventory/${tool.tool_id}`)
                }}
              >{tool.tool_name}</td>
              <td>{tool.category_name}</td>
              <td>{tool.tool_available}</td>

            </tr>)}
            {tools.length == 0 && (<div>No tools found</div>)}
        </tbody>
      </table>
    </div>
  )
}