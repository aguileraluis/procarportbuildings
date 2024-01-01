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
import { Link } from 'react-router-dom';

let total = 0;
let salestax = 0;
let sideheight = '';
let bothsidesclosed = '';
let verticalsides = '';
let eachend = '';

const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  text-align: center;
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px !important;
  padding: 1px;
`;

const Desc = styled.p`
  margin: 10px 0px;
  font-size: 25px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;

const FilterContainer = styled.div`
 display: grid;
 text-align: center;
  grid-template-columns: repeat(2, 2fr);
  /* margin-left: 11% !important;
  margin-right: 11% !important; */
  margin-top: 2% !important;
  margin-bottom: 1% !important;
  justify-content: center;
  gap: 15px;
  ${mobile({ marginBottom: '2px', display: 'grid', justifyContent: 'center', textAlign: 'center',   borderRadius: '10px'})}
`;

const Filter = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  

`;

const FilterTitle = styled.span`
  text-align: center;
  font-size: 20px;
  font-weight: 200;
  width: 100%;
  color: white;
  padding: 10px;
  border-radius: 20px;
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
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
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
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
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
  const [clicked, setclicked] = useState(false);
  const [bothsidesclicked, setbothsidesclicked] = useState(false);
  const [verticalsidesclicked, setverticalsidesclicked] = useState(false);
  const [eachendclicked, seteachendclicked] = useState(false);
  const [ addedtocart, setaddedtocart ] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
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
    setclicked(false)
    setbothsidesclicked(false);
    setverticalsidesclicked(false);
    seteachendclicked(false);
  }

  function addTotal(e) {
    if (e === 138) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 7ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 163) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 7ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 194) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 7ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 225) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 7ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 256) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 7ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 269) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 8ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 331) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 8ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 388) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 8ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 450) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 8ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 513) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 8ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 406) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 9ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 493) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 9ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 588) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 9ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 675) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 9ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 763) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 9ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 538) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 10ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 663) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 10ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 781) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 10ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 900) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 10ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1019) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 10ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 675) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 11ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 825) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 11ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 975) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 11ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1125) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 11ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1275) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 11ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 1050) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 12ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1244) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 12ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1425) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 12ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1619) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 12ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1800) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 12ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 1488) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 13ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1713) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 13ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2219) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 13ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2444) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 13ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2806) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 13ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 1619) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 14ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 1875) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 14ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2413) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 14ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2669) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 14ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3063) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 14ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 2400) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 15ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 2850) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 15ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3300) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 15ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3900) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 15ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4500) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 15ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    else if (e === 2700) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 16ft X 20ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3150) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 16ft X 25ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 3600) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 16ft X 30ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4200) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 16ft X 35ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    } else if (e === 4800) {
      total += e;
      settotalprice(total);
      sideheight = 'Side Height = 16ft X 40ft';
      setclicked(true);
      console.log(total);
      localStorage.setItem('sideheight', sideheight);
    }
    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addSideHeight(e) {
    if (e === 550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 6ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 650) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 6ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 775) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 6ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 875) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 6ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1075) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 6ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 688) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 7ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 813) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 7ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 969) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 7ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1094) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 7ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1344) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 7ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 825) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 8ft - 9ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 975) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 8ft - 9ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1163) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 8ft - 9ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1313) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 8ft - 9ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1613) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 8ft - 9ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 963) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 10ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1138) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 10ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1356) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 10ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1531) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 10ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1881) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 10ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1100) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 11ft - 12ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1300) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 11ft - 12ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1550) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 11ft - 12ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1750) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 11ft - 12ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2150) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 11ft - 12ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1238) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 13ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1463) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 13ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1744) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 13ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1969) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 13ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2419) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 13ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1375) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 14ft - 15ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1625) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 14ft - 15ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1938) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 14ft - 15ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2188) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 14ft - 15ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2688) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 14ft - 15ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1513) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 16ft X 20ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 1788) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 16ft X 25ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2131) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 16ft X 30ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2406) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 16ft X 35ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    else if (e === 2956) {
      total += e;
      settotalprice(total);
      bothsidesclosed = 'Both Sides Closed = 16ft X 40ft Long'
      setbothsidesclicked(true);
      console.log(total);
      localStorage.setItem("bothsidesclosed", bothsidesclosed);
    }
    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addVerticalSides(e) {
    if (e === 450) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 6ft - 10ft X 20ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 525) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 6ft - 10ft X 25ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 600) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 6ft - 10ft X 30ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 675) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 6ft - 10ft X 35ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 750) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 6ft - 10ft X 40ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 600) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 11ft - 15ft X 20ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 713) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 11ft - 15ft X 25ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 825) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 11ft - 15ft X 30ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 934) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 11ft - 15ft X 35ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 1050) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 11ft - 15ft X 40ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 750) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 16ft X 20ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 900) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 16ft X 25ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 1060) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 16ft X 30ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 1200) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 16ft X 35ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    else if (e === 1350) {
      total += e;
      settotalprice(total);
      verticalsides = 'Vertical Sides (Both) = 16ft X 40ft Long'
      setverticalsidesclicked(true);
      console.log(total);
      localStorage.setItem('verticalsides', verticalsides);
    }
    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  function addEachEnd(e) {
    if (e === 1563) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 6ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1738) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 6ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1913) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 6ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1688) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 7ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1875) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 7ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2056) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 7ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 1952) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 8ft - 9ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2144) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 8ft - 9ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2338) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 8ft - 9ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2069) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 10ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2281) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 10ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2481) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 10ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2325) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 11ft - 12ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2550) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 11ft - 12ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2769) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 11ft - 12ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2450) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 13ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2688) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 13ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2913) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 13ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2706) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 14ft - 15ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2956) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 14ft - 15ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3194) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 14ft - 15ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 2838) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 16ft X 20ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3088) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 16ft X 28ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }
    else if (e === 3338) {
      total += e;
      settotalprice(total);
      eachend = 'Each End Closed = 16ft X 30ft Wide'
      seteachendclicked(true);
      console.log(total);
      localStorage.setItem("eachend", eachend);
    }

    let tax = (total * 0.0675);
    let newtax = tax.toFixed(2);
    salestax = newtax;
    settaxes(salestax);

  };

  return (
    <>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>

           
            <FilterContainer >
              {/* <Filter>
                <FilterTitle>Roof</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter> */} 
          
            </FilterContainer>

           { addedtocart ? 
                <div style={{margin: '20px'}}>
            
                <FilterTitle>Select Sizes</FilterTitle>
                </div> : 
                <></>
          }
       
            { addedtocart ? 
          
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
                            <button onClick={() => addTotal(138)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(163)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(194)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(225)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(256)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">8' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(269)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(331)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(388)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(450)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(513)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">9' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(406)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(493)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(588)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(675)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(763)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">10' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(538)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(663)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(781)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(900)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1019)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">11' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(675)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(825)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(975)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1125)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1275)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">12' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(1050)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1244)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1425)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1619)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1800)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">13' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(1488)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1713)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(2219)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(2444)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(2806)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">14' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(1619)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(1875)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(2413)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(2669)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(3063)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">15' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(2400)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(2850)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(3300)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(3900)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(4500)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">16' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu" >
                          <li className="listitem">
                            <button onClick={() => addTotal(2700)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(3150)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(3600)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(4200)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addTotal(4800)} className="btn">40' LONG</button>
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
                        <h1 id="dropdownh1">7' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addSideHeight(688)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(813)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(969)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1094)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1344)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">8' - 9' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addSideHeight(825)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(975)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1163)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1313)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1613)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">10' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addSideHeight(963)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1138)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1356)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1531)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1881)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">11' - 12' Tall
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
                        <h1 id="dropdownh1">13' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1238)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1463)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1744)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1969)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(2419)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">14' - 15' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1375)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1625)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1938)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(2188)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(2688)} className="btn">40' LONG</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">16' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1513)} className="btn">20' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(1788)} className="btn">25' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(2131)} className="btn">30' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(2406)} className="btn">35' LONG</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addSideHeight(2956)} className="btn">40' LONG</button>
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
                <ul className="nav-listtwo">
                  <li>
                    <h1 id="dropdownh1">Vertical Sides Both<i className="fas fa-caret-down"></i></h1>
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
                </ul>
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
                            <button onClick={() => addEachEnd(1563)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(1738)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(1913)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">7' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addEachEnd(1688)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(1875)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2056)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">8' - 9' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addEachEnd(1952)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2144)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2338)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">10' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2069)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2281)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2481)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">11' - 12' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2325)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2550)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2769)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">13' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2450)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2688)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2913)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">14' - 15' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2706)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2956)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(3194)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h1 id="dropdownh1">16' Tall
                          <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                          <li className="listitem">
                            <button onClick={() => addEachEnd(2838)} className="btn">20' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(3088)} className="btn">28' WIDE</button>
                          </li>
                          <li className="listitem">
                            <button onClick={() => addEachEnd(3338)} className="btn">30' WIDE</button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </Filter>
            }
          </FilterContainer>
          : <></>
        }  
            <AddContainer>
              <Price>Total Price $ {total}</Price>
              <br/>
              <br/>
              { addedtocart ?
              <>
              <br/>
               <Button onClick={handleClick}>ADD TO CART</Button>
               <br/>
               <br/>
               <Button onClick={clear}>CLEAR</Button>
              </>
               
               
               : 
               <></>
            }
             
             { addedtocart ? 
             <></>
           : 
           <>
           <br/>
           <Link to={`/cart/${total}/${salestax}`} className="btn-primary room-link">
             <Button onClick={handleDelete}>GO TO CART</Button>
           </Link>
           <br/>
           <br/>
        <Button onClick={goBack}>GO BACK</Button>
          </>
            }
            </AddContainer>
          </InfoContainer>
        </Wrapper>

      </Container>
      <Products />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Product;