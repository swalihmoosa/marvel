import React from 'react'
import {Navigate, Route} from 'react-router-dom'
import Characters from './screens/Characters';


export default function PrivateRoute({isLoggin}) {
    console.log("jhsgdh");
    
    return (
        // <Route {...rest}>{children}</Route>
        isLoggin ? <Characters /> : <Navigate to={'/login'} />
    )
}
