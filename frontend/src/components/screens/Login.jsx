import React, {useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../../App";


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const {updateUserData} = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        setMessage("")
        e.preventDefault();
        axios
        .post(`http://localhost:8000/api/token/`, {username,password})
        .then((response) => {
            let user_data = response.data
            localStorage.setItem("user_data", JSON.stringify(user_data))
            updateUserData({
                type : "LOGIN",
                payload : user_data
            })
            navigate("/")
        })
        .catch((error) => {
            console.log(error);
            setMessage("No active account found for given Credentials")
        });
    }

        return (
            <>
                <div className="login">
                    <div className="log">
                        <Link to={`/login/`} className="log"> sign in </Link>
                        <Link to={`/register/`} className="log"> sign up </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="text" name="username" onChange={(e) => setUsername(e.target.value) } value={username} />
                        <p className="span">username</p>
                        <br />
                        <br />
                        <input type="password" className="text" name="password" onChange={(e) => setPassword(e.target.value) } value={password} />
                        <p className="span">password</p>
                        <br />
                        <input type="checkbox" id="checkbox-1-1" className="custom-checkbox" name="keep_signin" />
                        <label>Keep me Signed in</label>    
                        <button className="signin">Sign In</button>
                        <br />
                        {message && <ErrorMessage>{message}</ErrorMessage>}
                        <hr />
                    </form>
                </div>
            </>
        );
}

const ErrorMessage = styled.p`
    font-size:17px;
    color:red;
    margin-bottom:25px;
    text-align:center;
`