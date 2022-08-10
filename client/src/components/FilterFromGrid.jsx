import { useNavigate } from "react-router-dom"

export default function FilterFromGrid () {

const navigate = useNavigate()

  return (
    <div className="filter">
    <div className="filter-per-page">Per page</div>
    <div className="filter-view">
    <a onClick={() => 
    
    {navigate(`/list`)}
  
  }>View List</a>
    </div>

    

    <div className="filter-sort-by">Sort by</div>
  </div>
  )
}