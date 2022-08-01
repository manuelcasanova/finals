import { useState, useEffect } from "react";
import axios from "axios";

export default function UserItemsSearchBar(props) {
  const { setTools, categories } = props;
  const [input, setInput] = useState("");
  const [category, setToolCategory] = useState("All categories");

  useEffect(() => {
    axios.get(`http://localhost:8001/search_user_items`).then(function (res) {
      setTools([...res.data]);
    });
  }, []);

  const onSearch = function (event) {
    event.preventDefault();
    if (category === "All categories") {
      axios
      .get(
        `http://localhost:8001/search_user_items/?searchInput=${input}`
      )
      .then(function (res) {
        setTools([...res.data]);
      });
      resetForm()
    } else {
    axios
      .get(
        `http://localhost:8001/search_user_items/?searchInput=${input}&searchCategory=${category}`
      )
      .then(function (res) {
        setTools([...res.data]);
      });
      resetForm()
    }
  };

  function resetForm() {
    setInput("");
    setToolCategory("All categories")
  };
  
  return(
    <div className="searchbar">
      <input
        className="searchbar-text"
        type="text"
        value={input}
        placeholder="What are you looking for?"
        onChange={(e) => setInput(e.target.value)}
      ></input>

      <select
        className="searchbar-categories-dropdown"
        value={category}
        onChange={(e) => setToolCategory(e.target.value)}
      >
        <option>All categories</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>

      <button className="searchbar-search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
