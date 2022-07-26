import axios from "axios"

export default function ShowTools ({tools, setTools}) {

//  const { tools } = props;
  function deleteTool(id) {
    return axios.delete(`http://localhost:8001/tools/delete/${id}`)
      .then(res => {
        setTools(tools.filter(tool => tool.tool_id !== id))
      })
  };

  return (
    <div>
     {/* { tools.map( tool => 
     <div>
     {tool.tool_name}
     Delete
     </div>
      )} */}
      <table>   
      <thead>    
        <tr>      
          <th>Name</th>      
          <th>Category</th>      
          <th>Owner</th>      
          <th>Picture</th>      
          <th>Availiable?</th>      
          <th>Delete</th>   
          <th>Edit</th>   
          </tr>  
      </thead>  
      <tbody>  
        {tools.map(tool =>    
        <tr key={tool.tool_id}>     
        <td>{tool.tool_name}</td>     
        <td>{tool.tool_picture}</td>     
        <td>{tool.tool_available}</td>      
        <td>Edit button</td>     
        <td><button onClick={() => deleteTool(tool.tool_id)}>Delete</button></td>    
        </tr>)}  
        </tbody>
        </table>
    </div>
  )
}