export default function Navbar () {
  return (
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
  )
}