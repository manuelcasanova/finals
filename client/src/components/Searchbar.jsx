import { useState, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function Searchbar(props) {
  const { setTools, categories, groups, setSearchTrigger } = props;

  const [input, setInput] = useState("");
  const [category, setToolCategory] = useState("All categories");
  const [group, setGroup] = useState("All groups");

  const navigate = useNavigate();

  const onSearch = function (event) {
    event.preventDefault();
   
    let url = `http://localhost:8001/searchh/?searchInput=${input}`;
    if (category !== "All categories") {
      url = url.concat(`&searchCategory=${category}`);
    }
    if (group !== "All groups") {
      url = url.concat(`&searchGroup=${group}`);
    }
    axios.get(url).then(function (res) {
      setTools([...res.data]);
      setSearchTrigger(true)
    });
    resetForm();
    navigate("/");
  };

  function resetForm() {
    setInput("");
    setToolCategory("All categories");
    setGroup("All groups");
    setSearchTrigger(false);
  }

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

      <select
        className="searchbar-categories-dropdown"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        <option>All groups</option>
        {groups.map((group) => (
          <option key={group.group_id} value={group.group_id}>
            {group.group_name}
          </option>
        ))}
      </select>

      <button className="searchbar-search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
