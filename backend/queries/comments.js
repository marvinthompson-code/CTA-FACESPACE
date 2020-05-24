const db = require('../db/index');

const getAllComments = async (req, res, next) => {
    try {
        let { post_id } = req.params;
        let comments = await db.any("SELECT comments.id, post_id, author_id, comment, time_stamp, username FROM comments INNER JOIN users ON users.id = comments.author_id WHERE post_id = $1 ORDER BY time_stamp DESC", [post_id])
        res.status(200).json({
            status: "Successful",
            message: "Successfully Retrieved all comments",
            body: {
                comments: comments
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not retrieve all comments"
        })
        next(error)
    }
}

const deleteAllComments = async (req, res, next) => {
    try {
        let { post_id, author_id } = req.params
        let deleted = await db.one(
            "DELETE FROM comments WHERE (post_id = $1, author_id = $2) RETURNING * ",
            [post_id, author_id]
        );
        res.status(200).json({
            status: "Successful",
            message: "Successfully deleted comments",
            body: {
                deleted: deleted
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not delete comments"
        })
        next(error)
    }
}

const addSingleComment = async (req, res, next) => {
    try {
        let { post_id, author_id } = req.params
        let { comment } = req.body 
        let new_comment = await db.one("INSERT INTO comments ( post_id, author_id, comment) VALUES ($1, $2, $3) RETURNING * ",
        [ post_id, author_id, comment]
        );
        res.status(200).json({
            status: "Successful",
            message: "Successfully added a new comment",
            body: {
                new_comment: new_comment
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not add a single comment"
        })
        next(error)
    }
}

const editSingleComment = async (req, res, next) => {
    try {
        let { post_id, author_id } = req.params
        let { comment } = req.body 
        let new_comment =  await db.one(
            "UPDATE comments SET comment =$1 WHERE (post_id =$2 AND author_id =$3) RETURNING *",
            [comment, post_id, author_id]
        );
        res.status(200).json({
            status: "Successful",
            message: "Edited a single comment",
            body: {
                new_comment: new_comment
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not edit a single comment"
        })
        next(error)
    }
}

const deleteSingleComment = async (req, res, next) => {
    try {
        let { id, post_id } = req.params
        let deleted_comment = await db.one(
            "DELETE FROM comments WHERE ( id = $1 AND post_id = $2 ) RETURNING *", [ id, post_id ]
        );
        res.status(200).json({
            status: "Success",
            message: "Successfully deleted a comment",
            body: {
                deleted_comment: deleted_comment
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not remove a single comment"
        })
    }
}

module.exports = { getAllComments, deleteAllComments, addSingleComment, editSingleComment, deleteSingleComment }