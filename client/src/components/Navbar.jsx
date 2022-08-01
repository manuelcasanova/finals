import './styling/navbar.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Navbar({user, admin, setTools}) {

  const navigate = useNavigate();

  function handleMyItems() {
      axios.get(`http://localhost:8001/user_items`).then(function (res) {
        setTools([...res.data]);
      });
      navigate(`/user/items`)
  }

  function allItems() {
    axios.get(`http://localhost:8001/tools`).then(function (res) {
        setTools([...res.data]);
      });
      navigate(`/`)
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-button">
        <a onClick={allItems}>Inventory</a>
        </div>
        
        <div className="navbar-button">
        <a onClick={() => {navigate(`/groups`)}}>Groups</a>
        </div>
        <div className="navbar-button">
        <a onClick={() => {navigate(`/aboutus`)}}>About us</a>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-dropdown">
          {/* <a className="dropbtn-user"> */}
          <a className={!user.loggedIn ? "dropbtn-user-hide" : "dropbtn-user"}>
            My account</a>
          <div className="navbar-dropdown-content">
          <a onClick={handleMyItems}>My items</a>
          <a onClick={() => {navigate(`/profile`)}}>Profile</a>
          </div>
        </div>

        <div className="navbar-dropdown">
          {/* <a className="dropbtn-admin"> */}
          <a className={!admin.loggedIn ? "dropbtn-admin-hide" : "dropbtn-admin"}>
            Administrator</a>
          <div className="navbar-dropdown-content">
            {/* <a href="/admin/categories">Manage categories</a> */}
            <a onClick={() => {navigate(`/admin/categories`)}}>Manage categories</a>
            <a onClick={() => {navigate(`/admin/users`)}}>Manage users</a>
            <a onClick={() => {navigate(`/admin/tools`)}}>Manage tools</a>
          </div>
        </div>
      </div>
    </div>
  )
}

