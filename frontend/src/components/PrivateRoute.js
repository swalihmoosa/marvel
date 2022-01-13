import React from 'react'
import {Redirect, Route} from 'react-router-dom'


export default function PrivateRoute({element:Element, ...rest}) {
    return (
        <Route {...rest} render={(props)=>{
            if (isLoggin){
                return <Element {...props} />
            }else{
                return <Redirect to={{pathname:'/auth/login'}} />
            }
        }}
        />
    )
}
