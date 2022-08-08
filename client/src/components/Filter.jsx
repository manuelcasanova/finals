import { useNavigate } from "react-router-dom"

export default function Filter () {

const navigate = useNavigate()

  return (
    <div className="filter">
    <div className="filter-per-page">Per page</div>
    <div className="filter-view">
    <a onClick={() => 
    
    {navigate(`/grid`)}
  
  }>View grid</a>
    </div>

    

    <div className="filter-sort-by">Sort by</div>
  </div>
  )
}