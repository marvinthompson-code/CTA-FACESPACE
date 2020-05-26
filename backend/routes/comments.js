const comments = require('express').Router();

const {
    getAllComments,
    deleteAllComments,
    addSingleComment,
    editSingleComment,
    deleteSingleComment
} = require('../queries/comments')

comments.get("/post/:post_id", getAllComments);
comments.post("/post/:post_id/:author_id", addSingleComment);
comments.patch("/:post_id/:author_id", editSingleComment);
comments.delete("/:id/:post_id", deleteSingleComment);
comments.delete("/post/:post_id/author/:author_id", deleteAllComments);

module.exports = comments;