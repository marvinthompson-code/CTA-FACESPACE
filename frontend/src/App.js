import React, { useEffect } from 'react';
import './App.css';
import Nav from './Nav'
import { Route, Switch, Redirect } from 'react-router-dom'
import { updateUser } from './features/user/userSlice'
import firebase from './firebase'
import EditProfilePicModal from './features/profile/EditProfilePicModal'
import Login from './features/login/Login'
import SignUp from './features/signup/SignUp'
import Profile from './features/profile/Profile'
import Feed from './features/feed/Feed'
import PostForm from './features/posts/PostForm'
import Posts from './features/profile/Posts'
import { AuthRoute, ProtectedRoute } from './util/routesUtil'
import { selectLoading } from './features/loading/loadingSlice';
import { useSelector, useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      dispatch(updateUser(user))
    })
    
    return unsubscribe
  }, [])
  
  const loading = useSelector(selectLoading)
  if (loading) return <div className={"Loading"}>LOADING</div>

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
      <Profile/>
      <PostForm/>
      <EditProfilePicModal/>
      <Posts/>
    </ProtectedRoute>

    </Switch>
    </div>
  );
}

export default App;
