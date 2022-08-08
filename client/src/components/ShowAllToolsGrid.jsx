import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";

export default function ShowAllToolsGrid({ tools }) {

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get(`http://localhost:8001/tools`).then(function (res) {
  //     setTools([...res.data]);
  //   });
  // }, []);


  return (
    <div className="show-tools-grid">
      Show tools grid
    </div>
  )
}