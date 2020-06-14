import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiURL } from '../../util/apiURL';
import axios from 'axios'

const ProfileResults = () => {

    const [ username, setUsername ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ profilePicture, setProfilePicture ] = useState(null)

    const { name } = useParams()
    const API = apiURL()

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                let res = await axios.get(`${API}/users/search/${name}`) 
                debugger

            } catch (error) {
                console.log(error)
            }
        }
        fetchUserInfo()
    }, [])

    return (
        <div>
            This is a results page for the individual profile
        </div>
    )
}

export default ProfileResults