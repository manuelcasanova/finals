import { useState, useEffect } from "react";
import axios from "axios";


export default function UserItemsSearch (props) {
  const { setTools, categories } = props;
  const [input, setInput] = useState("");
  const [category, setToolCategory] = useState("All categories");

  // useEffect(() => {
  //   axios.get(`http://localhost:8001/user_items`).then(function (res) {
  //     setTools([...res.data]);
  //   });
  // }, []);

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
          placeholder="Search your tools"
          onChange={e => setInput(e.target.value)}
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