import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 60vh;
  display: block;
  position: relative;
  overflow: hidden;
  padding-left: 0;
`;

const Arrow = styled.div`
  width: 100%;
  height: 50px;
  background-color: teal;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  /* left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"}; */
  margin-left: 0;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

// const Wrapper = styled.div`
//   height: 100%;
//   display: flex;
//   transition: all 1.5s ease;
  
//   transform: translateX(${(props) => props.slideIndex * -100}vw);

// `;

const Slide = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  margin-left: 0 !important;
  align-items: left;
  background-color: #${(props) => props.bg};
  ${mobile({width: '100vw', height: '100vh', alignItems: 'center', display: 'flex', justifyContent: 'center', textAlign: 'center', margin: 'auto' })}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  margin-left: 0;
  ${mobile({margin: 'auto'})}
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  margin-left: 0;

  padding-bottom: 300px !important;
  object-fit: contain;
  ${mobile({margin: 'auto', objectFit: 'fill'})};
`;

const InfoContainer = styled.div`
  height: 100%;
  flex: 1;
  justify-content: center !important;
  text-align: center !important;
  padding-top: 11%;
  ${mobile({position: 'absolute', top: 1, justifyContent: 'center', textAlign: 'center', margin: 'auto' })}
`;

const Title = styled.h1`
  font-size: 70px;
  color: teal;
  ${mobile({fontSize: '24px', margin: 'auto', marginTop: '180px', textAlign: 'center', backgroundColor: 'lightblue', color: 'black', padding: '10px'})}
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 30px;
  color: black;
  text-transform: capitalize;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({fontSize: '15px', lineSpacing: '1px', margin: 'auto', color: 'white', textAlign: 'center', backgroundColor: 'teal', padding: '10px'})}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  ${mobile({fontSize: '25px', marginTop: '150px', color: 'gray', backgroundColor: 'white'})}
`;

const Slider = ({item}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
     <Container>
      {/* <Wrapper slideIndex={slideIndex}> */}
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
            </InfoContainer>
          </Slide>
      {/* </Wrapper> */}
    </Container>

  );
};

export default Slider;