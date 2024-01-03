import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import { sliderItems } from "../data";
import styled from "styled-components";
import Navbar from "../components/Navigation";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";


const Container = styled.div`
  ${mobile({ textAlign: 'center'})}
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  /* margin-left: 60px; */
  /* margin-right: 60px; */
  text-align: center !important;
  ${mobile({ display: "block",
  position: 'relative', flexDirection: "column", textAlign: 'center' })}
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ display: "block",
  position: 'relative', flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 25px;
  font-weight: 600;
  margin-right: 10px;
  ${mobile({ marginRight: '10px'})}
`;

const Select = styled.select`
  font-size: 25px;
  padding: 10px;
  margin-right: 30px;
  ${mobile({ marginRight: '30px', fontSize: '20px', textAlign: 'center'})}
`;
const Option = styled.option`
  font-size: 20px;
  color: teal;
  ${mobile({ width: '60%', color: 'teal'})}
`;

const ProductList = () => {

  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [ filters, setFilters ] = useState({});
  const [ sort, setsort ] = useState("newest");
  const [ enclosure, setenclosure ] = useState("");
  const [ selected, setselected ] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name] : value
    })
  }

  const handleEnclosure = (e) => {
    const value = e.target.value;
    setenclosure(value);
    setselected(false);
    
  }

  const changeLocation = (e) => {
    const locationvalue = e.target.value;
    if (locationvalue === "Standard-Buildings"){
        window.location.href = '/products/Standard%20Buildings'
    } else if (locationvalue === "Barn-Buildings") {
        window.location.href = '/products/Barn%20Buildings'
    } else if (locationvalue === "Triple-Buildings") {
        window.location.href = '/products/Triple%20Buildings'
    } else if (locationvalue === "Commercial-Buildings") {
        window.location.href = '/products/Commercial%20Buildings'
    }
  }

  let item = {}

  if (cat === "Standard%20Buildings") {
    item = sliderItems[0];
  } else if ( cat === "Barn%20Buildings") {
    item = sliderItems[1];
  } else if ( cat === "Triple%20Buildings") {
    item = sliderItems[2];
  } else if ( cat === "Commercial%20Buildings") {
    item = sliderItems[3];
  } 

  return (
    <>
    <Container>
    <Navbar />
      <Announcement />
      <Slider item={item}/>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Carports:</FilterText>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>
              Select Roof Style
            </Option>
            <Option>Regular Roof Style</Option>
            <Option>Boxed Eave Roof Style</Option>
            <Option>Vertical Roof Style</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Select Category:</FilterText>
          <Select onChange={changeLocation}>
            <Option>Select Carport Style</Option>
            <Option value="Standard-Buildings"><Link to='/products/Standard%20Buildings'>Standard Buildings</Link></Option>
            <Option value="Barn-Buildings"><Link to='/products/Barn%20Buildings'>Barn Buildings</Link></Option>
            <Option value="Triple-Buildings"><Link to='/products/Triple%20Buildings'>Triple Buildings</Link></Option>
            <Option value="Commercial-Buildings"><Link to='/products/Triple%20Buildings'>Commercial 40' 50' 60' Buildings</Link></Option>
          </Select>
        </Filter>
      </FilterContainer>
      <div className="row justify-content-center">
      <Products cat={cat} filters={filters} sort={sort} />
      </div>
      <Newsletter />
      <Footer />
    </Container>
    </>
  );
};

export default ProductList;