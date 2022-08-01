import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

export default function OneGroupView({ groups, user, admin }) {

  let { groupIdParam } = useParams();

  const [position, setPosition] = useState(2)

  console.log(groups)
  //Two key things happening here. A new method for me, .findIndex Returns the first index of the array that matches the testing function. And groupIdParam was a string example: "1", so I had to change it to number

  useEffect(() => {
    setPosition(groups.findIndex(group => {
      return group.group_id === Number(groupIdParam)
    }))
  }, [groups, groupIdParam, setPosition])

  //At first the array is empty. Then, because groups is inside [] useEffect...
  if (groups[position]) {
    return (



      //Note that this classNames are the same being used at OneToolView. If we want to change the styling, it will affect that view, so we should change this classNames and give them the desired styling.
      <div className="one-item-container">
        <div className="one-item-picture"><img src={groups[position].group_icon} /></div>
        <div className="one-item-information-container">



          <div className="one-item-name">{groups[position].group_name}</div>

          <table className="one-item-table">
            <tr>
              <th className="one-item-description">Description</th>
              <td className="one-item-description"> {groups[position].group_description}</td>
            </tr>
           
            
          </table>



        </div>
      </div>
    )
  } else {
    return <></>
  }
}
