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
import UserItemsSearch from './components/UserItemsSearch';
import SearchbarCategories from './components/SearchbarCategories';
import SearchbarGroups from './components/SearchbarGroups';
import ShowReservations from './components/ShowReservations';
import Registration from './components/Registration';
import Login from './components/LoginReal';

import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoutesAdmin from './ProtectedRoutesAdmin';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState({ loggedIn: false });
  const [admin, setAdmin] = useState({ loggedIn: false });

  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [reservations, setReservations] = useState([])

  const [loading, setLoading] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTools, setCurrentTools] = useState([]);
  const [pageQuantity, setPageQuantity] = useState(15);
  const [indexOflastTool, setindexOflastTool]= useState(currentPage * pageQuantity);
  const [indexOfFirstTool, setindexOfFirstTool]=useState(indexOflastTool - pageQuantity);

  const [refreshState, setRefreshState] = useState(0);

  console.log("tools>>", tools);

  useEffect(() => {
    setLoading(true)
    Promise.all([
      axios.get(`http://localhost:8001/tools`),
      axios.get(`http://localhost:8001/categories`),
      axios.get(`http://localhost:8001/groups`)
    ]).then((all) => {
      setTools([...all[0].data]);
      setCategories([...all[1].data]);
      setGroups([...all[2].data]);
      setLoading(false);
    })
  }, [])

 

  useEffect(() => {
    setCurrentTools(tools.slice((currentPage - 1) * pageQuantity, (pageQuantity * currentPage )))
  }, [searchTrigger, tools, currentPage]);


  // console.log("currentTools", currentTools)
  // console.log("indexOfFirstTool", indexOfFirstTool)
  // console.log("indexOflastTool", indexOflastTool)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setindexOflastTool(currentPage * pageQuantity);
    setindexOfFirstTool(indexOflastTool - pageQuantity);
    }


  return (
    <UserContext.Provider value={{ user, setUser, admin, setAdmin }}>
      <Router>
        <div className="app">
          {/* All components outside <Routes></Routes> render in all routes.
Components inside <Routes></Routes>   render only in those routes.
*/}

          <Authentication />
          <Navbar user={user} admin={admin} setTools={setTools} setCurrentPage={setCurrentPage} />
          {/* <Searchbar setTools={setTools} categories={categories} /> */}


          <Routes>


            <Route path="/register" element={
              <Registration />
            }></Route>

            <Route path="/login" element={
              <Login />
            }></Route>

            <Route     path="/" element={<>
              <Searchbar setTools={setTools} categories={categories} groups={groups} setSearchTrigger={setSearchTrigger} setCurrentPage={setCurrentPage} setCurrentTools={setCurrentTools}/>
              <Filter />
              <ShowAllTools  currentTools={currentTools} />
              <Pagination pageQuantity={pageQuantity} totalTools={tools.length} paginate={paginate} />
            </>
            } />

            <Route element={<ProtectedRoutes />}>

              <Route path="/user/items" element=
                {
                  <>
                    <UserItemsSearch setTools={setTools} categories={categories} />
                    <ShowTools tools={tools} setTools={setTools} categories={categories} setCategories={setCategories} />
                    <Pagination />
                  </>


                } />
              <Route path="/profile" element={<Profile />} />

              <Route path="/my_reservations" element={<ShowReservations reservations={reservations} setReservations={setReservations} />} />

            </Route>


            <Route path="/inventory/:toolIdParam" element={
              <>
                <Searchbar setTools={setTools} categories={categories} groups={groups} setSearchTrigger={setSearchTrigger} />
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
