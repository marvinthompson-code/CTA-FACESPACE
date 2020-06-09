const db = require('../db/index')

const getLikesSinglePost = async (req, res, next) => {
    try {
        let { post_id } = req.params
        let likes = await db.any("SELECT * FROM posts JOIN LIKES ON posts.id = likes.post_id WHERE posts.id = $1", [post_id])
        res.status(200).json({
            status: "Successful",
            message: "Successfully retrieved likes for single post",
            body: {
                likes: likes
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not retrieve likes for single post"
        })
        next(error)
    }
}

const addSingleLike = async (req, res, next) => {
    try {
       let { liker_id, post_id } = req.params
       let like = await db.one("INSERT INTO likes (liker_id, post_id) VALUES ($1, $2) RETURNING *", [liker_id, post_id]) 
       res.status(200).json({
           status: "Successful",
           message: "Successfully added a single like",
           body: {
               like: like
           }
       })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not add a single like"
        })
        next(error)
    }
}

const deleteSingleLike = async (req, res, next) => {
    try {
        let { liker_id, post_id } = req.params
        let deleted = await db.one("DELETE FROM likes WHERE liker_id = $1 AND post_id = $2 RETURNING * ", [liker_id, post_id])
        res.status(200).json({
            status: "Successful",
            message: "Successfully deleted a like",
            body: {
                liker_id: liker_id,
                post_id: post_id,
                result: deleted
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not delete a like"
        })
        next(error);
    }
}

module.exports = { getLikesSinglePost, addSingleLike, deleteSingleLike }