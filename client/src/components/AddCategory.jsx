import axios from "axios";
// import { response } from "express";
import { useState } from "react";

export default function AddCategory({categories, setCategories}) {

const [category_name, setCategoryName] = useState("");

function onSubmitForm(e) {
  e.preventDefault();
  const category = {
    category_name
  }
  addCategory(category);
  resetForm();
}

function addCategory(category) {
  return axios.post(`http://localhost:8001/categories`, category)
  .then((response) => {
    const newCategory = response.data;
    setCategories([newCategory, ...categories])
  })
}

function resetForm() {
  setCategoryName("");
}

  return (

    <div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button type="button"
        className="button-add" data-toggle="modal" data-target={`#newcategorymodal${categories.category_id}`}>Add category
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id={`newcategorymodal${categories.category_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 className="modal-title" id="exampleModalLabel">Add a new category</h5>
              
            </div>

            <div className="modal-body">

              <label className="add_tool_title" htmlFor="title">Name</label>
              <input className="form-control-add"
                type="text"
                name="title"
                value={category_name}
                onChange={e => setCategoryName(e.target.value)} />
             

  

              <div className="modal-footer">
                {/* <button type="button" className="button_close" data-dismiss="modal">Close</button> */}
                <button
                  className="button-submit"
                  type="Submit"
                  data-dismiss="modal"
                  onClick={onSubmitForm}
                >Add a category</button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>



  )
}
