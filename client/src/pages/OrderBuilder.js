// client/src/pages/OrderBuilder.js
// STAFF ORDER INTERFACE - Fixed to clear cart before new order

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CarportTypeSelector from '../components/order/CarportTypeSelector';
import SizeSelector from '../components/order/SizeSelector';
import RoofSelector from '../components/order/RoofSelector';
import OptionsSelector from '../components/order/OptionsSelector';
import PriceSummary from '../components/order/PriceSummary';
import { useOrderBuilder } from '../hooks/useOrderBuilder';
import { addProduct } from '../redux/cartRedux';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Header = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const CompanyName = styled.h1`
  color: #2c3e50;
  font-size: 32px;
  margin: 0 0 10px 0;
  
  ${mobile({ fontSize: '24px' })}
`;

const StaffBadge = styled.div`
  background: #28a745;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);

  ${mobile({ padding: '15px' })}
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 28px;

  ${mobile({ fontSize: '20px' })}
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;

  ${mobile({ fontSize: '14px', marginBottom: '25px' })}
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  ${mobile({ gridTemplateColumns: '1fr', gap: '20px' })}
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  ${mobile({ order: '-1' })}
`;

const OrderBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    order,
    currentCarportPricing,
    currentRoofPricing,
    calculations,
    setCarportType,
    setCarportSize,
    setRoofType,
    setRoofSize,
    toggleOption,
    resetOrder,
  } = useOrderBuilder();

  const handleAddToCart = () => {
    // Clear any previous orders from localStorage
    localStorage.clear();
    
    const product = {
      _id: `${Date.now()}`,
      title: `${order.carportType.charAt(0).toUpperCase() + order.carportType.slice(1)} Carport`,
      img: 'https://i.postimg.cc/QtXYBtDX/procarportbuildingsfour.png',
      quantity: 1,
      color: 'N/A',
      size: order.carportLabel,
      total: calculations.total,
    };

    // Store order details in localStorage
    localStorage.setItem('height', order.roofLabel || '');
    localStorage.setItem('sideheight', order.carportLabel);
    localStorage.setItem('bothsidesclosed', order.options.bothSidesClosed.selected ? 'Yes' : '');
    localStorage.setItem('verticalsides', order.options.verticalSides.selected ? 'Yes' : '');
    localStorage.setItem('eachend', order.options.eachEnd.selected ? 'Yes' : '');
    localStorage.setItem('bothends', order.options.bothEnds.selected ? 'Yes' : '');
    localStorage.setItem('carportType', order.carportType); // Store the carport type

    // Add product to Redux cart
    dispatch(addProduct(product));
    
    // Navigate to cart with pricing
    navigate(`/cart/${calculations.total}/${calculations.tax}`);
  };

  return (
    <Container>
      {/* Simple Header - Staff Only */}
      <Header>
        <CompanyName>Pro Carport Buildings</CompanyName>
        <StaffBadge>STAFF ORDER SYSTEM</StaffBadge>
      </Header>

      <Wrapper>
        <Title>Build Customer Order</Title>
        <Subtitle>
          Select options below to build a custom carport order for your customer
        </Subtitle>

        <GridContainer>
          <LeftColumn>
            <CarportTypeSelector
              selectedType={order.carportType}
              onTypeChange={setCarportType}
            />

            <SizeSelector
              pricingTable={currentCarportPricing}
              selectedSize={order.carportSize}
              onSizeChange={setCarportSize}
              label="2. Select Carport Size"
            />

            <RoofSelector
              selectedRoofType={order.roofType}
              onRoofTypeChange={setRoofType}
              selectedRoofSize={order.roofSize}
              onRoofSizeChange={setRoofSize}
              roofPricingTable={currentRoofPricing}
            />

            <OptionsSelector
              options={order.options}
              onToggleOption={toggleOption}
            />
          </LeftColumn>

          <RightColumn>
            <PriceSummary
              order={order}
              calculations={calculations}
              onAddToCart={handleAddToCart}
              onReset={resetOrder}
            />
          </RightColumn>
        </GridContainer>
      </Wrapper>
    </Container>
  );
};

export default OrderBuilder;