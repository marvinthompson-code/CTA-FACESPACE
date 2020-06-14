import React, { useState } from 'react';
import '../../css/Login.css'
import { updateUser } from '../user/userSlice'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { login } from '../../util/firebaseFunctions'
import LogoBlack from '../../css/logos/LogoMakr_0FIbYG.png'

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null)

    const history = useHistory();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await login(email, password)
            dispatch(updateUser(res.user))
            history.push("/feed")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={"loginForm"}>
            <img src={LogoBlack} alt={"logo"}></img> 
            {error ? <div>{error}</div> : null }
            <form onSubmit={handleSubmit} className={"login"}>
                <input className={"username"}placeholder={"email"} value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                <br></br>
                <input placeholder={"password"} value={password} onChange={(e) => setPassword(e.currentTarget.value)} type={"password"}/>
                <br></br>
                <button className={"submitButton"} type={"submit"}>Log In</button>
            </form>
            <NavLink to={"/signup"} activeClassName={"navItem"}>Sign Up</NavLink>
        </div>
    )
}

export default Login;