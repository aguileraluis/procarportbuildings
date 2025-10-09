// client/src/components/order/PriceSummary.js

import React from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';

const Container = styled.div`
  position: sticky;
  top: 20px;
  background-color: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  ${mobile({ position: 'relative', top: '0', marginTop: '20px' })}
`;

const Header = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 20px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

const SelectedItems = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
`;

const ItemRow = styled.div`
  margin-bottom: 12px;
`;

const ItemLabel = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const ItemValue = styled.div`
  color: #666;
  text-transform: ${props => props.capitalize ? 'capitalize' : 'none'};
`;

const OptionsList = styled.ul`
  margin: 5px 0;
  padding-left: 20px;
  color: #666;
`;

const OptionItem = styled.li`
  margin: 3px 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const PriceBreakdown = styled.div`
  font-size: 16px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.marginBottom || '10px'};
  color: ${props => props.muted ? '#666' : '#333'};
`;

const PriceLabel = styled.span`
  font-weight: ${props => props.bold ? '600' : '400'};
`;

const PriceValue = styled.span`
  font-weight: ${props => props.bold ? '600' : '400'};
`;

const TotalDivider = styled.hr`
  border: none;
  border-top: 2px solid #007bff;
  margin: 15px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
`;

const ButtonContainer = styled.div`
  margin-top: 25px;
  display: grid;
  gap: 10px;
`;

const AddButton = styled.button`
  padding: 14px;
  background-color: ${props => props.disabled ? '#ccc' : '#28a745'};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#218838'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.98)'};
  }

  ${mobile({ fontSize: '14px', padding: '12px' })}
`;

const ResetButton = styled.button`
  padding: 12px;
  background-color: white;
  color: #dc3545;
  border: 2px solid #dc3545;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dc3545;
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }

  ${mobile({ fontSize: '13px', padding: '10px' })}
`;

const Note = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 15px;
  line-height: 1.5;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const PriceSummary = ({ order, calculations, onAddToCart, onReset }) => {
  const selectedOptions = Object.keys(order.options).filter(
    key => order.options[key].selected
  );

  const isValid = order.carportSize !== '';

  return (
    <Container>
      <Header>Order Summary</Header>

      <SelectedItems>
        <ItemRow>
          <ItemLabel>Carport Type:</ItemLabel>
          <ItemValue capitalize>{order.carportType}</ItemValue>
        </ItemRow>

        {order.carportLabel && (
          <ItemRow>
            <ItemLabel>Size:</ItemLabel>
            <ItemValue>{order.carportLabel}</ItemValue>
          </ItemRow>
        )}

        {order.roofLabel && (
          <ItemRow>
            <ItemLabel>Roof:</ItemLabel>
            <ItemValue>{order.roofLabel}</ItemValue>
          </ItemRow>
        )}

        {selectedOptions.length > 0 && (
          <ItemRow>
            <ItemLabel>Options:</ItemLabel>
            <OptionsList>
              {selectedOptions.map(key => (
                <OptionItem key={key}>{order.options[key].label}</OptionItem>
              ))}
            </OptionsList>
          </ItemRow>
        )}
      </SelectedItems>

      <Divider />

      <PriceBreakdown>
        <PriceRow>
          <PriceLabel>Subtotal:</PriceLabel>
          <PriceValue>${calculations.subtotal}</PriceValue>
        </PriceRow>
        <PriceRow muted>
          <PriceLabel>Tax (6.75%):</PriceLabel>
          <PriceValue>${calculations.tax}</PriceValue>
        </PriceRow>
        <TotalDivider />
        <TotalRow>
          <span>Total:</span>
          <span>${calculations.total}</span>
        </TotalRow>
        <PriceRow marginBottom="0" style={{ marginTop: '10px' }}>
          <PriceLabel>15% Deposit:</PriceLabel>
          <PriceValue bold>${calculations.fifteenPercent}</PriceValue>
        </PriceRow>
      </PriceBreakdown>

      <ButtonContainer>
        <AddButton disabled={!isValid} onClick={onAddToCart}>
          {isValid ? 'Add to Cart' : 'Select Size to Continue'}
        </AddButton>
        <ResetButton onClick={onReset}>Reset Order</ResetButton>
      </ButtonContainer>

      <Note>
        Prices are subject to change if you add options, accessories and extras.
        Call us at 336.468.1131 for questions.
      </Note>
    </Container>
  );
};

export default PriceSummary;