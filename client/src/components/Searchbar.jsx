import { useState, Fragment } from "react";
import axios from "axios";

export default function Searchbar(props) {
  const { setTools, categories } = props;

  const [input, setInput] = useState("");
  const [category, setToolCategory] = useState(1);

  const onSearch = function (event) {
    event.preventDefault();
    axios
      .get(
        `http://localhost:8001/search/?searchInput=${input}&searchCategory=${category}`
      )
      .then(function (res) {
        setTools([...res.data]);
      });
      resetForm()
  };

  function resetForm() {
    setInput("");
    setToolCategory(1)
  };

  return (
    // <div className="searchbar">
    //   {/* <form>
    //     <input type="text" value={input} onChange={ e => setInput(e.target.value)}/>
    //     <button type="button" onClick={onClick}>Search</button> */}

    //     <div className="searchbar-text">What are you looking for?</div>
    //     <div className="searchbar-cateogries-dropdown">Categories dropdown</div>
    //     <div className="searchbar-groups-dropdown">Groups dropdown</div>
    //     <div className="searchbar-search-button">Search</div>
    //   {/* </form> */}
    // </div>
    <div className="searchbar">
        <input className="searchbar-text"
          type="text"
          value={input}
          placeholder="What are you looking for?"
          onChange={e => setInput(e.target.value)}
        ></input>
        <div className="searchbar-categories-dropdown">
          <label className="NO CLASS NAME YET"
          htmlFor="title">
            Category
          </label>
          <select
            className="searchbar-groups-dropdown"
            value={category}
            onChange={(e) => setToolCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <button className="searchbar-search-button" onClick={onSearch}>
          Search
        </button>
    </div>
  );
}
