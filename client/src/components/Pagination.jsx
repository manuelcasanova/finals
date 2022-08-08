import { useEffect } from "react";
import axios from "axios";


export default function Pagination () {
  const [tools, setTools] = useState();



  useEffect(() => {
    axios.get(`http://localhost:8001/tools`)
    .then(res => {
      console.log(res.data)
      setTools(res.data)
    })
  }, [])

  

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