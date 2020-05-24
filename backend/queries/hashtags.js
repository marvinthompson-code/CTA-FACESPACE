const db = require('../db/index')

const getAllHashtagsBySinglePost = async (req, res, next) => {
    try {
        let { post_id } = req.params
        let hashtags = await db.any("SELECT * FROM hashtags WHERE post_id=$1", [post_id])
        res.status(200).json({
            status: "Success",
            message: "Retrieved all Hashtags from single Post",
            body: {
                post_id: post_id,
                hashtags: hashtags
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Unable to retrieve hashtags from single post"
        })
        next(error)
    }
}

const insertHashtagsSinglePost = (req, res, next) => {
    try {
        let { post_id, owner_id } = req.params
        let { body } = req.body
        res.status(200).json({
            status: "Successful",
            message: "Successfully Inserted a Hashtag on a Post",
            body: {
                post_id: post_id,
                result: await db.one("INSERT INTO hashtags (owner_id, post_id, body) VALUES ($1, $2, $3) RETURNING *",
                [owner_id, post_id, body])
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not insert hashtag"
        })
        next(error)
    }
}

const deleteHashtagsSinglePost = (req, res, next) => {
    try {
        let { id, post_id, owner_id } = req.params
        res.status(200).json({
            status: "Successful",
            message: "Successfully removed a hashtag",
            body: {
                id: id,
                post_id: post_id,
                result: await db.one(
                    "DELETE FROM hashtags WHERE owner_id=$1 AND post_id=$2 AND id=3 RETURNING *", [owner_id, post_id, id]
                )
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not remove a hashtag"
        })
        next(error)
    }
}



module.exports = { getAllHashtagsBySinglePost, insertHashtagsSinglePost, deleteHashtagsSinglePost }