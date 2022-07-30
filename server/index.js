const express = require("express");
const app = express();
const port = 8001;
const morgan = require("morgan");
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json()); //req.body
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Tool swap app running on port ${port}.`);
});

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
      tool_description,
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
      ON users.user_id = tools.tool_owner_id ORDER BY tool_name`
    );
    res.json(getAllTools.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//list users
app.get("/users", async (req, res) => {
  try {
    console.log(req);
    const getAllusers = await pool.query(`SELECT * FROM users`);
    res.json(getAllusers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//list categories
app.get("/categories", async (req, res) => {
  try {
    console.log(req);
    const getAllCategories = await pool.query(`SELECT * FROM categories`);
    res.json(getAllCategories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//list groups
app.get("/groups", async (req, res) => {
  try {
    console.log(req);
    const getAllGroups = await pool.query(`SELECT * FROM groups`);
    res.json(getAllGroups.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//delete a tool
app.delete("/tools/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("deleted tool id:", id);
    const deleteStep = await pool.query(
      "DELETE FROM tools WHERE tool_id = $1 RETURNING *",
      [id]
    );
    res.json("The tool has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//add a tool

app.post("/tools", async (req, res) => {
  try {
    const {
      tool_name,
      tool_picture,
      tool_category_id,
      tool_owner_id,
      tool_available,
    } = req.body;
    console.log("req body", req.body);
    const newTool = await pool.query(
      "INSERT INTO tools (tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available]
    );
    res.json(newTool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/tools", async (req, res) => {
  try {
    const {
      tool_name,
      tool_picture,
      tool_category_id,
      tool_owner_id,
      tool_available,
    } = req.body;
    console.log("req body line 92", req.body);
    const newTool = await pool.query(
      "INSERT INTO tools (tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available]
    );
    res.json(newTool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//edit a tool
app.put("/tools/edit/:id/:tool_owner_id", async (req, res) => {
  try {
    const { id, tool_owner_id } = req.params;
    console.log("owner", tool_owner_id)
    console.log("id", id)
    const {
      tool_name,
      tool_picture,
      tool_category_id,
      tool_available,
    } = req.body;
    const editTool = await pool.query(
      `UPDATE tools SET tool_name = $1, tool_picture = $2, tool_category_id = $3, tool_available = $4 
      WHERE tool_id = $5 AND tool_owner_id= $6`,
      [
        tool_name,
        tool_picture,
        tool_category_id,
        tool_available,
        id,
        tool_owner_id
      ]
    );
    res.json("Tool has been updated"); // res.send is more accurate or res.end
  } catch (err) {
    console.error(err.message);
  }
});



app.put('/categories/edit/:id', async (req, res) => {
  try{
    console.log("Put in Server")
    const {id} = req.params
    console.log("Content of ID: ", id)
    const {
      category_name
    } = req.body;
    const editCategory = await pool.query(
      "UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *",
      [category_name, Number(id)]
    )
    console.log("Edit Category: ", editCategory)
    // have to end with a response method .send, .end, .json ...
    res.end()
  } catch (err) {
    console.error(err.message);
  }
})

// add a category
app.post("/categories", async (req, res) => {
  try {
    const {
      category_name
    } = req.body;
    console.log("Category Name: ", category_name)
    const newCategory = await pool.query("INSERT INTO categories (category_name) VALUES ($1) RETURNING *", 
    [category_name]);
    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a category
app.delete("/categories/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("deleted category id:", id);
    const deleteCategory = await pool.query(
      "DELETE FROM categories WHERE category_id = $1 RETURNING *",
      [id]
    );
    res.json("The tool has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});


//edit the tool /tools/edit/:id
//delete a tool /tools/delete/:id
//add a tool /tools with post K done
//list users /users K done

//list categories /categories
//add a category /coegries with post
//delete a category /categories/delete/:id
//edit a cat. /categories/edit/:id

//query parameter route url/?name=henry = req.query
app.get("/search", async (req, res) => {
  try {
    const { searchInput, searchCategory } = req.query;
    console.log("req", req)
    // const tools = await pool.query(
    //   "SELECT * from tools WHERE LOWER(tool_name) LIKE $1 AND tool_category_id = $2", [`%${searchInput.toLowerCase()}%`, searchCategory ]
    // )
  
    // const tools = await pool.query(
    //   "SELECT * from tools WHERE LOWER(tool_name) LIKE $1 || LOWER(tool_description) LIKE $1", [`%${searchInput.toLowerCase()}%`]
    // )
    console.log(req.query);
     
    const tools = await pool.query(
      `SELECT 
      tool_id, 
      tool_name,
      tool_description, 
      tool_category_id, 
      tool_owner_id, 
      tool_picture, 
      tool_available, 
      category_name, 
      user_name 
      FROM tools 
      JOIN categories 
      ON categories.category_id = tool_category_id 
      JOIN users 
    ON users.user_id = tools.tool_owner_id WHERE LOWER(tool_name) LIKE $1 AND tool_category_id = $2 ORDER BY tool_name`, [`%${searchInput.toLowerCase()}%`, searchCategory]);


    // const formattedInput = searchInput.replace(" ", "|");
    // console.log(formattedInput)
    // const tools = await pool.query(
    //   "SELECT * from tools WHERE to_tsvector(tool_description) @@ to_tsquery($1) OR to_tsvector(tool_name) @@ to_tsquery($1)", [formattedInput]
    // )

    res.json(tools.rows)
  } catch (err) {
    console.error(err.message)
  }
})


//search for all categories
app.get("/search_all", async (req, res) => {
  try {
    const { searchInput, searchCategory } = req.query;
    const tools = await pool.query(
      `SELECT 
      tool_id, 
      tool_name,
      tool_description, 
      tool_category_id, 
      tool_owner_id, 
      tool_picture, 
      tool_available, 
      category_name, 
      user_name 
      FROM tools 
      JOIN categories 
      ON categories.category_id = tool_category_id 
      JOIN users 
    ON users.user_id = tools.tool_owner_id WHERE LOWER(tool_name) LIKE $1 ORDER BY tool_name`, [`%${searchInput.toLowerCase()}%`]);
    res.json(tools.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//items per user
app.get("/user_items", async (req, res) => {
  try {
    const toolsPerUser = await pool.query(
      `select tool_name, tool_id, tool_available, tool_picture, category_name, user_id
      from tools 
      join categories on categories.category_id = tools.tool_category_id 
      join users on users.user_id = tools.tool_owner_id 
      where users.user_id = $1;`, [1]);
    res.json(toolsPerUser.rows)
  } catch (err) {
    console.error(err.message)
  }
})


//Search categories at SearchbarCategories component (Searchbar at http://localhost:3000/admin/categories)
app.get("/admin/categories/search", async (req, res) => {
  try {
    const { searchInput } = req.query;

    console.log("req.query", req.query);
     
    const categories = await pool.query(
      `SELECT category_name 
      FROM categories 
      WHERE LOWER(category_name) 
      LIKE $1 
      ORDER BY category_name`, [`%${searchInput.toLowerCase()}%`]);

    res.json(categories.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//Search groups at SearchbarGroups component (Searchbar at http://localhost:3000/groups)
app.get("/groups/search", async (req, res) => {
  try {
    const { searchInput } = req.query;

    console.log("req.query", req.query);
     
    const groups = await pool.query(
      `SELECT group_name, group_description, group_icon 
      FROM groups 
      WHERE LOWER(group_name) 
      LIKE $1 
      ORDER BY group_name`, [`%${searchInput.toLowerCase()}%`]);

    res.json(groups.rows)
  } catch (err) {
    console.error(err.message)
  }
})