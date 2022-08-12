import "./styling/grid.css";
import { useNavigate } from "react-router-dom";

export default function OneToolForGrid({ tools }) {
  // console.log(tools)
  const navigate = useNavigate();

  return (
    <>
      {tools.length > 0 &&
        tools.map((tool) => (
          
            <div
              key={tool.tool_id}
              className="one-tool-for-grid"
              onClick={() => {
                navigate(`/inventory/${tool.tool_id}`);
              }}
            >
              <div className="one-tool-for-grid-picture">
                <img
                  src={tool.tool_picture}
                  className="img-one-tool-for-grid"
                />
              </div>
              <div className="one-tool-for-grid-name">{tool.tool_name}</div>
              <div className="one-tool-for-grid-group">{tool.group_name}</div>
              <div className="one-tool-for-grid-availability">
                {tool.tool_available ? <>Available</> : <>Unavailable</>}
              </div>
            </div>
          
        ))}

      {tools.length === 0 && <div>No tools found</div>}
    </>
  );
}
