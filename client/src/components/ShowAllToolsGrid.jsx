import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import './styling/grid.css'
import OneToolForGrid from "./OneToolForGrid";
import FilterFromGrid from "./FilterFromGrid";

export default function ShowAllToolsGrid({ tools, currentTools }) {

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get(`/tools`).then(function (res) {
  //     setTools([...res.data]);
  //   });
  // }, []);


  return (
    <div className="show-tools-grid-component">
      <div className="show-tools-grid-filter">
        <FilterFromGrid />
      </div>
      <div className="show-tools-grid">
        <OneToolForGrid tools={currentTools} />
      </div>


    </div>

  )
}