// client/src/components/order/RoofSelector.js

import React from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import pricingData from '../../data/pricingData';

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
  margin-bottom: 10px;

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

const roofTypeOptions = [
  { id: '', name: 'No Roof Upgrade' },
  { id: 'standardRegular', name: 'Standard Regular Roof' },
  { id: 'standardBoxed', name: 'Standard Boxed Roof' },
  { id: 'standardVertical', name: 'Standard Vertical Roof' },
  { id: 'tripleRegular', name: 'Triple Regular Roof' },
  { id: 'tripleBoxed', name: 'Triple Boxed Roof' },
  { id: 'tripleVertical', name: 'Triple Vertical Roof' },
  { id: 'commercial40', name: 'Commercial 40 Roof' },
  { id: 'commercial50', name: 'Commercial 50 Roof' },
];

const RoofSelector = ({ 
  selectedRoofType, 
  onRoofTypeChange, 
  selectedRoofSize, 
  onRoofSizeChange,
  roofPricingTable 
}) => {
  return (
    <Container>
      <Title>3. Select Roof (Optional)</Title>
      
      {/* Roof Type Selector */}
      <Select value={selectedRoofType} onChange={(e) => onRoofTypeChange(e.target.value)}>
        {roofTypeOptions.map(type => (
          <Option key={type.id} value={type.id}>
            {type.name}
          </Option>
        ))}
      </Select>

      {/* Roof Size Selector - Only show if roof type is selected */}
      {selectedRoofType && roofPricingTable && Object.keys(roofPricingTable).length > 0 && (
        <Select value={selectedRoofSize} onChange={(e) => onRoofSizeChange(e.target.value)}>
          <Option value="">Choose a roof size...</Option>
          {Object.keys(roofPricingTable).map(key => {
            const item = roofPricingTable[key];
            return (
              <Option key={key} value={key}>
                {item.label} - ${item.price}
              </Option>
            );
          })}
        </Select>
      )}
    </Container>
  );
};

export default RoofSelector;