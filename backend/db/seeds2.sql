-- \c face_space_database;

INSERT INTO users
    (id, email, username, full_name, profile_picture, bio)
VALUES
    (1, 'guest1@guest.com', 'Mark Anderson', 'Mark Anderson', 'https://st.depositphotos.com/2931363/3703/i/950/depositphotos_37034497-stock-photo-young-black-man-smiling-at.jpg', 'CEO of LifeSpace Inc. Father of 2. Lover of music. Cant wait to meet you all.'),
    (2, 'guest2@guest.com', 'Jennifer Bailey', 'Jennifer Bailey', 'https://www.essence.com/wp-content/uploads/2020/03/Locs-Styles-hero-900x600.jpg', 'Hello! Salon Owner, Hair efficianado. Message me for rates!'),
    (3, 'guest3@guest.com', 'Justin Kennedy', 'Justin Kennedy', 'https://mahoganyspa.com/wp-content/uploads/2016/12/o-e1569004406151.jpg', 'Employee of LifeSpace Inc. Car guy!'),
    (4, 'guest4@guest.com', 'Alvin Mcclintock', 'Alivin Mcclintock', 'https://media.istockphoto.com/photos/african-man-wearing-glasses-portrait-picture-id843623958?k=6&m=843623958&s=170667a&w=0&h=9NpbqPu7DLHBGGo_9jEZvi1CwYMD4oPfBkG2PQsSYbU=', 'Junior Developer at CBS. Musican, guitarist, Heavy Metal!'),
    (5, 'guest5@guest.com', 'Danny K', 'Danny K', 'https://guyanatimesgy.com/wp-content/uploads/2019/09/COO-300x225.png', 'Proud father of 3, Best friend of many looking to do awesome things.'),
    (6, 'guest6@guest.com', 'Brian M Doran', 'Brian M Doran', 'https://businesswest.com/wp-content/uploads/2020/07/WilbrMonsnEaslerjpg.jpg', 'Otter House Productions manager. For Event booking please contact me!'),
    (7, 'guest7@guest.com', 'Christopher Caressimo', 'Christopher Caressimo', 'https://i.pinimg.com/originals/c0/c0/e3/c0c0e3cada6195b8a0adfa0e2a38aaab.jpg', 'Drummer. Sponsored by Sabian Cymbals!'),
    (8, 'guest8@guest.com', 'Carina Taveras', 'Carina Taveras', 'https://media-exp1.licdn.com/dms/image/C4D03AQEq9UXMaPWk8w/profile-displayphoto-shrink_800_800/0?e=1602720000&v=beta&t=rP1RmlEEbtAOJOVLdCTiVY7_bAnijO2AWH908BB3YPI', 'Hello! Software developer. Full Stack. Crafting/Resin! Lets chat.'),
    (9, 'guest9@guest.com', 'Gladys T', 'Gladys T', 'https://st.depositphotos.com/2931363/3703/i/950/depositphotos_37034497-stock-photo-young-black-man-smiling-at.jpg', 'Proud mother of some amazing boys. Cant wait to get to know you.'),
    ('DWHF6fNgSeTNGlbjaeT9yW3rzqz2', 'guest@guest.com', 'GuestAccount', 'Guest Account', '/Users/marvinthompson/Desktop/CTA-FACESPACE/backend/seedPhotos/Butter_Robot_Picture.png', 'This is a guest account' );

INSERT INTO posts
    (content, post_image_url, owner_id, original_author )
VALUES 
    ('Ive noticed that the secrets to early morning meetings is to make sure you get enough rest the night before hand. Ive got to remember to keep that in mind!.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG', 1, 1),
    ('Does anyone have any good music recommendations? Im looking for some new things to play around the office.', 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2uCzt?ver=eb50&q=90&m=2&h=768&w=1024&b=%23FFFFFFFF&aim=true', 1, 1),
    ('Hey all! I promoted my first team member at LifeSpace. Im very excited for the future of this company.', 'https://www.avepoint.com/blog/wp-content/uploads/2018/10/iStock-887882750.jpg', 1, 1),
    ('Hey all! I promoted my first team member at LifeSpace. Im very excited for the future of this company.', 'https://www.avepoint.com/blog/wp-content/uploads/2018/10/iStock-887882750.jpg', 1, 2),
    ('Im opening up the books for new appointments! Feel free to contact me and we can get something set up!', 'https://locdlife.files.wordpress.com/2013/10/img_locs.jpg?w=558', 2, 2),
    ('Did my first hair dye on a customers locs today. It always feels great to grow in your craft.', 'https://images.squarespace-cdn.com/content/v1/5c47f5ff55b02c13b37928e7/1556992748248-PIBP1YCII6BCG9CSXI0K/ke17ZwdGBToddI8pDm48kJK4Mm1kch8SFO9ZNkN1NT97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmFk_H6M1tkD9NpL7mXac0oVSXdFfjxR5AjcLwGSebOiGBsFzzcw3xKxvyC_6CFFG_/IMG_4836.JPG', 2, 2),
    ('Remember to keep practicing! Its the only way to get better.', 'https://mahoganyspa.com/wp-content/uploads/2016/07/file-e1569004724437.jpg', 2, 2),
    ('Congrats to Micheal for the Lifespace promotion!', 'https://www.avepoint.com/blog/wp-content/uploads/2018/10/iStock-887882750.jpg', 3, 3),
    ('Purchasing my new car soon! If anyone has any recommendations, feel free to contact me soon!', 'https://www.motortrend.com/uploads/sites/11/2019/09/2020-Ford-Mustang-2.3-Liter-High-Performance-Package-1742.jpg?fit=around%7C875:492.1875', 3, 3),
    ('Just bought a brand new guitar! Ive been taking a few lessons, and im looking forward to going home and playing around with it!', 'https://images.reverb.com/image/upload/s--XYxFT68I--/f_auto,t_supersize/v1561649413/dtgagpc1e0jafze5pin3.jpg', 4, 4),
    ('Congrats to Micheal for the Lifespace promotion!', 'https://www.avepoint.com/blog/wp-content/uploads/2018/10/iStock-887882750.jpg', 3, 4),
    ('Just had an amazing night celebrating with come of my CBS coworkers. I love working here!', 'https://d1e00ek4ebabms.cloudfront.net/production/8669b7f0-b3bb-4c07-ad74-88af722d110b.jpg', 4, 4),
    ('Check out my new bass! My friend and I are starting a band soon!', 'https://guitar.com/wp-content/uploads/2019/01/fender-2019-precision-bass-hero@1400x1050.jpg', 5, 5),
    ('Man! I need to buy this new amp too.', 'https://media.guitarcenter.com/is/image/MMGS7//SVT-Bass-Amp-Half-Stack/481310000000000-00-1600x1600.jpg', 5, 5),
    ('Just bought a brand new guitar! Ive been taking a few lessons, and im looking forward to going home and playing around with it!', 'https://images.reverb.com/image/upload/s--XYxFT68I--/f_auto,t_supersize/v1561649413/dtgagpc1e0jafze5pin3.jpg', 4, 5),
    ('Planning a new show soon! Ive got to bring some new bands to my club!', 'https://www.quotemaster.org/images/cd/cdab8f22f1796b5b578acf48df8f4d4b.jpg', 6, 6),
    ('Tonight went so well! We had a full house! All the bands did a good job.', 'https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/11/fenway-music-venue-fb.jpg', 6, 6);