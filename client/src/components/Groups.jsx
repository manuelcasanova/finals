import './styling/groups.css'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";

export default function Groups ({groups, setGroups}) {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8001/groups`).then(function (res) {
      setGroups([...res.data]);
    });
  }, []);


  return (
    <div className="show-tools">
      <table className="tools-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Description</th>
            

          </tr>
        </thead>
        <tbody>
          { groups.length > 0 && groups.map(group =>
            <tr key={group.group_id}>
              <td
                onClick={() => {
                  navigate(`/groups/${group.group_id}`)
                }}
              ><img src={group.group_icon}/></td>
              <td
                onClick={() => {
                  navigate(`/groups/${group.group_id}`)
                }}
              >{group.group_name}</td>
              <td>{group.group_description}</td>
              

            </tr>)}
            {groups.length === 0 && (<div>No groups found</div>)}
        </tbody>
      </table>
    </div>
  )
}



