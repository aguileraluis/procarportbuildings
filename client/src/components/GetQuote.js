import React, { useState } from 'react';
import { Send } from '@mui/icons-material';
import styled from "styled-components";
import { mobile } from "../responsive";
import { userRequest } from "../requestMethods";
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const Container = styled.form`
  height: 60vh;
  background-color: #d0f7f7;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: '80vh', display: 'flex', textAlign: 'center', flexDirection: 'column', justifyContent: 'center'})}
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", marginLeft: '15px', marginRight: '15px'})}
`;

const InputContainer = styled.div`
  text-align: center !important;
  width: 30%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
font-size: 20px !important;
  border: none;
  text-align: center !important;
  flex: 8;
  padding-left: 20px;
  width: 20% !important;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const GetQuote = () => {

  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [name, setname] = useState('');

  const Register = async ()=> {

    if (name && email && phonenumber){
  const user = {
        name,
        email, 
        phonenumber
      }

      try {
   
        const result = await userRequest.post('/signedupusers/signupfornewsletter', user).data
        Swal.fire('Thank you! You are registered to our newsletter!', 'success').then(result=>{
          window.location.href="/about";
          return result;
      })
        return result;
      } catch (error) {
        console.log(error)
        Swal.fire('OOps', 'Something went wrong', 'error');
      }
    } 
    else {
        Swal.fire('OOps', 'Something went wrong', 'error');
    }
}
  return (
    <Container>
      <Title>Get A Quote Today!</Title>
      <Desc>If you are interested in this barn building please call us at  336.468.1131 to get started.</Desc>
      {/* <InputContainer>
        <Input placeholder="Name" value={name} onChange={(e)=> setname(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Email" value={email} onChange={(e)=> setemail(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Phone Number" value={phonenumber} onChange={(e)=> setphonenumber(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
      <Button onClick={Register}>
        <Send />
        </Button>
      </InputContainer> */}
    </Container>
  );
};

export default GetQuote;