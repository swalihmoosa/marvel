// import React from 'react'
// import {Navigate, Route} from 'react-router-dom'


// export default function PrivateRoute({element:Element, ...rest}) {
//     const user_data = JSON.parse(localStorage.getItem("user_data"));

//     return (
//         <Route {...rest} render={(props)=>{
//             if (user_data){
//                 return <Element {...props} />
//             }else{
//                 return <Navigate to={{pathname:'/auth/login'}} />
//             }
//         }}
//         />
//     )
// }
