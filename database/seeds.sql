INSERT INTO categories (category_name)
VALUES
('Home Maintenance'), ('Yard and Garden'), ('Carpentry and Woodworking'), ('Active Outdoor'), ('Plumbing'); 

INSERT INTO users (user_name, user_email)
VALUES
('Karolina Redden', 'dubajkaro@gmail.com'),
('Kilgore Trout', 'k.trout@vonnegut.com'),
('Alice N. Wonderland', 'alice@therabbithole.com'),
('Don Quixote', 'dq@lamancha.com'),
('Essun Oh', 'essun@orogenes.org'),
('Sam Bell', 'sam@moonmining.com'),
('Selina Kyle', 'catwoman@superheroes.org');



INSERT INTO tools (tool_name, tool_category_id, tool_owner_id)
VALUES
('Hammer', 1, 1),
('Dewalt Power Drill', 1, 5),
('Ratchet Set', 1, 4),
('Electric Lawn Mower', 2, 2),
('Hedge Clippers', 2, 7),
('Compound Mitre Saw', 3, 3),
('Circular Saw', 3, 3),
('Jointer', 3, 6),
('Bicycle Tire Irons', 4, 5),
('4 Person Tent', 4, 7),
('Table Top BBQ', 4, 1),
('Pipe Wrench', 5, 3),
('Drain Auger', 5, 6)
('Pipe cutter', 5, 4),
('Multibit Screwdriver', 1, 4);
