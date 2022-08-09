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
('Commercial Drive Tool Share, Vancouver (BC)', 'An East Van community sharing group', 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_65,w_845/v1/clients/vancouverbc/Commercial_Drive_Neighbourhood_Mural_f47786f6-9743-45e5-8f11-68f34757a27f.jpg'),
('Berry Hills Subdivion, Middle Sackville (NS)', 'A neighbourhood group for all the residents living in Berry Hills', 'https://www.atnhomes.ca/images/unitegallery/berryhills/106hamilton/berryhills1.jpg'),
('Bloorcourt Village Tool Exchange, Toronto (ON)', 'Making our community stronger with shared resources', 'https://sherkinlangerandcastle.files.wordpress.com/2012/03/bloorcourtmural.jpg?w=600&h=450'),
('Rockingham South, Halifax (NS)', 'A friendly place where neighbours can connect and share their tools', 'https://images.squarespace-cdn.com/content/v1/53c685e5e4b050d23b2235ba/1405704437478-F8K6FTUH8NRLMG1A91WT/rockingham3.jpg?format=2500w');

INSERT INTO tools (tool_group_id, tool_name, tool_category_id, tool_owner_id, tool_description, tool_picture, tool_available, tool_map)
VALUES
(1,'Hammer', 1, 1, 'Claw Hammer with Nylon Vinyl Cushion Grip Handle', 'https://media-www.canadiantire.ca/product/fixing/tools/manual-fastening/0574141/ripping-hammer-20-oz-estwing-9fd13528-5f68-47e5-8172-44345afd09e9.png?imwidth=1024', true, 'https://github.com/manuelcasanova/finals/blob/mc/49/fake-map/server/images/Vancouver-map.png'),
(1,'Dewalt Power Drill', 1, 5,'20 volt Max Cordless, drill and screw bits', 'https://crdms.images.consumerreports.org/prod/products/cr/models/400290-general-use-typically-12-volts-dewalt-dcd701f2-10009762.png', true),
(1,'Ratchet Set', 1, 4, 'Includes Sockets: 1/4 -inch, 5/16 -inch, 3/8 -inch, 7/16 -inch, 1/2 -inch, 9/16 -inch, 5/8 -inch, 11/16 -inch, 3/4 -inch, 13/16 -inch, 7/8 -inch, 15/16 -inch, 1 -inch accessories: 3 -inch extension, 6 -inch extension, universal swivel 90-tooth ratchet','https://pimdatacdn.bahco.com/media/sub255/177902b96c7cdf3f.png', true),
(1,'Electric Lawn Mower', 2, 2, 'With grass bag and user manual', 'https://media-www.canadiantire.ca/product/seasonal-gardening/outdoor-tools/lawn-mowers-tractors/0601919/certified-12a-2-in-1-mower-17--289d67f4-f9de-49f5-8795-3182b9ab2780.png?imwidth=1024', true),
(1,'Hedge Trimmer', 2, 7, 'Battery operated, with 22" reach', 'https://media-www.canadiantire.ca/product/seasonal-gardening/outdoor-tools/hand-held-outdoor-power-tools/0600591/mastercraft-20v-22-hedge-trimmer-941442df-975d-46c7-8515-270c1c97e45b.png', true),
(1,'Compound Mitre Saw', 3, 3, '0 degree to 70 degree miter range right and left, 12" blade, LED cut line indicator and work light','https://media-www.canadiantire.ca/product/fixing/tools/stationary-tools/0556751/mastercraft-10-sliding-mitre-saw-c6b8f922-16c2-4d0d-85b6-3d2f2edfa7c7.png?imwidth=1024', true),
(1,'Circular Saw', 3, 3, 'Ryobi CSB141lZ, corded','https://cdn.makitatools.com/apps/cms/img/hs7/bc689d52-5b86-4c9d-9982-d5e7a2b3220c_hs7600_p_1500px.png', true),
(1,'Jointer', 3, 6, '6" Benchtop Jointer with Helical Cutterhead','https://muellerco.com/wp-content/uploads/2021/09/708475_main.png', true),
(1,'Bicycle Tire Levers', 4, 5, 'Pack of three, works with just about any tire','https://cdn.shopify.com/s/files/1/0498/4366/7108/products/AI-AT03_512x512.png?v=1658118559', true),
(2,'4 Person Tent', 4, 7, 'Lightweight nylon and mesh canopy balance weather protection and ventilation. Rarely used so please borrow!','https://media-www.canadiantire.ca/product/playing/camping/tents-shelters/0765443/outbound-3-person-dome-tent-2640e62d-a663-4b64-a1cd-4a196e647078.png', true),
(2,'Table Top BBQ', 4, 1, 'Built-in regulator/control valve is compatibile with 1 lb propane tanks', 'https://media-www.canadiantire.ca/product/seasonal-gardening/backyard-living/outdoor-cooking/0853602/master-chef-portable-gas-grill-bd9b2cbc-86de-4868-bdb2-ba63423c2c69.png?imwidth=1024', true),
(2,'Pipe Wrench', 5, 3, '14" length - 1-1/2" max pipe diameter and 42MM jaw capacity', 'https://cdn.shopify.com/s/files/1/0203/6660/products/GSP8_2048x2048.png?v=1482504471', true),
(2,'Drain Auger', 5, 6, 'Cable size: 1/4" x 20ft (0.6 cm x 7.6 m)', 'https://agdhpmnben.cloudimg.io/fit/800x800/none/https://giantwholesale.ca/images/default/thumbnails/products/4429e14776e9836c9ee5ed1102125e93.png', true),
(3,'Pipe cutter', 5, 4, 'Cutting capacity: 1-5/8" (41 mm)', 'https://bramec.com/wp-content/uploads/2016/12/19718.png', true), 
(3,'Multibit Screwdriver', 1, 4, 'Seven bits','https://www.kleintools.com/sites/all/product_assets/png/klein/32305.png', true),
(3,'Fiskars Lopper', 2, 1, 'Lopper has steel handle construction with non-slip grips, and a shock-absorbing bumper reduces strain on hands and arms','https://pimdatacdn.bahco.com/media/sub593/16a0d719bfef7d3f.png', true),
(3,'Mastercraft socket set', 1, 4, '11 pieces set, 1/4-in drive','https://media-www.canadiantire.ca/product/fixing/tools/sockets-wrenches/0589238/maximum-universal-socket-set-fe7d8182-5b33-44c0-94cc-f9d80af83695.png', true),
(3,'Ryobi cordless drill', 1, 4, 'The drill/driver has a keyless chuck with a 24-position clutch and 2- speed gear box that adjusts the torque output.','https://81d489708d4495942781-1b0f6c3bfa89ded59cf9ffb629f4919e.ssl.cf1.rackcdn.com/categories/homepage_photo/1/07ee18c5-327f-48f1-a932-9086e81778ab.png', true);

-- INSERT INTO users_groups (user_id, group_id)
-- VALUES
-- (1, 1), (2, 1), (3, 1), (1, 2), (4, 2), (5, 2), (6, 2), (7, 3), (3, 3), (4, 3)

INSERT INTO reservations (reservation_start_date, reservation_end_date, reservation_user_id,
reservation_tool_id)
VALUES('2022-08-09', '2022-08-12', 1, 5), ('2022-08-14', '2022-08-16', 2, 6), ('2022-08-13', '2022-08-15', 1, 2), ('2022-08-13', '2022-08-15', 1, 3), ('2022-08-23', '2022-08-27', 1, 5), ('2022-08-23', '2022-08-27', 4, 4), ('2022-08-23', '2022-08-27', 6, 10), ('2022-08-23', '2022-08-27', 7, 8), ('2022-08-23', '2022-08-27', 7, 9)