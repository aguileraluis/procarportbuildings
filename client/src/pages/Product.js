import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navigation";

import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import '../components/Product.css';
import Products from '../components/Products';
import axios from "axios";
import { Link } from 'react-router-dom';
import Photos from '../components/Photos';

let total = 0;
let sidetotal = 0;
let bothsidesclosedtotal = 0;
let verticalsidestotal = 0;
let eachendtotal = 0;
let heighttotal = 0;
let salestax = 0;
let sideheight = '';
let bothsidesclosed = '';
let verticalsides = '';
let eachend = '';
let height = '';


const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  ${mobile({ display: 'flex', padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh", width: '100%', objectFit: 'cover' })}
`;

const InfoContainer = styled.div`
  text-align: center;
  flex: 1;
  margin: auto;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 50px !important;
  margin-right: 40px !important;
  text-align: center !important;
  padding: 1px;
  ${mobile({ textAlign: 'center', fontSize: '30px', marginRight: '40px' })}
 
`;

const Desc = styled.p`
  margin-right: 30px !important;
  font-size: 20px;
  ${mobile({ textAlign: 'center', fontSize: '15px', marginRight: '90px' })}
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;

const FilterContainer = styled.div`
 display: grid;
 text-align: center;
  grid-template-columns: repeat(auto, auto, auto, auto);
  /* margin-left: 11% !important;
  margin-right: 11% !important; */
  margin-top: 2% !important;
  margin-bottom: 1% !important;
  justify-content: center;
  gap: 10px;
  ${mobile({ marginBottom: '2px', display: 'grid', justifyContent: 'center', textAlign: 'center', borderRadius: '10px' })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

`;

const FilterTitle = styled.span`
  text-align: center;
  font-size: 20px;
  font-weight: 200;
  width: 80%;
  color: white;
  padding: 2px;
  border-radius: 10px;
  background-color: teal;
  padding-bottom: 10px !important;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  margin-left: 220px;
  width: 70%;
  display: flex;
  align-items: right;
  text-align: right !important;
  justify-content: center;

  ${mobile({ width: "100%", textAlign: 'center', marginLeft: '60px' })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  margin-left: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }

  ${mobile({ marginRight: '9px', marginLeft: '9px', display: 'grid', justifyContent: 'center', textAlign: 'center', borderRadius: '10px' })}
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [totalprice, settotalprice] = useState(0);
  const [taxes, settaxes] = useState(0);
  const [heightclicked, setheightclicked] = useState(false)
  const [clicked, setclicked] = useState(false);
  const [bothsidesclicked, setbothsidesclicked] = useState(false);
  const [verticalsidesclicked, setverticalsidesclicked] = useState(false);
  const [eachendclicked, seteachendclicked] = useState(false);
  const [addedtocart, setaddedtocart] = useState(true);
  const [bothEndsClicked, setbothEndsClicked] = useState(false);

  // const gallery = [
  //   {
  //     img: 'https://i.postimg.cc/hPpCwKzF/Standard-Buildings-Additional-Options.png'
  //   }
  // ]

  
  const galleryImagesTwo = [
  
    {

      img: ' https://i.postimg.cc/QtXYBtDX/procarportbuildingsfour.png'
      // img: 'https://i.postimg.cc/bJWwHbSy/COMM-B.png'
     
      // https://i.postimg.cc/xjBVcvXg/procarportbuildingsone.png
    },
 
    {
      // img: 'https://i.postimg.cc/JnZ7hp1w/procarportbuildingstwo.png'
      img: 'https://i.postimg.cc/9fqCxLw4/procarportbuildingsthree.png'
    },
   
    {
      img: 'https://i.postimg.cc/c13TswwQ/procarportbuildingssix.png'
      // img: 'https://i.postimg.cc/GtCZChZP/STD-B.png'
    },
    {
      img: 'https://i.postimg.cc/fT0CRXdc/procarportbuildingsfive.png'
      // img: 'https://i.postimg.cc/MGf4fQwb/STD-F.png'
    }
    ,
    {
      img: 'https://i.postimg.cc/JnZ7hp1w/procarportbuildingstwo.png'
      // img: 'https://i.postimg.cc/SNQv75qK/TRIPLE-B.png'
    },
    {
      img: 'https://i.postimg.cc/xjBVcvXg/procarportbuildingsone.png'
      // img: 'https://i.postimg.cc/J7xTnqJC/TRIPLE-F.png'
    }, 
  
  ]

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = (await axios.get("/api/products/" + id)).data;
        setProduct(res);
        return
      } catch { }
    };
    getProduct();

  }, [id]);

  function toggleNavigation() {

    let nav = document.querySelector('nav');

    let navList = document.getElementById('navlist');

    console.log(nav)
    nav.classList.toggle('active')

    nav.classList.value === "active" ? navList.style.display = "flex" : navList.style.display = "none"
    return;
  }



  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    setaddedtocart(false);
    dispatch(
      addProduct({ ...product, quantity, color, size, total })
    );
  };

  const handleDelete = () => {
    setaddedtocart(false)
    total = 0;
    settaxes(0);
  }

  const goBack = () => {
    setaddedtocart(true);
  }

  const clear = () => {
    total = 0;
    setheightclicked(false);
    setclicked(false);
    setbothsidesclicked(false);
    setverticalsidesclicked(false);
    seteachendclicked(false);
    localStorage.clear();
  }

  function addTotal(e) {
    if (e === 70) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 20ft';

      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 90) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 25ft';

      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 110) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 125) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 145) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 146) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 215) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 275) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 335) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 395) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 216) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 305) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 385) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 460) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 540) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 290) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 396) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 490) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 590) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 685) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 360) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 485) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 600) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 715) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 830) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 430) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 575) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 710) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 840) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 970) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 625) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 815) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 995) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1175) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1355) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 695) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 905) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1105) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1300) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1500) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1775) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2230) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2665) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3095) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3530) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2015) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2470) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2905) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3335) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3770) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addTotalTriple(e) {
    if (e === 110) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 130) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 155) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 180) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 205) {
      total += e;
      settotalprice(total);
      sideheight = '7ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 215) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 265) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 310) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 360) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 410) {
      total += e;
      settotalprice(total);
      sideheight = '8ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 325) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 395) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 470) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 540) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 610) {
      total += e;
      settotalprice(total);
      sideheight = '9ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 430) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 530) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 625) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 720) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 815) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 541) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 660) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 780) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 900) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1020) {
      total += e;
      settotalprice(total);
      sideheight = '11ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 840) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 995) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1140) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1295) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1440) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1190) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1370) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1775) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1955) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2245) {
      total += e;
      settotalprice(total);
      sideheight = '13ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1296) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1500) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1930) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2135) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2450) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1920) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2280) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2640) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3120) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3600) {
      total += e;
      settotalprice(total);
      sideheight = '15ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2160) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2520) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2880) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3360) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3840) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addTotalCommercial(e) {
    if (e === 430) {
      total += e;
      settotalprice(total);
      sideheight = '10ft x 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 520) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 24ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 605) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 28ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 690) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 32ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 780) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 36ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 865) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 950) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 44ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1035) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 48ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1125) {
      total += e;
      settotalprice(total);
      sideheight = '10ft X 52ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 866) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1036) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 24ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1210) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 28ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1380) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 32ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1555) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 36ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1730) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1900) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 44ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2075) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 48ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2245) {
      total += e;
      settotalprice(total);
      sideheight = '12ft X 52ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1535) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1845) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 24ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2150) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 28ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2460) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 32ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2765) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 36ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3070) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3380) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 44ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3685) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 48ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3995) {
      total += e;
      settotalprice(total);
      sideheight = '14ft X 52ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2450) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2895) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 24ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3340) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 28ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3785) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 32ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4235) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 36ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4680) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 5125) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 44ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 5575) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 48ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 6020) {
      total += e;
      settotalprice(total);
      sideheight = '16ft X 52ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3360) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3840) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 24ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4320) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 28ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4800) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 32ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 5280) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 36ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 5760) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 6240) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 44ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 6720) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 48ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 7200) {
      total += e;
      settotalprice(total);
      sideheight = '18ft X 52ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3790) {
      total += e;
      settotalprice(total);
      sideheight = '20ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4470) {
      total += e;
      settotalprice(total);
      sideheight = '20ft X 24ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 5115) {
      total += e;
      settotalprice(total);
      sideheight = '20ft X 28ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 5830) {
      total += e;
      settotalprice(total);
      sideheight = '20ft X 32ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 6510) {
      total += e;
      settotalprice(total);
      sideheight = '20ft X 36ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 7190) {
      total += e;
      settotalprice(total);
      sideheight = '20ft x 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 7865) {
      total += e;
      settotalprice(total);
      sideheight = '20ft x 44ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 8545) {
      total += e;
      settotalprice(total);
      sideheight = '20ft x 48ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 9225) {
      total += e;
      settotalprice(total);
      sideheight = '20ft x 52ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofStandardRegular(e) {
    if (e === 1295) {
      total += e;
      settotalprice(total);
      height = '12ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1595) {
      total += e;
      settotalprice(total);
      height = '12ft x 25 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1795) {
      total += e;
      settotalprice(total);
      height = '12ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1995) {
      total += e;
      settotalprice(total);
      height = '12ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1395) {
      total += e;
      settotalprice(total);
      height = '18ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1695) {
      total += e;
      settotalprice(total);
      height = '18ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1895) {
      total += e;
      settotalprice(total);
      height = '18ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2195) {
      total += e;
      settotalprice(total);
      height = '18ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1696) {
      total += e;
      settotalprice(total);
      height = '20ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1996) {
      total += e;
      settotalprice(total);
      height = '20ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 2395) {
      total += e;
      settotalprice(total);
      height = '20ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2795) {
      total += e;
      settotalprice(total);
      height = '20ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 1896) {
      total += e;
      settotalprice(total);
      height = '22ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2295) {
      total += e;
      settotalprice(total);
      height = '22ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 2695) {
      total += e;
      settotalprice(total);
      height = '22ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3095) {
      total += e;
      settotalprice(total);
      height = '22ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1997) {
      total += e;
      settotalprice(total);
      height = '24ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2495) {
      total += e;
      settotalprice(total);
      height = '24ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 2995) {
      total += e;
      settotalprice(total);
      height = '24ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3395) {
      total += e;
      settotalprice(total);
      height = '24ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }


    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofStandardTriple(e) {
    if (e === 2795) {
      total += e;
      settotalprice(total);
      height = '26ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3395) {
      total += e;
      settotalprice(total);
      height = '26ft x 25 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4095) {
      total += e;
      settotalprice(total);
      height = '26ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4795) {
      total += e;
      settotalprice(total);
      height = '26ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2895) {
      total += e;
      settotalprice(total);
      height = '28ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3595) {
      total += e;
      settotalprice(total);
      height = '28ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4295) {
      total += e;
      settotalprice(total);
      height = '28ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4995) {
      total += e;
      settotalprice(total);
      height = '28ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2995) {
      total += e;
      settotalprice(total);
      height = '30ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3695) {
      total += e;
      settotalprice(total);
      height = '30ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4495) {
      total += e;
      settotalprice(total);
      height = '30ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 5195) {
      total += e;
      settotalprice(total);
      height = '30ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }


    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofTripleBoxed(e) {
    if (e === 2895) {
      total += e;
      settotalprice(total);
      height = '26ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3595) {
      total += e;
      settotalprice(total);
      height = '26ft x 25 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4295) {
      total += e;
      settotalprice(total);
      height = '26ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4995) {
      total += e;
      settotalprice(total);
      height = '26ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2995) {
      total += e;
      settotalprice(total);
      height = '28ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3695) {
      total += e;
      settotalprice(total);
      height = '28ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4495) {
      total += e;
      settotalprice(total);
      height = '28ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 5195) {
      total += e;
      settotalprice(total);
      height = '28ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3095) {
      total += e;
      settotalprice(total);
      height = '30ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3895) {
      total += e;
      settotalprice(total);
      height = '30ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4695) {
      total += e;
      settotalprice(total);
      height = '30ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 5495) {
      total += e;
      settotalprice(total);
      height = '30ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }


    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofTripleVertical(e) {
    if (e === 3195) {
      total += e;
      settotalprice(total);
      height = '26ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3995) {
      total += e;
      settotalprice(total);
      height = '26ft x 25 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4895) {
      total += e;
      settotalprice(total);
      height = '26ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 5695) {
      total += e;
      settotalprice(total);
      height = '26ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 6495) {
      total += e;
      settotalprice(total);
      height = '26ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 7190) {
      total += e;
      settotalprice(total);
      height = '26ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 7990) {
      total += e;
      settotalprice(total);
      height = '26ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3395) {
      total += e;
      settotalprice(total);
      height = '28ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4195) {
      total += e;
      settotalprice(total);
      height = '28ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4995) {
      total += e;
      settotalprice(total);
      height = '28ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 5895) {
      total += e;
      settotalprice(total);
      height = '28ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 6695) {
      total += e;
      settotalprice(total);
      height = '28ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 7590) {
      total += e;
      settotalprice(total);
      height = '28ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 8390) {
      total += e;
      settotalprice(total);
      height = '28ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3495) {
      total += e;
      settotalprice(total);
      height = '30ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4295) {
      total += e;
      settotalprice(total);
      height = '30ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 5195) {
      total += e;
      settotalprice(total);
      height = '30ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 6095) {
      total += e;
      settotalprice(total);
      height = '30ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 6995) {
      total += e;
      settotalprice(total);
      height = '30ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 7790) {
      total += e;
      settotalprice(total);
      height = '30ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 8590) {
      total += e;
      settotalprice(total);
      height = '30ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }


    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofStandardBoxed(e) {
    if (e === 1395) {
      total += e;
      settotalprice(total);
      height = '12ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1795) {
      total += e;
      settotalprice(total);
      height = '12ft x 25 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2195) {
      total += e;
      settotalprice(total);
      height = '12ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2495) {
      total += e;
      settotalprice(total);
      height = '12ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1595) {
      total += e;
      settotalprice(total);
      height = '18ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1895) {
      total += e;
      settotalprice(total);
      height = '18ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2295) {
      total += e;
      settotalprice(total);
      height = '18ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2695) {
      total += e;
      settotalprice(total);
      height = '18ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1796) {
      total += e;
      settotalprice(total);
      height = '20ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2196) {
      total += e;
      settotalprice(total);
      height = '20ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 2696) {
      total += e;
      settotalprice(total);
      height = '20ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3095) {
      total += e;
      settotalprice(total);
      height = '20ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 1995) {
      total += e;
      settotalprice(total);
      height = '22ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2496) {
      total += e;
      settotalprice(total);
      height = '22ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3096) {
      total += e;
      settotalprice(total);
      height = '22ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3595) {
      total += e;
      settotalprice(total);
      height = '22ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2296) {
      total += e;
      settotalprice(total);
      height = '24ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2795) {
      total += e;
      settotalprice(total);
      height = '24ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3395) {
      total += e;
      settotalprice(total);
      height = '24ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3995) {
      total += e;
      settotalprice(total);
      height = '24ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }


    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofStandardVertical(e) {
    if (e === 1695) {
      total += e;
      settotalprice(total);
      height = '12ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2095) {
      total += e;
      settotalprice(total);
      height = '12ft x 25 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2495) {
      total += e;
      settotalprice(total);
      height = '12ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2895) {
      total += e;
      settotalprice(total);
      height = '12ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3395) {
      total += e;
      settotalprice(total);
      height = '12ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3790) {
      total += e;
      settotalprice(total);
      height = '12ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4190) {
      total += e;
      settotalprice(total);
      height = '12ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 1795) {
      total += e;
      settotalprice(total);
      height = '18ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2195) {
      total += e;
      settotalprice(total);
      height = '18ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2695) {
      total += e;
      settotalprice(total);
      height = '18ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3095) {
      total += e;
      settotalprice(total);
      height = '18ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3595) {
      total += e;
      settotalprice(total);
      height = '18ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3990) {
      total += e;
      settotalprice(total);
      height = '18ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 4390) {
      total += e;
      settotalprice(total);
      height = '18ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 1995) {
      total += e;
      settotalprice(total);
      height = '20ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 2496) {
      total += e;
      settotalprice(total);
      height = '20ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3096) {
      total += e;
      settotalprice(total);
      height = '20ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 3596) {
      total += e;
      settotalprice(total);
      height = '20ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4095) {
      total += e;
      settotalprice(total);
      height = '20ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4490) {
      total += e;
      settotalprice(total);
      height = '20ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4990) {
      total += e;
      settotalprice(total);
      height = '20ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 2395) {
      total += e;
      settotalprice(total);
      height = '22ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 2995) {
      total += e;
      settotalprice(total);
      height = '22ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3597) {
      total += e;
      settotalprice(total);
      height = '22ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4195) {
      total += e;
      settotalprice(total);
      height = '22ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4795) {
      total += e;
      settotalprice(total);
      height = '22ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 5390) {
      total += e;
      settotalprice(total);
      height = '22ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 5990) {
      total += e;
      settotalprice(total);
      height = '22ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 5390) {
      total += e;
      settotalprice(total);
      height = '22ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 5990) {
      total += e;
      settotalprice(total);
      height = '22ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 2497) {
      total += e;
      settotalprice(total);
      height = '24ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3097) {
      total += e;
      settotalprice(total);
      height = '24ft x 25ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 3795) {
      total += e;
      settotalprice(total);
      height = '24ft x 30ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4395) {
      total += e;
      settotalprice(total);
      height = '24ft x 35ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 4995) {
      total += e;
      settotalprice(total);
      height = '24ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 5590) {
      total += e;
      settotalprice(total);
      height = '24ft x 45ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 6190) {
      total += e;
      settotalprice(total);
      height = '24ft x 50ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofCommercial40(e) {
    if (e === 6795) {
      total += e;
      settotalprice(total);
      height = '32ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 7995) {
      total += e;
      settotalprice(total);
      height = '32ft x 24 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 9195) {
      total += e;
      settotalprice(total);
      height = '32ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 10395) {
      total += e;
      settotalprice(total);
      height = '32ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 11595) {
      total += e;
      settotalprice(total);
      height = '32ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 12795) {
      total += e;
      settotalprice(total);
      height = '32ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 13995) {
      total += e;
      settotalprice(total);
      height = '32ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 15195) {
      total += e;
      settotalprice(total);
      height = '32ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 16395) {
      total += e;
      settotalprice(total);
      height = '32ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 7195) {
      total += e;
      settotalprice(total);
      height = '34ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 8495) {
      total += e;
      settotalprice(total);
      height = '34ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 9695) {
      total += e;
      settotalprice(total);
      height = '34ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 10995) {
      total += e;
      settotalprice(total);
      height = '34ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 12195) {
      total += e;
      settotalprice(total);
      height = '34ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13495) {
      total += e;
      settotalprice(total);
      height = '34ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 14795) {
      total += e;
      settotalprice(total);
      height = '34ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 15995) {
      total += e;
      settotalprice(total);
      height = '34ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 17295) {
      total += e;
      settotalprice(total);
      height = '34ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 7695) {
      total += e;
      settotalprice(total);
      height = '36ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 8895) {
      total += e;
      settotalprice(total);
      height = '36ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 10195) {
      total += e;
      settotalprice(total);
      height = '36ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 11495) {
      total += e;
      settotalprice(total);
      height = '36ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 12695) {
      total += e;
      settotalprice(total);
      height = '36ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13996) {
      total += e;
      settotalprice(total);
      height = '36ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 15196) {
      total += e;
      settotalprice(total);
      height = '36ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16495) {
      total += e;
      settotalprice(total);
      height = '36ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 17795) {
      total += e;
      settotalprice(total);
      height = '36ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 8195) {
      total += e;
      settotalprice(total);
      height = '38ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 9395) {
      total += e;
      settotalprice(total);
      height = '38ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 10695) {
      total += e;
      settotalprice(total);
      height = '38ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 11895) {
      total += e;
      settotalprice(total);
      height = '38ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13195) {
      total += e;
      settotalprice(total);
      height = '38ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 14495) {
      total += e;
      settotalprice(total);
      height = '38ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 15695) {
      total += e;
      settotalprice(total);
      height = '38ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16995) {
      total += e;
      settotalprice(total);
      height = '38ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18195) {
      total += e;
      settotalprice(total);
      height = '38ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 8795) {
      total += e;
      settotalprice(total);
      height = '40ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 9995) {
      total += e;
      settotalprice(total);
      height = '40ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 11295) {
      total += e;
      settotalprice(total);
      height = '40ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 12495) {
      total += e;
      settotalprice(total);
      height = '40ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13795) {
      total += e;
      settotalprice(total);
      height = '40ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 15095) {
      total += e;
      settotalprice(total);
      height = '40ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16295) {
      total += e;
      settotalprice(total);
      height = '40ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 17595) {
      total += e;
      settotalprice(total);
      height = '40ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18795) {
      total += e;
      settotalprice(total);
      height = '40ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofCommercial50(e) {
    if (e === 9095) {
      total += e;
      settotalprice(total);
      height = '42ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 10395) {
      total += e;
      settotalprice(total);
      height = '42ft x 24 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 11595) {
      total += e;
      settotalprice(total);
      height = '42ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 12895) {
      total += e;
      settotalprice(total);
      height = '42ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 14195) {
      total += e;
      settotalprice(total);
      height = '42ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 15395) {
      total += e;
      settotalprice(total);
      height = '42ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 16695) {
      total += e;
      settotalprice(total);
      height = '42ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 17895) {
      total += e;
      settotalprice(total);
      height = '42ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 19195) {
      total += e;
      settotalprice(total);
      height = '42ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 9595) {
      total += e;
      settotalprice(total);
      height = '44ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 10895) {
      total += e;
      settotalprice(total);
      height = '44ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 12095) {
      total += e;
      settotalprice(total);
      height = '44ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13395) {
      total += e;
      settotalprice(total);
      height = '44ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 14595) {
      total += e;
      settotalprice(total);
      height = '44ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 15895) {
      total += e;
      settotalprice(total);
      height = '44ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 17195) {
      total += e;
      settotalprice(total);
      height = '44ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 18395) {
      total += e;
      settotalprice(total);
      height = '44ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 19695) {
      total += e;
      settotalprice(total);
      height = '44ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 10195) {
      total += e;
      settotalprice(total);
      height = '46ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 11495) {
      total += e;
      settotalprice(total);
      height = '46ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 12695) {
      total += e;
      settotalprice(total);
      height = '46ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13995) {
      total += e;
      settotalprice(total);
      height = '46ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 15195) {
      total += e;
      settotalprice(total);
      height = '46ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16495) {
      total += e;
      settotalprice(total);
      height = '46ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 17795) {
      total += e;
      settotalprice(total);
      height = '46ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18995) {
      total += e;
      settotalprice(total);
      height = '46ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 20295) {
      total += e;
      settotalprice(total);
      height = '46ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 10795) {
      total += e;
      settotalprice(total);
      height = '48ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 12096) {
      total += e;
      settotalprice(total);
      height = '48ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13396) {
      total += e;
      settotalprice(total);
      height = '48ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 14795) {
      total += e;
      settotalprice(total);
      height = '48ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16095) {
      total += e;
      settotalprice(total);
      height = '48ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 17395) {
      total += e;
      settotalprice(total);
      height = '48ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18695) {
      total += e;
      settotalprice(total);
      height = '48ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 19995) {
      total += e;
      settotalprice(total);
      height = '48ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 21395) {
      total += e;
      settotalprice(total);
      height = '48ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 11496) {
      total += e;
      settotalprice(total);
      height = '50ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 12795) {
      total += e;
      settotalprice(total);
      height = '50ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 14196) {
      total += e;
      settotalprice(total);
      height = '50ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 15495) {
      total += e;
      settotalprice(total);
      height = '50ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16795) {
      total += e;
      settotalprice(total);
      height = '50ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18095) {
      total += e;
      settotalprice(total);
      height = '50ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 19395) {
      total += e;
      settotalprice(total);
      height = '50ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 20795) {
      total += e;
      settotalprice(total);
      height = '50ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 22095) {
      total += e;
      settotalprice(total);
      height = '50ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addRoofCommercial60(e) {
    if (e === 11995) {
      total += e;
      settotalprice(total);
      height = '52ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 13295) {
      total += e;
      settotalprice(total);
      height = '52ft x 24 x 6ft';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 14595) {
      total += e;
      settotalprice(total);
      height = '52ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 15995) {
      total += e;
      settotalprice(total);
      height = '52ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 17295) {
      total += e;
      settotalprice(total);
      height = '52ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 18595) {
      total += e;
      settotalprice(total);
      height = '52ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 19895) {
      total += e;
      settotalprice(total);
      height = '52ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 21195) {
      total += e;
      settotalprice(total);
      height = '52ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 22595) {
      total += e;
      settotalprice(total);
      height = '52ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 12795) {
      total += e;
      settotalprice(total);
      height = '54ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 14195) {
      total += e;
      settotalprice(total);
      height = '54ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 15495) {
      total += e;
      settotalprice(total);
      height = '54ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16795) {
      total += e;
      settotalprice(total);
      height = '54ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 18095) {
      total += e;
      settotalprice(total);
      height = '54ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 19395) {
      total += e;
      settotalprice(total);
      height = '54ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 20795) {
      total += e;
      settotalprice(total);
      height = '54ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 22095) {
      total += e;
      settotalprice(total);
      height = '54ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    } else if (e === 23395) {
      total += e;
      settotalprice(total);
      height = '54ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 13595) {
      total += e;
      settotalprice(total);
      height = '56ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 14895) {
      total += e;
      settotalprice(total);
      height = '56ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16195) {
      total += e;
      settotalprice(total);
      height = '56ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 17495) {
      total += e;
      settotalprice(total);
      height = '56ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18795) {
      total += e;
      settotalprice(total);
      height = '56ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 20195) {
      total += e;
      settotalprice(total);
      height = '56ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 21495) {
      total += e;
      settotalprice(total);
      height = '56ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 22795) {
      total += e;
      settotalprice(total);
      height = '56ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 24095) {
      total += e;
      settotalprice(total);
      height = '56ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 14295) {
      total += e;
      settotalprice(total);
      height = '58ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 15595) {
      total += e;
      settotalprice(total);
      height = '58ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16895) {
      total += e;
      settotalprice(total);
      height = '58ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18195) {
      total += e;
      settotalprice(total);
      height = '58ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 19595) {
      total += e;
      settotalprice(total);
      height = '58ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 20895) {
      total += e;
      settotalprice(total);
      height = '58ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 22195) {
      total += e;
      settotalprice(total);
      height = '58ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 23495) {
      total += e;
      settotalprice(total);
      height = '58ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 24795) {
      total += e;
      settotalprice(total);
      height = '58 x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 14995) {
      total += e;
      settotalprice(total);
      height = '60ft x 20ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 16295) {
      total += e;
      settotalprice(total);
      height = '60ft x 24ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 17595) {
      total += e;
      settotalprice(total);
      height = '60ft x 28ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 18995) {
      total += e;
      settotalprice(total);
      height = '60ft x 32ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 20295) {
      total += e;
      settotalprice(total);
      height = '60ft x 36ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 21595) {
      total += e;
      settotalprice(total);
      height = '60ft x 40ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 22895) {
      total += e;
      settotalprice(total);
      height = '60ft x 44ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 24195) {
      total += e;
      settotalprice(total);
      height = '60ft x 48ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }
    else if (e === 25595) {
      total += e;
      settotalprice(total);
      height = '60ft x 52ft x 6';
      setheightclicked(true);
      console.log(total);
      localStorage.setItem('height', height);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addSideHeight(e) {
    if (e === 440) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 520) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 620) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 700) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 860) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 650) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 775) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 875) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1075) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 660) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 780) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 930) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1050) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1290) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 770) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 910) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1085) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1225) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1505) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 880) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1040) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1240) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1400) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1720) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 990) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1170) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1395) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1575) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1935) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1100) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1300) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1750) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2150) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1210) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1430) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1705) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1925) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2365) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addSideHeightTriple(e) {
    if (e === 440) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 520) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 620) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 700) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 860) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '6ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 650) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 775) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 875) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1075) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '7ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 660) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 780) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 930) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1050) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1290) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft - 9ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 770) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 910) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1085) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1225) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1505) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 880) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1040) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1240) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1400) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1720) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '11ft - 12ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 990) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1170) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1395) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1575) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1935) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '13ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1100) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1300) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1750) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2150) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft - 15ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1210) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1430) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 25ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1705) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 30ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1925) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 35ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2365) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addSideHeightCommercial(e) {
    if (e === 1030) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1235) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1440) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1645) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1850) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2050) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2255) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2460) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2665) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '8ft X 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1175) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1405) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1630) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1870) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2100) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2350) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2580) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2810) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3035) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '10ft X 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1320) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1585) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1851) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2110) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2375) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2640) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2905) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3170) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3430) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '12ft X 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1465) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1755) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2051) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2340) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2635) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2930) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3220) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3515) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3805) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '14ft X 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2040) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2450) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2855) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3265) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3670) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 4080) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 4490) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 4895) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 5305) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '16ft X 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2470) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2970) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3460) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3955) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 4450) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 4945) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 5440) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 5939) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 6425) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '18ft X 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2906) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 3485) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 4065) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 4645) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 5225) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 5810) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 6390) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 6970) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 7550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = '20ft X 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 300) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 20ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 350) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 24ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 400) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 28ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 450) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 32ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 500) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 36ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 40ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 600) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 44ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 650) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 48ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 700) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Two Tones 52ft'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addEachEnd(e) {
    if (e === 540) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '6ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 650) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '6ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 755) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '6ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 865) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '6ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 970) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '6ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 640) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '7ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 725) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '7ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 840) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '7ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 960) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '7ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1075) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '7ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 685) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 815) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 940) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1076) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1200) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 830) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '10ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 980) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '10ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1130) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '10ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1285) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '10ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1435) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '10ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1010) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1201) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1400) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1590) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1790) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1150) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '13ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1370) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '13ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1585) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '13ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1800) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '13ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2015) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '13ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1371) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1625) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1885) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2150) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2405) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1475) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '16ft X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1760) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '16ft X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2040) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '16ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2315) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '16ft X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2600) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = '16ft X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 150) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical End Per End X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 270) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical End Per End X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 300) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical End Per End X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 330) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical End Per End X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 360) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical End Per End X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 200) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End X 12ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 250) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End X 18ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 301) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 350) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End X 22ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 400) {
      total += e;
      eachendtotal += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End X 24ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addBothEnds() {
    total = total + eachendtotal;
    localStorage.setItem('bothends', (eachendtotal * 2));
    setbothEndsClicked(true);
  }

  function removeBothEnds() {
    total = total - eachendtotal;
    let number = localStorage.getItem('bothends') / 2;
    localStorage.setItem('bothends', (number));
    setbothEndsClicked(false);
    eachendtotal = 0;
  }

  function addEachEndTriple(e) {
    if (e === 1250) {
      total += e;
      settotalprice(total);
      eachend = '6ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1390) {
      total += e;
      settotalprice(total);
      eachend = '6ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1530) {
      total += e;
      settotalprice(total);
      eachend = '6ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1350) {
      total += e;
      settotalprice(total);
      eachend = '7ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1500) {
      total += e;
      settotalprice(total);
      eachend = '7ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1645) {
      total += e;
      settotalprice(total);
      eachend = '7ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1555) {
      total += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1715) {
      total += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1870) {
      total += e;
      settotalprice(total);
      eachend = '8ft - 9ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1655) {
      total += e;
      settotalprice(total);
      eachend = '10ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1825) {
      total += e;
      settotalprice(total);
      eachend = '10ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1985) {
      total += e;
      settotalprice(total);
      eachend = '10ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1860) {
      total += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2040) {
      total += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2215) {
      total += e;
      settotalprice(total);
      eachend = '11ft - 12ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1960) {
      total += e;
      settotalprice(total);
      eachend = '13ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2150) {
      total += e;
      settotalprice(total);
      eachend = '13ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2330) {
      total += e;
      settotalprice(total);
      eachend = '13ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2165) {
      total += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2365) {
      total += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2555) {
      total += e;
      settotalprice(total);
      eachend = '14ft - 15ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2270) {
      total += e;
      settotalprice(total);
      eachend = '16ft X 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2470) {
      total += e;
      settotalprice(total);
      eachend = '16ft X 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2670) {
      total += e;
      settotalprice(total);
      eachend = '16ft X 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 450) {
      total += e;
      settotalprice(total);
      eachend = 'Vertical End Per End 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 510) {
      total += e;
      settotalprice(total);
      eachend = 'Vertical End Per End 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 570) {
      total += e;
      settotalprice(total);
      eachend = 'Vertical End Per End 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 451) {
      total += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End 26ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 500) {
      total += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End 28ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 550) {
      total += e;
      settotalprice(total);
      eachend = 'Vertical Two Tone Per End 30ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addEachEndCommercial(e) {
    if (e === 2755) {
      total += e;
      settotalprice(total);
      eachend = '32ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2935) {
      total += e;
      settotalprice(total);
      eachend = '32ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3115) {
      total += e;
      settotalprice(total);
      eachend = '32ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3295) {
      total += e;
      settotalprice(total);
      eachend = '32ft X 14ft Wide'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3475) {
      total += e;
      settotalprice(total);
      eachend = '32ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3655) {
      total += e;
      settotalprice(total);
      eachend = '32ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3835) {
      total += e;
      settotalprice(total);
      eachend = '32ft X 20ft Wide'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 600) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 32ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2875) {
      total += e;
      settotalprice(total);
      eachend = '34ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3055) {
      total += e;
      settotalprice(total);
      eachend = '34ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3235) {
      total += e;
      settotalprice(total);
      eachend = '34ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3415) {
      total += e;
      settotalprice(total);
      eachend = '34ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3595) {
      total += e;
      settotalprice(total);
      eachend = '34ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3775) {
      total += e;
      settotalprice(total);
      eachend = '34ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3955) {
      total += e;
      settotalprice(total);
      eachend = '34ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 625) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 34ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2995) {
      total += e;
      settotalprice(total);
      eachend = '36ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3175) {
      total += e;
      settotalprice(total);
      eachend = '36ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3355) {
      total += e;
      settotalprice(total);
      eachend = '36ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3535) {
      total += e;
      settotalprice(total);
      eachend = '36ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3715) {
      total += e;
      settotalprice(total);
      eachend = '36ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3895) {
      total += e;
      settotalprice(total);
      eachend = '36ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4075) {
      total += e;
      settotalprice(total);
      eachend = '36ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 650) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 36ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3116) {
      total += e;
      settotalprice(total);
      eachend = '38ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3296) {
      total += e;
      settotalprice(total);
      eachend = '38ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3476) {
      total += e;
      settotalprice(total);
      eachend = '38ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3656) {
      total += e;
      settotalprice(total);
      eachend = '38ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3836) {
      total += e;
      settotalprice(total);
      eachend = '38ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4015) {
      total += e;
      settotalprice(total);
      eachend = '38ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4195) {
      total += e;
      settotalprice(total);
      eachend = '38ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 675) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 38ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3236) {
      total += e;
      settotalprice(total);
      eachend = '40ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3416) {
      total += e;
      settotalprice(total);
      eachend = '40ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3596) {
      total += e;
      settotalprice(total);
      eachend = '40ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3776) {
      total += e;
      settotalprice(total);
      eachend = '40ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3956) {
      total += e;
      settotalprice(total);
      eachend = '40ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4135) {
      total += e;
      settotalprice(total);
      eachend = '40ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4315) {
      total += e;
      settotalprice(total);
      eachend = '40ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 700) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 40ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3356) {
      total += e;
      settotalprice(total);
      eachend = '42ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3536) {
      total += e;
      settotalprice(total);
      eachend = '42ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3716) {
      total += e;
      settotalprice(total);
      eachend = '42ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3896) {
      total += e;
      settotalprice(total);
      eachend = '42ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4076) {
      total += e;
      settotalprice(total);
      eachend = '42ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4255) {
      total += e;
      settotalprice(total);
      eachend = '42ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4435) {
      total += e;
      settotalprice(total);
      eachend = '42ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 725) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 42ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3477) {
      total += e;
      settotalprice(total);
      eachend = '44ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3657) {
      total += e;
      settotalprice(total);
      eachend = '44ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3837) {
      total += e;
      settotalprice(total);
      eachend = '44ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4016) {
      total += e;
      settotalprice(total);
      eachend = '44ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4196) {
      total += e;
      settotalprice(total);
      eachend = '44ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4375) {
      total += e;
      settotalprice(total);
      eachend = '44ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4555) {
      total += e;
      settotalprice(total);
      eachend = '44ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 750) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 44ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3597) {
      total += e;
      settotalprice(total);
      eachend = '46ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3777) {
      total += e;
      settotalprice(total);
      eachend = '46ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3957) {
      total += e;
      settotalprice(total);
      eachend = '46ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4137) {
      total += e;
      settotalprice(total);
      eachend = '46ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4316) {
      total += e;
      settotalprice(total);
      eachend = '46ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4495) {
      total += e;
      settotalprice(total);
      eachend = '46ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4675) {
      total += e;
      settotalprice(total);
      eachend = '46ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 775) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 46ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3718) {
      total += e;
      settotalprice(total);
      eachend = '48ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3897) {
      total += e;
      settotalprice(total);
      eachend = '48ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4077) {
      total += e;
      settotalprice(total);
      eachend = '48ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4256) {
      total += e;
      settotalprice(total);
      eachend = '48ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4436) {
      total += e;
      settotalprice(total);
      eachend = '48ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4615) {
      total += e;
      settotalprice(total);
      eachend = '48ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4795) {
      total += e;
      settotalprice(total);
      eachend = '48ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 800) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 48ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3838) {
      total += e;
      settotalprice(total);
      eachend = '50ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4018) {
      total += e;
      settotalprice(total);
      eachend = '50ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4197) {
      total += e;
      settotalprice(total);
      eachend = '50ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4377) {
      total += e;
      settotalprice(total);
      eachend = '50ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4556) {
      total += e;
      settotalprice(total);
      eachend = '50ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4737) {
      total += e;
      settotalprice(total);
      eachend = '50ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4915) {
      total += e;
      settotalprice(total);
      eachend = '50ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 825) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 50ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3958) {
      total += e;
      settotalprice(total);
      eachend = '52ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4138) {
      total += e;
      settotalprice(total);
      eachend = '52ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4318) {
      total += e;
      settotalprice(total);
      eachend = '52ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4498) {
      total += e;
      settotalprice(total);
      eachend = '52ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4678) {
      total += e;
      settotalprice(total);
      eachend = '52ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4855) {
      total += e;
      settotalprice(total);
      eachend = '52ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5035) {
      total += e;
      settotalprice(total);
      eachend = '52ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 850) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 52ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4078) {
      total += e;
      settotalprice(total);
      eachend = '54ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4257) {
      total += e;
      settotalprice(total);
      eachend = '54ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4437) {
      total += e;
      settotalprice(total);
      eachend = '54ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4617) {
      total += e;
      settotalprice(total);
      eachend = '54ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4797) {
      total += e;
      settotalprice(total);
      eachend = '54ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4978) {
      total += e;
      settotalprice(total);
      eachend = '54ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5156) {
      total += e;
      settotalprice(total);
      eachend = '54ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 875) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 54ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4199) {
      total += e;
      settotalprice(total);
      eachend = '56ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4379) {
      total += e;
      settotalprice(total);
      eachend = '56ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4558) {
      total += e;
      settotalprice(total);
      eachend = '56ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4739) {
      total += e;
      settotalprice(total);
      eachend = '56ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4918) {
      total += e;
      settotalprice(total);
      eachend = '56ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5095) {
      total += e;
      settotalprice(total);
      eachend = '56ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5275) {
      total += e;
      settotalprice(total);
      eachend = '56ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 900) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 56ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4320) {
      total += e;
      settotalprice(total);
      eachend = '58ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4499) {
      total += e;
      settotalprice(total);
      eachend = '58ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4679) {
      total += e;
      settotalprice(total);
      eachend = '58ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4858) {
      total += e;
      settotalprice(total);
      eachend = '58ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5036) {
      total += e;
      settotalprice(total);
      eachend = '58ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5215) {
      total += e;
      settotalprice(total);
      eachend = '58ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5395) {
      total += e;
      settotalprice(total);
      eachend = '58ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 925) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 58ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4438) {
      total += e;
      settotalprice(total);
      eachend = '60ft X 8ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4618) {
      total += e;
      settotalprice(total);
      eachend = '60ft X 10ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4798) {
      total += e;
      settotalprice(total);
      eachend = '60ft X 12ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 4979) {
      total += e;
      settotalprice(total);
      eachend = '60ft X 14ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5157) {
      total += e;
      settotalprice(total);
      eachend = '60ft X 16ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5335) {
      total += e;
      settotalprice(total);
      eachend = '60ft X 18ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 5515) {
      total += e;
      settotalprice(total);
      eachend = '60ft X 20ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 950) {
      total += e;
      settotalprice(total);
      eachend = 'Two Tone Per End 60ft'
      seteachendclicked(true);
      eachendtotal += e;
      localStorage.setItem("eachend", eachend);
    }


    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  if (product.title === "Regular Standard") {
    return (
      <>
        <Container>
          <Navbar />
          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>

              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>
              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {/* {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                } */}
              </AddContainer>


              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1 id="dropdownh1">Standard Heights 6'-16' <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">12'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1295)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1595)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1795)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1995)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">18'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu"  >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1395)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1695)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1895)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(2195)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">20'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1696)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1996)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(2395)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(2795)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">22'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1896)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(2295)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(2695)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(3095)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">24'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(1997)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(2495)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(2995)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardRegular(3395)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>

              {/* {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              } */}

              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotal(70)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(90)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(110)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(125)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(145)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(146)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(215)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(275)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(335)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(395)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(216)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(305)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(385)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(460)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(540)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(290)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(396)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(490)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(590)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(685)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(360)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(485)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(600)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(715)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(830)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(575)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(710)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(840)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(970)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(625)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(815)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(995)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1175)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1355)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(695)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(905)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1105)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1300)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1500)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(1775)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2230)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2665)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3095)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3530)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(2015)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2470)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2905)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3335)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3770)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(440)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(620)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(700)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(860)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(550)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(650)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(875)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1075)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(660)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(780)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1050)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1290)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(770)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(910)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1085)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1225)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1505)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(880)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1040)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1240)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1400)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1720)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(990)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1170)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1395)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1575)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1935)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1100)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1300)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1550)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1750)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(2150)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1210)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1430)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1705)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1925)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(2365)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
                  <li>
                    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
                    <ul className="sub-menu">
                      <li>
                        <h1 id="dropdownh1">6' - 10' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">11' - 15' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">16' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>

                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(540)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(650)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(755)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(865)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(970)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(640)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(725)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(840)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(960)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1075)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(685)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(815)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(940)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1076)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1200)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(830)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(980)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1130)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1285)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1435)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1010)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1201)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1400)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1590)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1790)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1150)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1370)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1585)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1800)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2015)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1371)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1625)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1885)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2150)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2405)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1475)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1760)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2040)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2315)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2600)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical End Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(150)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(270)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(300)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(330)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(360)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical Two Tone Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(200)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(250)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(301)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(350)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(400)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}


                </FilterContainer>
                : <></>
              }
              {/* <div className="mapdiv" style={{ textAlign: 'center', justifyContent: 'center' }}> */}

              {/* <br />
              <Photos galleryImages={gallery} style={{ marginTop: '-20px' }} /> */}

              {/* </div> */}
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
 
 <Photos  galleryImages={galleryImagesTwo} /> 

  
<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )
  } else if (product.title === "Boxed Eave Standard") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>

              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1 id="dropdownh1">Standard Heights 6'-16' <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">12'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(1395)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(1795)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2195)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2495)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">18'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(1595)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(1895)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2295)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2695)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">20'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(1796)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2196)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2696)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(3095)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">22'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(1995)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2496)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(3096)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(3595)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">24'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2296)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(2795)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(3395)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardBoxed(3995)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>



              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotal(70)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(90)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(110)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(125)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(145)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(146)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(215)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(275)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(335)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(395)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(216)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(305)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(385)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(460)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(540)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(290)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(396)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(490)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(590)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(685)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(360)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(485)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(600)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(715)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(830)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(575)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(710)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(840)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(970)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(625)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(815)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(995)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1175)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1355)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(695)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(905)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1105)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1300)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1500)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(1775)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2230)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2665)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3095)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3530)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(2015)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2470)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2905)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3335)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3770)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(440)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(620)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(700)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(860)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(550)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(650)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(875)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1075)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(660)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(780)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1050)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1290)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(770)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(910)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1085)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1225)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1505)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(880)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1040)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1240)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1400)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1720)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(990)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1170)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1395)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1575)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1935)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1100)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1300)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1550)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1750)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(2150)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1210)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1430)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1705)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1925)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(2365)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
  <li>
    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
    <ul className="sub-menu">
      <li>
        <h1 id="dropdownh1">6' - 10' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">11' - 15' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">16' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(540)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(650)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(755)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(865)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(970)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(640)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(725)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(840)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(960)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1075)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(685)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(815)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(940)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1076)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1200)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(830)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(980)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1130)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1285)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1435)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1010)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1201)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1400)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1590)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1790)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1150)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1370)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1585)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1800)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2015)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1371)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1625)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1885)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2150)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2405)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1475)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1760)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2040)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2315)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2600)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical End Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(150)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(270)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(300)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(330)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(360)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical Two Tone Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(200)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(250)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(301)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(350)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(400)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}

                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )
  } else if (product.title === "Vertical Standard") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>
              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>

              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1 id="dropdownh1">Standard Heights 6'-16' <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">12'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(1695)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2095)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2495)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2895)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3395)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3790)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4190)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">18'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(1795)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2195)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2695)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3095)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3595)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3990)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4390)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">20'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(1995)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2496)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3096)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3596)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4095)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4490)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4990)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">22'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2395)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2995)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3597)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4195)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4795)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(5390)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(5990)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">24'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(2497)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3097)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(3795)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4395)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(4995)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(5590)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardVertical(6190)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>

              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotal(70)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(90)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(110)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(125)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(145)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(146)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(215)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(275)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(335)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(395)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(216)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(305)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(385)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(460)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(540)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(290)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(396)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(490)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(590)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(685)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(360)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(485)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(600)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(715)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(830)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(575)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(710)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(840)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(970)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(625)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(815)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(995)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1175)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1355)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(695)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(905)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1105)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1300)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(1500)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(1775)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2230)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2665)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3095)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3530)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotal(2015)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2470)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(2905)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3335)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotal(3770)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(440)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(620)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(700)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(860)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(550)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(650)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(875)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1075)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(660)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(780)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1050)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1290)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(770)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(910)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1085)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1225)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1505)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(880)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1040)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1240)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1400)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1720)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(990)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1170)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1395)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1575)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1935)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1100)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1300)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1550)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1750)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(2150)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1210)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1430)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1705)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(1925)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeight(2365)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
                  <li>
                    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
                    <ul className="sub-menu">
                      <li>
                        <h1 id="dropdownh1">6' - 10' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">11' - 15' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">16' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(540)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(650)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(755)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(865)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(970)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(640)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(725)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(840)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(960)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1075)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(685)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(815)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(940)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1076)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1200)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(830)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(980)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1130)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1285)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1435)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1010)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1201)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1400)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1590)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1790)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1150)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1370)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1585)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1800)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2015)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1371)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1625)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1885)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2150)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2405)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1475)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(1760)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2040)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2315)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(2600)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical End Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(150)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(270)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(300)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(330)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(360)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical Two Tone Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(200)} className="btn">12' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(250)} className="btn">18' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(301)} className="btn">20' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(350)} className="btn">22' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEnd(400)} className="btn">24' WIDE</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}

                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )

  } else if (product.title === "Horse Barn") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>

              <Newsletter />

              {/* <AddContainer>
                <Price>Total Price $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer> */}
            </InfoContainer>
          </Wrapper>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )
  } else if (product.title === "Carolina Barn") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>

              <Newsletter />

              {/* <AddContainer>
  <Price>Total Price $ {total}</Price>
  <br />
  <br />
  {addedtocart ?
    <>
      <br />
      <Button onClick={handleClick}>ADD TO CART</Button>
      <br />
      <br />
      <Button onClick={clear}>CLEAR</Button>
    </>


    :
    <></>
  }

  {addedtocart ?
    <></>
    :
    <>
      <br />
      <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
        <Button onClick={handleDelete}>GO TO CART</Button>
      </Link>
      <br />
      <br />
      <Button onClick={goBack}>GO BACK</Button>
    </>
  }
</AddContainer> */}
            </InfoContainer>
          </Wrapper>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )

  } else if (product.title === "Seneca Barn") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>


              <Newsletter />

              {/* <AddContainer>
  <Price>Total Price $ {total}</Price>
  <br />
  <br />
  {addedtocart ?
    <>
      <br />
      <Button onClick={handleClick}>ADD TO CART</Button>
      <br />
      <br />
      <Button onClick={clear}>CLEAR</Button>
    </>


    :
    <></>
  }

  {addedtocart ?
    <></>
    :
    <>
      <br />
      <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
        <Button onClick={handleDelete}>GO TO CART</Button>
      </Link>
      <br />
      <br />
      <Button onClick={goBack}>GO BACK</Button>
    </>
  }
</AddContainer> */}
            </InfoContainer>
          </Wrapper>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )
  } else if (product.title === "Regular Triple") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>
              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>

              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1 id="dropdownh1">Standard Heights 6'-16' <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">26'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(2795)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(3395)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(4095)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(4795)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">28'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(2895)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(3595)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(4295)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(4995)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">30'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(2995)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(3695)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(4495)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofStandardTriple(5195)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>

              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(110)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(130)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(155)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(180)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(205)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(215)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(265)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(310)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(360)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(410)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(325)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(395)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(470)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(540)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(610)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(530)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(625)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(720)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(815)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(541)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(660)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(780)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(900)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1020)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(840)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(995)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1140)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1295)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1440)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1190)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1370)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1955)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2245)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1296)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1500)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2135)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2450)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1920)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2280)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2640)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3120)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3600)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2160)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2880)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3360)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3840)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(440)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(620)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(700)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(860)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(550)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(650)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(875)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1075)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(660)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(780)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1050)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1290)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(770)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(910)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1085)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1225)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1505)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(880)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1040)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1240)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1400)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1720)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(990)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1170)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1395)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1575)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1935)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1100)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1300)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1550)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1750)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(2150)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1210)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1430)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1705)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1925)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(2365)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
                  <li>
                    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
                    <ul className="sub-menu">
                      <li>
                        <h1 id="dropdownh1">6' - 10' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">11' - 15' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">16' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1250)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1390)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1530)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1350)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1500)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1645)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1555)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1715)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1870)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1655)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1825)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1985)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1860)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2040)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2215)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1960)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2150)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2330)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2165)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2365)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2555)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2270)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2470)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2670)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical End Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(450)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(510)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(570)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical Two Tone Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(451)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(500)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(550)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}
                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )

  } else if (product.title === "Boxed Eave Triple") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>

              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1 id="dropdownh1">Standard Heights 6'-16' <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">26'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(2895)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(3595)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(4295)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(4995)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">28'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(2995)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(3695)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(4495)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(5195)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">30'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu" >
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(3095)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(3895)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(4695)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleBoxed(5495)} className="btn">35' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>

              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(110)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(130)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(155)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(180)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(205)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(215)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(265)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(310)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(360)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(410)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(325)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(395)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(470)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(540)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(610)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(530)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(625)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(720)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(815)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(541)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(660)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(780)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(900)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1020)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(840)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(995)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1140)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1295)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1440)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1190)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1370)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1955)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2245)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1296)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1500)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2135)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2450)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1920)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2280)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2640)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3120)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3600)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2160)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2880)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3360)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3840)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(440)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(620)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(700)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(860)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(550)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(650)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(875)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1075)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(660)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(780)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1050)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1290)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(770)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(910)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1085)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1225)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1505)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(880)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1040)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1240)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1400)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1720)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(990)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1170)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1395)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1575)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1935)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1100)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1300)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1550)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1750)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(2150)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1210)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1430)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1705)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1925)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(2365)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
  <li>
    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
    <ul className="sub-menu">
      <li>
        <h1 id="dropdownh1">6' - 10' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">11' - 15' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">16' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1250)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1390)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1530)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1350)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1500)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1645)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1555)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1715)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1870)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1655)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1825)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1985)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1860)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2040)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2215)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1960)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2150)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2330)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2165)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2365)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2555)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2270)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2470)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2670)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical End Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(450)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(510)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(570)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical Two Tone Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(451)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(500)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(550)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}
                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )

  } else if (product.title === "Vertical Triple") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>

              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1 id="dropdownh1">Standard Heights 6'-16' <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">26'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(3195)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(3995)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(4895)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(5695)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(6495)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(7190)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(7990)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">28'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(3395)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(4195)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(4995)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(5895)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(6695)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(7590)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(8390)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">30'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(3495)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(4295)} className="btn">25' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(5195)} className="btn">30' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(6095)} className="btn">35' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(6995)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(7790)} className="btn">45' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofTripleVertical(8590)} className="btn">50' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>

              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(110)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(130)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(155)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(180)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(205)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(215)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(265)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(310)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(360)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(410)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(325)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(395)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(470)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(540)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(610)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(530)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(625)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(720)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(815)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(541)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(660)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(780)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(900)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1020)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(840)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(995)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1140)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1295)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1440)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1190)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1370)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1955)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2245)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1296)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1500)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2135)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2450)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(1920)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2280)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2640)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3120)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3600)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu" >
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2160)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(2880)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3360)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalTriple(3840)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(440)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(520)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(620)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(700)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(860)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(550)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(650)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(775)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(875)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1075)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(660)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(780)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(930)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1050)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1290)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(770)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(910)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1085)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1225)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1505)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(880)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1040)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1240)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1400)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1720)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(990)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1170)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1395)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1575)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1935)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1100)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1300)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1550)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1750)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(2150)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1210)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1430)} className="btn">25' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1705)} className="btn">30' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(1925)} className="btn">35' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightTriple(2365)} className="btn">40' LONG</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
  <li>
    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
    <ul className="sub-menu">
      <li>
        <h1 id="dropdownh1">6' - 10' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">11' - 15' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">16' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">6' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1250)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1390)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1530)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">7' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1350)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1500)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1645)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">8' - 9' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1555)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1715)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1870)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1655)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1825)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1985)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">11' - 12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1860)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2040)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2215)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">13' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(1960)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2150)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2330)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' - 15' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2165)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2365)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2555)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2270)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2470)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(2670)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical End Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(450)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(510)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(570)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Vertical Two Tone Per End
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(451)} className="btn">26' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(500)} className="btn">28' WIDE</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndTriple(550)} className="btn">30' WIDE</button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}
                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>


          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )
  } else if (product.title === "32' to 40' Wide Commercial") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>
              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>

              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1>Certified 140ph/30psf</h1>
                        <h1 id="dropdownh1">32' to 40' Wide / 8' to 20' Tall <i className="fas fa-caret-down"></i></h1>

                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">32'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(6795)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(7995)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(9195)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(10395)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(11595)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(12795)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(13995)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(15195)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(16395)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">34'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(7195)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(8495)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(9695)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(10995)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(12195)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(13495)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(14795)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(15995)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(17295)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">36'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(7695)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(8895)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(10195)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(11495)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(12695)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(13996)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(15196)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(16495)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(17795)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">38'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(8195)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(9395)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(10695)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(11895)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(13195)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(14495)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(15695)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(16995)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(18195)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">40'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(8795)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(9995)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(11295)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(12495)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(13795)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(15095)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(16295)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(17595)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial40(18795)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>


              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(520)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(605)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(690)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(780)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(865)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(950)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1035)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1125)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(866)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1036)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1210)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1380)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1555)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1730)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1900)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2075)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2245)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1535)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1845)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2150)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2460)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2765)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3070)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3380)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3685)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3995)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2450)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2895)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3340)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3785)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4235)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4680)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5125)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5575)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6020)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">18' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3360)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3840)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4320)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4800)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5280)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5760)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6240)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6720)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7200)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">20' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3790)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4470)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5115)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5830)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6510)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7190)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7865)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(8545)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(9225)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>


                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1030)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1235)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1440)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1645)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1850)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2050)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2255)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2460)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2665)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1175)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1405)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1630)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1870)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2100)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2350)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2580)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2810)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3035)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1320)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1585)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1851)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2110)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2375)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2640)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2905)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3170)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3430)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1465)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1755)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2051)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2340)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2635)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2930)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3220)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3515)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3805)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2040)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2450)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2855)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3265)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3670)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4080)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4490)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4895)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5305)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">18' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2470)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2970)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3460)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3955)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4450)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4945)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5440)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5939)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6425)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">20' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2906)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3485)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4065)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4645)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5225)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5810)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6390)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6970)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(7550)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Two Tone (Both Sides)
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(300)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(350)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(400)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(450)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(500)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(550)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(600)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(650)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(700)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>


                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
                  <li>
                    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
                    <ul className="sub-menu">
                      <li>
                        <h1 id="dropdownh1">6' - 10' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">11' - 15' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">16' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">32' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2755)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2935)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3115)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3295)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3475)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3655)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3835)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(600)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">34' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2875)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3055)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3235)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3415)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3595)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3775)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3955)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(625)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">36' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2995)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3175)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3355)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3535)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3715)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3895)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4075)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(650)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">38' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3116)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3296)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3476)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3656)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3836)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4015)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4195)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(675)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">40' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3236)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3416)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3596)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3776)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3956)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4135)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4315)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(700)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">42' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3356)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3536)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3716)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3896)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4076)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4255)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4435)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(725)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">44' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3477)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3657)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3837)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4016)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4196)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4375)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4555)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(750)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">46' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3597)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3777)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3957)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4137)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4316)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4495)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4675)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(775)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">48' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3718)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3897)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4077)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4256)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4436)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4615)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4795)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(800)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">50' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3838)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4018)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4197)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4377)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4556)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4737)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4915)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(825)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">52' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3958)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4138)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4318)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4498)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4678)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4855)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5035)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(850)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">54' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4078)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4257)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4437)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4617)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4797)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4978)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5156)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(875)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">56' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4199)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4379)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4558)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4739)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4918)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5095)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5275)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(900)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">58' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4320)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4499)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4679)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4858)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5036)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5215)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5395)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(925)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">60' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4438)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4618)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4798)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4979)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5157)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5335)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5515)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(950)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}
                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>

          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>

          <Announcement />
        </Container>

        <Products />

        <Footer />
      </>
    )

  } else if (product.title === "42' to 50' Wide Commercial") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>

              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1>Certified 140ph/30psf</h1>
                        <h1 id="dropdownh1">42' to 50' Wide / 8' to 20' Tall <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">42'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(9095)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(10395)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(11595)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(12895)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(14195)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(15395)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(16695)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(17895)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(19195)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">44'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(9595)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(10895)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(12095)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(13395)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(14595)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(15895)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(17195)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(18395)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(19695)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">46'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(10195)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(11495)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(12695)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(13995)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(15195)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(16495)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(17795)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(18995)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(20295)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">48'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(10795)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(12096)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(13396)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(14795)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(16095)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(17395)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(18695)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(19995)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(21395)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">50'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(11496)} className="btn">20' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(12795)} className="btn">24' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(14196)} className="btn">28' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(15495)} className="btn">32' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(16795)} className="btn">36' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(18095)} className="btn">40' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(19395)} className="btn">44' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(20795)} className="btn">48' LONG'</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial50(22095)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>


              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(520)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(605)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(690)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(780)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(865)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(950)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1035)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1125)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(866)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1036)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1210)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1380)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1555)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1730)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1900)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2075)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2245)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1535)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1845)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2150)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2460)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2765)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3070)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3380)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3685)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3995)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2450)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2895)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3340)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3785)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4235)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4680)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5125)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5575)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6020)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">18' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3360)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3840)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4320)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4800)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5280)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5760)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6240)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6720)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7200)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">20' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3790)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4470)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5115)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5830)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6510)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7190)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7865)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(8545)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(9225)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>


                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1030)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1235)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1440)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1645)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1850)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2050)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2255)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2460)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2665)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1175)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1405)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1630)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1870)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2100)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2350)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2580)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2810)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3035)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1320)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1585)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1851)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2110)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2375)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2640)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2905)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3170)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3430)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1465)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1755)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2051)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2340)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2635)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2930)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3220)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3515)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3805)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2040)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2450)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2855)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3265)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3670)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4080)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4490)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4895)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5305)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">18' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2470)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2970)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3460)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3955)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4450)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4945)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5440)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5939)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6425)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">20' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2906)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3485)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4065)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4645)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5225)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5810)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6390)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6970)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(7550)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Two Tone (Both Sides)
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(300)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(350)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(400)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(450)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(500)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(550)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(600)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(650)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(700)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>


                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
  <li>
    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
    <ul className="sub-menu">
      <li>
        <h1 id="dropdownh1">6' - 10' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">11' - 15' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">16' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">32' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2755)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2935)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3115)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3295)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3475)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3655)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3835)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(600)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">34' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2875)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3055)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3235)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3415)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3595)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3775)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3955)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(625)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">36' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2995)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3175)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3355)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3535)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3715)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3895)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4075)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(650)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">38' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3116)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3296)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3476)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3656)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3836)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4015)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4195)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(675)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">40' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3236)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3416)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3596)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3776)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3956)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4135)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4315)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(700)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">42' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3356)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3536)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3716)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3896)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4076)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4255)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4435)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(725)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">44' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3477)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3657)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3837)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4016)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4196)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4375)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4555)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(750)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">46' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3597)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3777)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3957)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4137)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4316)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4495)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4675)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(775)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">48' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3718)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3897)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4077)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4256)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4436)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4615)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4795)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(800)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">50' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3838)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4018)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4197)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4377)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4556)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4737)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4915)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(825)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">52' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3958)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4138)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4318)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4498)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4678)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4855)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5035)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(850)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">54' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4078)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4257)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4437)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4617)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4797)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4978)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5156)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(875)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">56' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4199)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4379)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4558)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4739)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4918)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5095)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5275)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(900)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">58' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4320)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4499)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4679)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4858)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5036)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5215)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5395)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(925)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">60' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4438)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4618)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4798)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4979)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5157)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5335)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5515)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(950)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}
                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )
  } else if (product.title === "52' to 60' Wide Commercial") {
    return (
      <>
        <Container>
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Desc>Prices are subject to change with add ons.</Desc>

              {addedtocart ?
                <div style={{ margin: '20px' }}>

                  <FilterTitle>Select Sizes</FilterTitle>
                </div> :
                <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    {/* <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br /> */}
                    <Button onClick={clear}>CLEAR</Button>
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
              <FilterContainer >
                {heightclicked ?
                  <Filter>
                    <FilterTitle>{height}</FilterTitle>
                    <></>
                  </Filter>
                  :
                  <Filter>
                    {/* <FilterTitle>Side Height</FilterTitle> */}

                    <ul className="nav-listtwo">
                      <li>
                        <h1>Certified 140ph/30psf</h1>
                        <h1 id="dropdownh1">52' to 60' Wide / 8' to 20' Tall <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li>
                            <h1 id="dropdownh1">52'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(11995)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(13295)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(14595)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(15995)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(17295)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(18595)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(19895)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(21195)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(22595)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">54'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(12795)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(14195)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(15495)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(16795)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(18095)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(19395)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(20795)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(22095)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(23395)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">56'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(13595)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(14895)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(16195)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(17495)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(18795)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(20195)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(21495)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(22795)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(24095)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">58'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(14295)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(15595)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(16895)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(18195)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(19595)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(20895)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(22195)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(23495)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(24795)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <h1 id="dropdownh1">60'
                              <i className="fas fa-caret-down"></i></h1>
                            <ul className="sub-menu">
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(14995)} className="btn">20' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(16295)} className="btn">24' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(17595)} className="btn">28' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(18995)} className="btn">32' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(20295)} className="btn">36' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(21595)} className="btn">40' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(22895)} className="btn">44' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(24195)} className="btn">48' LONG</button>
                              </li>
                              <li className="listitem">
                                <button onClick={() => addRoofCommercial60(25595)} className="btn">52' LONG</button>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Filter>
                }
              </FilterContainer>

              {addedtocart ?

                <FilterContainer>
                  {clicked ?
                    <Filter>
                      <FilterTitle>Side Height : {sideheight}</FilterTitle>
                      <></>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Side Height</FilterTitle> */}

                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Side Height <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(430)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(520)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(605)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(690)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(780)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(865)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(950)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1035)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1125)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(866)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1036)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1210)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1380)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1555)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1730)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1900)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2075)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2245)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1535)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(1845)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2150)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2460)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2765)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3070)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3380)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3685)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3995)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2450)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(2895)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3340)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3785)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4235)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4680)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5125)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5575)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6020)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">18' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3360)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3840)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4320)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4800)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5280)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5760)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6240)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6720)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7200)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">20' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(3790)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(4470)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5115)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(5830)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(6510)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7190)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(7865)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(8545)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addTotalCommercial(9225)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>


                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {bothsidesclicked ?
                    <Filter>
                      <FilterTitle>Both Sides Closed : {bothsidesclosed}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Both Sides Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Both Sides Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">8' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1030)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1235)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1440)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1645)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1850)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2050)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2255)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2460)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2665)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">10' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1175)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1405)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1630)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1870)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2100)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2350)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2580)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2810)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3035)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">12' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1320)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1585)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1851)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2110)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2375)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2640)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2905)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3170)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3430)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">14' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1465)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(1755)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2051)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2340)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2635)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2930)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3220)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3515)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3805)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">16' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2040)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2450)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2855)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3265)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3670)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4080)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4490)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4895)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5305)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">18' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2470)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2970)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3460)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3955)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4450)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4945)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5440)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5939)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6425)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">20' Tall
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(2906)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(3485)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4065)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(4645)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5225)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(5810)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6390)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(6970)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(7550)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">Two Tone (Both Sides)
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(300)} className="btn">20' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(350)} className="btn">24' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(400)} className="btn">28' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(450)} className="btn">32' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(500)} className="btn">36' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(550)} className="btn">40' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(600)} className="btn">44' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(650)} className="btn">48' LONG</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addSideHeightCommercial(700)} className="btn">52' LONG</button>
                                </li>
                              </ul>
                            </li>


                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }
                  {verticalsidesclicked ?
                    <Filter>
                      <FilterTitle>Vertical Sides : {verticalsides}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Vertical Sides Both Sides</FilterTitle> */}
                      {/* <ul className="nav-listtwo">
  <li>
    <h1 id="dropdownh1">Both Sides Closed<i className="fas fa-caret-down"></i></h1>
    <ul className="sub-menu">
      <li>
        <h1 id="dropdownh1">6' - 10' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(450)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(525)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(675)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">11' - 15' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(600)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(713)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(825)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(934)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
      <li>
        <h1 id="dropdownh1">16' Tall
          <i className="fas fa-caret-down"></i></h1>
        <ul className="sub-menu">
          <li className="listitem">
            <button onClick={() => addVerticalSides(750)} className="btn">20' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(900)} className="btn">25' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1050)} className="btn">30' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1200)} className="btn">35' LONG</button>
          </li>
          <li className="listitem">
            <button onClick={() => addVerticalSides(1350)} className="btn">40' LONG</button>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul> */}
                    </Filter>
                  }
                  {eachendclicked ?
                    <Filter>
                      <FilterTitle>Each End Closed : {eachend}</FilterTitle>
                    </Filter>
                    :
                    <Filter>
                      {/* <FilterTitle>Each End Closed</FilterTitle> */}
                      <ul className="nav-listtwo">
                        <li>
                          <h1 id="dropdownh1">Each End Closed <i className="fas fa-caret-down"></i></h1>
                          <ul className="sub-menu">
                            <li>
                              <h1 id="dropdownh1">32' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2755)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2935)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3115)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3295)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3475)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3655)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3835)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(600)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">34' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2875)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3055)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3235)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3415)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3595)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3775)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3955)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(625)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">36' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(2995)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3175)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3355)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3535)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3715)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3895)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4075)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(650)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">38' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3116)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3296)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3476)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3656)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3836)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4015)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4195)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(675)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">40' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3236)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3416)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3596)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3776)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3956)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4135)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4315)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(700)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">42' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3356)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3536)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3716)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3896)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4076)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4255)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4435)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(725)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">44' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3477)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3657)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3837)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4016)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4196)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4375)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4555)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(750)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">46' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3597)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3777)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3957)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4137)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4316)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4495)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4675)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(775)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">48' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3718)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3897)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4077)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4256)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4436)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4615)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4795)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(800)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">50' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3838)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4018)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4197)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4377)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4556)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4737)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4915)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(825)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">52' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(3958)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4138)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4318)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4498)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4678)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4855)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5035)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(850)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">54' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4078)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4257)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4437)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4617)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4797)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4978)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5156)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(875)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">56' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4199)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4379)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4558)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4739)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4918)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5095)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5275)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(900)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">58' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4320)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4499)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4679)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4858)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5036)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5215)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5395)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(925)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <h1 id="dropdownh1">60' Wide
                                <i className="fas fa-caret-down"></i></h1>
                              <ul className="sub-menu">
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4438)} className="btn">8' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4618)} className="btn">10' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4798)} className="btn">12' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(4979)} className="btn">14' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5157)} className="btn">16' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5335)} className="btn">18' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(5515)} className="btn">20' Tall</button>
                                </li>
                                <li className="listitem">
                                  <button onClick={() => addEachEndCommercial(950)} className="btn">Two Tone 'Per End'</button>
                                </li>
                              </ul>
                            </li>

                          </ul>
                        </li>
                      </ul>
                    </Filter>
                  }

                  {eachendtotal > 0 && eachendclicked === true ? <Button onClick={addBothEnds}>Get Both Ends Closed</Button> : <></>}

                  {bothEndsClicked === true ? <Button onClick={removeBothEnds}>Remove Both Ends Closed</Button> : <></>}
                </FilterContainer>
                : <></>
              }
              <AddContainer style={{ textAlign: 'center' }}>
                <Price>Total $ {total}</Price>
                <br />
                <br />
                {addedtocart ?
                  <>
                    <br />
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    <br />
                    <br />
                    {/* <Button onClick={clear}>CLEAR</Button> */}
                  </>


                  :
                  <></>
                }

                {addedtocart ?
                  <></>
                  :
                  <>
                    <br />
                    <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
                      <Button onClick={handleDelete}>GO TO CART</Button>
                    </Link>
                    <br />
                    <br />
                    <Button onClick={goBack}>GO BACK</Button>
                  </>
                }
              </AddContainer>
            </InfoContainer>
          </Wrapper>

          <InfoContainer>

<br/>
<br/>
<br/>
<br/>

          <Title>View our price brochures below.</Title>
          <br/>

<br/>
<br/>
<br/>
        <Photos  galleryImages={galleryImagesTwo} /> 
        <br/>

<br/>
<br/>
          </InfoContainer>
          <Announcement />
        </Container>
        <Products />

        <Footer />
      </>
    )

  }
}

export default Product;