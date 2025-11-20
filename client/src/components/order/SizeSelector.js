// client/src/components/order/SizeSelector.js

import React from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';

const Container = styled.div`
  margin-bottom: 25px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  ${mobile({ fontSize: '16px' })}
`;

const Option = styled.option`
  padding: 10px;
`;

const SizeSelector = ({ pricingTable, selectedSize, onSizeChange, label = "2. Select Size" }) => {
  return (
    <Container>
      <Title>{label}</Title>
      <Select value={selectedSize} onChange={(e) => onSizeChange(e.target.value)}>
        <Option value="">Choose a size...</Option>
        {Object.keys(pricingTable).map(key => {
          const item = pricingTable[key];
          return (
            <Option key={key} value={key}>
              {item.label} - ${item.price}
            </Option>
          );
        })}
      </Select>
    </Container>
  );
};

export default SizeSelector;