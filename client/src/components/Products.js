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
  display: flex;
  flex-direction: row;
  text-align: center !important;
  margin-top: 2% !important;
  margin-left: 5%;
  margin-bottom: 1% !important;
  justify-content: space-between;

  ${mobile({ display: 'flex', flexDirection: "column", gap: '5px'})}
`;

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = (await axios.get(cat ? `/api/products?category=${cat}` : "/api/products")).data;
        setProducts(res)
      } catch (err) { };
    };
    getProducts().catch(console.error);
  }, []);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      )
  }, [products, cat, filters])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    }
    else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
    else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort])

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/api/products/find/${id}`)
        setProduct(res.data);
      } catch {

      }
    }
    getProduct()
  }, [id])

  return (
    <div>
    { cat ?
      <div className="row justify-content-center">
      <ContainerTwo className="col-sm-12 mt-6 justify-content-center">
      {filteredProducts.map((item) => (
            <Product item={item} key={item._id} />
      ))}
      </ContainerTwo>
      </div>
      : 
      
      <div className="row justify-content-center">
      <ContainerTwo className="col-sm-12 mt-6 justify-content-center"> 
      { products.map((item) =>
            <Product item={item} key={item._id} />
      )}
      </ContainerTwo>
      </div>
    }
    </div>   
    
  );
};

export default Products;