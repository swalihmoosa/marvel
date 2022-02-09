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

    const [isClicked, setIsClicked] = useState(true)

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
        console.log("characterSubmit");
        setSearchCharacterId("")

        if (searchCharacterId == []){
            alert("Enter a valid Character Id")
        }
        else{
            axios
            .get(`https://gateway.marvel.com:443/v1/public/characters/${searchCharacterId}?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
            .then((response) => {
                setCharacters(response.data.data.results);
            })
            .catch((error) => {
                console.log(error);
                alert("Enter a valid Character Id")

            });
        }
        
    }

    const comicSubmit = (e) =>{
        e.preventDefault();
        console.log("comicSubmit");
        setSearchComicId("")
        
        if (searchComicId == []){
            alert("Enter a valid Comic Id")
        }else{
            axios
            .get(`https://gateway.marvel.com:443/v1/public/comics/${searchComicId}?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
            .then((response) => {
                setComics(response.data.data.results);
            })
            .catch((error) => {
                console.log(error);
                alert("Enter a valid Comic Id")
            });
        }

    }

    return (
        <>
            <Helmet>
                <title>Marvel Characters</title>
            </Helmet>
            <TopContainer>
                <Heading>Welcome </Heading>
                <Paragraph>{ isClicked ? "Explore the Famous Marvel Characters" : "Explore the Famous Marvel Comics"}</Paragraph>
            </TopContainer>

            <LoadContainer>
                <LoadCharacter onClick={() => {setIsClicked(true)}} className={ isClicked ? 'true' : '' } >Characters</LoadCharacter>
                <LoadComic onClick={() => {setIsClicked(false)}} className={ isClicked ? '' : 'true' } >Comics</LoadComic>
            </LoadContainer>

            <Form onSubmit={(e)=>{e.preventDefault()}} id="submit" >
                <Search type="text" placeholder={ isClicked ? "Search your Characters using id..! try 1017100" : "Search your Comics using id..! try 3627"} 
                value={ isClicked ? searchCharacterId : searchComicId} 
                onChange={ (e) => { isClicked ? setSearchCharacterId(e.target.value) : setSearchComicId(e.target.value) } } />
                <Go type="submit" value="Go" onClick={ isClicked ? characterSubmit : comicSubmit} />
                <Clear onClick={()=>{ isClicked ? setCharacters(allCharacters) : setComics(allComics) }} >Clear</Clear>
            </Form>

            <CharactersContainer>{ isClicked ? renderCharacters() : renderComics()}</CharactersContainer>
            <Load onClick={() => { isClicked ? setCharacterShow(characterShow => !characterShow) : setComicShow(comicShow => !comicShow)}} >
                { isClicked ? characterShow ? 'Load Less':'Load More' : comicShow ? 'Load Less':'Load More'}</Load>

        </>
    );
}

const TopContainer = styled.div`
    width: 90%;
    margin: 100px auto 0;
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
const Heading = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: 900;
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
const Paragraph = styled.p`
    font-size: 22px;
    color: #9292ed;
    font-weight: 900;
    margin-bottom: 35px;
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
const CharactersContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 50px auto 0;
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
const CharacterCard = styled.li`
    width: 23.5%;
    margin-right: 2%;
    margin-bottom: 25px;
    &:nth-child(4n) {
        margin-right: 0;
    }

    @media all and (max-width: 1280px){
        width:31%;
        &:nth-child(3n) {
            margin-right: 0;
        }
        &:nth-child(4n) {
            margin-right: 2%;
        }
    }
    @media all and (max-width: 980px){
        width:49%;
        &:nth-child(3n) {
            margin-right: 2%;
        }
        &:nth-child(2n) {
            margin-right: 0;
        }
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
const CharacterCardLink = styled(Link)`
    display: block;
    appearance: none;
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
const CharacterImageContainer = styled.div``
const CharacterImage = styled.img`
    width: 100%;
    display: block;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 400px;
    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
        height: 200px;
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
`;
const CharacterBottomContainer = styled.div`
    padding: 10px 15px;
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
const CharacterTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 20px;
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
// const Comicparagraph = styled.p`
//     font-size: 22px;
//     color: #9292ed;
//     font-weight: 900;
//     width: 90%;
//     margin: 0 auto ;
//     margin-bottom: 35px;
//     @media all and (max-width: 1280px){
//     }
//     @media all and (max-width: 980px){
//     }
//     @media all and (max-width: 768px){
//     }100%
//     @media all and (max-width: 640px){
//     }
//     @media all and (max-width: 480px){
//     }
//     @media all and (max-width: 360px){
//     }
// `;
const Form = styled.form`
    width: 50%;
    margin: 0 auto;
    padding:0;
    @media all and (max-width: 1280px){
        width: 85%;
    }
    @media all and (max-width: 980px){
        width: 90%;
        display: flex;
        justify-content: space-between;
    }
    @media all and (max-width: 768px){
        flex-wrap:wrap;
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
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
    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
        width:100%;
        margin-bottom:10px;
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
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

    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
        margin-left:auto;
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
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

    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
        margin-right:auto;
    }
    @media all and (max-width: 640px){
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
`;
const LoadContainer = styled.div`
    display: flex;
    width: 30%;
    margin: 0 auto;
    margin-bottom: 25px;
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
const LoadCharacter = styled.button`
    background: #fbdaae;
    border : 2px solid faa635;
    border-radius: 3px;
    color: #faa635;
    display: inline-block;
    padding: 10px 30px;
    transition: all 0.25s ease-out;
    font-weight: 900;
    margin-left: auto;
    margin-right: 20px;

    &.true{
        background : #faa635;
        color : white;
    }
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
const LoadComic = styled.button`
    background: #fbdaae;
    border-radius: 3px;
    color: #faa635;
    display: inline-block;
    padding: 10px 30px;
    transition: all 0.25s ease-out;
    font-weight: 900;
    margin-right: auto;

    &.true{
        background : #faa635;
        color: #fff;
    }
`

