DROP DATABASE IF EXISTS face_space_db;
CREATE DATABASE face_space_db; 

\c face_space_db;

DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS hashtags;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE,
    username VARCHAR,
    password VARCHAR,
    full_name VARCHAR,
    profile_picture VARCHAR,
    bio VARCHAR
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    content VARCHAR,
    time_stamp TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    comment VARCHAR,
    time_stamp TIMESTAMP
);

CREATE TABLE hashtags (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    body VARCHAR
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    liker_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE, 
    CONSTRAINT UC_like UNIQUE(liker_id, post_id)
);
