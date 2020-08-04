import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { apiURL } from '../../util/apiURL';
import FadeIn from 'react-fade-in';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toggleModalState } from '../modal/modalSlice'
import DummyPhoto from '../../css/profileImages/dummy-profile-pic.png'
import '../../css/Profile.css'

const Profile = () => {
    const match = useRouteMatch('/profile/:id')
    const [ username, setUsername ] = useState("")
    const [ currentUser, setCurrentUser ]= useState("")
    const [ bio, setBio ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ profilePicture, setProfilePicture ] = useState(null)
    const API = apiURL()
    const dispatch = useDispatch()

    useEffect(() => {
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
            <FadeIn transitionDuration={600}>
            <div className={"ProfileInfo"}>
                <div className={"BasicInfo"}>
                <img src={profilePicture} alt={"Profile"} className={"ProfileImg"} onClick={() => dispatch(toggleModalState())}/>
                <h5>User</h5>
                <h2>{username}</h2>
                <h3>{bio}</h3>
                </div>
                <div className={"contact"}>
                <h2>Contact</h2>
                <h3>{email}</h3>
                </div>
            </div>
            </FadeIn>
        </div>
    )
}

export default Profile;