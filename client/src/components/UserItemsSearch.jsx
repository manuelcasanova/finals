import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function UserItemsSearch(props) {
  const { setTools, categories, groups } = props;
  const [input, setInput] = useState("");
  const [category, setToolCategory] = useState("All categories");
  const [group, setGroup] = useState("All groups");
  const navigate = useNavigate()

  // useEffect(() => {
  //   axios.get(`http://localhost:8001/user_items`).then(function (res) {
  //     setTools([...res.data]);
  //   });
  // }, []);

  const onSearch = function (event) {
    event.preventDefault();
   

    let url = `http://localhost:8001/search_user_items/?searchInput=${input}`;
    if (category !== "All categories") {
      url = url.concat(`&searchCategory=${category}`);
    }
    if (group !== "All groups") {
      url = url.concat(`&searchGroup=${group}`);
    }
    axios.get(url).then(function (res) {
      setTools([...res.data]);

    });
    resetForm();
    // navigate("/");
  };

  const handleKeypress = (event) => {
    //it triggers by pressing the enter key
    if (event.key === "Enter") {
      onSearch(event);
    }
  };

  function resetForm() {
    setInput("");
    setToolCategory("All categories");
    setGroup("All groups");
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
      <input className="searchbar-text"
        type="text"
        value={input}
        placeholder="Search your tools"
        onChange={e => setInput(e.target.value)}
        onKeyPress={handleKeypress}
      ></input>

      <select
        className="searchbar-categories-dropdown"
        value={category}
        onChange={(e) => setToolCategory(e.target.value)}
        onKeyPress={handleKeypress}
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
        onKeyPress={handleKeypress}
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