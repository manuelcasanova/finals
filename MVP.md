### USER STORIES

# As a new user

- R tools
- Search tools
- Open one tool and see details 
- Contact owner
- CRUD tools
- CRUD categories
<!-- - CRUD users (not for MVP) --> 

## Buttons: login as user, login as administrator

### PAGES

# Main
Navigation bar
Search bar
See all tools (how to organize?)
See all categories
CRUD tools

# See one tool
Navigation bar
Search bar
Picture, name, category, user name, user postal code (option: map with circle like FB Marketplace or craiglist)

# See categories
Show all tools in category


### ERD
https://cloud.smartdraw.com/editor.aspx?depoId=36344083&credID=-39856152&pubDocShare=2F9A274D6419E832150C51EC3F1FE97E082


https://cloud.smartdraw.com/editor.aspx?depoId=36344083&credID=-39856152&pubDocShare=2F9A274D6419E832150C51EC3F1FE97E082

# users             
user_id
user_name
user_email
user_password
user_postal_code
user_address
user_city
user_picture

# categories
category_id
category_name

# tools
tool_id
tool_name
tool_description
tool_category_id FK
tool_user_id FK
tool_picture
tool_available BOOLEAN
tool_group_id FK 

# reservations
reservation_id PRIMARY KEY NOT NULL
reservation_start_date DATE NOT NULL
reservation_end_date DATE NOT NULL
reservation_tool_id FK (tools.tool_id)
reservation_user_id FK (users.user_id)  --> This refers to the borrower.




