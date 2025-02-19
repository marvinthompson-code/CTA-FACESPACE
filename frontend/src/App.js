import React, { useEffect } from 'react';
import './App.css';
import Nav from './Nav'
import { Route, Switch, Redirect } from 'react-router-dom'
import { updateUser } from './features/user/userSlice'
import { onAuthStateChanged, getAuth } from "firebase/auth";
import EditProfilePicModal from './features/profile/EditProfilePicModal'
import Login from './features/login/Login'
import SignUp from './features/signup/SignUp'
import Profile from './features/profile/Profile'
import Feed from './features/feed/Feed'
import PostForm from './features/posts/PostForm'
import Posts from './features/profile/Posts'
import { ProtectedRoute, AuthRoute } from './util/routesUtil'
import { selectLoading } from './features/loading/loadingSlice';
import { useSelector, useDispatch } from 'react-redux'
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";


function App() {

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


  const auth = getAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(updateUser(user))
    })
    
    return unsubscribe
  }, [])
  
  const loading = useSelector(selectLoading)
  if (loading) return <div className="sweet-loading">
  <FadeLoader
    css={override}
    size={150}
    color={"#3F334D"}
    loading={loading}
  />
  <h1 style={{
    paddingLeft: "45%"
  }}>LOADING..</h1>
</div>

  return (
    <div className="App">
    <Nav/>
    <Switch>

    <Route exact path={"/"}>
      <Redirect to={"/login"}/>
    </Route>

    <ProtectedRoute path={"/feed"}>
      <PostForm/>
      <Feed/>
    </ProtectedRoute>

    <AuthRoute path={"/login"}>
      <Login/>
    </AuthRoute>

    <AuthRoute path={"/signup"}>
      <SignUp/>
    </AuthRoute>

    <ProtectedRoute exact path={"/profile/:id"}>
      <PostForm/>
      <Profile/>
      <EditProfilePicModal/>
      <Posts/>
    </ProtectedRoute>

    </Switch>
    </div>
  );
}

export default App;
