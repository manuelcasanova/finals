### USER STORIES

# As a user

- R tools
- Search tools
- Open one tool and see details


# As a authenticated user

- CRUD tools
- Contact owner
- CRUD my own user

# As an administrator

- CRUD categories
- CRUD users
- CRUD tools????


++ Ability to view the schedule for a tool
++ Ability to book a tool!!


### ERD

# users             
user_id
user_name
user_email
user_password_hash
user_postal_code
user_address
user_city
user_picture (upload, url? amazons s3)

# categories
category_id
category_name

# tools
tool_id
tool_name
tool_category_id FK
tool_owner_id FK users.user_id 
tool_picture
tool_available BOOLEAN

# groups
group_id
group_name

# reservations
reservations.id
reservations.start_date
reservations.end_date
reservations.tool_id FK
renter_id FK users.user_id
option: loaner_id FK users.user_id (or connect through tool_owner_id) 


### 3rd step
Merit system

### 4th step
Quality (pictures)


### PAGES

# Main
Navigation bar
Search bar
See all tools
See all categories

# See one tool
Navigation bar
Picture, name, category, user name, user postal code (option: map with circle like FB Marketplace or craiglist)

# User profile
Navigation bar
List of my tools


# Administrator 
Navigation bar
CRUD all categories
CRUD all tools?
