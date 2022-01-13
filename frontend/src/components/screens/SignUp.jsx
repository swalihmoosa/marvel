import axios from "axios";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        setMessage("")
        e.preventDefault();
        axios
        .post(``, {username , email, password, confirm})
        .then((response) => {
            console.log(response);
            let data = response
            // localStorage.setItem("user_data", JSON.stringify(data))
            // navigate("/auth/login")
        })
        .catch((error) => {
            console.log(error);
            setMessage("Account was not Created")
        });
    }

        return (
            <>
                <div class="login">
                    <div class="log">
                        <Link to={`/auth/login/`} className="log"> sign in </Link>
                        <Link to={`/auth/register/`} className="log"> sign up</Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" class="text" name="username" onChange={(e) => setUsername(e.target.value) } value={username} />
                        <p className="span">username</p>
                        <br />
                        <input type="email" class="text" name="email" onChange={(e) => setEmail(e.target.value) } value={email} />
                        <p className="span">email</p>
                        <br />
                        <input type="password" class="text" name="confirm_password" onChange={(e) => setPassword(e.target.value) } value={password} />
                        <p className="span">password</p>
                        <br />
                        <input type="password" class="text" name="password" onChange={(e) => setConfirm(e.target.value) } value={confirm} />
                        <p className="span">confirm password</p>
                        <br />
                        <button class="signin">Sign Up</button>
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