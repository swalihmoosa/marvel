import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Characters from './components/screens/Characters';
import Character from './components/screens/Character';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/includes/Header';
import React, { useEffect, useState } from 'react';


export const UserContext = React.createContext();


function App() {
    const [userData, setUserData] = useState()

    useEffect(() =>{
        setUserData(JSON.parse(localStorage.getItem("user_data")))
    }, [])

    return (
        <UserContext.Provider value={userData}>
            <Router>
                <Header />
                <Routes>
                    <Route element={<PrivateRoute isLoggin={true} />}>
                        <Route exact path='/' element={<Characters/>}/>
                    </Route>
                    <Route element={<PrivateRoute isLoggin={false} />}>
                        <Route exact path='/character/:id' element={<Character />}/>
                    </Route>
                    {/* <Route path="/character/:id" element={<Character />} /> */}
                    <Route path="/login/" element={<Login />}/>
                    <Route path="/register/" element={<SignUp />}/>
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}

export default App;