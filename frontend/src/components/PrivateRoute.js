import React from 'react'
import {Navigate, Outlet, Route} from 'react-router-dom'
import Characters from './screens/Characters';


export default function PrivateRoute({isLoggin, children, ...rest}) {
    console.log("jhsgdh");
    
    return (
        isLoggin ? <Outlet /> : <Navigate to={'/login'} />
    )
}
