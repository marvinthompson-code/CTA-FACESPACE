\c face_space_database;

INSERT INTO users
    (email, username, password, full_name, profile_picture, bio)
VALUES
    ('marvinthompson@pursuit.org', 'Canned Bread', '123456', 'Marvin Thompson', 'backend/public/11703087_1093871170642354_2728768624190098749_n.jpg', 'I asked my parents before going on the internet'),
    ('test123@test.com', 'test123', '123456', 'DummyUser', NULL, 'Hello');

INSERT INTO posts
    (content)
VALUES 
    ('Wrote some really cool songs the other day!'),
    ('Man, coding is hard. I should have went to art school.'),
    ('Rice Krispies is undeniably the best cereal brand.'),
    ('This is a test, and I am definitely a robot.'),
    ('I swear im actually made of metal');
INSERT INTO likes
    (post_id)
VALUES 
    (1),
    (1);
