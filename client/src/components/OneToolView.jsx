import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import AdminCRUDTools from "./AdminCRUDTools";
import LogInAdminButtons from "./LogInAdminButtons";
import BookTool from "./BookTool";

export default function OneToolView({ tools, user, admin }) {

  let { toolIdParam } = useParams();

  const [position, setPosition] = useState(2)

  console.log(tools)
  //Two key things happening here. A new method for me, .findIndex Returns the first index of the array that matches the testing function. And toolIdParam was a string example: "1", so I had to change it to number

  useEffect(() => {
    setPosition(tools.findIndex(tool => {
      return tool.tool_id === Number(toolIdParam)
    }))
  }, [tools, toolIdParam, setPosition])

  //When working on this with the mentor, we put tools, toolIdParam, setPosition in the [], but I can see it works as well with an empty []. On the other hand, for an unknown reason, if I refresh the page on localhost:3000/inventory.:id, it crashes


  //At first the array is empty. Then, because tools is inside [] useEffect...
  if (tools[position]) {
    return (



      <div className="one-item-container">
        <div className="one-item-picture-and-book-button">
          <div className="one-item-picture"><img src={tools[position].tool_picture} /></div>
          <BookTool user={user}/>
        </div>

        <div className="one-item-information-container">


          {/* 
          <div className="one-item-name">{tools[position].tool_name}</div>
          <div className="one-item-description">{tools[position].tool_description}</div>
          <div className="one-item-status">Available</div>
          <div className="one-item-owner-name">{tools[position].user_name}</div>
          <div className="one-item-owner-email">Owner email</div> */}


          <div className="one-item-name">{tools[position].tool_name}</div>

          <table className="one-item-table">
            <tr>
              <th className="one-item-description">Description</th>
              <td className="one-item-description"> {tools[position].tool_description}</td>
            </tr>
            <tr>
              <th className="one-item-status">Status</th>
              <td className="one-item-status">Status</td>
            </tr>
            <th className="one-item-owner-name">Owner</th>
            {/* <td className="one-item-owner-name"> */}
            <td className={user.loggedIn || admin.loggedIn ? "one-item-owner-name" : "hide"}>
              {tools[position].user_name}</td>
            <td className={!user.loggedIn && !admin.loggedIn ? "one-item-owner-email" : "hide"}>
              Log in to see owner name</td>
            <tr>
              <th className="one-item-owner-email">Contact</th>
              {/* <td className="one-item-owner-email"> */}
              <td className={user.loggedIn || admin.loggedIn ? "one-item-owner-email" : "hide"}>
                Owner email</td>
              <td className={!user.loggedIn && !admin.loggedIn ? "one-item-owner-email" : "hide"}>
                Log in to see owner email</td>
            </tr>
          </table>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
