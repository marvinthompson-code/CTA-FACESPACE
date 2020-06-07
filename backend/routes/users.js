const users = require('express').Router();
const { checkFirebaseToken } = require('../middleware/auth')

const {
    getAllUsers,
    createNewUser,
    deleteUser,
    getSingleUserById,
    getUserByName,
    updateUserById,
    updateProfilePic
} = require('../queries/users');

users.get("/", getAllUsers);
users.get("/:id", getSingleUserById); 
users.get("/search/:username", getUserByName);
users.post("/addUser", createNewUser);
users.patch("/:id", updateUserById);
users.patch("/profile_Pic/:id", updateProfilePic);
users.delete("/:id", deleteUser);

module.exports = users;