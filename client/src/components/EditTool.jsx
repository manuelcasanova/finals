export default function EditTool (props) {
  const { tool } = props;
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
     <button type="button"
       className="button_edit" data-toggle="modal" data-target={`#edittoolmodal${tool.tool_id}`}>Edit
     </button>

      {/* <!-- Modal --> */}
     <div className="modal fade" id={`edittoolmodal${tool.tool_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div className="modal-dialog" role="document">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="exampleModalLabel">Edit tool</h5>
             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
 
           <div className="modal-body">
 
             <label className="add_tool_title" htmlFor="title">Title</label>
             <input
             className="form-control"
             type="text"
             name="title"
             />
            <p></p>
 
             <label className="add_tool_title" htmlFor="title">Year</label>
             <input
             className="form-control"
             type="text"
             name="title"
             />
             <p></p>
 
             <div className="level_input">
               <label className="add_tool_title" htmlFor="title">Genre</label>
               <select className="form-control"
               >
 
               </select>
             </div>
 
             <label className="add_tool_title" htmlFor="title">Imdb</label>
             <input className="form-control"
             type="text"
             name="title"
             />
             <p></p>
 
           </div>
 
           <div className="modal-footer">
 
                           <button type="button" className="button_close" data-dismiss="modal">Close</button>
             <button
               className="button_submit"
               type="Submit"
               data-dismiss="modal"
             >Edit</button>
           </div>
         </div>
       </div>
     </div>


    </div>
  )
}