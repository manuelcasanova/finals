import axios from "axios";
// import { response } from "express";
import { useState } from "react";

export default function AddCategory(props) {
  const { categories, setCategories } = props;

  const [category_name, setCategoryName] = useState("");

  function onSubmitForm(e) {
    e.preventDefault();
    const category = { category_name };
    addCategory(category);
    resetForm();
  }

  function addCategory(category) {
    return axios
      .post(`http://localhost:8001/categories`, category)
      .then((res) => {
        const newCategory = res.data;
        setCategories([newCategory, ...categories]);
      });
  }

  function resetForm() {
    setCategoryName("");
  }

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button_add"
        data-toggle="modal"
        data-target={`#newcategorymodal${categories.category_id}`}
      >
        Add Category
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`newcategorymodal${categories.category_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a New Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <label className="add_category_title" htmlFor="title">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={category_name}
                onChange={e => setCategoryName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
                <button type="button" className="button_close" data-dismiss="modal">Close</button>
                <button
                  className="button_submit"
                  type="Submit"
                  data-dismiss="modal"
                  onClick={onSubmitForm}
                >Add a Category</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
