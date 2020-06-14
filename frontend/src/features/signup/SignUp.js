import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, NavLink } from 'react-router-dom';
import { updateUser } from '../user/userSlice'
import { useDispatch } from 'react-redux'
import { apiURL } from '../../util/apiURL';
import { signUp } from '../../util/firebaseFunctions'
import '../../css/SignUp.css'

const SignUp = () => {
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const [ bio, setBio ] = useState("")

    const API = apiURL();
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await signUp(email, password);
            console.log("Show user", res)
            await axios.post(`${API}/users/addUser`,{
                id: res.user.uid,
                username,
                password,
                fullName,
                email,
                bio
            })
            dispatch(updateUser(res.user))
            history.push("/feed")   
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    return (
        <div>
            <h2>Sign Up!</h2>
            <ul className={"signupInfo"}>
                <li className={"info"}>Connect with friends and Loved ones!</li>
                <li className={"info"}>Make a custom Profile!</li>
            </ul>
            <form onSubmit={handleSubmit} className={"SignUp"}>
            {error ? <div>{error}</div> : null}
                <input placeholder={"Full Name"} value={fullName} onChange={(e) => setFullName(e.currentTarget.value)} required></input>
                <br></br>
                <input placeholder={"Email"} value={email} onChange={(e) => setEmail(e.currentTarget.value)} required></input>
                <br></br>
                <input placeholder={"username"} value={username} onChange={(e) => setUsername(e.currentTarget.value)} required></input>
                <br></br>
                <input placeholder={"password"} type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required></input>
                <br></br>
                <input placeholder={"Add a short bio!"} value={bio} onChange={(e) => setBio(e.currentTarget.value)}></input>
                <br></br>
                <button className={"submitButton"}type={"submit"}>Sign me up!</button>
            </form>

            <NavLink to={"/login"} activeClassName={"navItem"}>Back to Login</NavLink>
        </div>
    )
}

export default SignUp;