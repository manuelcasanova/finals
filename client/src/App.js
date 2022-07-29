import { useState, useEffect, createContext } from 'react';
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
import Groups from './components/Groups';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import ShowUsers from './components/ShowUsers';
import AdminCRUDTools from './components/AdminCRUDTools';

import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoutesAdmin from './ProtectedRoutesAdmin';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState({ loggedIn: false });
  const [admin, setAdmin] = useState({ loggedIn: false });

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
    <UserContext.Provider value={{ user, setUser, admin, setAdmin }}>
      <Router>
        <div className="app">
          {/* All components outside <Routes></Routes> render in all routes.
Components inside <Routes></Routes>   render only in those routes.
*/}

        <Authentication />
        <Navbar user={user} admin={admin}/>
        <Searchbar setTools={setTools} categories={categories}/>


          <Routes>

            <Route path="/" element={<>
              <Filter />
              <ShowAllTools tools={tools} />
            </>
            } />

            <Route element={<ProtectedRoutes />}>

              <Route path="/user/items" element={<ShowTools tools={tools} setTools={setTools} categories={categories} setCategories={setCategories} />} />
              <Route path="/profile" element={<Profile />} />

            </Route>


            <Route path="/inventory/:toolIdParam" element={<OneToolView tools={tools} user={user} admin={admin}/>} />

            <Route path="/groups" element={<Groups />} />
            <Route path="/aboutus" element={<AboutUs />} />
            


            <Route element={<ProtectedRoutesAdmin />}>
              <Route path="/admin/categories" element={<Categories categories={categories} setCategories={setCategories} />} />
              <Route path="/admin/users" element={<ShowUsers />} />
              <Route path="/admin/tools" element={<AdminCRUDTools />} />
            </Route>
          </Routes>



          <Pagination />
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
