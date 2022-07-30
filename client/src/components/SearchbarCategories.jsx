import { useState, Fragment } from "react";
import axios from "axios";

export default function SearchbarCategories(props) {
  const { setTools } = props;

  const [input, setInput] = useState("");

  const onSearch = function (event) {
    event.preventDefault();
   
      axios
      .get(
        `http://localhost:8001/admin/categories/search/?searchInput=${input}`
      )
      .then(function (res) {
        setTools([...res.data]);
      });
      resetForm()
  };

  function resetForm() {
    setInput("");
  };

  return (

    <div className="searchbar">
        <input className="searchbar-text"
          type="text"
          value={input}
          placeholder="Looking for a category?"
          onChange={e => setInput(e.target.value)}
        ></input>
       
      
        <button className="searchbar-search-button" onClick={onSearch}>
          Search
        </button>
    </div>
  );
}
