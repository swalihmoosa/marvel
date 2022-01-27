import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export default function PrivateRoute() {
    const userData = JSON.parse(localStorage.getItem("user_data"))

    
    return (
        userData ? <Outlet /> : <Navigate to={'/login'} />
    )
}
