import { useState } from "react";
import axios from "axios";

export default function SearchbarGroups(props) {
  const { setGroups } = props;

  const [input, setInput] = useState("");

  const onSearch = function (event) {
    event.preventDefault();
   
      axios
      .get(
        `http://localhost:8001/groups/search/?searchInput=${input}`
      )
      .then(function (res) {
        setGroups([...res.data]);
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
          placeholder="Looking for a group?"
          onChange={e => setInput(e.target.value)}
        ></input>
       
      
        <button className="searchbar-search-button" onClick={onSearch}>
          Search
        </button>
    </div>
  );
}
