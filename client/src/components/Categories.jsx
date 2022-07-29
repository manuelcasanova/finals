import axios from "axios"
import AddCategory from "./AddCategory"
import EditCategory from "./EditCategory"

export default function Categories({categories, setCategories}) {

function deleteCategory(id) {
  return axios.delete(`http://localhost:8001/categories/delete/${id}`)
  .then(res => {
    setCategories(categories.filter(category => category.category_id !== id))
  })
}

// function updateCategory(id) {
//   return axios.put(`http://localhost:8001/categories/edit/${id}`)
//   .then(res => {
//     setCategories
//   })
// }


  return (
    <div className="show-categories">
<AddCategory categories={categories} setCategories={setCategories}/>
      <table className="categories-table">

        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th></th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {categories.map(category =>
            <tr key={category.category_id}>
              {/* <td>{category.category_id}</td> */}
              <td>{category.category_name}</td>
              <td><EditCategory category={category} categories={categories} setCategories={setCategories} /></td>
              <td> <button className="button-delete"  onClick={()=> deleteCategory(category.category_id)}>Delete </button> </td>

            </tr>)}
        </tbody>

      </table>



    </div>

  )
}