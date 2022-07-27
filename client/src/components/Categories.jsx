import axios from "axios";
import AddCategory from "./AddCategory";

export default function Categories(props) {
  const { categories, setCategories } = props;

  function deleteCategory(id) {
    return axios
      .delete(`http//:localhost:8001/categories/delete/${id}`)
      .then((res) => {
        setCategories(
          categories.filter((category) => category.category_id !== id)
        );
      });
  }

  return (
    //Add Category component
    <div className="show-categories">
      < AddCategory categories={categories} setCategories={setCategories} />
      <table className="categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>
        {categories.map((category) => (
          <tr key={category.category_id}>
            <td>{category.category_id}</td>
            <td>{category.category_name}</td>
            <td>
              <button onClick={() => deleteCategory(category.category_id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tbody></tbody>
      </table>
    </div>
  );
}
