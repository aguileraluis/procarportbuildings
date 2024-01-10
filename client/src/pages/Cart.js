import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navigation";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { publicRequest } from "../requestMethods";
import emailjs from '@emailjs/browser';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center !important;
  margin-left: 40px !important;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center !important;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  text-align: center !important;
`;

const Image = styled.img`
  width: 800px;
  ${mobile({ height: "40vh", width: '95vw'})}

`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
text-align: center !important;
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  right: 100px !important;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();
  const location = useLocation();
  const salestax = location.pathname.split("/")[3];
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [carport, setcarport] = useState("");
  let totalprice = location.pathname.split("/")[2];
  let item = cart.products[0];
  let fifteenpercent = (totalprice * 0.15).toFixed(2);
  let name = item.title;
  let sideheight = localStorage.getItem("sideheight");
  let bothsidesclosed = localStorage.getItem("bothsidesclosed");
  let verticalsides = localStorage.getItem("verticalsides");
  let eachend = localStorage.getItem("eachend");
  const [filled, setfilled] = useState(true);

  console.log(sideheight);
  console.log(bothsidesclosed);
  console.log(verticalsides);
  console.log(eachend);
  

// let totalprice = useParams[0];

  useEffect(()=> {

    const makeRequest = async ()=> {
        try{
          const res = await userRequest.post("/checkout/payment", {
              tokenId: stripeToken.id, 
              amount: cart.total * 100,
          });
           Swal.fire('Congratulations, you have registered to our newsletter! Thank you!', 'success').then(result=>{
                return result;
            })
          history("/")
        } catch {}
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, history])

  
  async function onToken(token) {
    setStripeToken(token);
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setfilled(false);
    Signup();

    emailjs.sendForm('service_l4lv5jf', 'template_nmuuxcn', e.target, 'cMXHSu-UWF1vCpXXl');
    console.log("email sent");
    localStorage.clear();
  }

  const setItems = (e) => {
    sendEmail(e);
  }

  const Signup = async ()=> {

        if (fname && lname && email && address && phonenumber){
      const user = {
    
            name,
            fname, 
            lname,
            email, 
            address, 
            phonenumber,
            totalprice, 
            fifteenpercent,
            sideheight,
            bothsidesclosed,
            verticalsides,
            eachend
    
          }
    
          try {
       
            const result = await userRequest.post('/users/signup', user).data
            localStorage.clear();
            // Swal.fire('Congratulations, you have registered to our newsletter! Thank you!', 'success').then(result=>{
            //     window.location.href="/about";
                
            //     return result;
            // })
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
      <Navbar />
      <Announcement />
 { filled ?
        <form  className="col-md-5 mt-5 justify-content-center cartform" style={{textAlign : 'center'}} onSubmit={sendEmail}>
              <div>
                <h2>Please Complete Form To Continue With Payment</h2>
                <h4>First Name:</h4> 
                <input type="text" className="form-control" name="first_name" placeholder="First Name" style={{textAlign : 'center'}}
                value={fname} onChange={(e)=> {setfname(e.target.value)}}/>
                <br/>
                <h4>Last Name:</h4> 
                <input type="text" className="form-control" name="last_name" placeholder="Last Name" style={{textAlign : 'center'}}
                value={lname} onChange={(e)=> {setlname(e.target.value)}}/>
                <br/>
                <h4>Email:</h4>
                <input type="text" className="form-control" name="email" placeholder="email" style={{textAlign : 'center'}}
                value={email} onChange={(e)=> {setemail(e.target.value)}}/>
                <br/>
                  <h4>Address:</h4>
                <input type="text" className="form-control" name="address" placeholder="address" style={{textAlign : 'center'}}
                value={address} onChange={(e)=> {setaddress(e.target.value)}}/>
                <br/>
                  <h4>Phone Number:</h4>
                <input type="number" className="form-control" name="phone_number" placeholder="phonenumber" style={{textAlign : 'center'}}
                value={phonenumber} onChange={(e)=> {setphonenumber(e.target.value)}}/>
                <h4>Carport Name:</h4> 
                <input type="text" className="form-control" name="carport_name" placeholder={item.title} style={{textAlign : 'center'}}
                defaultValue={item.title} />              
                <br/>
                <h4>Total Amount:</h4> 
                <input type="text" className="form-control" name="total_amount" placeholder={totalprice} style={{textAlign : 'center'}}
                defaultValue={totalprice} />
                <br/>
                <h4>Fifteen Percent:</h4> 
                <input type="text" className="form-control" name="fifteen_percent" placeholder={fifteenpercent} style={{textAlign : 'center'}}
                defaultValue={fifteenpercent} />
                <br/>
                { sideheight ?<>
                  <h4>Side Height:</h4> 
                <input type="text" className="form-control" name="side_height" placeholder={sideheight} style={{textAlign : 'center'}}
                defaultValue={sideheight} />
                </> 
                : <></>
                }
                { bothsidesclosed ? <>
                  <h4>Both Sides Closed:</h4> 
                <input type="text" className="form-control" name="both_sides" placeholder={bothsidesclosed} style={{textAlign : 'center'}}
                defaultValue={bothsidesclosed} />
                </>
                : <></>
                }
                { verticalsides ? <>
                  <h4>Vertical Sides:</h4> 
                <input type="text" className="form-control" name="vertical_sides" placeholder={verticalsides} style={{textAlign : 'center'}}
                defaultValue={verticalsides} />
                </>
               : <></>
                }
                { eachend ? <>
                  <h4>Each End:</h4> 
                <input type="text" className="form-control" name="each_end" placeholder={eachend} style={{textAlign : 'center'}}
                defaultValue={eachend} />
                </>
                : <></>
                }              
                
  
  {   name &&
            fname &&
            lname &&
            email &&
            address &&
            phonenumber &&
            totalprice &&
            fifteenpercent ? <button style={{position: 'relative', marginTop: '40px'}} className="btn btn-primary mt-12" onClick={()=> setItems}>Confirm Details</button> : <></> }
                
                <br/>
                <br/>
                <br/>
              </div>
            </form>
            :   
      <Wrapper>
      <Title>YOUR BAG</Title>
      <Bottom>
        <Info>
          {cart.products.map((product) => (
            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <Title>{product.title}</Title>
                
                  </ProductName>
                  {/* <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Total:</b> {totalprice}
                  
                  </ProductSize> */}
                </Details>
              </ProductDetail>
              {/* <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>
                  $ {product.total * product.total}
                </ProductPrice>
              </PriceDetail> */}
            </Product>
          ))}
          <Hr />
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Taxes</SummaryItemText>
            <SummaryItemPrice>$ {salestax}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>$ {totalprice}</SummaryItemPrice>
          </SummaryItem>
          <StripeCheckout
            name="Lama Shop"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description={`Your total is $${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={"pk_test_51ODJPPL4eLMn0bBLySYrtbmRbOBSMcK2fF8QEb1rPGZJ8nCDCIGhkwYHml7zJ9TKCRMCztpSYwXSNoF1mTnb6Unq00xrUgj9Bu"}
          >
             { cart.total > 0 ? <Button>CHECKOUT NOW</Button> : <></> }
          </StripeCheckout>
        </Summary>
      </Bottom>
    </Wrapper>
}   
    </Container>
  );
};

export default Cart;

// import React, { useState, useEffect } from 'react';
// import Loader from '../components/Loader';
// import Error from '../components/Error';
// import axios from "axios";
// import Swal from 'sweetalert2';
// import AOS from 'aos';
// import 'aos/dist/aos.css'; 
// import InfoSection2 from '../components/InfoSection2';
// import { InfoDataFour } from '../data/InfoData';

// AOS.init({
//     duration : 2000
// });

// function Signupscreen() {
//   const [email, setemail] = useState('');
//   const [name, setname] = useState('');
//   const [address, setaddress] = useState('');
//   const [phonenumber, setphonenumber] = useState('');
//   const [loading, setloading] = useState(false);
//   const [error, seterror] = useState();


//   async function Signup() {

//     if (name && email && address && phonenumber){
//   const user = {

//         name, 
//         email, 
//         address, 
//         phonenumber

//       }

//       try {
//         setloading(true);
//         const result = (await axios.post('/api/users/signup', user)).data
//         setloading(false);
//         seterror(false);
//         Swal.fire('Congratulations, you have registered to our newsletter! Thank you!', 'success').then(result=>{
//             window.location.href="/littleheavenbedandbreakfast";
//             return result;
//         })
//         return result;
//       } catch (error) {
//         setloading(false);
//         seterror(true);
//         Swal.fire('OOps', 'Something went wrong', 'error');
//         return console.log(error);
//       }
//     } 
//     else {
//         Swal.fire('OOps', 'Something went wrong', 'error');
//         return console.log(error); 
//     }
    
    
//   }

//   return (
//     <div>
//         {loading ? (<Loader/>) : (
//     <div className="row justify-content-center mt-5">

        
//             <InfoSection2 {...InfoDataFour}/>
        
//           <div  className="col-md-5 mt-5 justify-content-center" style={{textAlign : 'center'}}>
//           {error && (<Error message='Invalid Credentials'/>)}
//             <div className="bs">
//               <h2>Signup Here</h2>
//               <br/>
//               <h4>Name:</h4> 
//               <input type="text" className="form-control" placeholder="name" style={{textAlign : 'center'}}
//               value={name} onChange={(e)=> {setname(e.target.value)}}/>
//               <br/>
//               <h4>Email:</h4>
//               <input type="text" className="form-control" placeholder="email" style={{textAlign : 'center'}}
//               value={email} onChange={(e)=> {setemail(e.target.value)}}/>
//               <br/>
//                 <h4>Address:</h4>
//               <input type="text" className="form-control" placeholder="address" style={{textAlign : 'center'}}
//               value={address} onChange={(e)=> {setaddress(e.target.value)}}/>
//               <br/>
//                 <h4>Phone Number:</h4>
//               <input type="number" className="form-control" placeholder="phonenumber" style={{textAlign : 'center'}}
//               value={phonenumber} onChange={(e)=> {setphonenumber(e.target.value)}}/>

//               <button style={{position: 'relative', marginTop: '40px'}} className="btn btn-primary mt-12" onClick={Signup}>Signup</button>
//               {loading && (<Loader/>)}
//             </div>
//           </div>
//         </div>
  
//         )} 
//           </div>
//   )
// }

// export default Signupscreen