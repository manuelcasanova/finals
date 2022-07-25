
export default function ShowTools ({tools}) {
//  const { tools } = props;
  return (
    <div>
     { tools.map( tool => 
     <div>
     {tool.tool_name}
     </div>
      )}
    </div>
  )
}