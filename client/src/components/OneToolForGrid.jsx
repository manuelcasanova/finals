import './styling/grid.css'

export default function OneToolForGrid({ tools }) {

  console.log("tools", tools)

  return (
    <>





      {tools.length > 0 && tools.map(tool =>
        <>

          <div className="one-tool-for-grid">

          <div className="one-tool-for-grid-picture">
            <img src={tool.tool_picture} className="img-one-tool-for-grid"/>
          </div>
          <div className="one-tool-for-grid-name">
            {tool.tool_name}
          </div>
          <div className="one-tool-for-grid-group">
            {tool.group_name}
          </div>
          <div className="one-tool-for-grid-availability">
            {tool.tool_available}
          </div>

          </div>
          

        </>

      )
      }





    </>

  )


}
