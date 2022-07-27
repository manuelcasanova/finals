import { useParams } from "react-router-dom"
import {useState, useEffect } from 'react'
import e from "cors";

export default function OneToolView({ tools }) {

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


//At first the array is empy. Then, because tools is inside [] useEffect...
if (tools[position]) {
  return (
    
    <div className="one-item-container">

        <div className="one-item-container">
          <div className="one-item-picture">Picture</div>
          <div className="one-item-information-container">
            <div className="one-item-name">{tools[position].tool_name}</div>
            <div className="one-item-status">Available</div>
            <div className="one-item-owner-name">{tools[position].user_name}</div>
            <div className="one-item-owner-email">Owner email</div>
          </div>
        </div>
  


    </div>

  

) 
} else {
  return <></>
}





}