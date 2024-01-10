import React from 'react';
import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const ContainerTwo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  /* margin-left: 11% !important;
  margin-right: 11% !important; */
  margin-top: 5% !important;
  margin-bottom: 1% !important;
  justify-content: space-between;
  /* margin-left: 120px; */
  ${mobile({ marginRight: '220px !important', position: 'relative', display: 'block', textAlign: 'center'})}
`;

const Categories = () => {
  return (
    <ContainerTwo>
            {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </ContainerTwo>
  );
};

export default Categories;