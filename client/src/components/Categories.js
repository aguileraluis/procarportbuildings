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
  margin-top: 2% !important;
  margin-bottom: -40px !important;
  justify-content: space-between;
  gap: 20px;
  ${mobile({  marginRight: '20px', marginLeft: '8px', marginTop: '20px', flexDirection: "column", display: 'block', gap: '0px'})}
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