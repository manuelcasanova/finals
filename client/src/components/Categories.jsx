import axios from "axios"

export default function Categories({categories, setCategories}) {

function deleteCategory(id) {
  return axios.delete(`http://localhost:8001/tools/delete/${id}`)
  .then(res => {
    setCategories(categories.filter(category => category.category_id !== id))
  })
}




  return (
    <div className="show-categories">categories

      <table className="categories-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {categories.map(category =>
            <tr key={category.category_id}>
              <td>{category.category_id}</td>
              <td>{category.category_name}</td>
              <td>Edit button</td>
              <td> <button onClick={()=> deleteCategory(category.category_id)}>Delete </button> </td>

            </tr>)}
        </tbody>

      </table>



    </div>

  )
}