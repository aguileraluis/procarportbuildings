import React from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div`
    height: 70px;
    background-color: #d0f7f7;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    ${mobile({padding: '5px', fontSize: '17px', height: '60px', textAlign: 'center'})}
`;

const Announcement = () => {
  return (
    <Container>
        Get Started Today! We Have THE Best Prices You Will Find Within The Area! 
    </Container>
  )
}

export default Announcement;