import axios from "axios";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        setMessage("")
        e.preventDefault();
        axios
        .post(`http://localhost:8000/api/register/`, {username , email, password})
        .then(()=>{
            navigate("/login")
        }
        )
        .catch((error) => {
            console.log(error);
            setMessage("Account was not Created...! Username or Email already exist...!")
        });
    }

        return (
            <>
                <div className="signup">
                    <div className="log">
                        <Link to={`/login/`} className="log"> sign in </Link>
                        <Link to={`/register/`} className="log"> sign up</Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="text" name="username" onChange={(e) => setUsername(e.target.value) } value={username} />
                        <p className="span">username</p>
                        <br />
                        <input type="email" className="text" name="email" onChange={(e) => setEmail(e.target.value) } value={email} />
                        <p className="span">email</p>
                        <br />
                        <input type="password" className="text" name="password" onChange={(e) => setPassword(e.target.value) } value={password} />
                        <p className="span">password</p>
                        <br />
                        <br />
                        <button className="signin">Sign Up</button>
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