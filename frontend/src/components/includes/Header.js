import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {

    return (
        <HeaderContainer>
            <Logo
                src={require("../assets/images/marvel-phone-nawpic.jpg").default}
                alt="Logo"
            />
            <RightContainer>
                <LoginButton to={`/login/`}>Logout</LoginButton>
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
`;
const Logo = styled.img`
    width: 150px;
    display: block;
`;
const RightContainer = styled.div`
    display: flex;
    align-items: center;
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
`;

export default Header;
