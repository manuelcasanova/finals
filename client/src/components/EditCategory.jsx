import axios from "axios";
import { useState } from "react";

export default function EditCategory(props) {
  const { category, categories, setCategories } = props;
  const [category_name, setCategoryName] = useState(category.category_name);

  const editCategory = async (e) => {
    e.preventDefault();
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

      const categoriesAfterEditResponse = await axios.get(API_URL_CATEGORIES)
      setCategories([...categoriesAfterEditResponse.data]);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button_edit"
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Category
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
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <p></p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="button_close"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                className="button_submit"
                type="Submit"
                data-dismiss="modal"
                onClick={(e) => editCategory(e)}
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
