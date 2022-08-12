import axios from "axios";
import { useState } from "react";

export default function EditCategory(props) {
  const { category, categories, setCategories } = props;
  const [category_name, setCategoryName] = useState(category.category_name);
  const [formErrors, setFormErrors] = useState({});

  const editCategory = async (e) => {
    // e.preventDefault();
    try {
      //constant holding the main api URLs
      const API_URL_CATEGORIES = "http://localhost:8001/categories";
      // request to edit the current category passing the body
      const body = { category_name };
      await axios.put(
        `${API_URL_CATEGORIES}/edit/${category.category_id}`,
        body
      )
      // request to get all categories again and set them, after editing current category
      document.getElementById('close-modal').click();
      const categoriesAfterEditResponse = await axios.get(API_URL_CATEGORIES)
      setCategories([...categoriesAfterEditResponse.data]);
      // console.log("categories after response: ", categoriesAfterEditResponse)
    } catch (err) {
      console.error(err.message);
    }
  };

  const check = (formValues) => {
    const errors = {};
    if (!formValues.category_name) {
      errors.category_name = "Name is required";
    }
    return errors;
  };

  const errors = check(category_name);
  const validate = function (e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      editCategory();
      document.getElementById('close-modal').click();

    } else {
      setFormErrors(errors);
    }
  };

  const handleKeypress = event => {
    //it triggers by pressing the enter key
  if (event.key === 'Enter') {
    editCategory(event);
    
  }
};

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button-edit-category"
        data-toggle="modal"
        data-target={`#editcategorymodal${category.category_id}`}
      >
        Edit
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`editcategorymodal${category.category_id}`}
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
                id="close-modal"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Category
              </h5>

            </div>

            <div className="modal-body">
              <label className="add_category_title" htmlFor="title">
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
            </div>

            <div className="modal-footer">
              {/* <button
                type="button"
                className="button_close"
                data-dismiss="modal"
              >
                Close
              </button> */}
              <button
                className="button-submit"
                type="Submit"
                // data-dismiss="modal"
                onClick={(e) => validate(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
