// client/src/components/order/CarportTypeSelector.js

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

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  ${mobile({ gridTemplateColumns: '1fr' })}
`;

const TypeButton = styled.button`
  padding: 12px;
  border: 2px solid ${props => props.selected ? '#007bff' : '#ddd'};
  background-color: ${props => props.selected ? '#007bff' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    background-color: ${props => props.selected ? '#0056b3' : '#e7f3ff'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const carportTypes = [
  { id: 'standard', name: 'Standard Carport' },
  { id: 'triple', name: 'Triple Carport' },
  { id: 'commercial', name: 'Commercial Carport' },
];

const CarportTypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <Container>
      <Title>1. Select Carport Type</Title>
      <ButtonGrid>
        {carportTypes.map(type => (
          <TypeButton
            key={type.id}
            selected={selectedType === type.id}
            onClick={() => onTypeChange(type.id)}
          >
            {type.name}
          </TypeButton>
        ))}
      </ButtonGrid>
    </Container>
  );
};

export default CarportTypeSelector;