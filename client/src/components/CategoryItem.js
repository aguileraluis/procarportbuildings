import React from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 2000
});

const Container = styled.div`
  flex: 1;
  text-align: center !important;
  height: 60vh;
  width: 40vw;
  position: relative;
  margin-top: 20px;
  margin-left: 130px;
  margin-bottom: 260px;
  ${mobile({ marginBottom: '-65px', width: '98vw', textAlign: 'center', marginLeft: '22px'})}
`;

const Image = styled.img`
  width: 90%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "50vh" , marginRight: '50px'})}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mobile({ textAlign: 'center', paddingRight: '31px'})}
`;

const Title = styled.h1`
    font-size: 60px;
    color: white;
    font-weight: bolder;
    margin-bottom: 20px;
    text-align: center;
    ${mobile({ fontSize: '30px' })}
`;

const Button = styled.button`
    font-size: 40px;
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
      ${mobile({ fontSize: '25px' })}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container data-aos="flip-up">
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;