import React, {useContext} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../assets/images/favicon.ico"

function Header() {
    const {userData, updateUserData} = useContext(UserContext)

    const handleLogout = () =>{
        updateUserData({
            type : "LOGOUT"
        })
    }

    return (
        <HeaderContainer>
            <LogoContainer>
                <Link to={`/`} >
                    <Logo
                        src={logo}
                        alt="Logo"
                    />
                </Link>
            </LogoContainer>
            <RightContainer>
                {userData? (
                        <LoginButton to={`/login/`} onClick={()=> handleLogout() } >Logout</LoginButton>
                    ) : (
                        <LoginButton to={`/login/`}>Login</LoginButton>
                    )
                }
            </RightContainer>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
`;
const LogoContainer = styled.div`
    width: 65px;
`
const Logo = styled.img`
    width: 100%;
    display: block;
    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
`;
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
`;
const LoginButton = styled(Link)`
    background: #046bf6;
    border-radius: 4px;
    padding: 13px 45px;
    color: #fff;
    font-size: 18px;
    border-radius: 4px;
    font-weight: bold;
    text-decoration:none;
    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
`;

export default Header;
