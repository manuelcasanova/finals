DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
category_id SERIAL PRIMARY KEY NOT NULL,
category_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255),
  user_password_hash VARCHAR(255),
  user_postal_code VARCHAR(255),
  user_address VARCHAR(255),
  user_city VARCHAR(255),
  user_picture VARCHAR(255)
);

CREATE TABLE groups (
  group_id SERIAL PRIMARY KEY NOT NULL,
  group_name VARCHAR(255),
  group_description TEXT,
  group_icon VARCHAR(255),
  group_owner_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tools (
  tool_id SERIAL PRIMARY KEY NOT NULL,
  tool_name VARCHAR(255) NOT NULL,
  tool_description VARCHAR(255),
  tool_category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
  tool_owner_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  tool_group_id INTEGER REFERENCES groups(group_id) ON DELETE CASCADE,
  tool_picture VARCHAR(255),
  tool_available BOOLEAN,
  tool_map VARCHAR(255)
);

CREATE TABLE reservations (
reservation_id SERIAL PRIMARY KEY NOT NULL,
reservation_start_date DATE NOT NULL,
reservation_end_date DATE NOT NULL,
reservation_tool_id INTEGER REFERENCES tools(tool_id) ON DELETE CASCADE,
reservation_user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
)

