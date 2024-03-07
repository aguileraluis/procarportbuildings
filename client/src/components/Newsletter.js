import React, { useState } from 'react';
import { Send } from '@mui/icons-material';
import styled from "styled-components";
import { mobile } from "../responsive";
import { userRequest } from "../requestMethods";
import Swal from 'sweetalert2';
import axios from "axios";
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

const Newsletter = () => {

  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [zipcode, setzipcode] = useState('');
  const [style, setstyle] = useState('');
  const [size, setsize] = useState('');


  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_l4lv5jf', 'template_yzilc6b', e.target, 'cMXHSu-UWF1vCpXXl');
    console.log("email sent");
    localStorage.clear();
  }


  const Register = async ()=> {

    if (fname && email && phonenumber && lname && zipcode && style && size){
  const user = {
        fname,
        lname,
        email, 
        phonenumber,
        zipcode,
        style,
        size
      }

      try {
   
        const result = await axios.post('/api/signedupusers/signupfornewsletter', user).data
        Swal.fire('We will get back in touch with you with a quote!', 'Thank you!')
        window.location.href="/";
        return result;
      } catch (error) {
        console.log(error)
        Swal.fire('OOps', 'Please fill out the information', 'Please provide additional details');
      }
    } 
    else {
        Swal.fire('OOps', 'Pleae fill out information', 'Please provide additional details');
    }
}
  return (
    <Container  onSubmit={sendEmail}>
      <Title data-aos="flip-right">Get A Quote Today!</Title>
      <Desc data-aos="flip-left">Sign up today to receive a free quote and get on our email list.</Desc>
      <InputContainer data-aos="flip-up">
        <Input placeholder="First Name" value={fname} name="first_name" onChange={(e)=> setfname(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Last Name" value={lname} name="last_name" onChange={(e)=> setlname(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Email" value={email} name="email" onChange={(e)=> setemail(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Phone Number" value={phonenumber} name="phone_number" onChange={(e)=> setphonenumber(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Zipcode" value={zipcode} name="zipcode" onChange={(e)=> setzipcode(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Building Style" value={style} name="style" onChange={(e)=> setstyle(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Building Size" value={size} name="size" onChange={(e)=> setsize(e.target.value)} style={{fontSize: '30px'}}/>
      </InputContainer>
      <InputContainer>
      <Button onClick={Register}>
        <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;