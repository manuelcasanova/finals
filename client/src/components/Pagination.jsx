import { useEffect, useState } from "react";
import axios from "axios";


export default function Pagination () {

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toolsPerPage, setToolsPerPage] = useState(5);

  useEffect(() => {
    const fetchTools = async () => {
      const res = await axios.get(`http://localhost:8001/tools`);
      setTools(res.data);
      setLoading(false)
    };
    fetchTools();
  }, [])

  console.log("res>>", tools)
  const indexOflastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOflastTool - toolsPerPage;
  const currentTools = tools.slice(indexOfFirstTool, indexOflastTool);

  return (

    <div class="pagination">
  <a href="#">&laquo;</a>
  <a href="#" class="active">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
  <a href="#">4</a>
  <a href="#">5</a>
  <a href="#">6</a>
  <a href="#">&raquo;</a>
</div>

  )
}