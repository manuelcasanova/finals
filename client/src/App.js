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
import OneGroupView from './components/OneGroupView';
import ShowAllTools from './components/ShowAllTools';
import Groups from './components/Groups';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';
import ShowUsers from './components/ShowUsers';
import AdminCRUDTools from './components/AdminCRUDTools';
import SearchbarCategories from './components/SearchbarCategories';
import SearchbarGroups from './components/SearchbarGroups';

import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoutesAdmin from './ProtectedRoutesAdmin';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState({ loggedIn: false });
  const [admin, setAdmin] = useState({ loggedIn: false });

  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);

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

  useEffect(() => {
    axios.get(`http://localhost:8001/groups`)
      .then(function (res) {
        setGroups([...res.data])
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
          <Navbar user={user} admin={admin} />



          <Routes>

            <Route path="/" element={<>
              <Searchbar setTools={setTools} categories={categories} />
              <Filter />
              <ShowAllTools tools={tools} setTools={setTools} />
              <Pagination />
            </>
            } />

            <Route element={<ProtectedRoutes />}>

              <Route path="/user/items" element=
                {
                  <>
                    <Searchbar setTools={setTools} categories={categories} />
                    <ShowTools tools={tools} setTools={setTools} categories={categories} setCategories={setCategories} />
                    <Pagination />
                  </>


                } />
              <Route path="/profile" element={<Profile />} />

            </Route>


            <Route path="/inventory/:toolIdParam" element={
              <>
                <Searchbar setTools={setTools} categories={categories} />
                <OneToolView tools={tools} user={user} admin={admin} />
              </>
            } />

            <Route path="/groups/:groupIdParam" element={
              <>
                <SearchbarGroups setGroups={setGroups} />
                <OneGroupView groups={groups} user={user} admin={admin} />
              </>
            } />




            <Route path="/groups" element={
              <>
                <SearchbarGroups setGroups={setGroups} />
                <Groups groups={groups} setGroups={setGroups} />
                <Pagination />
              </>

            } />
            <Route path="/aboutus" element={<AboutUs />} />



            <Route element={<ProtectedRoutesAdmin />}>
              <Route path="/admin/categories" element={
                <>
                  <SearchbarCategories setCategories={setCategories} />
                  <Categories categories={categories} setCategories={setCategories} />
                  <Pagination />
                </>
              } />
              <Route path="/admin/users" element={
                <>
                  <ShowUsers />
                  <Pagination />
                </>
              } />
              <Route path="/admin/tools" element={
                <>
                  <AdminCRUDTools />
                  <Pagination />
                </>
              } />
            </Route>
          </Routes>




          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
