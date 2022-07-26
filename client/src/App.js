import './App.css';
import ShowTools from './components/ShowTools';
import { useState, useEffect } from 'react';import axios from 'axios';


function App() {

  const [ tools, setTools ] = useState([]);
  useEffect(() => {axios.get(`http://localhost:8001/tools`)
  .then(function (res) {setTools([...res.data])})}, [])
  console.log(tools)

  return (
    <div className="app">
      <div className="authentication">
        <div className="authentication-left">
          <div className="logo">Logo</div>
        </div>
        <div className="authentication-right">
          <div className="login-as-user">Login as user</div>
          <div className="login-as-admin">Login as admin</div>
        </div>

      </div>
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-button">Inventory</div>
          <div className="navbar-button">Groups</div>
          <div className="navbar-button">About us</div>
        </div>
        <div className="navbar-right">
          <div className="navbar-dropdown">My account</div>
          <div className="navbar-dropdown">Administrator</div>
        </div>
      </div>

      <div className="searchbar">
        <div className="searchbar-text">What are you looking for?</div>
        <div className="searchbar-cateogries-dropdown">Categories dropdown</div>
        <div className="searchbar-groups-dropdwon">Groups dropdown</div>
        <div className="searchbar-search-button">Search button</div>
      </div>

      <div className="filter">
        <div className="filter-per-page">Filter per page</div>
        <div className="filter-view">View</div>
        <div className="filter-sort-by">Sort by</div>
      </div>

      <ShowTools tools={tools}/>

      <div className="pagination">Pagination</div>
      <div className="footer">Footer</div>

    </div>
  );
}

export default App;
