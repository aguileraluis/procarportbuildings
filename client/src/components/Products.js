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
  margin-top: 5% !important;
  margin-bottom: 1% !important;
  justify-content: space-between;
  /* margin-left: 120px; */
  ${mobile({ position: 'relative', marginRight: '5px', display: 'block', textAlign: 'center'})}
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
        <Product item={item} key={item._id} />
      )}
    </ContainerTwo>
  );
};

export default Products;