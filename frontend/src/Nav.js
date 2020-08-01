import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, asyncLogout } from './features/user/userSlice'
import { recieveToken } from './features/user/tokenSlice'
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
                <NavLink to={"/feed"} activeClassName={"navItem"}>Feed</NavLink>
                <NavLink exact to={`/profile/${user.id}`} activeClassName={"navItem"}>Profile</NavLink>
                <button onClick={handleClick}>Log Out</button>
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
        dispatch(asyncLogout())
        dispatch(recieveToken(null))
        history.push("/login")
    }

    
    return (
        <nav className={"nav"}>
            <img src={LogoWhite} alt="White Logo" onClick={() => history.push("/feed")} className={"logo"}></img>  
            {displayButtons()}   
        </nav>
    )
}

export default Nav;