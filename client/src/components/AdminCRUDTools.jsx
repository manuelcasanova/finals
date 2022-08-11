import './styling/admincrudtools.css'
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";

export default function AdminCRUDTools ({ currentTools }) {

  const navigate = useNavigate();
  console.log("current tools", currentTools)

  return (


    <div className="show-tools-component">
      <div className="show-tools-list-filter">
        <Filter />
      </div>

      <div className="show-tools">
        <table className="tools-table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Category</th>
              <th>Group</th>
              <th>Owner</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentTools.length > 0 &&
              currentTools.map((tool) => (
                <tr key={tool.tool_id}>
                  <td
                    onClick={() => {
                      navigate(`/inventory/${tool.tool_id}`);
                    }}
                  >
                    <img src={tool.tool_picture} />
                  </td>
                  <td
                    onClick={() => {
                      navigate(`/inventory/${tool.tool_id}`);
                    }}
                  >
                    {tool.tool_name}
                  </td>
                  <td>{tool.category_name}</td>
                  <td>{tool.group_name}</td>
                  <td>{tool.user_name}</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              ))}
            {currentTools.length === 0 && (<div>No tools found</div>)}
          </tbody>
        </table>
      </div>
    </div>
  );

}