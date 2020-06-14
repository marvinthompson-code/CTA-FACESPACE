 import React from 'react'
 import { Route, Redirect } from 'react-router-dom'
 import {  useSelector } from 'react-redux'

 export const AuthRoute = ({children, ...rest}) => {
    const user = useSelector(state => state.user)
    return (
         <Route 
            render={({location}) => {
                return !user ? children : <Redirect to="/feed"/>
            }}
         />
    )
 }

 export const ProtectedRoute = ({children, ...rest}) => {
    const user = useSelector(state => state.user)
    return (
         <Route 
            render={({location}) => {
                return user ? children : <Redirect to="/login"/>
            }}
         />
    )
 }