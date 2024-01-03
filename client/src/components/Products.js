import React from 'react';
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { mobile } from "../responsive";

const ContainerTwo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  /* margin-left: 11% !important;
  margin-right: 11% !important; */
  margin-top: 2% !important;
  margin-bottom: -40px !important;
  justify-content: space-between;
  gap: 20px;
  ${mobile({  marginRight: '20px', marginLeft: '8px', marginTop: '20px', flexDirection: "column", display: 'block', gap: '0px'})}
`;

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = (await axios.get(cat ? `/api/products?category=${cat}` : "/api/products")).data;
        setProducts(res)
        setFilteredProducts(
          products.filter((item) =>
            Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        )
      } catch (err) { };
    };
    getProducts().catch(console.error);  
  }, [products, cat, filters])

  return (
      <ContainerTwo>
      {products.map((item) =>
        <Product item={item} key={item.id} />
      )}
    </ContainerTwo>
  );
};

export default Products;