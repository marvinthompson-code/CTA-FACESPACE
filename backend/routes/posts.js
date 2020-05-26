const posts = require('express').Router();

const {
    getAllPosts,
    insertNewPost,
    deletePost,
    editPost,
    getAllPostsByHashtag,
    getAllPostsBySingleUser,
    getSinglePost
} = require('../queries/posts')

posts.get("/", getAllPosts);
posts.get("/:id", getSinglePost);
posts.get("/hashtag/:search", getAllPostsByHashtag);
posts.get("/ownerID/:owner_id", getAllPostsBySingleUser);
posts.patch("/:id", editPost);
posts.delete("/:id", deletePost);
posts.post("/", insertNewPost);

module.exports = posts;