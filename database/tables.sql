DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE categories (
category_id SERIAL PRIMARY KEY NOT NULL,
category_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255),
  user_password_hash TEXT,
  user_postal_code VARCHAR(255),
  user_address VARCHAR(255),
  user_city VARCHAR(255),
  user_picture VARCHAR(255)
);

CREATE TABLE tools (
  tool_id SERIAL PRIMARY KEY NOT NULL,
  tool_name VARCHAR(255) NOT NULL,
  tool_description VARCHAR(255),
  tool_category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
  tool_owner_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  tool_picture VARCHAR(255),
  tool_available BOOLEAN
);


