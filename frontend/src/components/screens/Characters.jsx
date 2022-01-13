import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

// https://gateway.marvel.com:443/v1/public/characters?apikey=f7a9b0d8dfa07041696a04e6df7da8c2

// private_key = afb5f26802a4cb2f068d300208dd915849459dc7

// public_key = f7a9b0d8dfa07041696a04e6df7da8c2

// ts = 1

// 1afb5f26802a4cb2f068d300208dd915849459dc7f7a9b0d8dfa07041696a04e6df7da8c2

// hash = 6c8619175e88472183b745e1dfd021c9


export default function Characters() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios
            .get(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
            .then((response) => {
                console.log(response.data.data.results);
                setCharacters(response.data.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderCharacters = () => {
        return characters.map((character) => (
            <CharacterCard key={character.id} >
                <CharacterCardLink to={`/character/${character.id}/`}>
                    <CharacterImageContainer>
                        <CharacterImage src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="Image" />
                    </CharacterImageContainer>
                    <CharacterBottomContainer>
                        <CharacterTitle>{character.name}</CharacterTitle>
                    </CharacterBottomContainer>
                </CharacterCardLink>
            </CharacterCard>
        ));
    };

    return (
        <>
            <Helmet>
                <title>Marvel Characters</title>
            </Helmet>
            <TopContainer>
                <Heading>Welcome</Heading>
                <Paragraph>Explore the Famous Marvel Characters</Paragraph>
            </TopContainer>

            <CharactersContainer>{renderCharacters()}</CharactersContainer>
            <PaginationContainer></PaginationContainer>
        </>
    );
}

const TopContainer = styled.div`
    width: 90%;
    margin: 100px auto 0;
`;
const Heading = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: 900;
`;
const Paragraph = styled.p`
    font-size: 22px;
    color: #9292ed;
    font-weight: 900;
`;
const CharactersContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 50px auto 0;
`;
const CharacterCard = styled.li`
    width: 23.5%;
    margin-right: 2%;
    margin-bottom: 25px;
    &:nth-child(4n) {
        margin-right: 0;
    }
`;
const CharacterCardLink = styled(Link)`
    display: block;
    appearance: none;
    text-decoration:none;
`;
const CharacterImageContainer = styled.div``
const CharacterImage = styled.img`
    width: 100%;
    display: block;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 400px;
`;
const CharacterBottomContainer = styled.div`
    padding: 10px 15px;
`;
const CharacterTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 20px;
`;
const PaginationContainer = styled.div`
    width: 90%;
    margin: 50px auto 0;
`;
