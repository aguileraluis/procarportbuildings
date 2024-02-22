import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from '@mui/icons-material';
  import styled from "styled-components";
  import { mobile } from "../responsive";
  import logo from '../images/logo.PNG';
  import React from 'react';
  
  const Container = styled.div`
    position: sticky;
    position: -webkit-sticky;
    bottom: 0 !important;
    width: 100%;
    height: 100% !important;
    padding-bottom: 30px;
    background-color: teal;
    text-align: center !important;
    ${mobile({ flexDirection: "column", textAlign: 'center', height: '130%'})}
  `;
  
  const Left = styled.div`
       text-align: center !important;
    height: 100%;
    margin-bottom: 10px;
    ${mobile({ flexDirection: "row", textAlign: 'center', marginBottom: '10px'})}
    color: white;
  `;
  
  const Logo = styled.h1`
  font-size: 50px;
  color: black;
  text-align: center !important;
  `;
  
  const Desc = styled.p`
    margin: 20px 0px;
    font-size: '20px'!important;
    color: white;
  `;
  
  const SocialContainer = styled.div`
    text-align: center;
    display: flex;
    ${mobile({ flexDirection: "row", textAlign: 'center', marginLeft: '80px', marginBottom: '30px' })}
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
  `;
  
  const Title = styled.h4`
    margin-bottom: 5px;
    color: white;
    padding: 10px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 0;
    text-align: center !important;
    color: white;
  `;
  
  const Right = styled.div`
    text-align: center !important;
    height: 100%;
    margin-bottom: 10px;
    font-size: 15px;
    ${mobile({ flexDirection: "row", textAlign: 'center', marginBottom: '10px'})}
    color: white;
 
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 0;
    display: flex;
    align-items: center;
    text-align: center !important;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
    
        <Left>
        <Logo>Pro Carport Buildings</Logo>
       
          {/* <Desc>
            There are many variations of passages of Lorem Ipsum available
          </Desc> */}
          
          {/* <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer> */}
        </Left>
      
        <Right>
          <Title>Contact</Title>
    
           <Title> <Room/> P.O Box 127, Boonville NC 27011</Title>
       
             <Title> <Phone/> 336.468.1131</Title>
       
             <Title> <MailOutline />procarportbuildings@gmail.com</Title>

        </Right>
      </Container>
    );
  };
 
  export default Footer;