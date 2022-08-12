const express = require("express");
const app = express();
const port = 8001;
const morgan = require("morgan");
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json()); //req.body
app.use(morgan("dev"));


const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwtGenerator = require("./utils/jwtGenerator")
const validInfo = require("./middleware/validInfo")
const authorization = require("./middleware/authorization")

//Register

app.post("/users", validInfo, async (req, res) => {
  try {

    //1. Destructure the req.body (name, email, password)

    const { user, userEmail, pwd } = req.body

    //This prints the users's password. Comment out!
    // console.log("index.js req body", req.body)

    //2. Check if email exist (if exists, then throw error)

    const checkUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      userEmail
    ]);
    // console.log("user rows", checkUser.rows)

    if (checkUser.rows.length !== 0) {
      return res.status(401).send("Email already exists");
    }

    //2. Check if username exist (if exists, then throw error)

    const checkUserName = await pool.query("SELECT * FROM users WHERE user_name = $1", [
      user
    ]);
    // console.log("user rows", checkUserName.rows)

    if (checkUserName.rows.length !== 0) {
      return res.status(401).send("Username already exists");
    }

    //3. Bcrypt the password

    const saltRounds = 10;
    // console.log("saltRounds", saltRounds)
    const salt = await bcrypt.genSalt(saltRounds);
    // console.log("salt", salt)

    const bcryptPassword = await bcrypt.hash(pwd, salt);
    // console.log("bcryptPassword", bcryptPassword)

    //4. Enter the user in the db

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password_hash) VALUES ($1, $2, $3)  RETURNING *", [user, userEmail, bcryptPassword]
    );
    res.json(newUser.rows[0])
    // console.log("newuser", newUser.rows[0])

    //5. generate our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    //  res.json({ token })

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})




//login route

router.post("/login", validInfo, async (req, res) => {
  try {

    //1. Destructure the req.body

    const { email, password } = req.body

    //2. Check if user does not exist (if not, throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Wrong email or password");
    }

    //3. If it exists. Check if incoming password is like db password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Wrong email or password")
    }

    //4. Give them jwt token

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token })

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Verify consitently the jw token

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
})





//list tools
app.get("/tools", async (req, res) => {
  try {
   
    const getAllTools = await pool.query(
      // `SELECT movie_id, movie_title, movie_year, movie_genre_id, movie_imdb, genre_title
      // FROM movies JOIN genres ON genres.genre_id = movies.movie_genre_id
      // ORDER BY movie_id DESC`
      `SELECT * FROM tools 
      JOIN categories 
      ON categories.category_id = tools.tool_category_id 
      JOIN users 
      ON users.user_id = tools.tool_owner_id 
      join groups
      ON groups.group_id = tools.tool_group_id
      ORDER BY tool_name`
    );
    console.log("getAllTools.rows", getAllTools.rows)
    res.json(getAllTools.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//list users
app.get("/users", async (req, res) => {
  try {

    const getAllusers = await pool.query(`SELECT * FROM users`);
    res.json(getAllusers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//list categories
app.get("/categories", async (req, res) => {
  try {

    const getAllCategories = await pool.query(`SELECT * FROM categories ORDER BY category_id`);
    res.json(getAllCategories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//list groups
app.get("/groups", async (req, res) => {
  try {
    // console.log(req);
    const getAllGroups = await pool.query(`SELECT * FROM groups ORDER BY group_id`);
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
      tool_group_id,
      tool_owner_id,
      tool_available,
    } = req.body;
   
    const newTool = await pool.query(
      "INSERT INTO tools (tool_name, tool_picture, tool_category_id, tool_group_id, tool_owner_id, tool_available) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [tool_name, tool_picture, tool_category_id, tool_group_id, tool_owner_id, tool_available]
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
    // console.log("req body", req.body);
    const newTool = await pool.query(
      "INSERT INTO tools (tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [tool_name, tool_picture, tool_category_id, tool_owner_id, tool_available]
    );
    res.json(newTool.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//edit a tool #
app.put("/tools/edit/:id/:tool_owner_id", async (req, res) => {
  try {
    const { id, tool_owner_id } = req.params;
    console.log("body", req.body)
    console.log("owner", tool_owner_id)
    console.log("id", id)
    const {
      tool_name,
      tool_description,
      tool_picture,
      tool_category_id,
      tool_group_id,
      tool_available,
    } = req.body;
    const editTool = await pool.query(
      `UPDATE tools SET tool_name = $1, tool_description= $2, tool_picture = $3, tool_category_id = $4, tool_group_id = $5, tool_available = $6 
      WHERE tool_id = $7 AND tool_owner_id= $8`,
      [
        tool_name,
        tool_description,
        tool_picture,
        tool_category_id,
        tool_group_id,
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

//edit a tool as administrator
app.put("/tools/edit/:id", async (req, res) => {
  try {
    const { id, tool_owner_id } = req.params;
    console.log("body", req.body)
    console.log("owner", tool_owner_id)
    console.log("id", id)
    const {
      tool_name,
      tool_description,
      tool_picture,
      tool_category_id,
      tool_group_id,
      tool_available,
    } = req.body;
    const editTool = await pool.query(
      `UPDATE tools SET tool_name = $1, tool_description= $2, tool_picture = $3, tool_category_id = $4, tool_group_id = $5, tool_available = $6 
      WHERE tool_id = $7`,
      [
        tool_name,
        tool_description,
        tool_picture,
        tool_category_id,
        tool_group_id,
        tool_available,
        id
      ]
    );
    res.json("Tool has been updated"); // res.send is more accurate or res.end
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/categories/edit/:id', async (req, res) => {
  try {
    // console.log("Put in Server")
    const { id } = req.params
    // console.log("Content of ID: ", id)
    const {
      category_name
    } = req.body;
    const editCategory = await pool.query(
      "UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *",
      [category_name, Number(id)]
    )
    // console.log("Edit Category: ", editCategory)
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
    // console.log("Category Name: ", category_name)
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

//items per user
app.get("/user_items", async (req, res) => {
  try {
    const toolsPerUser = await pool.query(
      `SELECT tool_name, tool_id, tool_available, tool_picture, category_name, user_id
      FROM tools 
      JOIN categories ON categories.category_id = tools.tool_category_id 
      JOIN users ON users.user_id = tools.tool_owner_id 
      WHERE users.user_id = $1 ORDER BY tool_id;`, [1]);
    res.json(toolsPerUser.rows)
  } catch (err) {
    console.error(err.message)
  }
})


//search for items belonging to a user in a specifc category and in all categories TEST
app.get("/search_user_items", async (req, res) => {
  try {
    const { searchInput, searchCategory, searchGroup } = req.query;

    const paramaters = [`%${searchInput.toLowerCase()}%`, 1];
    let searchGroupString = '';
    let searchCategoryString = '';
    if (searchCategory) {
      paramaters.push(searchCategory)
      searchCategoryString =  ` AND tool_category_id = $${paramaters.length}`
    }
      
    if (searchGroup) {
      paramaters.push(searchGroup)
      searchGroupString = ` AND tool_group_id = $${paramaters.length}`;
    }

    const query = `SELECT *
    FROM tools 
    JOIN categories 
    ON categories.category_id = tool_category_id 
    JOIN users 
    ON users.user_id = tools.tool_owner_id
    JOIN groups
    ON groups.group_id = tools.tool_group_id
    WHERE LOWER(tool_name) LIKE $1 AND users.user_id = $2 ${searchCategoryString} ${searchGroupString} ORDER BY tool_name`;

    console.log(query);
    const tools = await pool.query(query, paramaters);
    res.json(tools.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//Search categories at SearchbarCategories component (Searchbar at http://localhost:3000/admin/categories)
app.get("/admin/categories/search", async (req, res) => {
  try {
    const { searchInput } = req.query;

    // console.log("req.query", req.query);

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

    // console.log("req.query", req.query);

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

//get one reservations

app.get("/reservations/:id", async (req, res) => {
  try {

    const { id } = req.params;

    // console.log("req", req.body);
    const getReservation = await pool.query(
      `SELECT * FROM reservations WHERE reservation_id = $1`, [id]
    );
    res.json(getReservation.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//get all reservations

app.get("/reservations/", async (req, res) => {
  try {

    // console.log("req", req.body);
    const getAllReservations = await pool.query(
      `SELECT * FROM reservations`
    );
    res.json(getAllReservations.rows);
  } catch (err) {
    console.error(err.message);
  }
});


///refactor: search for a tool and cat. name and group in one route
app.get("/search", async (req, res) => {
  try {
    const { searchInput, searchCategory, searchGroup } = req.query;
    // console.log("req", req)
    const paramaters = [`%${searchInput.toLowerCase()}%`]
    let searchCategoryWhereString = '';
    let searchGroupWhereString = '';
    if (searchCategory) {
      paramaters.push(searchCategory)
      searchCategoryWhereString = `AND tool_category_id = ${paramaters.length == 2 ? "$2" : ""}`;
    }

    if (searchGroup) {
      paramaters.push(searchGroup)
      searchGroupWhereString = `AND tool_group_id = ${paramaters.length == 2 ? "$2" : "$3"}`;
    }


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
      user_name,
      user_email,
      group_id,
      group_name
      FROM tools 
      JOIN categories 
      ON categories.category_id = tool_category_id 
      JOIN users 
    ON users.user_id = tools.tool_owner_id
    JOIN groups
    ON tools.tool_group_id = groups.group_id
    WHERE LOWER(tool_name) LIKE $1 ${searchCategory !== undefined ? searchCategoryWhereString : ""} ${searchGroup !== undefined ? searchGroupWhereString : ""}`, paramaters);
    res.json(tools.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//Add a reservation

app.post("/reservations", async (req, res) => {
  try {
    const {
      reservation_start_date,
      reservation_end_date,
      tool_id
    } = req.body;
    // console.log("req body before query", req.body);
    const newReservation = await pool.query(
      "INSERT INTO reservations (reservation_start_date, reservation_end_date, reservation_tool_id, reservation_user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [reservation_start_date, reservation_end_date, tool_id, '1']
    );
    // console.log("new reservation after query", newReservation.data);
    res.json(newReservation.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all reservations for user

app.get("/my_reservations", async (req, res) => {
  try {
    // const { id } = req.params;
    const getMyReservations = await pool.query(
      `SELECT user_name AS owner_name, reservation_id, user_email AS owner_email, tool_name, reservation_start_date, reservation_end_date FROM reservations JOIN tools ON reservations.reservation_tool_id = tools.tool_id JOIN users ON users.user_id = tools.tool_owner_id WHERE reservation_user_id = 1;`
    );
    // console.log("my_reservations body: ", getMyReservations.rows)
    res.json(getMyReservations.rows)
  } catch (err) {
    console.error(err.message);
  };
});

// delete a reservation

app.delete("/my_reservations/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    console.log("deleted reservations id: ", id)
    const deletedRes = await pool.query(
      `DELETE FROM reservations WHERE reservation_id = $1 RETURNING *`, [id]
    )
    res.end();
  } catch (err) {
    console.error(err.message);
  };
});

//Add a group

app.post("/groups", async (req, res) => {
  try {
    const {
      group_name,
      group_description,
      group_icon, 
      group_owner_id
    } = req.body;
    // console.log("req body", req.body);
    const newGroup = await pool.query(
      "INSERT INTO groups (group_name, group_description, group_icon, group_owner_id) VALUES($1, $2, $3, $4) RETURNING *",
      [group_name, group_description, group_icon, group_owner_id]
    );
    res.json(newGroup.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a group
app.delete("/groups/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("deleted group id:", id);
    const deleteGroup = await pool.query(
      "DELETE FROM groups WHERE group_id = $1 RETURNING *",
      [id]
    );
    res.json("The group has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});


//Edit a group
app.put("/groups/edit/:id", async (req, res) => {
  try {
    const { id, tool_owner_id } = req.params;
    // console.log("owner", tool_owner_id)
    // console.log("id", id)
    const {
      group_name,
      group_description,
      group_icon,
      group_owner_id
    } = req.body;
    // console.log("req.body", req.body)
    const editGroup = await pool.query(
      `UPDATE groups SET group_name = $1, group_description = $2, group_icon = $3
      WHERE group_id = $4`,
      [
        group_name,
        group_description,
        group_icon,
        id
      

      ]
    );
    res.json("Group has been updated"); // res.send is more accurate or res.end
  } catch (err) {
    console.error(err.message);
  }
});



app.listen(port, () => {
  console.log(`Tool swap app running on port ${port}.`);
});