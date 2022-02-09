import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import { useParams } from "react-router";

export default function Character() {
    const [characters, setCharacters] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        axios
            .get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
            .then((response) => {
                setCharacters(response.data.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderCharacters = () => {
        return characters.map((character) => (
            <MainContainer key={character.id} >
                <Title>{character.name}</Title>
                <InfoContainer>
                    <CategoryName>
                        {character.modified}
                    </CategoryName>
                </InfoContainer>
                <Item>
                    <DescriptionContainer>
                        {character.description}
                    </DescriptionContainer>
                    <GalleryImageItem>
                        <GalleryImage src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="Image" />
                    </GalleryImageItem>
                    <ItemContainer>
                        <SubHeading>Comic Items</SubHeading>
                        {character.comics.items.map((item) => (
                            <GalleryItem >{item.name}</GalleryItem>
                        ))}
                    </ItemContainer>
                </Item>
            </MainContainer>
        ));
    };

    return (
        <>
            <Helmet>
                <title>Marvel | Single Character</title>
            </Helmet>
            <TopContainer>
                <Heading>Explore</Heading>
                <Paragraph>Here is your Single Character</Paragraph>
            </TopContainer>

            <CharactersContainer>{renderCharacters()}</CharactersContainer>
        </>
    );
}

const TopContainer = styled.div`
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
    padding:0 0 5% 0;
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

const MainContainer = styled.div`
    width: 70%;
    margin: 70px auto 0;
    @media all and (max-width: 1280px){
    }
    @media all and (max-width: 980px){
        width: 90%;
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
const Title = styled.h1`
    font-size: 48px;
    margin-bottom: 15px;
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
const InfoContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
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
const GalleryImageItem = styled.div`
    border-radius: 25px;
    overflow:hidden;
    width:70%;
    @media all and (max-width: 1280px){
        margin: 0 auto 50px;
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
const Item = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    width: 100%;
    align-items:center;
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
const GalleryImage = styled.img`
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
const SubHeading = styled.h1`
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
const CategoryName = styled.span`
    padding: 5px 10px;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid #9c9c9c;
    color: #9c9c9c;
    margin-right: 15px;
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
const ItemContainer = styled.ul`
    width:25%;
    @media all and (max-width: 1280px){
        width: 100%;
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
const GalleryItem = styled.li`
    width:100%;
    padding: 5px 10px;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid #9c9c9c;
    color: #9c9c9c;
    margin-bottom: 15px;
    text-align:center;
    @media all and (max-width: 1280px){
        width: 70%;
    }
    @media all and (max-width: 980px){
    }
    @media all and (max-width: 768px){
        width: 80%;
    }
    @media all and (max-width: 640px){
        width: 100%;
    }
    @media all and (max-width: 480px){
    }
    @media all and (max-width: 360px){
    }
`;
const DescriptionContainer = styled.p`
    width:100%;
    margin: 0 0 50px 0;
    color: #4a4a4a;
    text-align:center;
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