import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiURL } from '../../util/apiURL';
import axios from 'axios'
import DummyPhoto from '../../css/profileImages/dummy-profile-pic.png'
import '../../css/Profile.css'

const Profile = () => {
    const user = useSelector(state => state.user)
    const [ username, setUsername ] = useState("")
    const [ currentUser, setCurrentUser ]= useState("")
    const [ bio, setBio ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ profilePicture, setProfilePicture ] = useState(null)

    

    const API = apiURL()

    useEffect(() => {
        if (user) {
            const fetchUserInfo = async () => {
                let res = await axios.get(`${API}/users/${user.id}`)
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
            fetchUserInfo()
            
        }
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