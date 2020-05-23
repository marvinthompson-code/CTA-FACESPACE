const posts = require('express').Router();

const {
    getAllPosts
} = require('../queries/posts')

posts.get("/", getAllPosts)

module.exports = posts;