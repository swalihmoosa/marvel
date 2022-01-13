import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        setMessage("")
        e.preventDefault();
        axios
        .post(``, {username , password})
        .then((response) => {
            console.log(response);
            let data = response
            localStorage.setItem("user_data", JSON.stringify(data))
            navigate("/")
        })
        .catch((error) => {
            console.log(error);
            setMessage("No active account found for given Credentials")
        });
    }

        return (
            <>
                <div class="login">
                    <div class="log">
                        <Link to={`/auth/login/`} className="log"> sign in </Link>
                        <Link to={`/auth/register/`} className="log"> sign up </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" class="text" name="username" onChange={(e) => setUsername(e.target.value) } value={username} />
                        <p className="span">username</p>
                        <br />
                        <br />
                        <input type="password" class="text" name="password" onChange={(e) => setPassword(e.target.value) } value={password} />
                        <p className="span">password</p>
                        <br />
                        <input type="checkbox" id="checkbox-1-1" class="custom-checkbox" name="keep_signin" />
                        <label for="checkbox-1-1">Keep me Signed in</label>    
                        <button class="signin">Sign In</button>
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