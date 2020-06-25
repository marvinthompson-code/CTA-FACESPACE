import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { apiURL } from '../../util/apiURL';
import axios from 'axios'
import DummyPhoto from '../../css/profileImages/dummy-profile-pic.png'
import '../../css/Profile.css'

const Profile = () => {
    const match = useRouteMatch('/profile/:id')
    // console.log( id )
    // const user = useSelector(state => state.user)
    const [ username, setUsername ] = useState("")
    const [ currentUser, setCurrentUser ]= useState("")
    const [ bio, setBio ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ profilePicture, setProfilePicture ] = useState(null)
    // const [ userId, setUserId ] = useState(null)
    const API = apiURL()

    useEffect(() => {
            // debugger
            const fetchUserInfo = async (id) => {
                let res = await axios.get(`${API}/users/${id}`)
                let { bio, email, username, profile_picture } = res.data.body.singleUser
                setUsername(username)
                setBio(bio)
                setEmail(email)
                if (!profile_picture) {
                    setProfilePicture(DummyPhoto)
                } else {
                    setProfilePicture(profile_picture)
                }
            }
            fetchUserInfo(match.params.id)  
    }, [currentUser])
    
    return (
        <div>
            <div className={"ProfileInfo"}>
                <div className={"BasicInfo"}>
                <img src={profilePicture} alt={"Profile"} className={"ProfileImg"}/>
                <h5>User</h5>
                <h2>{username}</h2>
                <h3>{bio}</h3>
                </div>
                <div className={"contact"}>
                <h2>Contact</h2>
                <h3>{email}</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile;