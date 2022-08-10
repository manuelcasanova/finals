import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowAllTools({ currentTools }) {
  console.log("length of currentTools", currentTools.length);

  const navigate = useNavigate();

  console.log("TOOLS from showAllTools", currentTools);

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
                <td>
                  {tool.tool_available ? (
                    <label>Available</label>
                  ) : (
                    <label>Unavailable</label>
                  )}
                </td>
              </tr>
            ))}
          {currentTools.length === 0 && (<div>No tools found</div>)}
        </tbody>
      </table>
    </div>
  );
}
