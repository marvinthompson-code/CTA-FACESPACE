const db = require('../db/index');

const getAllUsers = async (req, res, next) => {
    try {
        let users = await db.any("SELECT * FROM users")
        res.status(200).json({
            status: "Success",
            message: "Retrieved Users",
            body: {
                users
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Could not get all users"
        });
        next(error)
    }
}

const createNewUser = async (req, res, next) => {
    try {
        let {email, username, full_name, profile_picture, bio, id} = req.body
        let user = await db.one("INSERT INTO users (email, username, full_name, profile_picture, bio, id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
        [email, username, full_name, profile_picture, bio, id]
        );
        res.status(200).json({
            status: "Success",
            message: "Created new User",
            user
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not create user"
        })
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let { id } = req.params
        let user = await db.one("DELETE FROM users WHERE id = $1 RETURNING * ",
        [id]       
        )
        res.status(200).json({
            status: "Successful",
            message: "Removed a user",
            body: {
                user
            }
        }) 
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not remove a user"
        })
        next(error)
    }
}

const getSingleUserById = async (req, res, next) => {
    try {
        let { id } = req.params
        let singleUser = await db.one("SELECT * FROM users WHERE id = $1", [id])
        res.status(200).json({
            status: "Successful",
            message: "Retrieved a user by ID",
            body: {
                singleUser
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not retrieve user by ID"
        })
        next(error)
    }
}

const getUserByName = async (req, res, next) => {
    try {
        let { username } = req.params 
        let user = await db.one("SELECT * FROM users WHERE username = $1", [username])
        if (user) {
            res.status(200).json({
                status: "Successful",
                message: "Retrieved user by name",
                body: {
                    user
                }
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not retrieve user by name"
        })
        next(error)
    }
}

const updateUserById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { full_name, bio, email } = req.body;
        let user = await db.one("UPDATE users SET full_name=$1, bio=$2, email=$3 WHERE id=$4 RETURNING *", [full_name, bio, email, id]);
        res.status(200).json({
            status: "Successful",
            message: "Successfully Updated a User by ID",
            body: {
                user
            }
        })
    } catch (error) {
        res.json(404).json({
            status: "Unsuccessful",
            message: "Could not update a User by ID"
        })
        next(error)
    }
}

const updateProfilePic = async (req, res, next) => {
    try {
        let { id } = req.params
        let { profile_picture } = req.body
        let user = await db.one("UPDATE users SET profile_picture = $1 WHERE id=$2 RETURNING *", [profile_picture, id])
        res.status(200).json({
            status: "Successful",
            message: `Profile Picture for user at id:${id} has been Updated!`,
            body: {
                user
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Unsuccessful",
            message: "Could not update user"
        })
        next(error)
    }
}

module.exports = { getAllUsers, createNewUser, deleteUser, getSingleUserById, getUserByName, updateUserById, updateProfilePic }