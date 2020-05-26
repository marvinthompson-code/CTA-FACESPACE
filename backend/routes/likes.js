const likes = require('express').Router();

const {
    getLikesSinglePost,
    addSingleLike,
    deleteSingleLike
} = require('../queries/likes')

likes.get("/post/:post_id", getLikesSinglePost);
likes.post("/post/:post_id/:liker_id", addSingleLike);
likes.delete("/:post_id/:liker_id", deleteSingleLike);

module.exports = likes;