import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: teal;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);

`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${mobile({width: '100vw', height: '100vh', alignItems: 'center', display: 'flex', justifyContent: 'center', textAlign: 'center', margin: 'auto' })}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 3;
  ${mobile({margin: 'auto'})}
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  margin: 'auto';
  object-fit: 'fill';
  ${mobile({margin: 'auto', objectFit: 'fill'})};
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({position: 'absolute', top: 1, justifyContent: 'center', textAlign: 'center', margin: 'auto' })}
`;

const Title = styled.h1`
  font-size: 70px;
  ${mobile({fontSize: '24px', margin: 'auto', marginTop: '180px', textAlign: 'center', backgroundColor: 'lightblue', color: 'black', padding: '10px'})}
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
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

const Slider = () => {
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
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        `{item = sliderItems[0]}`
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Desc>{item.desctwo}</Desc>
              <Link to={'/product'}><Button>SHOP NOW</Button></Link>
            </InfoContainer>
          </Slide>
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>

  );
};

export default Slider;