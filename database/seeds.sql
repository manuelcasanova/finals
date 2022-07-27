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



INSERT INTO tools (tool_name, tool_category_id, tool_owner_id, tool_description)
VALUES
('Hammer', 1, 1, 'Claw Hammer with Nylon Vinyl Cushion Grip Handle'),
('Dewalt Power Drill', 1, 5,'blank'),
('Ratchet Set', 1, 4, 'blank'),
('Electric Lawn Mower', 2, 2, 'blank'),
('Hedge Clippers', 2, 7, 'blank'),
('Compound Mitre Saw', 3, 3, 'blank'),
('Circular Saw', 3, 3, 'blank'),
('Jointer', 3, 6, 'blank'),
('Bicycle Tire Irons', 4, 5, 'blank'),
('4 Person Tent', 4, 7, 'blank'),
('Table Top BBQ', 4, 1, 'blank'),
('Pipe Wrench', 5, 3, 'blank'),
('Drain Auger', 5, 6, 'blank'),
('Pipe cutter', 5, 4, 'blank'),
('Multibit Screwdriver', 1, 4, 'blank');
