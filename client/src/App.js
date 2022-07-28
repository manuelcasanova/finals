import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from 'axios';

import './App.css';



import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Filter from './components/Filter';
import ShowTools from './components/ShowTools';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import Categories from './components/Categories';
import OneToolView from './components/OneToolView';
import ShowAllTools from './components/ShowAllTools';

function App() {

  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/tools`)
      .then(function (res) {
        setTools([...res.data])
      })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8001/categories`)
      .then(function (res) {
        setCategories([...res.data])
      })
  }, [])

  return (
    <Router>
      <div className="app">
        {/* All components outside <Routes></Routes> render in all routes.
Components inside <Routes></Routes>   render only in those routes.
*/}

        <Authentication />
        <Navbar />
        <Searchbar setTools={setTools} categories={categories}/>

        <Routes>

          <Route path="/" element={<>
            <Filter />
            <ShowAllTools tools={tools} />
          </>
          } />

          <Route path="/user/items" element={<ShowTools tools={tools} setTools={setTools} categories={categories} setCategories={setCategories} />} />

          <Route path="/inventory/:toolIdParam" element={<OneToolView tools={tools} />} />
          <Route path="/admin/categories" element={<Categories categories={categories} setCategories={setCategories}/>}  />

        </Routes>



        <Pagination />
        <Footer />
      </div>
    </Router>

  );
}

export default App;
