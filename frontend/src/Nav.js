import React from 'react'
import { NavLink, useHistory, Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './features/user/userSlice'
import LogoWhite from './css/logos/LogoMakr_4YcV9W.png'
import './css/Nav.css'

const Nav = () => {   
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const displayButtons = () => {
        if (user) {
            return(
                <>
                <button onClick={handleClick}>Log Out</button>
                <NavLink to={"/feed"} activeClassName={"navItem"}>Feed</NavLink>
                <NavLink to={"/profile"} activeClassName={"navItem"}>Profile</NavLink>
                </>
            )
        } else {
             return (
                 <>
             <NavLink to={"/login"} activeClassName={"navItem"}>Log In</NavLink>
             <NavLink to={"/signup"} activeClassName={"navItem"}>Sign up</NavLink>
             </> 
             )
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        history.push("/login")
        dispatch(logout())
    }

    
    return (
        <nav className={"nav"}>
            <img src={LogoWhite} alt="White Logo" onClick={() => history.push("/feed")} className={"logo"}></img>  
            {displayButtons()}   
        </nav>
    )
}

export default Nav;