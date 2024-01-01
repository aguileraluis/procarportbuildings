import React from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  text-align: center !important;
  height: 70vh;
  position: relative;
  ${mobile({ marginBottom: '-140px', width: '98vw', textAlign: 'center', marginRight: '25px'})}
`;

const Image = styled.img`
  width: 90%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "50vh" , marginRight: '10px'})}

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
    <Container>
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