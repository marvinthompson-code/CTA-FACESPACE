\c face_space_database;

INSERT INTO users
    (id, email, username, password, full_name, profile_picture, bio)
VALUES
    (1, 'marvinthompson@pursuit.org', 'Canned Bread', '123456', 'Marvin Thompson', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/public/11703087_1093871170642354_2728768624190098749_n.jpg', 'I asked my parents before going on the internet'),
    (2, 'test123@test.com', 'test123', '123456', 'DummyUser', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/Butter_Robot_Picture.png', 'Hello');

INSERT INTO posts
    (content, post_image_url, owner_id, original_author )
VALUES 
    ('Wrote some really cool songs the other day!', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/26114319_1947454328617363_6856733851798615291_o.jpg', 1, 1),
    ('Man, coding is hard. I should have went to art school.', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/37049954_2194002163962577_1943431186286116864_o.jpg', 2, 2),
    ('Rice Krispies is undeniably the best cereal brand.', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/46258798_2388032097892915_301720752464330752_o.jpg', 1, 1),
    ('This is a test, and I am definitely a robot.', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/Butter_Robot_Picture.png', 2, 2),
    ('This is a test, and I am definitely a robot.', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/Butter_Robot_Picture.png', 1, 2),
    ('I swear im actually made of metal', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/Butter_Robot_Picture.png', 2, 2);
-- INSERT INTO likes
--     (post_id)
-- VALUES 
--     (1),
--     (1);
