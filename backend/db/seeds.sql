\c face_space_db;

INSERT INTO users
    (email, username, password, full_name, profile_picture, bio)
VALUES
    ('marvinthompson@pursuit.org', 'cannedbread', 'test123', 'Marvin Thompson', 'backend/public/11703087_1093871170642354_2728768624190098749_n.jpg', 'I asked my parents before going on the internet');

INSERT INTO posts
    (owner_id, content)
VALUES 
    (1, 'Wrote some really cool songs the other day!'),
    (1, 'Man, coding is hard. I should have went to art school.'),
    (1, 'Rice Krispies is undeniably the best cereal brand.');
