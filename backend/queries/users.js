const db = require('../db/index');

const getAllUsers = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "Retrieved Users",
            body: {
                users: await db.any("SELECT * FROM users")
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
        let {email, username, password, full_name, profile_picture, bio } = req.body
        let user = await db.one("INSERT INTO users (email, username, password, full_name, profile_picture, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
        [email, username, password, full_name, profile_picture, bio]
        );
        res.status(200).json({
            statsu: "Success",
            message: "Created new User",
            body: user
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
                user: user
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
        let singleUser = await db.one("SELECT FROM users WHERE id = $1", [id])
        res.status(200).json({
            status: "Successful",
            message: "Retrieved a user by ID",
            body: {
                user: singleUser
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
        let user = await db.one("SELECT FROM users WHERE username = $1", [username])
        console.log(user)
        if (user) {
            res.status(200).json({
                status: "Successful",
                message: "Retrieved user by name",
                body: {
                    user: user
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
                user: user
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
        let user = await db.one("UPDATE users SET profile_picture = $1 WHERE id=$2", [profile_picture, id])
        res.status(200).json({
            status: "Successful",
            message: `Profile Picture for user at id:${id} has been Updated!`,
            body: {
                user: user
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