// client/src/components/order/OptionsSelector.js

import React from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';

const Container = styled.div`
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

const OptionsGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid ${props => props.checked ? '#28a745' : '#ddd'};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.checked ? '#218838' : '#007bff'};
    background-color: ${props => props.checked ? '#f0fff4' : '#f8f9fa'};
  }

  ${mobile({ padding: '10px' })}
`;

const Checkbox = styled.input`
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #28a745;

  ${mobile({ width: '18px', height: '18px' })}
`;

const OptionText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;

  ${mobile({ fontSize: '13px' })}
`;

const PriceTag = styled.span`
  margin-left: auto;
  font-size: 14px;
  font-weight: 600;
  color: #28a745;

  ${mobile({ fontSize: '13px' })}
`;

const OptionsSelector = ({ options, onToggleOption }) => {
  return (
    <Container>
      <Title>4. Additional Options</Title>
      <OptionsGrid>
        {Object.keys(options).map(key => {
          const option = options[key];
          return (
            <OptionLabel key={key} checked={option.selected}>
              <Checkbox
                type="checkbox"
                checked={option.selected}
                onChange={() => onToggleOption(key)}
              />
              <OptionText>{option.label}</OptionText>
              <PriceTag>+${option.price}</PriceTag>
            </OptionLabel>
          );
        })}
      </OptionsGrid>
    </Container>
  );
};

export default OptionsSelector;