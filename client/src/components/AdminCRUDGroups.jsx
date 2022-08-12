import './styling/groups.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

import EditGroups from "./EditGroups";
import DeleteGroups from "./DeleteGroups";
import AddGroup from "./AddGroup";

//THIS COMPONENT IS LIKE THE USERGROUPS, BUT THE ADMINISTRATOR HAS ACCESS TO DELETE ALL OWNERS'S GROUPS.

export default function AdminCRUDGroups({groups, setGroups, user, admin}) {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/groups`).then(function (res) {
      setGroups([...res.data]);
    });
  }, []);

  function deleteGroup(id) {
    return axios
      .delete(`/groups/delete/${id}`)
      .then((res) => {
        setGroups(groups.filter((group) => group.group_id !== id));
      });
  }

  return (
 <div className="show-tools">
        <div className="show-title">Groups</div>
      <AddGroup groups={groups} setGroups={setGroups} />
      <table className="tools-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
            <th></th>
            

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
              <td>
           
              <EditGroups
                    group={group}
                    groups={groups}
                    setGroups={setGroups}
                    user={user}
                    admin={admin}
                  />
              </td>
              <td><DeleteGroups 
              group={group}
              user={user}
              admin={admin}
              deleteGroup={deleteGroup}/></td>
              

            </tr>)}
            {groups.length === 0 && (<div>No groups found</div>)}
        </tbody>
      </table>
    </div>
  );

}