import React, {useEffect, useState } from "react";
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
    const [allCharacters, setAllCharacters] = useState([]);
    const [characterShow, setCharacterShow] = useState(false);
    const [searchCharacterId, setSearchCharacterId] = useState("");

    const [comics, setComics] = useState([]);
    const [allComics, setAllComics] = useState([]);
    const [comicShow, setComicShow] = useState(false);
    const [searchComicId, setSearchComicId] = useState("");

    useEffect(() => {
        axios
            .get(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
            .then((response) => {
                setCharacters(response.data.data.results);
                setAllCharacters(response.data.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(`https://gateway.marvel.com/v1/public/comics?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
            .then((response) => {
                setComics(response.data.data.results);
                setAllComics(response.data.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderCharacters = () => {
        return characters.map((character) => (
            <CharacterCard key={character.id} className={characterShow ? 'show' : 'hide'} >
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

    const renderComics = () => {
        return comics.map((comic) => (
            <CharacterCard key={comic.id} className={comicShow ? 'show' : 'hide'} >
                <CharacterCardLink to={`/comic/${comic.id}/`}>
                    <CharacterImageContainer>
                        <CharacterImage src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="Image" />
                    </CharacterImageContainer>
                    <CharacterBottomContainer>
                        <CharacterTitle>{comic.title}</CharacterTitle>
                    </CharacterBottomContainer>
                </CharacterCardLink>
            </CharacterCard>
        ));
    };


    const characterSubmit = (e) =>{
        e.preventDefault();
        console.log("jhgdhf");

        axios
        .get(`https://gateway.marvel.com:443/v1/public/characters/${searchCharacterId}?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
        .then((response) => {
            setCharacters(response.data.data.results);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const comicSubmit = (e) =>{
        e.preventDefault();

        axios
        .get(`https://gateway.marvel.com:443/v1/public/comics/${searchComicId}?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
        .then((response) => {
            setComics(response.data.data.results);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Helmet>
                <title>Marvel Characters</title>
            </Helmet>
            <TopContainer>
                <Heading>Welcome </Heading>
                <Paragraph>Explore the Famous Marvel Characters</Paragraph>
            </TopContainer>

            <Form onSubmit={(e)=>{e.preventDefault()}}>
                <Search type="text" placeholder="Search your Characters using id..! try 1017100" onChange={ (e) => { setSearchCharacterId(e.target.value) } } />
                <Go type="submit" value="Go" onClick={characterSubmit} />
                <Clear onClick={()=>{setCharacters(allCharacters)}} >Clear</Clear>
            </Form>

            <CharactersContainer>{renderCharacters()}</CharactersContainer>
            <Load onClick={() => {setCharacterShow(characterShow => !characterShow)}} >{characterShow ? 'Load Less':'Load More'}</Load>

            <Comicparagraph>Explore the Famous Marvel Comics</Comicparagraph>

            <Form onSubmit={(e)=>{e.preventDefault()}} >
                <Search type="text" placeholder="Search your Comics using id..! try 3627" onChange={ (e) => { setSearchComicId(e.target.value) } } />
                <Go type="submit" value="Go" onClick={comicSubmit} />
                <Clear onClick={()=>{setComics(allComics)}} >Clear</Clear>
            </Form>

            <CharactersContainer>{renderComics()}</CharactersContainer>
            <Load onClick={() => {setComicShow(comicShow => !comicShow)}}  >{comicShow ? 'Load Less':'Load More'}</Load>

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
    margin-bottom: 35px;
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
const Load = styled.button`
    background: #faa635;
    border-radius: 3px;
    color: white;
    display: inline-block;
    padding: 10px 30px;
    transition: all 0.25s ease-out;
    margin-left: 10%;
    font-weight: 900;
    margin-bottom: 100px;
`
const Comicparagraph = styled.p`
    font-size: 22px;
    color: #9292ed;
    font-weight: 900;
    width: 90%;
    margin: 0 auto ;
    margin-bottom: 35px;
`;
const Form = styled.form`
    width: 50%;
    margin: 0 auto;
    padding:0;
`;
const Search = styled.input`
    width: 65%;
    height: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    border: 3px solid #857e7e;
    &:focus{
        color:#000;
    }
`;
const Go = styled.input`
    width: 15%;
    height: 100%;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    background: #046bf6;
    color:#fff;
    font-weight:900;
    margin-left: 20px;

`;
const Clear = styled.button`
    width: 15%;
    height: 100%;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    background: #046bf6;
    color:#fff;
    font-weight:900;
    margin-left: 20px;

`;

