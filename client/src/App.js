import './App.css';
import ShowTools from './components/ShowTools';
import { useState, useEffect } from 'react';import axios from 'axios';


function App() {

  const [ tools, setTools ] = useState([]);
  useEffect(() => {axios.get(`http://localhost:8001/tools`)
  .then(function (res) {setTools([...res.data])})}, [])
  console.log(tools)

  return (
    <div className="app">
      Authentication strip
      Navbar
      Search
      Filter
      <ShowTools tools={tools}/>
      Pagination
      Footer
      
    </div>
  );
}

export default App;
