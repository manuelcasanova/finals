import './styling/navbar.css'

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-button">Inventory</div>
        <div className="navbar-button">Groups</div>
        <div className="navbar-button">About us</div>
      </div>
      <div className="navbar-right">
        <div className="navbar-dropdown">
          <a className="dropbtn">My account</a>
          <div className="navbar-dropdown-content">
            <a href="#">My items</a>
            <a href="#">Profile</a>
          </div>
        </div>

        <div className="navbar-dropdown">
          <a className="dropbtn">Administrator</a>
          <div className="navbar-dropdown-content">
            <a href="#">Manage categories</a>
            <a href="#">Manage users</a>
            <a href="#">Manage tools</a>
          </div>
        </div>
      </div>
    </div>
  )
}