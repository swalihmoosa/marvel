import React, { useContext } from 'react'
import {Navigate, Outlet, Route} from 'react-router-dom'
import { UserContext } from '../App'


export default function PrivateRoute() {
    const userData = JSON.parse(localStorage.getItem("user_data"))

    
    return (
        userData ? <Outlet /> : <Navigate to={'/login'} />
    )
}
