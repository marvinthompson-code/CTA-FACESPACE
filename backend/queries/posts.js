const db = require('../db/index')

const getAllPosts = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Retrieved all Posts",
            body: {
                posts: await db.any("SELECT posts.id, owner_id, content, time_stamp, username, full_name FROM posts INNER JOIN users ON posts.owner_id = users.id ORDER BY posts.id DESC")
            }
        })
    } catch (error) {
        next(error)
    }
}
const insertNewPost = async (req, res, next) => {
    try {
        let { content, owner_id } = req.body
        let newPost = await db.one("INSERT INTO posts (owner_id, content) VALUES ($1, $2) RETURNING *",
        [content, owner_id]
        )
        res.status(200).json({
            status: "Successful",
            message: "Successfully created a new Post",
            body: {
                newPost
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Unable to create new Post"
        })
        next(error)
    }
}


const deletePost = async (req, res, next) => {
    try {
        let { id } = req.params
        let post = await db.one("DELETE FROM posts WHERE id = $1 RETURNING *", [id])
        res.status(200).json({
            status: "Successful",
            message: "Successfully deleted a post!",
            body: {
                post
            }
        });     
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not delete a post"
        })
        next(error)
    }
}

const editPost = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { content, owner_id } = req.body;
        let newPost = await db.one("UPDATE posts SET content=$1, owner_id=$2 WHERE id = $3 RETURNING *",
        [content, owner_id, id]
        );
        res.status(200).json({
            status: "Successful",
            message: "Successfully edited a Post",
            body: {
                newPost
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not edit a post"
        })
        next(error)
    }  
}

module.exports = { getAllPosts, insertNewPost, deletePost, editPost}