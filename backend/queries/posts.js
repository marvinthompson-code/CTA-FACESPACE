const db = require('../db/index')

const getAllPosts = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Retrieved all Posts",
            body: {
                posts: await db.any("SELECT posts.id, owner_id, content, post_image_url, time_stamp, username, full_name FROM posts INNER JOIN users ON posts.owner_id = users.id ORDER BY posts.id DESC")
            }
        })
    } catch (error) {
        next(error)
    }
}
const insertNewPost = async (req, res, next) => {
    try {
        let { content, owner_id, post_image_url } = req.body
        let newPost = await db.one("INSERT INTO posts (content, owner_id, post_image_url) VALUES ($1, $2) RETURNING *",
        [content, owner_id, post_image_url]
        )
        res.status(200).json({
            status: "Successful",
            message: "Successfully created a new Post",
            body: {
                post: newPost
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
                post: post
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
        let { content, owner_id, post_image_url} = req.body;
        let newPost = await db.one("UPDATE posts SET content=$1, owner_id=$2, post_image_url=$3 WHERE id = $4 RETURNING *",
        [content, owner_id, post_image_url, id]
        );
        res.status(200).json({
            status: "Successful",
            message: "Successfully edited a Post",
            body: {
                post: newPost
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

const getAllPostsByHashtag = async (req, res, next) => {
    try {
        let { search } = req.params;
        res.status(200).json({
            status: "Successful",
            message: `Successfully gathered posts by Hashtag: ${search}`,
            body: {
                posts: await db.any(
                    "SELECT posts.owner_id AS post_owner, post_image_url, posts.content AS post_body, time_stamp, hashtags.id AS hashtag_id, hashtags.owner_id AS hashtag_owner, post_id, hashtags.body AS hashtag_body FROM posts INNER JOIN hashtags ON posts.id = hashtags.post_id WHERE hashtags.body LIKE $1", ['%' + search + '%']
                )
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not gather posts from this Hashtag"
        })
    }
}

const getAllPostsBySingleUser = async (req, res, next) => {
    try {
        let { id } = req.params; 
        let posts = await db.any("SELECT owner_id, post_image_url, content FROM posts INNER JOIN users ON posts.owner_id = users.id WHERE posts.owner_id = $1 ORDER BY posts.id DESC");
        res.status(200).json({
            status: "Successful",
            message: `Successfully Retrieved all Posts by User ID: ${id}`,
            body: {
                posts: posts
            }
        }); 
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not retrieve all posts by User"
        })
        next(error)
    }
}

const getSinglePost = async (req, res, next) => {
    try {
        let { id } = req.params
        let post = await db.one("SELECT FROM posts WHERE id = $1", [id])
        res.status(200).json({
            status: "Successful",
            message: `Successfully Retrieved a Single Post from User ID: ${id}`,
            body: {
                post: post
            }
        })  
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: `Could not Retrieve Single Post from User ID: ${id}`
        })
        next(error)  
    }
}
module.exports = { getAllPosts, insertNewPost, deletePost, editPost, getAllPostsByHashtag, getAllPostsBySingleUser, getSinglePost }