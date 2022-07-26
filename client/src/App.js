import './App.css';

import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Filter from './components/Filter';
import ShowTools from './components/ShowTools';
import Pagination from './components/Pagination';
import Footer from './components/Footer';


import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/tools`)
      .then(function (res) {
        setTools([...res.data])
      })
  }, [])

  return (
    <div className="app">
      <Authentication />
      <Navbar />
      <Searchbar />
      <Filter />
      <ShowTools tools={tools} setTools={setTools} />
      <Pagination />
      <Footer />
    </div>
  );
}

export default App;
