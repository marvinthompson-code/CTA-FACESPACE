const db = require('../db/index')

const getAllHashtags = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Retrieved all Hashtags",
            body: {
                hashtags: await db.any("")
            }
        })
    } catch (error) {
        
    }
}

module.exports = { getAllHashtags }