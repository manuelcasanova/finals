const express = require('express');
const app = express();
const port = 8001;
const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db')
app.use(cors());
app.use(express.json()); //req.body
app.use(morgan('dev'));

app.listen(port, () => { console.log(`Tool swap app running on port ${port}.`); });

//list tools
app.get("/tools", async (req, res) => {
  try {
    console.log(req);
    const getAllTools = await pool.query(
      // `SELECT movie_id, movie_title, movie_year, movie_genre_id, movie_imdb, genre_title
      // FROM movies JOIN genres ON genres.genre_id = movies.movie_genre_id
      // ORDER BY movie_id DESC`
      `SELECT 
      tool_id, 
      tool_name, 
      tool_category_id, 
      tool_owner_id, 
      tool_picture, 
      tool_available, 
      category_name, 
      user_name 
      FROM tools 
      JOIN categories 
      ON categories.category_id = tools.tool_category_id 
      JOIN users 
      ON users.user_id = tools.tool_owner_id`
    );
    res.json(getAllTools.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//list users
app.get("/users", async (req, res) => {
  try {
    console.log(req);
    const getAllusers = await pool.query(
      `SELECT * FROM users`
    );
    res.json(getAllusers.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//delete a tool
app.delete("/tools/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("deleted tool id:", id);
    const deleteStep = await pool.query(
      "DELETE FROM tools WHERE tool_id = $1 RETURNING *", [id]
    )
    res.json("The tool has been deleted")
  } catch (err) {
    console.error(err.message)
  }
})

//add a tool
app.post("/tools", async (req, res) => {   
  try {     
    const { tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available } = req.body;     
    console.log("req body", req.body)    
    const newTool = await pool.query(
      "INSERT INTO tools (tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available) VALUES($1, $2, $3, $4, $5) RETURNING *", [tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available])     
      res.json(newTool.rows[0])   
  } catch (err) {
    console.error(err.message)   
  }})

  //edit a tool
  app.put("/tools/edit/:id", async (req, res) => {   
    try {     
      const { id } = req.params;     
      const { tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available } = req.body       
      const editTool = await pool.query(
        'UPDATE tools SET tool_name = $1, tool_picture = $2, tool_category_id = $3, tool_owner_id = $4, tool_available = $5 WHERE tool_id = $6', [tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available, id])       
        res.json("Tool has been updated")     
      } catch (err) {       
        console.error(err.message)     
      }
    })










//edit the tool /tools/edit/:id
//delete a tool /tools/delete/:id
//add a tool /tools with post K done
//list users /users K done


//list categories /categories
//add a category /coegries with post
//delete a category /categories/delete/:id
//edit a cat. /categories/edit/:id

