// client/src/pages/OrderBuilder.js
// MODERN CARPORT ORDER BUILDER - BLUE & BLACK THEME

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useOrderBuilder } from '../hooks/useOrderBuilder';
import { addProduct } from '../redux/cartRedux';
import { mobile } from '../responsive';

// ============================================================================
// STYLED COMPONENTS - BLUE & BLACK THEME
// ============================================================================

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 0;
`;

const ModernNav = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid rgba(30, 60, 114, 0.3);
  ${mobile({ padding: '15px 20px' })}
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ${mobile({ fontSize: '18px' })}
`;

const StaffBadge = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  ${mobile({ fontSize: '10px', padding: '3px 10px' })}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  ${mobile({ gap: '12px' })}
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.1) 0%, rgba(42, 82, 152, 0.1) 100%);
  border-radius: 8px;
  ${mobile({ display: 'none' })}
`;

const Username = styled.span`
  font-weight: 700;
  color: #1a1a1a;
  font-size: 15px;
`;

const Role = styled.span`
  font-size: 12px;
  color: #666;
  text-transform: capitalize;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  padding: 10px 24px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
  ${mobile({ padding: '8px 16px', fontSize: '13px' })}
`;

const ContentWrapper = styled.div`
  padding: 30px 20px;
  max-width: 1400px;
  margin: 0 auto;
  ${mobile({ padding: '20px 15px' })}
`;

const Wrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  ${mobile({ padding: '20px', borderRadius: '12px' })}
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 3px solid #e8f4f8;
  ${mobile({ marginBottom: '30px', paddingBottom: '20px' })}
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ${mobile({ fontSize: '24px' })}
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0;
  font-weight: 400;
  ${mobile({ fontSize: '14px' })}
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
  gap: 20px;
`;

const RightColumn = styled.div`
  ${mobile({ order: '-1' })}
`;

const Section = styled.div`
  background: #f8fbfd;
  border-radius: 12px;
  padding: 24px;
  border: 2px solid #e3f2fd;
  ${mobile({ padding: '18px' })}
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 18px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  ${mobile({ fontSize: '16px' })}
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  ${mobile({ gridTemplateColumns: '1fr', gap: '10px' })}
`;

const TypeCard = styled.button`
  padding: 20px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#1a1a1a'};
  border: 2px solid ${props => props.$active ? '#1e3c72' : '#e3f2fd'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 15px;
  text-transform: capitalize;
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(30, 60, 114, 0.3)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ${mobile({ padding: '16px', fontSize: '14px' })}
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2a5298;
    border-radius: 10px;
  }

  ${mobile({ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' })}
`;

const SizeButton = styled.button`
  padding: 16px 12px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#1a1a1a'};
  border: 2px solid ${props => props.$active ? '#1e3c72' : '#e3f2fd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:hover {
    border-color: #2a5298;
    transform: scale(1.05);
  }

  ${mobile({ padding: '14px 10px', fontSize: '12px' })}
`;

const SizePrice = styled.span`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.9;
  ${mobile({ fontSize: '11px' })}
`;

const RoofTypeGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns || 'repeat(3, 1fr)'};
  gap: 10px;
  margin-bottom: 16px;
  ${mobile({ gridTemplateColumns: '1fr' })}
`;

const RoofTypeButton = styled.button`
  padding: 14px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#1a1a1a'};
  border: 2px solid ${props => props.$active ? '#1e3c72' : '#e3f2fd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;

  &:hover {
    border-color: #2a5298;
  }

  ${mobile({ padding: '12px', fontSize: '13px' })}
`;

const OptionCard = styled.div`
  background: white;
  border: 2px solid ${props => props.$active ? '#28a745' : '#e3f2fd'};
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: ${props => props.$active ? '#28a745' : '#2a5298'};
    transform: translateX(4px);
  }

  ${mobile({ padding: '14px' })}
`;

const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const OptionName = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #1a1a1a;
  ${mobile({ fontSize: '14px' })}
`;

const OptionPrice = styled.span`
  font-size: 13px;
  color: #666;
  font-weight: 500;
  ${mobile({ fontSize: '12px' })}
`;

const Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.$checked ? '#28a745' : '#e3f2fd'};
  border-radius: 6px;
  background: ${props => props.$checked ? '#28a745' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.2s ease;
`;

const SummaryCard = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
  position: sticky;
  top: 20px;
  ${mobile({ padding: '20px', position: 'static' })}
`;

const SummaryTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 20px 0;
  ${mobile({ fontSize: '18px' })}
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  
  &:last-child {
    border-bottom: none;
  }

  ${mobile({ fontSize: '13px', padding: '8px 0' })}
`;

const SummaryLabel = styled.span`
  opacity: 0.9;
`;

const SummaryValue = styled.span`
  font-weight: 700;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
  font-weight: 700;
  margin-top: 12px;
  padding-top: 16px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: none;
  ${mobile({ fontSize: '16px' })}
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
  ${mobile({ gridTemplateColumns: '1fr', gap: '10px' })}
`;

const Button = styled.button`
  padding: 14px;
  background: ${props => props.$variant === 'primary' ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$variant === 'primary' ? '#1e3c72' : 'white'};
  border: ${props => props.$variant === 'primary' ? 'none' : '2px solid white'};
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  ${mobile({ padding: '12px', fontSize: '14px' })}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  color: #6c757d;
  font-size: 14px;
  ${mobile({ padding: '20px', fontSize: '13px' })}
`;

const ValidationWarning = styled.div`
  background: #fff3cd;
  border: 2px solid #ffc107;
  color: #856404;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-top: 12px;
  ${mobile({ fontSize: '12px', padding: '10px' })}
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const OrderBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
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

  // Check if all required fields are selected
  const isOrderComplete = order.carportType && order.carportSize && order.roofType && order.roofSize;

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been logged out successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const handleAddToCart = () => {
    if (!isOrderComplete) {
      Swal.fire({
        title: 'Incomplete Order',
        html: `
          <p>Please complete all required selections:</p>
          <ul style="text-align: left; margin-top: 10px;">
            ${!order.carportType ? '<li>❌ Select Carport Type</li>' : '<li>✅ Carport Type Selected</li>'}
            ${!order.carportSize ? '<li>❌ Select Carport Size</li>' : '<li>✅ Carport Size Selected</li>'}
            ${!order.roofType ? '<li>❌ Select Roof Type</li>' : '<li>✅ Roof Type Selected</li>'}
            ${!order.roofSize ? '<li>❌ Select Roof Size</li>' : '<li>✅ Roof Size Selected</li>'}
          </ul>
        `,
        icon: 'warning',
        confirmButtonColor: '#2a5298'
      });
      return;
    }

    // Clear localStorage
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

    // Store order details
    localStorage.setItem('height', order.roofLabel || '');
    localStorage.setItem('sideheight', order.carportLabel);
    localStorage.setItem('bothsidesclosed', order.options.bothSidesClosed.selected ? 'Yes' : '');
    localStorage.setItem('verticalsides', order.options.verticalSides.selected ? 'Yes' : '');
    localStorage.setItem('eachend', order.options.eachEnd.selected ? 'Yes' : '');
    localStorage.setItem('bothends', order.options.bothEnds.selected ? 'Yes' : '');
    localStorage.setItem('carportType', order.carportType);

    dispatch(addProduct(product));
    navigate(`/cart/${calculations.subtotal}/${calculations.tax}`);
  };

  const handleReset = () => {
    Swal.fire({
      title: 'Reset Order?',
      text: 'This will clear all selections',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Reset',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        resetOrder();
        Swal.fire({
          title: 'Reset Complete',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <Container>
      {/* NAVIGATION */}
      <ModernNav>
        <LeftSection>
          <Logo>
            <CompanyName>ProCarport Buildings</CompanyName>
            <StaffBadge>Staff Order System</StaffBadge>
          </Logo>
        </LeftSection>

        <RightSection>
          {user && (
            <>
              <UserInfo>
                <Username>{user.username}</Username>
                <Role>{user.role}</Role>
              </UserInfo>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          )}
        </RightSection>
      </ModernNav>

      <ContentWrapper>
        <Wrapper>
          <Header>
            <Title>Build Customer Order</Title>
            <Subtitle>
              Complete all required selections to proceed to checkout
            </Subtitle>
          </Header>

          <GridContainer>
            <LeftColumn>
              {/* STEP 1: CARPORT TYPE */}
              <Section>
                <SectionTitle>
                  <StepNumber>1</StepNumber>
                  Select Carport Type *
                </SectionTitle>
                <TypeGrid>
                  <TypeCard
                    $active={order.carportType === 'standard'}
                    onClick={() => setCarportType('standard')}
                  >
                    Standard
                  </TypeCard>
                  <TypeCard
                    $active={order.carportType === 'triple'}
                    onClick={() => setCarportType('triple')}
                  >
                    Triple
                  </TypeCard>
                  <TypeCard
                    $active={order.carportType === 'commercial'}
                    onClick={() => setCarportType('commercial')}
                  >
                    Commercial
                  </TypeCard>
                </TypeGrid>
              </Section>

              {/* STEP 2: CARPORT SIZE */}
              <Section>
                <SectionTitle>
                  <StepNumber>2</StepNumber>
                  Select Carport Size *
                </SectionTitle>
                {Object.keys(currentCarportPricing).length > 0 ? (
                  <SizeGrid>
                    {Object.entries(currentCarportPricing).map(([key, data]) => (
                      <SizeButton
                        key={key}
                        $active={order.carportSize === key}
                        onClick={() => setCarportSize(key)}
                      >
                        {data.label}
                        <SizePrice>${data.price}</SizePrice>
                      </SizeButton>
                    ))}
                  </SizeGrid>
                ) : (
                  <EmptyState>Please select a carport type first</EmptyState>
                )}
              </Section>

              {/* STEP 3: ROOF TYPE & SIZE */}
              <Section>
                <SectionTitle>
                  <StepNumber>3</StepNumber>
                  Select Roof Type & Size *
                </SectionTitle>
                
                {/* Roof Type Selection */}
                {order.carportType === 'commercial' ? (
                  <RoofTypeGrid $columns="repeat(2, 1fr)">
                    <RoofTypeButton
                      $active={order.roofType === '40'}
                      onClick={() => setRoofType('40')}
                    >
                      40' Width
                    </RoofTypeButton>
                    <RoofTypeButton
                      $active={order.roofType === '50'}
                      onClick={() => setRoofType('50')}
                    >
                      50' Width
                    </RoofTypeButton>
                  </RoofTypeGrid>
                ) : (
                  <RoofTypeGrid>
                    <RoofTypeButton
                      $active={order.roofType === 'regular'}
                      onClick={() => setRoofType('regular')}
                    >
                      Regular
                    </RoofTypeButton>
                    <RoofTypeButton
                      $active={order.roofType === 'boxed'}
                      onClick={() => setRoofType('boxed')}
                    >
                      Boxed
                    </RoofTypeButton>
                    <RoofTypeButton
                      $active={order.roofType === 'vertical'}
                      onClick={() => setRoofType('vertical')}
                    >
                      Vertical
                    </RoofTypeButton>
                  </RoofTypeGrid>
                )}

                {/* Roof Size Selection */}
                {Object.keys(currentRoofPricing).length > 0 ? (
                  <SizeGrid>
                    {Object.entries(currentRoofPricing).map(([key, data]) => (
                      <SizeButton
                        key={key}
                        $active={order.roofSize === key}
                        onClick={() => setRoofSize(key)}
                      >
                        {data.label}
                        <SizePrice>${data.price}</SizePrice>
                      </SizeButton>
                    ))}
                  </SizeGrid>
                ) : (
                  <EmptyState>Select roof type to see available sizes</EmptyState>
                )}
              </Section>

              {/* STEP 4: OPTIONS */}
              <Section>
                <SectionTitle>
                  <StepNumber>4</StepNumber>
                  Additional Options (Optional)
                </SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <OptionCard
                    $active={order.options.bothSidesClosed.selected}
                    onClick={() => toggleOption('bothSidesClosed', 0)}
                  >
                    <OptionInfo>
                      <OptionName>Both Sides Closed</OptionName>
                      <OptionPrice>No additional charge</OptionPrice>
                    </OptionInfo>
                    <Checkbox $checked={order.options.bothSidesClosed.selected}>
                      {order.options.bothSidesClosed.selected && '✓'}
                    </Checkbox>
                  </OptionCard>

                  <OptionCard
                    $active={order.options.verticalSides.selected}
                    onClick={() => toggleOption('verticalSides', 0)}
                  >
                    <OptionInfo>
                      <OptionName>Vertical Sides</OptionName>
                      <OptionPrice>No additional charge</OptionPrice>
                    </OptionInfo>
                    <Checkbox $checked={order.options.verticalSides.selected}>
                      {order.options.verticalSides.selected && '✓'}
                    </Checkbox>
                  </OptionCard>

                  <OptionCard
                    $active={order.options.eachEnd.selected}
                    onClick={() => toggleOption('eachEnd', 0)}
                  >
                    <OptionInfo>
                      <OptionName>Each End Closed</OptionName>
                      <OptionPrice>No additional charge</OptionPrice>
                    </OptionInfo>
                    <Checkbox $checked={order.options.eachEnd.selected}>
                      {order.options.eachEnd.selected && '✓'}
                    </Checkbox>
                  </OptionCard>

                  <OptionCard
                    $active={order.options.bothEnds.selected}
                    onClick={() => toggleOption('bothEnds', 0)}
                  >
                    <OptionInfo>
                      <OptionName>Both Ends Closed</OptionName>
                      <OptionPrice>No additional charge</OptionPrice>
                    </OptionInfo>
                    <Checkbox $checked={order.options.bothEnds.selected}>
                      {order.options.bothEnds.selected && '✓'}
                    </Checkbox>
                  </OptionCard>
                </div>
              </Section>
            </LeftColumn>

            {/* PRICE SUMMARY */}
            <RightColumn>
              <SummaryCard>
                <SummaryTitle>Order Summary</SummaryTitle>
                
                <SummaryRow>
                  <SummaryLabel>Carport Type:</SummaryLabel>
                  <SummaryValue style={{ textTransform: 'capitalize' }}>
                    {order.carportType || 'Not selected'}
                  </SummaryValue>
                </SummaryRow>

                <SummaryRow>
                  <SummaryLabel>Size:</SummaryLabel>
                  <SummaryValue>{order.carportLabel || 'Not selected'}</SummaryValue>
                </SummaryRow>

                <SummaryRow>
                  <SummaryLabel>Roof:</SummaryLabel>
                  <SummaryValue>{order.roofLabel || 'Not selected'}</SummaryValue>
                </SummaryRow>

                <SummaryRow>
                  <SummaryLabel>Subtotal:</SummaryLabel>
                  <SummaryValue>${calculations.subtotal}</SummaryValue>
                </SummaryRow>

                <SummaryRow>
                  <SummaryLabel>Tax (6.75%):</SummaryLabel>
                  <SummaryValue>${calculations.tax}</SummaryValue>
                </SummaryRow>

                <TotalRow>
                  <SummaryLabel>Total:</SummaryLabel>
                  <SummaryValue>${calculations.total}</SummaryValue>
                </TotalRow>

                <SummaryRow style={{ marginTop: '12px', paddingTop: '12px', borderTop: '2px solid rgba(255, 255, 255, 0.3)' }}>
                  <SummaryLabel>Deposit (15%):</SummaryLabel>
                  <SummaryValue>${calculations.deposit}</SummaryValue>
                </SummaryRow>

                {!isOrderComplete && (
                  <ValidationWarning>
                    ⚠️ Complete all required (*) selections
                  </ValidationWarning>
                )}

                <ButtonGroup>
                  <Button 
                    $variant="primary" 
                    onClick={handleAddToCart}
                    disabled={!isOrderComplete}
                  >
                    {isOrderComplete ? 'Proceed to Checkout' : 'Complete Order First'}
                  </Button>
                  <Button onClick={handleReset}>
                    Reset Order
                  </Button>
                </ButtonGroup>
              </SummaryCard>
            </RightColumn>
          </GridContainer>
        </Wrapper>
      </ContentWrapper>
    </Container>
  );
};

export default OrderBuilder;