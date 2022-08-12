import axios from "axios";
// import { response } from "express";
import { useState } from "react";

export default function AddCategory({ categories, setCategories }) {
  const [category_name, setCategoryName] = useState("");
  const [formErrors, setFormErrors] = useState({});

  function onSubmitForm(e) {
    e.preventDefault();
    const category = {
      category_name,
    };
    const errors = validate(category);
    if (Object.keys(errors).length === 0) {
      addCategory(category);
      resetForm();
      document.getElementsByClassName("close").click();
    } else {
      setFormErrors(errors);
    }
  }


  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.category_name) {
      errors.category_name = "Name is required";
    }
    return errors;
  };

  const handleKeypress = (event) => {
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      onSubmitForm(event);
    }
  };

  function addCategory(category) {
    return axios
      .post(`/categories`, category)
      .then((response) => {
        const newCategory = response.data;
        setCategories([newCategory, ...categories]);
      });
  }

  function resetForm() {
    setCategoryName("");
    setFormErrors({});
  }

  return (
    <div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button-add"
        data-toggle="modal"
        data-target={`#newcategorymodal${categories.category_id}`}
      >
        Add category
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
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 className="modal-title" id="exampleModalLabel">
                Add a new category
              </h5>
            </div>

            <div className="modal-body">
              <label className="add_tool_title" htmlFor="title">
                Name
              </label>
              <input
                className="form-control-add"
                type="text"
                name="title"
                value={category_name}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <p className="form-error">{formErrors.category_name}</p>

              <div className="modal-footer">
                {/* <button type="button" className="button_close" data-dismiss="modal">Close</button> */}
                <button
                  className="button-submit"
                  type="Submit"
                  data-dismiss="modal"
                  onClick={onSubmitForm}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
