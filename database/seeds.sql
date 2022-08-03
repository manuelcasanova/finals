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



INSERT INTO groups (group_name, group_description, group_icon)
VALUES
('BC Trucking Association', 'A group to share items for members of the BC Trucking Association', 'https://www.bctrucking.com/sites/all/themes/BCTA/img/bcta-logo.png'),
('NS Parents for Public Education', 'A group for parents of school children in Nova Scotia', 'https://parentspubliced.files.wordpress.com/2021/05/cropped-116894953_4317466868315248_6011508593121235507_o-1-1.jpg'),
('Ontario Home Builders'' Association', 'The voice of the residential construction industry in Ontario', 'https://ontarioconstructionnews.com/wp-content/uploads/2019/07/ohba-logo.png');

INSERT INTO tools (tool_group_id, tool_name, tool_category_id, tool_owner_id, tool_description, tool_picture, tool_available)
VALUES
(1,'Hammer', 1, 1, 'Claw Hammer with Nylon Vinyl Cushion Grip Handle', 'https://media-www.canadiantire.ca/product/fixing/tools/manual-fastening/0574141/ripping-hammer-20-oz-estwing-9fd13528-5f68-47e5-8172-44345afd09e9.png?imwidth=1024', true),
(1,'Dewalt Power Drill', 1, 5,'20 volt Max Cordless, drill and screw bits', 'https://www.dewalt.ca/NAG/PRODUCT/IMAGES/HIRES/DCD805B/DCD805B_1.jpg?resize=530x530', true),
(1,'Ratchet Set', 1, 4, 'Includes Sockets: 1/4 -inch, 5/16 -inch, 3/8 -inch, 7/16 -inch, 1/2 -inch, 9/16 -inch, 5/8 -inch, 11/16 -inch, 3/4 -inch, 13/16 -inch, 7/8 -inch, 15/16 -inch, 1 -inch accessories: 3 -inch extension, 6 -inch extension, universal swivel 90-tooth ratchet','https://images.homedepot.ca/productimages/p_1001553844.jpg?product-images=m', true),
(1,'Electric Lawn Mower', 2, 2, 'With grass bag and user manual', 'https://media-www.canadiantire.ca/product/seasonal-gardening/outdoor-tools/lawn-mowers-tractors/0601919/certified-12a-2-in-1-mower-17--289d67f4-f9de-49f5-8795-3182b9ab2780.png?imwidth=1024', true),
(1,'Hedge Clippers', 2, 7, 'Battery operated, with 22" reach', 'https://i5.walmartimages.ca/images/Enlarge/759/460/6000201759460.jpg', true),
(1,'Compound Mitre Saw', 3, 3, '0 degree to 70 degree miter range right and left, 12" blade, LED cut line indicator and work light','https://myturn-prod-images-out.s3.amazonaws.com/9/129/item/222265/image/1665.%2020180607_184556_HDR-B483AD97-CABD-135E-90BD-C4C9E9F01765-1024x768.jpg', true),
(1,'Circular Saw', 3, 3, 'Ryobi CSB141lZ, corded','https://myturn-prod-images-out.s3-us-west-2.amazonaws.com/9/129/item/683632/image/HTL2800%20circular%20saw-9CA293E7-D203-E53B-D82A-CC87022C1405-1024x768.jpg', true),
(1,'Jointer', 3, 6, '6" Benchtop Jointer with Helical Cutterhead','https://m.media-amazon.com/images/I/71FjetOqDcL._AC_SL1500_.jpg', true),
(1,'Bicycle Tire Irons', 4, 5, 'Pack of three, works with just about any tire','https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F15442%2Fimages%2F71291%2F5048795_NOC02__31739.1652864976.1280.1280.jpg%3Fc%3D1&w=1600&q=75', true),
(2,'4 Person Tent', 4, 7, 'Lightweight nylon and mesh canopy balance weather protection and ventilation. Rarely used so please borrow!','https://www.mec.ca/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-xw5rh7060c%2Fproducts%2F38656%2Fimages%2F164140%2F5060359_STA28__95668.1655305953.1280.1280.jpg%3Fc%3D1&w=1600&q=75', true),
(2,'Table Top BBQ', 4, 1, 'Built-in regulator/control valve is compatibile with 1 lb propane tanks', 'https://media-www.canadiantire.ca/product/seasonal-gardening/backyard-living/outdoor-cooking/0853602/master-chef-portable-gas-grill-bd9b2cbc-86de-4868-bdb2-ba63423c2c69.png?imwidth=1024', true),
(2,'Pipe Wrench', 5, 3, '14" length - 1-1/2" max pipe diameter and 42MM jaw capacity', 'https://media-www.canadiantire.ca/product/fixing/tools/sockets-wrenches/0588362/mastercraft-8-heavy-duty-pipe-wrench-cf2831c8-e60d-4658-85fb-bc19a5138ab4.png?imwidth=1024', true),
(2,'Drain Auger', 5, 6, 'Cable size: 1/4" x 20ft (0.6 cm x 7.6 m)', 'https://media-www.canadiantire.ca/product/fixing/plumbing/rough-plumbing/0630884/plumbshop-drum-auger-drill-drive-1-4-x-25--cdac1f6b-9b06-4d50-8393-cf6bf3249e33.png?imwidth=1024', true),
(3,'Pipe cutter', 5, 4, 'Cutting capacity: 1-5/8" (41 mm)', 'https://media-www.canadiantire.ca/product/fixing/plumbing/rough-plumbing/0638784/mastercraft-pvc-pipe-cutter-1-5-8-max--c72c06f9-1c89-49b3-b4a1-07aaf9e4cd8a.png?imwidth=1024', true), 
(3,'Multibit Screwdriver', 1, 4, 'Seven bits','https://myturn-prod-images-out.s3.amazonaws.com/9/129/item/17248/image/attribute_image6932539369190600751-1024x768.jpg', true);


