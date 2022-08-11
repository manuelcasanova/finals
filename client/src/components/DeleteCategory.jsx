export default function DeleteCategory(props) {
  const { category, deleteCategory } = props;

  return (
    <div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button-delete"
        data-toggle="modal"
        data-target={`#deletecategorymodal${category.category_id}`}
      >
        Delete
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`deletecategorymodal${category.category_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <h6 className="modal-title">
              Are you sure you want to delete this category?
            </h6>
            <div className="modal-body">
              {/* <button type="button" className="button-close" data-dismiss="modal">Close</button> */}

              <button
                className="button-submit"
                type="submit"
                data-dismiss="modal"
              >
                No
              </button>

              <button
                className="button-submit"
                type="submit"
                data-dismiss="modal"
                onClick={() => deleteCategory(category.category_id)}
              >
                Yes
              </button>

 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
