import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Helmet from "react-helmet";
import { useParams } from "react-router";

export default function Comic() {
    const [comics, setComics] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        axios
            .get(`https://gateway.marvel.com:443/v1/public/comics/${id}?ts=1&apikey=f7a9b0d8dfa07041696a04e6df7da8c2&hash=6c8619175e88472183b745e1dfd021c9`)
            .then((response) => {
                setComics(response.data.data.results);
                console.log(response.data.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const renderComics = () => {
        return comics.map((comic) => (
            <MainContainer key={comic.id} >
                <Title>{comic.title}</Title>
                <InfoContainer>
                    <CategoryName>
                        {comic.modified}
                    </CategoryName>
                </InfoContainer>
                <Item>
                    <GalleryImageItem>
                        <GalleryImage src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="Image" />
                    </GalleryImageItem>
                    <DescriptionContainer>
                        {comic.description}
                    </DescriptionContainer>
                </Item>
            </MainContainer>
        ));
    };

    return (
        <>
            <Helmet>
                <title>Marvel | Single Comic</title>
            </Helmet>
            <TopContainer>
                <Heading>Explore</Heading>
                <Paragraph>Here is your Single Comic</Paragraph>
            </TopContainer>

            <CharactersContainer>{renderComics()}</CharactersContainer>
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
    padding:0 0 5% 0;
`;

const MainContainer = styled.div`
    width: 70%;
    margin: 70px auto 0;
`;
const Title = styled.h1`
    font-size: 48px;
    margin-bottom: 15px;
`;
const InfoContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
`;
const GalleryImageItem = styled.div`
    border-radius: 25px;
    overflow:hidden;
    width:70%;
`;
const Item = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items:center;
`;
const GalleryImage = styled.img`
    width: 100%;
    display: block;
`;
const CategoryName = styled.span`
    padding: 5px 10px;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid #9c9c9c;
    color: #9c9c9c;
    margin-right: 15px;
`;
const DescriptionContainer = styled.p`
    width:100%;
    margin: 50px 0 0 0;
    color: #4a4a4a;
    text-align:center;
    font-size: 20px;
`;
// const ItemContainer = styled.ul`
//     width:25%;
// `;
// const GalleryItem = styled.li`
//     width:100%;
//     padding: 5px 10px;
//     border-radius: 20px;
//     display: inline-block;
//     border: 1px solid #9c9c9c;
//     color: #9c9c9c;
//     margin-bottom: 15px;
//     text-align:center;
// `;