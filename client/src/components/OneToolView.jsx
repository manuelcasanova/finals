import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminCRUDTools from "./AdminCRUDTools";
import LogInAdminButtons from "./LogInAdminButtons";
import BookTool from "./BookTool";
import CalendarComponent from "./CalendarComponent";

export default function OneToolView({ tools, user, admin }) {
  let { toolIdParam } = useParams();

  const [position, setPosition] = useState(2);
  const [user_email, setUserEmail] = useState("");

  //Two key things happening here. A new method for me, .findIndex Returns the first index of the array that matches the testing function. And toolIdParam was a string example: "1", so I had to change it to number

  useEffect(() => {
    setPosition(
      tools.findIndex((tool) => {
        return tool.tool_id === Number(toolIdParam);
      })
    );
  }, [tools, toolIdParam, setPosition]);

  //When working on this with the mentor, we put tools, toolIdParam, setPosition in the [], but I can see it works as well with an empty []. On the other hand, for an unknown reason, if I refresh the page on localhost:3000/inventory.:id, it crashes

  //At first the array is empty. Then, because tools is inside [] useEffect...
  if (tools[position]) {
    return (
      <>
        <div className="one-item-container">
          <div className="one-item-picture-and-book-button">
            <div className="one-item-picture">
              <img className="one-tool" src={tools[position].tool_picture} />
            </div>
            {/* <BookTool user={user} admin={admin} tools={tools} toolIdParam={toolIdParam} /> */}
            <CalendarComponent
              toolIdParam={toolIdParam}
              user={user}
              admin={admin}
            />
            <div className="map-container">
              <img
                className="img-class-map"
                src="https://canadaarchitectureutoronto.files.wordpress.com/2021/07/map.jpg?w=1024"
                alt="Map"
              />
            </div>
          </div>

          <div className="one-item-information-container">
            <div className="one-item-name">{tools[position].tool_name}</div>

            <table className="one-item-table d-flex">
              <thead >
                <tr className="d-flex flex-column">
                  <th className="one-item-description">Description</th>
                  <th className="one-item-status">Status</th>
                  <th className="one-item-owner-name">Owner</th>
                  <th className="one-item-owner-email">Contact</th>
                </tr>
              </thead>

              <tbody>
                <tr className="d-flex flex-column">
                  <td className="one-item-description">
                    {" "}
                    {tools[position].tool_description}
                  </td>
                  <td className="one-item-status">
                    {tools[position].tool_available ? (
                      <label>Available</label>
                    ) : (
                      <label>Unavailable</label>
                    )}
                  </td>
                  <td
                    className={
                      user.loggedIn || admin.loggedIn
                        ? "one-item-owner-name"
                        : "hide"
                    }
                  >
                    {tools[position].user_name}
                  </td>
                  <td
                    className={
                      !user.loggedIn && !admin.loggedIn
                        ? "one-item-owner-email"
                        : "hide"
                    }
                  >
                    Log in to see owner name
                  </td>
                  <td
                    className={
                      user.loggedIn || admin.loggedIn
                        ? "one-item-owner-email"
                        : "hide"
                    }
                  >
                    <a
                      className={user.loggedIn || admin.loggedIn ? "" : "hide"}
                      href={`mailto:${tools[position].user_email}`}
                    >  {tools[position].user_email}</a>

                  </td>


                  <td
                    className={
                      !user.loggedIn && !admin.loggedIn
                        ? "one-item-owner-email"
                        : "hide"
                    }
                  >
                    Log in to see owner email
                  </td>
                </tr>

              </tbody>



            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
