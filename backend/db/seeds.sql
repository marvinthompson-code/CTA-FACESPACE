\c face_space_database;

INSERT INTO users
    (id, email, username, password, full_name, profile_picture, bio)
VALUES
    (1, 'marvinthompson@pursuit.org', 'Canned Bread', '123456', 'Marvin Thompson', 'backend/public/11703087_1093871170642354_2728768624190098749_n.jpg', 'I asked my parents before going on the internet'),
    (2, 'test123@test.com', 'test123', '123456', 'DummyUser', NULL, 'Hello');

INSERT INTO posts
    (content, owner_id, original_author )
VALUES 
    ('Wrote some really cool songs the other day!', 1, 1),
    ('Man, coding is hard. I should have went to art school.', 2, 2),
    ('Rice Krispies is undeniably the best cereal brand.', 1, 1),
    ('This is a test, and I am definitely a robot.', 2, 2),
    ('This is a test, and I am definitely a robot.', 1, 2),
    ('I swear im actually made of metal', 2, 2);
-- INSERT INTO likes
--     (post_id)
-- VALUES 
--     (1),
--     (1);
