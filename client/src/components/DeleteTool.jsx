export default function DeleteTool(props) {
  const { tool, tools, setTools, deleteTool } =
    props;

  return <div className="add-tool-button-div">
  {/* <!-- Button trigger modal --> */}
  <button
    type="button"
    className="button-delete"
    data-toggle="modal"
    data-target={`#deletecategorymodal${tool.tool_id}`}
  >
    Delete
  </button>

  {/* <!-- Modal --> */}
  <div
    className="modal fade"
    id={`deletecategorymodal${tool.tool_id}`}
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <h6 className="modal-title">
          Are you sure you want to remove this tool?
        </h6>
        <div className="modal-body">
          {/* <button type="button" className="button-close" data-dismiss="modal">Close</button> */}
          <button
            className="button-submit"
            type="submit"
            data-dismiss="modal"
            onClick={() => deleteTool(tool.tool_id)}
          >
            Delete
          </button>

          <button
            className="button-submit"
            type="submit"
            data-dismiss="modal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
}