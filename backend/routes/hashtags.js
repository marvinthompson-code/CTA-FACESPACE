const hashtags = require('express').Router();

const {
    getAllHashtagsBySinglePost,
    insertHashtagsSinglePost,
    deleteHashtagsSinglePost
} = require('../queries/hashtags')

hashtags.get("/post/:post_id", getAllHashtagsBySinglePost);
hashtags.post("/:owner_id/post/:post_id", insertHashtagsSinglePost);
hashtags.delete("/post/:owner_id/:post_id/:id", deleteHashtagsSinglePost);

module.exports = hashtags;