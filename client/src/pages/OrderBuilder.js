// client/src/pages/OrderBuilder.js
// COMPLETE CARPORT & COMMERCIAL ORDER BUILDER
// ✅ Carports (12'-30') - All features working
// ✅ Commercial Buildings (32'-60') - All features working
// ✅ Vertical 2 Tone (Both) - NOW WORKS FOR COMMERCIAL! ⭐

import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useOrderBuilder } from '../hooks/useOrderBuilder';
import { addProduct } from '../redux/cartRedux';
import { mobile } from '../responsive';
import ColorSelector from '../components/ColorSelector';
import { 
  HEIGHT_CHARGES,
  COMMERCIAL_HEIGHT_CHARGES,
  COMMERCIAL_VERTICAL_2_TONE, // ✅ ADDED FOR COMMERCIAL VERTICAL 2 TONE SUPPORT
  GARAGE_DOOR_SIZES, 
  HALF_PANEL_WITH_TRIM, 
  CUT_PANEL, 
  PANELS_3FT, 
  getPanelLengthKey,
  getHeightCharge,
  isTripleWide,
  isCommercial
} from '../pricingData';

// ============================================================================
// STYLED COMPONENTS (keeping all the same styled components from before)
// ============================================================================

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 0;
`;

const ModernNav = styled.nav`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: '15px 20px', flexDirection: 'column', gap: '15px' })}
`;

const LeftNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CompanyName = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${mobile({ fontSize: '20px' })}
`;

const StaffBadge = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 5px 14px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  width: fit-content;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  ${mobile({ width: '100%', justifyContent: 'space-between' })}
`;

const UserInfo = styled.div`
  text-align: right;
  ${mobile({ textAlign: 'left' })}
`;

const Username = styled.div`
  font-weight: 700;
  color: #1a1a1a;
  font-size: 16px;
`;

const Role = styled.div`
  font-size: 13px;
  color: #666;
  text-transform: capitalize;
`;

const LogoutButton = styled.button`
  padding: 12px 26px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
  }
`;

const ContentWrapper = styled.div`
  padding: 40px 20px;
  max-width: 1800px;
  margin: 0 auto;
  ${mobile({ padding: '20px 15px' })}
`;

const Wrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  ${mobile({ padding: '25px', borderRadius: '16px' })}
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  padding-bottom: 35px;
  border-bottom: 3px solid #e8f4f8;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${mobile({ fontSize: '26px' })}
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 17px;
  margin: 0;
  line-height: 1.6;
  ${mobile({ fontSize: '15px' })}
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 0 20px;
  ${mobile({ flexDirection: 'column', gap: '10px', padding: '0' })}
`;

const ProgressStep = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100%;
    height: 3px;
    background: ${props => props.$completed ? '#28a745' : '#e3f2fd'};
    z-index: 0;
    ${mobile({ display: 'none' })}
  }
`;

const ProgressCircle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${props => props.$completed ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 
                props.$active ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 
                '#e3f2fd'};
  color: ${props => props.$completed || props.$active ? 'white' : '#999'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  z-index: 1;
  box-shadow: ${props => props.$completed || props.$active ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const ProgressLabel = styled.div`
  margin-top: 10px;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$completed ? '#28a745' : props.$active ? '#1e3c72' : '#999'};
  text-align: center;
  ${mobile({ fontSize: '12px' })}
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 35px;
  ${mobile({ gridTemplateColumns: '1fr', gap: '25px' })}
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Section = styled.div`
  background: ${props => props.$disabled ? '#f8f9fa' : '#f8fbfd'};
  border-radius: 16px;
  padding: 28px;
  border: 2px solid ${props => props.$disabled ? '#dee2e6' : '#e3f2fd'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  transition: all 0.3s ease;
  ${mobile({ padding: '20px' })}
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StepBadge = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 3px 10px rgba(30, 60, 114, 0.3);
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  ${mobile({ fontSize: '18px' })}
`;

const RequiredBadge = styled.span`
  background: #dc3545;
  color: white;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SectionDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 20px 0;
  line-height: 1.5;
  ${mobile({ fontSize: '13px' })}
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns || 'repeat(auto-fill, minmax(110px, 1fr))'};
  gap: 12px;
  ${mobile({ gridTemplateColumns: props => props.$columns || 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' })}
`;

const SelectButton = styled.button`
  padding: 20px 14px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#1a1a1a'};
  border: 2px solid ${props => props.$active ? '#1e3c72' : '#e3f2fd'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 15px;
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(30, 60, 114, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};

  &:hover {
    border-color: #2a5298;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  ${mobile({ padding: '16px 12px', fontSize: '14px' })}
`;

const OptionCard = styled.div`
  background: white;
  border: 2px solid ${props => props.$active ? '#28a745' : '#e3f2fd'};
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  box-shadow: ${props => props.$active ? '0 4px 16px rgba(40, 167, 69, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};

  &:hover {
    border-color: ${props => props.$active ? '#28a745' : '#2a5298'};
    transform: translateX(5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${mobile({ padding: '16px' })}
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 6px;
  ${mobile({ fontSize: '15px' })}
`;

const OptionDescription = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
  line-height: 1.4;
`;

const OptionPrice = styled.div`
  font-size: 15px;
  color: ${props => props.$free ? '#28a745' : '#2a5298'};
  font-weight: 700;
  ${mobile({ fontSize: '14px' })}
`;

const Checkbox = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid ${props => props.$checked ? '#28a745' : '#e3f2fd'};
  border-radius: 8px;
  background: ${props => props.$checked ? '#28a745' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$checked ? '0 3px 8px rgba(40, 167, 69, 0.3)' : 'none'};
`;

const CounterGroup = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border: 2px solid #e3f2fd;
`;

const CounterLabel = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const CounterButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const CounterControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const CounterButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid #e3f2fd;
  background: white;
  color: #1e3c72;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1e3c72;
    color: white;
    border-color: #1e3c72;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const CounterValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1e3c72;
  min-width: 40px;
  text-align: center;
`;

const GarageDoorList = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GarageDoorItem = styled.div`
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #e3f2fd;
`;

const GarageDoorInfo = styled.div`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  padding: 6px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c82333;
    transform: scale(1.05);
  }
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(40, 167, 69, 0.4);
  }
`;

const SummaryCard = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px;
  padding: 30px;
  color: white;
  position: sticky;
  top: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  ${mobile({ position: 'static', padding: '25px' })}
`;

const SummaryTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 25px 0;
  text-align: center;
  ${mobile({ fontSize: '22px' })}
`;

const SummarySection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SummarySectionTitle = styled.div`
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
  margin-bottom: 12px;
  font-weight: 600;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 15px;
  align-items: center;
  ${mobile({ fontSize: '14px' })}
`;

const SummaryLabel = styled.span`
  opacity: 0.95;
  font-weight: 500;
`;

const SummaryValue = styled.span`
  font-weight: 700;
  font-size: 16px;
  ${mobile({ fontSize: '15px' })}
`;

const TotalRow = styled(SummaryRow)`
  font-size: 22px;
  font-weight: 700;
  margin-top: 20px;
  padding: 20px 0 0 0;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  ${mobile({ fontSize: '20px' })}
`;

const DepositRow = styled(SummaryRow)`
  background: rgba(255, 255, 255, 0.15);
  padding: 14px;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 16px;
  ${mobile({ fontSize: '15px' })}
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 25px;
  ${mobile({ gridTemplateColumns: '1fr', gap: '10px' })}
`;

const Button = styled.button`
  padding: 16px;
  background: ${props => props.$variant === 'primary' ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$variant === 'primary' ? '#1e3c72' : 'white'};
  border: ${props => props.$variant === 'primary' ? 'none' : '2px solid white'};
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$variant === 'primary' ? '0 4px 12px rgba(255, 255, 255, 0.3)' : 'none'};

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  ${mobile({ padding: '14px', fontSize: '15px' })}
`;

const ValidationMessage = styled.div`
  background: #fff3cd;
  border: 2px solid #ffc107;
  color: #856404;
  padding: 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 15px;
  line-height: 1.4;
`;

const SelectDropdown = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e3f2fd;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2a5298;
    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
  }
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
  ${mobile({ gridTemplateColumns: '1fr' })}
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const OrderBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const {
    order = {},
    availableWidths = [],
    availableLengths = [],
    availableHeights = [],
    roofStyles = [],
    buildingTypes = [],
    calculations = {},
    labels = {},
    isOrderComplete = false,
    setBuildingType,
    setRoofStyle,
    setWidth,
    setLength,
    setHeight,
    toggleOption,
    setVerticalEndCount,
    setVertical2ToneEndCount,
    addGarageDoor,
    removeGarageDoor,
    updateCounter,
    setSideOpeningType,
    resetOrder,
    handleColorChange,
  } = useOrderBuilder();

  // Safety: Ensure order has all required nested objects
  const safeOrder = {
    buildingType: order.buildingType || 'carport',
    roofStyle: order.roofStyle || null,
    width: order.width || null,
    length: order.length || null,
    height: order.height || null,
    options: order.options || {},
    counters: order.counters || {},
    garageDoors: order.garageDoors || [],
    verticalEndCount: order.verticalEndCount || 0,
    vertical2ToneEndCount: order.vertical2ToneEndCount || 0,
  };

  // State for garage door form
  const [garageDoorForm, setGarageDoorForm] = useState({
    size: "6'x6'",
    certification: 'uncertified',
    color: 'white'
  });

  // Progress tracking
  const progress = {
    buildingType: !!safeOrder.buildingType,
    roofStyle: safeOrder.buildingType === 'commercial' ? true : !!safeOrder.roofStyle,
    width: !!safeOrder.width,
    length: !!safeOrder.length,
    height: !!safeOrder.height,
  };

  // Check if commercial
  const isCommercialBuilding = safeOrder.buildingType === 'commercial';

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleLogout = () => {
    Swal.fire({
      title: '👋 Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Stay Logged In'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login');
      }
    });
  };

  const handleAddToCart = () => {
    if (!isOrderComplete) {
      const missing = [];
      if (!safeOrder.width) missing.push('Width');
      if (!safeOrder.length) missing.push('Length');
      if (!safeOrder.height) missing.push('Height');

      Swal.fire({
        title: '⚠️ Incomplete Order',
        html: `
          <p style="margin-bottom: 15px;">Please complete these required selections:</p>
          <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 8px;">
            ${missing.map(item => `<div style="margin: 8px 0;">❌ <strong>${item}</strong></div>`).join('')}
          </div>
        `,
        icon: 'warning',
        confirmButtonColor: '#2a5298',
        confirmButtonText: 'OK, Got It!'
      });
      return;
    }

    Swal.fire({
      title: '✅ Add to Cart?',
      html: `
        <div style="text-align: left;">
          <p><strong>Type:</strong> ${labels.buildingType || 'N/A'}</p>
          <p><strong>Roof Style:</strong> ${labels.roofStyle || 'N/A'}</p>
          <p><strong>Size:</strong> ${labels.size || 'N/A'} at ${labels.height || 'N/A'}</p>
          <p><strong>Total:</strong> $${(calculations.total || 0).toLocaleString()}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '✓ Add to Cart',
      cancelButtonText: 'Keep Editing'
    }).then((result) => {
      if (result.isConfirmed) {
        const completeOrderData = {
          buildingType: safeOrder.buildingType || '',
          roofStyle: safeOrder.roofStyle || '',
          width: safeOrder.width || '',
          length: safeOrder.length || '',
          height: safeOrder.height || '',
          colors: order.colors || { roof: '', side: '', trim: '' },
          bothSidesClosed: safeOrder.options?.bothSidesClosed || false,
          verticalSidesBoth: safeOrder.options?.verticalSidesBoth || false,
          vertical2ToneBoth: safeOrder.options?.vertical2ToneBoth || false,
          insulationDoubleBubble: safeOrder.options?.insulationDoubleBubble || false,
          insulationFiberglass: safeOrder.options?.insulationFiberglass || false,
          coloredScrews: safeOrder.options?.coloredScrews || false,
          eachEndClosed: safeOrder.counters?.eachEndClosed || 0,
          sideOpenings: safeOrder.counters?.sideOpenings || 0,
          walkInDoor: safeOrder.counters?.walkInDoor || 0,
          window30x30: safeOrder.counters?.window30x30 || 0,
          window30x36: safeOrder.counters?.window30x36 || 0,
          certifiedGableEnd: safeOrder.counters?.certifiedGableEnd || 0,
          frameouts: safeOrder.counters?.frameouts || 0,
          halfPanelWithTrim: safeOrder.counters?.halfPanelWithTrim || 0,
          cutPanel: safeOrder.counters?.cutPanel || 0,
          panels3ft: safeOrder.counters?.panels3ft || 0,
          verticalEndCount: safeOrder.verticalEndCount || 0,
          vertical2ToneEndCount: safeOrder.vertical2ToneEndCount || 0,
          garageDoors: safeOrder.garageDoors || [],
          basePrice: calculations.basePrice || 0,
          heightCharge: calculations.heightCharge || 0,
          bothSidesClosedPrice: calculations.bothSidesClosedPrice || 0,
          verticalSidesBothPrice: calculations.verticalSidesBothPrice || 0,
          vertical2ToneBothPrice: calculations.vertical2ToneBothPrice || 0,
          eachEndClosedPrice: calculations.eachEndClosedPrice || 0,
          verticalEndPrice: calculations.verticalEndPrice || 0,
          vertical2ToneEndPrice: calculations.vertical2ToneEndPrice || 0,
          garageDoorPrice: calculations.garageDoorPrice || 0,
          sideOpeningPrice: calculations.sideOpeningPrice || 0,
          walkInDoorPrice: calculations.walkInDoorPrice || 0,
          window30x30Price: calculations.window30x30Price || 0,
          window30x36Price: calculations.window30x36Price || 0,
          insulationDoubleBubblePrice: calculations.insulationDoubleBubblePrice || 0,
          insulationFiberglassPrice: calculations.insulationFiberglassPrice || 0,
          certifiedGableEndPrice: calculations.certifiedGableEndPrice || 0,
          coloredScrewsPrice: calculations.coloredScrewsPrice || 0,
          frameoutPrice: calculations.frameoutPrice || 0,
          halfPanelWithTrimPrice: calculations.halfPanelWithTrimPrice || 0,
          cutPanelPrice: calculations.cutPanelPrice || 0,
          panels3ftPrice: calculations.panels3ftPrice || 0,
          squareFootage: calculations.squareFootage || 0,
          subtotal: calculations.subtotal || 0,
          tax: calculations.tax || 0,
          total: calculations.total || 0,
          deposit: calculations.deposit || 0,
          labels: {
            buildingType: labels.buildingType || '',
            roofStyle: labels.roofStyle || '',
            size: labels.size || '',
            height: labels.height || '',
          },
          vertical2ToneEndPricePerEnd: calculations.vertical2ToneEndPricePerEnd || 0,
          verticalEndPricePerEnd: calculations.verticalEndPricePerEnd || 0,
          timestamp: new Date().toISOString(),
        };
        
        try {
          localStorage.setItem('completeOrderData', JSON.stringify(completeOrderData));
          console.log('✅ Complete order data saved to localStorage');
        } catch (error) {
          console.error('❌ Error saving order data:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to save order data. Please try again.',
            icon: 'error'
          });
          return;
        }
        
        localStorage.setItem('carportType', safeOrder.roofStyle || '');
        localStorage.setItem('sideheight', labels.size || '');
        localStorage.setItem('height', labels.height || '');
        localStorage.setItem('bothsidesclosed', safeOrder.options?.bothSidesClosed ? 'Yes' : 'No');
        localStorage.setItem('verticalsides', safeOrder.options?.verticalSidesBoth ? 'Yes' : 'No');
        localStorage.setItem('eachend', (safeOrder.counters?.eachEndClosed || 0) > 0 ? 'Yes' : 'No');
        localStorage.setItem('bothends', (safeOrder.counters?.eachEndClosed || 0) === 2 ? 'Yes' : 'No');

        const product = {
          _id: `${Date.now()}`,
          title: `${labels.buildingType || ''} - ${labels.roofStyle || ''} ${labels.size || ''} at ${labels.height || ''}`,
          img: 'https://i.postimg.cc/QtXYBtDX/procarportbuildingsfour.png',
          quantity: 1,
          color: 'N/A',
          size: labels.size || 'N/A',
          total: calculations.total || 0,
        };

        dispatch(addProduct(product));
        
        Swal.fire({
          title: '🎉 Added to Cart!',
          text: 'Proceeding to checkout...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate(`/cart/${calculations.subtotal || 0}/${calculations.tax || 0}`);
        }, 1500);
      }
    });
  };

  const handleReset = () => {
    Swal.fire({
      title: '🔄 Reset Order?',
      text: 'This will clear all your selections',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Reset Everything',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (resetOrder) resetOrder();
        setGarageDoorForm({ size: "6'x6'", certification: 'uncertified', color: 'white' });
        Swal.fire({
          title: '✨ Reset Complete',
          text: 'Start fresh!',
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        });
      }
    });
  };

  const handleAddGarageDoor = () => {
    if (addGarageDoor) {
      addGarageDoor(garageDoorForm.size, garageDoorForm.certification, garageDoorForm.color);
      Swal.fire({
        title: '✅ Garage Door Added!',
        text: `${garageDoorForm.size} ${garageDoorForm.color} (${garageDoorForm.certification})`,
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }
  };

  // Helper function to get height charge for display
  const getHeightChargeForDisplay = (height) => {
    if (!safeOrder.width || !safeOrder.length) return 0;
    if (isCommercialBuilding && height === '8') return 0;
    if (!isCommercialBuilding && height === '6') return 0;
    const charge = getHeightCharge(height, safeOrder.length, safeOrder.width, safeOrder.buildingType);
    return charge || 0;
  };

  const getPanelPrice = (panelType, count) => {
    if (!safeOrder.length || count === 0) return 0;
    
    const panelLengthKey = getPanelLengthKey(safeOrder.length);
    
    let priceTable;
    if (panelType === 'halfPanel') priceTable = HALF_PANEL_WITH_TRIM;
    else if (panelType === 'cutPanel') priceTable = CUT_PANEL;
    else if (panelType === 'panels3ft') priceTable = PANELS_3FT;
    else return 0;
    
    return ((priceTable[panelLengthKey] || 0) * count) || 0;
  };

  // If the hook didn't load properly, show error
  if (!order || !setBuildingType) {
    return (
      <Container>
        <ContentWrapper>
          <Wrapper>
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>⚠️ Error Loading Order Builder</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                The order builder hook failed to initialize. Please check your files.
              </p>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  marginTop: '30px',
                  padding: '12px 24px',
                  background: '#1e3c72',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Reload Page
              </button>
            </div>
          </Wrapper>
        </ContentWrapper>
      </Container>
    );
  }

  // ============================================================================
  // RENDER JSX
  // ============================================================================

  return (
    <Container>
      {/* NAVIGATION */}
      <ModernNav>
        <LeftNav>
          <CompanyName>ProCarport Buildings</CompanyName>
          <StaffBadge>Staff Order System</StaffBadge>
        </LeftNav>

        {user && (
          <UserSection>
            <UserInfo>
              <Username>👤 {user.username}</Username>
              <Role>{user.role}</Role>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserSection>
        )}
      </ModernNav>

      <ContentWrapper>
        <Wrapper>
          <Header>
            <Title>🏗️ Build Your Order</Title>
            <Subtitle>
              Choose from Carports (12'-30') or Commercial Buildings (32'-60') with complete customization
            </Subtitle>
          </Header>

          {/* PROGRESS BAR */}
          <ProgressBar>
            <ProgressStep $completed={progress.buildingType} $active={!progress.buildingType}>
              <ProgressCircle $completed={progress.buildingType} $active={!progress.buildingType}>
                {progress.buildingType ? '✓' : '0'}
              </ProgressCircle>
              <ProgressLabel $completed={progress.buildingType} $active={!progress.buildingType}>
                Building Type
              </ProgressLabel>
            </ProgressStep>

            <ProgressStep $completed={progress.roofStyle} $active={progress.buildingType && !progress.roofStyle}>
              <ProgressCircle $completed={progress.roofStyle} $active={progress.buildingType && !progress.roofStyle}>
                {progress.roofStyle ? '✓' : '1'}
              </ProgressCircle>
              <ProgressLabel $completed={progress.roofStyle} $active={progress.buildingType && !progress.roofStyle}>
                Roof Style
              </ProgressLabel>
            </ProgressStep>

            <ProgressStep $completed={progress.width} $active={progress.roofStyle && !progress.width}>
              <ProgressCircle $completed={progress.width} $active={progress.roofStyle && !progress.width}>
                {progress.width ? '✓' : '2'}
              </ProgressCircle>
              <ProgressLabel $completed={progress.width} $active={progress.roofStyle && !progress.width}>
                Width
              </ProgressLabel>
            </ProgressStep>

            <ProgressStep $completed={progress.length} $active={progress.width && !progress.length}>
              <ProgressCircle $completed={progress.length} $active={progress.width && !progress.length}>
                {progress.length ? '✓' : '3'}
              </ProgressCircle>
              <ProgressLabel $completed={progress.length} $active={progress.width && !progress.length}>
                Length
              </ProgressLabel>
            </ProgressStep>

            <ProgressStep $completed={progress.height} $active={progress.length && !progress.height}>
              <ProgressCircle $completed={progress.height} $active={progress.length && !progress.height}>
                {progress.height ? '✓' : '4'}
              </ProgressCircle>
              <ProgressLabel $completed={progress.height} $active={progress.length && !progress.height}>
                Height
              </ProgressLabel>
            </ProgressStep>

            <ProgressStep $active={progress.height}>
              <ProgressCircle $active={progress.height}>
                5
              </ProgressCircle>
              <ProgressLabel $active={progress.height}>
                Extras
              </ProgressLabel>
            </ProgressStep>
          </ProgressBar>

          <GridContainer>
            <LeftColumn>
              {/* STEP 0: BUILDING TYPE */}
              <Section>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>🏢</StepBadge>
                    <div>
                      <SectionTitle>Select Building Type <RequiredBadge>Required</RequiredBadge></SectionTitle>
                    </div>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  Choose between Carport (12'-30' wide) or Commercial Building (32'-60' wide)
                </SectionDescription>
                <ButtonGrid $columns="repeat(2, 1fr)">
                  {buildingTypes.map((type) => (
                    <SelectButton
                      key={type.value}
                      $active={safeOrder.buildingType === type.value}
                      onClick={() => setBuildingType && setBuildingType(type.value)}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type.icon}</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1.3' }}>{type.label}</div>
                    </SelectButton>
                  ))}
                </ButtonGrid>
                {safeOrder.buildingType && (
                  <div style={{ 
                    marginTop: '15px', 
                    padding: '12px', 
                    background: '#e8f5e9', 
                    borderRadius: '8px',
                    color: '#2e7d32',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    ✓ Selected: {labels.buildingType || safeOrder.buildingType}
                  </div>
                )}
              </Section>

              {/* STEP 1: ROOF STYLE - Hidden for commercial */}
              {!isCommercialBuilding && (
                <Section>
                  <SectionHeader>
                    <SectionTitleGroup>
                      <StepBadge>1</StepBadge>
                      <div>
                        <SectionTitle>Select Roof Style <RequiredBadge>Required</RequiredBadge></SectionTitle>
                      </div>
                    </SectionTitleGroup>
                  </SectionHeader>
                  <SectionDescription>
                    Choose your preferred roof style (Regular, Boxed Eave, or Vertical)
                  </SectionDescription>
                  <ButtonGrid $columns="repeat(3, 1fr)">
                    {roofStyles.map((style) => (
                      <SelectButton
                        key={style.value}
                        $active={safeOrder.roofStyle === style.value}
                        onClick={() => setRoofStyle && setRoofStyle(style.value)}
                      >
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>{style.icon}</div>
                        <div style={{ fontSize: '16px', fontWeight: '700' }}>{style.label}</div>
                      </SelectButton>
                    ))}
                  </ButtonGrid>
                  {safeOrder.roofStyle && (
                    <div style={{ 
                      marginTop: '15px', 
                      padding: '12px', 
                      background: '#e8f5e9', 
                      borderRadius: '8px',
                      color: '#2e7d32',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      ✓ Selected: {labels.roofStyle || safeOrder.roofStyle}
                    </div>
                  )}
                </Section>
              )}

              {/* Auto-select vertical for commercial */}
              {isCommercialBuilding && (
                <div style={{ 
                  padding: '16px', 
                  background: '#e3f2fd', 
                  borderRadius: '12px',
                  border: '2px solid #2196f3',
                  marginBottom: '25px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    color: '#1565c0',
                    fontWeight: '600'
                  }}>
                    <span style={{ fontSize: '24px' }}>ℹ️</span>
                    <span>Commercial buildings use Vertical roof style only</span>
                  </div>
                </div>
              )}

              {/* STEP 2: WIDTH */}
              <Section>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '1' : '2'}</StepBadge>
                    <div>
                      <SectionTitle>Select Width <RequiredBadge>Required</RequiredBadge></SectionTitle>
                    </div>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  {isCommercialBuilding
                    ? 'Choose commercial building width (32\'-60\' in 2\' increments)'
                    : 'Choose carport width - Standard (12\'-24\') or Triple Wide (26\'-30\')'}
                </SectionDescription>
                <ButtonGrid $columns={isCommercialBuilding ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)'}>
                  {availableWidths.map((w) => (
                    <SelectButton
                      key={w}
                      $active={safeOrder.width === w}
                      onClick={() => setWidth && setWidth(w)}
                    >
                      <div style={{ fontSize: '18px', fontWeight: '700' }}>{w}'</div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>Wide</div>
                    </SelectButton>
                  ))}
                </ButtonGrid>
              </Section>

              {/* STEP 3: LENGTH */}
              <Section $disabled={!safeOrder.width}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '2' : '3'}</StepBadge>
                    <div>
                      <SectionTitle>Select Length <RequiredBadge>Required</RequiredBadge></SectionTitle>
                    </div>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  {safeOrder.width 
                    ? isCommercialBuilding
                      ? 'Commercial: Choose length (20\', 24\', 28\', 32\', 36\', 40\', 44\', 48\', 52\')'
                      : safeOrder.roofStyle === 'vertical'
                        ? 'Vertical roof: Choose length up to 50\''
                        : 'Regular/Boxed Eave: Choose length up to 35\''
                    : '⬆️ Please select a width first'}
                </SectionDescription>
                <ButtonGrid $columns={isCommercialBuilding ? 'repeat(5, 1fr)' : 'repeat(5, 1fr)'}>
                  {availableLengths.map((l) => (
                    <SelectButton
                      key={l}
                      $active={safeOrder.length === l}
                      onClick={() => setLength && setLength(l)}
                    >
                      <div style={{ fontSize: '18px', fontWeight: '700' }}>{l}'</div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>Long</div>
                    </SelectButton>
                  ))}
                </ButtonGrid>
                {safeOrder.width && safeOrder.length && (
                  <div style={{ 
                    marginTop: '15px', 
                    padding: '12px', 
                    background: '#e8f5e9', 
                    borderRadius: '8px',
                    color: '#2e7d32',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    ✓ Selected Size: {safeOrder.width}' × {safeOrder.length}' 
                    {(calculations.basePrice || 0) > 0 && ` - Base Price: $${(calculations.basePrice || 0).toLocaleString()}`}
                  </div>
                )}
              </Section>

              {/* STEP 4: HEIGHT */}
              <Section $disabled={!safeOrder.width || !safeOrder.length}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '3' : '4'}</StepBadge>
                    <div>
                      <SectionTitle>Select Height <RequiredBadge>Required</RequiredBadge></SectionTitle>
                    </div>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  {safeOrder.width && safeOrder.length
                    ? isCommercialBuilding
                      ? 'Choose side height (8\' is base, taller heights cost extra)'
                      : `Choose side height (6' is standard, taller heights cost extra)${isTripleWide(safeOrder.width) ? ' - Triple Wide pricing' : ''}`
                    : '⬆️ Please select width and length first'}
                </SectionDescription>
                <ButtonGrid>
                  {availableHeights.map((h) => {
                    const chargeAmount = getHeightChargeForDisplay(h);
                    const isBase = isCommercialBuilding ? h === '8' : h === '6';
                    
                    return (
                      <SelectButton
                        key={h}
                        $active={safeOrder.height === h}
                        onClick={() => setHeight && setHeight(h)}
                      >
                        <div style={{ fontSize: '18px', fontWeight: '700' }}>{h}'</div>
                        {safeOrder.length && !isBase && chargeAmount > 0 && (
                          <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '4px' }}>
                            +${chargeAmount.toLocaleString()}
                          </div>
                        )}
                      </SelectButton>
                    );
                  })}
                </ButtonGrid>
                {safeOrder.height && (calculations.heightCharge || 0) > 0 && (
                  <div style={{ 
                    marginTop: '15px', 
                    padding: '12px', 
                    background: '#fff3e0', 
                    borderRadius: '8px',
                    color: '#e65100',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    ℹ️ Extra height charge: +${(calculations.heightCharge || 0).toLocaleString()}
                    {isCommercialBuilding ? ' (Commercial pricing)' : isTripleWide(safeOrder.width) ? ' (Triple Wide pricing)' : ''}
                  </div>
                )}
              </Section>

              <ColorSelector
  selectedColors={order.colors}
  onColorChange={handleColorChange}
/>

              {/* ENCLOSURE OPTIONS */}
              <Section $disabled={!safeOrder.height}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '4' : '5'}</StepBadge>
                    <SectionTitle>Enclosure Options</SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  Add walls and paneling to enclose your {isCommercialBuilding ? 'building' : 'carport'} (optional)
                </SectionDescription>

                {/* Both Sides Closed */}
                <OptionCard
                  $active={safeOrder.options.bothSidesClosed}
                  onClick={() => toggleOption && toggleOption('bothSidesClosed')}
                >
                  <OptionInfo>
                    <OptionName>Both Sides Closed</OptionName>
                    <OptionDescription>Full metal panels on both long sides</OptionDescription>
                    {(calculations.bothSidesClosedPrice || 0) > 0 && (
                      <OptionPrice>+${(calculations.bothSidesClosedPrice || 0).toLocaleString()}</OptionPrice>
                    )}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.bothSidesClosed}>
                    {safeOrder.options.bothSidesClosed && '✓'}
                  </Checkbox>
                </OptionCard>

                {/* Vertical Sides (Both) - Carports only */}
                {!isCommercialBuilding && (
                  <OptionCard
                    $active={safeOrder.options.verticalSidesBoth}
                    onClick={() => toggleOption && toggleOption('verticalSidesBoth')}
                  >
                    <OptionInfo>
                      <OptionName>Vertical Sides (Both)</OptionName>
                      <OptionDescription>Vertical metal panels on both long sides</OptionDescription>
                      {(calculations.verticalSidesBothPrice || 0) > 0 && (
                        <OptionPrice>+${(calculations.verticalSidesBothPrice || 0).toLocaleString()}</OptionPrice>
                      )}
                    </OptionInfo>
                    <Checkbox $checked={safeOrder.options.verticalSidesBoth}>
                      {safeOrder.options.verticalSidesBoth && '✓'}
                    </Checkbox>
                  </OptionCard>
                )}

                {/* ✅ Vertical 2 Tone (Both) - NOW AVAILABLE FOR BOTH CARPORTS AND COMMERCIAL! */}
                <OptionCard
                  $active={safeOrder.options.vertical2ToneBoth}
                  onClick={() => toggleOption && toggleOption('vertical2ToneBoth')}
                >
                  <OptionInfo>
                    <OptionName>Vertical 2 Tone (Both Sides)</OptionName>
                    <OptionDescription>
                      {isCommercialBuilding 
                        ? 'Two-tone vertical metal panels on both long sides - Commercial pricing' 
                        : 'Two-tone vertical panels on both long sides'}
                    </OptionDescription>
                    {(calculations.vertical2ToneBothPrice || 0) > 0 && (
                      <OptionPrice>+${(calculations.vertical2ToneBothPrice || 0).toLocaleString()}</OptionPrice>
                    )}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.vertical2ToneBoth}>
                    {safeOrder.options.vertical2ToneBoth && '✓'}
                  </Checkbox>
                </OptionCard>

                {/* Each End Closed */}
                <CounterGroup>
                  <CounterLabel>Each End Closed - ${(calculations.eachEndClosedPricePerEnd || 0).toLocaleString()} per end</CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('eachEndClosed', -1)}
                      disabled={(safeOrder.counters.eachEndClosed || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.eachEndClosed || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('eachEndClosed', 1)}
                      disabled={(safeOrder.counters.eachEndClosed || 0) >= 2}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.eachEndClosed || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.eachEndClosedPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Vertical End - Carports only */}
                {!isCommercialBuilding && (
                  <CounterGroup>
                    <CounterLabel>Vertical End - ${(calculations.verticalEndPricePerEnd || 0).toLocaleString()} per end</CounterLabel>
                    <CounterButtons>
                      <SelectButton
                        $active={safeOrder.verticalEndCount === 0}
                        onClick={() => setVerticalEndCount && setVerticalEndCount(0)}
                      >
                        None
                      </SelectButton>
                      <SelectButton
                        $active={safeOrder.verticalEndCount === 1}
                        onClick={() => setVerticalEndCount && setVerticalEndCount(1)}
                      >
                        1 End
                      </SelectButton>
                      <SelectButton
                        $active={safeOrder.verticalEndCount === 2}
                        onClick={() => setVerticalEndCount && setVerticalEndCount(2)}
                      >
                        2 Ends
                      </SelectButton>
                    </CounterButtons>
                    {safeOrder.verticalEndCount > 0 && (
                      <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                        Total: ${(calculations.verticalEndPrice || 0).toLocaleString()}
                      </div>
                    )}
                  </CounterGroup>
                )}

                 <CounterGroup>

                  
                <CounterLabel>
                  Vertical 2 Tone End - ${(calculations.vertical2ToneEndPricePerEnd || 0).toLocaleString()} per end
                  {isCommercialBuilding && <span style={{marginLeft: '8px', fontSize: '12px', opacity: 0.8}}>(Commercial pricing)</span>}
                </CounterLabel>
                <CounterButtons>
                  <SelectButton
                    $active={safeOrder.vertical2ToneEndCount === 0}
                    onClick={() => setVertical2ToneEndCount && setVertical2ToneEndCount(0)}
                  >
                    None
                  </SelectButton>
                  <SelectButton
                    $active={safeOrder.vertical2ToneEndCount === 1}
                    onClick={() => setVertical2ToneEndCount && setVertical2ToneEndCount(1)}
                  >
                    1 End
                  </SelectButton>
                  <SelectButton
                    $active={safeOrder.vertical2ToneEndCount === 2}
                    onClick={() => setVertical2ToneEndCount && setVertical2ToneEndCount(2)}
                  >
                    2 Ends
                  </SelectButton>
                </CounterButtons>
                {safeOrder.vertical2ToneEndCount > 0 && (
                  <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                    Total: ${(calculations.vertical2ToneEndPrice || 0).toLocaleString()}
                    {isCommercialBuilding && <span style={{marginLeft: '8px', fontSize: '12px'}}>({safeOrder.vertical2ToneEndCount} × ${(calculations.vertical2ToneEndPricePerEnd || 0).toLocaleString()})</span>}
                  </div>
                )}
              </CounterGroup>  
              </Section>

              {/* GARAGE DOORS */}
              <Section $disabled={!safeOrder.height}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '5' : '6'}</StepBadge>
                    <SectionTitle>Garage Doors</SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  Add roll-up garage doors to your {isCommercialBuilding ? 'building' : 'carport'}
                </SectionDescription>

                <DropdownGrid>
                  <SelectDropdown
                    value={garageDoorForm.size}
                    onChange={(e) => setGarageDoorForm({...garageDoorForm, size: e.target.value})}
                  >
                    {GARAGE_DOOR_SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </SelectDropdown>

                  <SelectDropdown
                    value={garageDoorForm.certification}
                    onChange={(e) => setGarageDoorForm({...garageDoorForm, certification: e.target.value})}
                  >
                    <option value="uncertified">Uncertified</option>
                    <option value="certified">Certified</option>
                  </SelectDropdown>

                  <SelectDropdown
                    value={garageDoorForm.color}
                    onChange={(e) => setGarageDoorForm({...garageDoorForm, color: e.target.value})}
                  >
                    <option value="white">White</option>
                    <option value="colored">Colored</option>
                  </SelectDropdown>
                </DropdownGrid>

                <AddButton onClick={handleAddGarageDoor}>
                  + Add Garage Door
                </AddButton>

                {safeOrder.garageDoors.length > 0 && (
                  <GarageDoorList>
                    {safeOrder.garageDoors.map((door, index) => (
                      <GarageDoorItem key={index}>
                        <GarageDoorInfo>
                          {door.size} {door.color} ({door.certification})
                        </GarageDoorInfo>
                        <RemoveButton onClick={() => removeGarageDoor && removeGarageDoor(index)}>
                          Remove
                        </RemoveButton>
                      </GarageDoorItem>
                    ))}
                  </GarageDoorList>
                )}

                {(calculations.garageDoorPrice || 0) > 0 && (
                  <div style={{ 
                    marginTop: '12px', 
                    padding: '12px', 
                    background: '#e3f2fd', 
                    borderRadius: '8px',
                    color: '#1e3c72',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    Garage Doors Total: ${(calculations.garageDoorPrice || 0).toLocaleString()}
                  </div>
                )}
              </Section>

              {/* SIDE OPENINGS */}
              <Section $disabled={!safeOrder.height}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '6' : '7'}</StepBadge>
                    <SectionTitle>Side Openings</SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  Add side entry openings (affects pricing based on whether you have garage doors)
                </SectionDescription>

                <CounterGroup>
                  <CounterLabel>
                    Number of Side Openings
                    {safeOrder.garageDoors.length > 0 
                      ? ` - $${(calculations.sideOpeningPriceEach || 0).toLocaleString()} each (with garage door)`
                      : ` - $${(calculations.sideOpeningPriceEach || 0).toLocaleString()} each (no garage door)`}
                  </CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('sideOpenings', -1)}
                      disabled={(safeOrder.counters.sideOpenings || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.sideOpenings || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('sideOpenings', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.sideOpenings || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.sideOpeningPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>
              </Section>

              {/* ADDITIONAL OPTIONS */}
              <Section $disabled={!safeOrder.height}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '7' : '8'}</StepBadge>
                    <SectionTitle>Additional Options</SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  Doors, windows, insulation, and other extras
                </SectionDescription>

                {/* Walk-in Door */}
                <CounterGroup>
                  <CounterLabel>Walk-in Door - ${(calculations.walkInDoorPriceEach || 0).toLocaleString()} each</CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('walkInDoor', -1)}
                      disabled={(safeOrder.counters.walkInDoor || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.walkInDoor || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('walkInDoor', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.walkInDoor || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.walkInDoorPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Windows 30x30 */}
                <CounterGroup>
                  <CounterLabel>Windows 30x30 - ${(calculations.window30x30PriceEach || 0).toLocaleString()} each</CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('window30x30', -1)}
                      disabled={(safeOrder.counters.window30x30 || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.window30x30 || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('window30x30', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.window30x30 || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.window30x30Price || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Windows 30x36 */}
                <CounterGroup>
                  <CounterLabel>Windows 30x36 - ${(calculations.window30x36PriceEach || 0).toLocaleString()} each</CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('window30x36', -1)}
                      disabled={(safeOrder.counters.window30x36 || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.window30x36 || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('window30x36', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.window30x36 || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.window30x36Price || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Insulation Toggle */}
                <OptionCard
                  $active={safeOrder.options.insulationDoubleBubble}
                  onClick={() => toggleOption && toggleOption('insulationDoubleBubble')}
                >
                  <OptionInfo>
                    <OptionName>Insulation (Double Bubble)</OptionName>
                    <OptionDescription>
                      {(calculations.squareFootage || 0) > 0 && `${calculations.squareFootage} sq ft`}
                    </OptionDescription>
                    {(calculations.insulationDoubleBubblePrice || 0) > 0 && (
                      <OptionPrice>+${(calculations.insulationDoubleBubblePrice || 0).toLocaleString()}</OptionPrice>
                    )}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.insulationDoubleBubble}>
                    {safeOrder.options.insulationDoubleBubble && '✓'}
                  </Checkbox>
                </OptionCard>

                <OptionCard
                  $active={safeOrder.options.insulationFiberglass}
                  onClick={() => toggleOption && toggleOption('insulationFiberglass')}
                >
                  <OptionInfo>
                    <OptionName>Insulation (Fiberglass)</OptionName>
                    <OptionDescription>
                      {(calculations.squareFootage || 0) > 0 && `${calculations.squareFootage} sq ft`}
                    </OptionDescription>
                    {(calculations.insulationFiberglassPrice || 0) > 0 && (
                      <OptionPrice>+${(calculations.insulationFiberglassPrice || 0).toLocaleString()}</OptionPrice>
                    )}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.insulationFiberglass}>
                    {safeOrder.options.insulationFiberglass && '✓'}
                  </Checkbox>
                </OptionCard>

                {/* Certified Gable End */}
                <CounterGroup>
                  <CounterLabel>Certified Gable End - ${(calculations.certifiedGableEndPriceEach || 0).toLocaleString()} each</CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('certifiedGableEnd', -1)}
                      disabled={(safeOrder.counters.certifiedGableEnd || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.certifiedGableEnd || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('certifiedGableEnd', 1)}
                      disabled={(safeOrder.counters.certifiedGableEnd || 0) >= 2}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.certifiedGableEnd || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.certifiedGableEndPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Colored Screws */}
                <OptionCard
                  $active={safeOrder.options.coloredScrews}
                  onClick={() => toggleOption && toggleOption('coloredScrews')}
                >
                  <OptionInfo>
                    <OptionName>Colored Screws</OptionName>
                    <OptionDescription>Matching screws for better aesthetics</OptionDescription>
                    {(calculations.coloredScrewsPrice || 0) > 0 && (
                      <OptionPrice>+${(calculations.coloredScrewsPrice || 0).toLocaleString()}</OptionPrice>
                    )}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.coloredScrews}>
                    {safeOrder.options.coloredScrews && '✓'}
                  </Checkbox>
                </OptionCard>
              </Section>

              {/* CUSTOM PANELS */}
              <Section $disabled={!safeOrder.height}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '8' : '9'}</StepBadge>
                    <SectionTitle>Custom Panels & Frameouts</SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <SectionDescription>
                  Add custom panels, frameouts, and special configurations
                </SectionDescription>

                {/* Frameouts */}
                <CounterGroup>
                  <CounterLabel>Frameouts - ${(calculations.frameoutPriceEach || 0).toLocaleString()} each</CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('frameouts', -1)}
                      disabled={(safeOrder.counters.frameouts || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.frameouts || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('frameouts', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.frameouts || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.frameoutPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Half Panel with Trim */}
                <CounterGroup>
                  <CounterLabel>
                    1/2 Panel with Trim - ${getPanelPrice('halfPanel', 1).toLocaleString()} each
                  </CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('halfPanelWithTrim', -1)}
                      disabled={(safeOrder.counters.halfPanelWithTrim || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.halfPanelWithTrim || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('halfPanelWithTrim', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.halfPanelWithTrim || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.halfPanelWithTrimPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Cut Panel */}
                <CounterGroup>
                  <CounterLabel>
                    Cut Panel - ${getPanelPrice('cutPanel', 1).toLocaleString()} each
                  </CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('cutPanel', -1)}
                      disabled={(safeOrder.counters.cutPanel || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.cutPanel || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('cutPanel', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.cutPanel || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.cutPanelPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>

                {/* Panels 3ft */}
                <CounterGroup>
                  <CounterLabel>
                    3ft Panels - ${getPanelPrice('panels3ft', 1).toLocaleString()} each
                  </CounterLabel>
                  <CounterControl>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('panels3ft', -1)}
                      disabled={(safeOrder.counters.panels3ft || 0) === 0}
                    >
                      −
                    </CounterButton>
                    <CounterValue>{safeOrder.counters.panels3ft || 0}</CounterValue>
                    <CounterButton 
                      onClick={() => updateCounter && updateCounter('panels3ft', 1)}
                    >
                      +
                    </CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.panels3ft || 0) > 0 && (
                    <div style={{ marginTop: '10px', color: '#2a5298', fontWeight: '600', fontSize: '14px' }}>
                      Total: ${(calculations.panels3ftPrice || 0).toLocaleString()}
                    </div>
                  )}
                </CounterGroup>
              </Section>
            </LeftColumn>

            {/* RIGHT COLUMN - ORDER SUMMARY */}
            <div>
              <SummaryCard>
                <SummaryTitle>📋 Order Summary</SummaryTitle>

                {/* Basic Configuration */}
                <SummarySection>
                  <SummarySectionTitle>Configuration</SummarySectionTitle>
                  {safeOrder.buildingType && (
                    <SummaryRow>
                      <SummaryLabel>Type:</SummaryLabel>
                      <SummaryValue>{labels.buildingType || safeOrder.buildingType}</SummaryValue>
                    </SummaryRow>
                  )}
                  {safeOrder.roofStyle && (
                    <SummaryRow>
                      <SummaryLabel>Roof Style:</SummaryLabel>
                      <SummaryValue>{labels.roofStyle || safeOrder.roofStyle}</SummaryValue>
                    </SummaryRow>
                  )}
                  {safeOrder.width && safeOrder.length && (
                    <SummaryRow>
                      <SummaryLabel>Size:</SummaryLabel>
                      <SummaryValue>{labels.size || `${safeOrder.width}' x ${safeOrder.length}'`}</SummaryValue>
                    </SummaryRow>
                  )}
                  {safeOrder.height && (
                    <SummaryRow>
                      <SummaryLabel>Height:</SummaryLabel>
                      <SummaryValue>{labels.height || `${safeOrder.height}'`}</SummaryValue>
                    </SummaryRow>
                  )}
                </SummarySection>

                {(order.colors?.roof || order.colors?.side || order.colors?.trim) && (
  <SummarySection>
    <SummarySectionTitle>🎨 Colors</SummarySectionTitle>
    
    {order.colors.roof && (
      <SummaryRow>
        <SummaryLabel>Roof:</SummaryLabel>
        <SummaryValue>{order.colors.roof}</SummaryValue>
      </SummaryRow>
    )}
    
    {order.colors.side && (
      <SummaryRow>
        <SummaryLabel>Sides:</SummaryLabel>
        <SummaryValue>{order.colors.side}</SummaryValue>
      </SummaryRow>
    )}
    
    {order.colors.trim && (
      <SummaryRow>
        <SummaryLabel>Trim:</SummaryLabel>
        <SummaryValue>{order.colors.trim}</SummaryValue>
      </SummaryRow>
    )}
  </SummarySection>
)}

                {/* Price Breakdown */}
                {(calculations.basePrice || 0) > 0 && (
                  <SummarySection>
                    <SummarySectionTitle>Price Breakdown</SummarySectionTitle>
                    <SummaryRow>
                      <SummaryLabel>Base Price:</SummaryLabel>
                      <SummaryValue>${(calculations.basePrice || 0).toLocaleString()}</SummaryValue>
                    </SummaryRow>
                    
                    {(calculations.heightCharge || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Height Charge:</SummaryLabel>
                        <SummaryValue>+${(calculations.heightCharge || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.bothSidesClosedPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Both Sides Closed:</SummaryLabel>
                        <SummaryValue>+${(calculations.bothSidesClosedPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.verticalSidesBothPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Vertical Sides (Both):</SummaryLabel>
                        <SummaryValue>+${(calculations.verticalSidesBothPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}

                    {(calculations.vertical2ToneBothPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Vertical 2 Tone (Both):</SummaryLabel>
                        <SummaryValue>+${(calculations.vertical2ToneBothPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.eachEndClosedPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>End Closures ({safeOrder.counters.eachEndClosed || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.eachEndClosedPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.verticalEndPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Vertical Ends ({safeOrder.verticalEndCount || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.verticalEndPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}

                    {(calculations.vertical2ToneEndPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Vertical 2 Tone Ends ({safeOrder.vertical2ToneEndCount || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.vertical2ToneEndPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.garageDoorPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Garage Doors ({safeOrder.garageDoors.length}):</SummaryLabel>
                        <SummaryValue>+${(calculations.garageDoorPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.sideOpeningPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Side Openings ({safeOrder.counters.sideOpenings || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.sideOpeningPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.walkInDoorPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Walk-in Doors ({safeOrder.counters.walkInDoor || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.walkInDoorPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.window30x30Price || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Windows 30x30 ({safeOrder.counters.window30x30 || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.window30x30Price || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.window30x36Price || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Windows 30x36 ({safeOrder.counters.window30x36 || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.window30x36Price || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.insulationDoubleBubblePrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Insulation (Double Bubble):</SummaryLabel>
                        <SummaryValue>+${(calculations.insulationDoubleBubblePrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.insulationFiberglassPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Insulation (Fiberglass):</SummaryLabel>
                        <SummaryValue>+${(calculations.insulationFiberglassPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.certifiedGableEndPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Certified Gable ({safeOrder.counters.certifiedGableEnd || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.certifiedGableEndPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.coloredScrewsPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Colored Screws:</SummaryLabel>
                        <SummaryValue>+${(calculations.coloredScrewsPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.frameoutPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Frameouts ({safeOrder.counters.frameouts || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.frameoutPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.halfPanelWithTrimPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>1/2 Panels ({safeOrder.counters.halfPanelWithTrim || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.halfPanelWithTrimPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.cutPanelPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Cut Panels ({safeOrder.counters.cutPanel || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.cutPanelPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                    
                    {(calculations.panels3ftPrice || 0) > 0 && (
                      <SummaryRow>
                        <SummaryLabel>3ft Panels ({safeOrder.counters.panels3ft || 0}):</SummaryLabel>
                        <SummaryValue>+${(calculations.panels3ftPrice || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    )}
                  </SummarySection>
                )}

                {/* Total Section */}
                {(calculations.subtotal || 0) > 0 && (
                  <>
                    <SummarySection>
                      <SummaryRow>
                        <SummaryLabel>Subtotal:</SummaryLabel>
                        <SummaryValue>${(calculations.subtotal || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                      <SummaryRow>
                        <SummaryLabel>Tax (6.75%):</SummaryLabel>
                        <SummaryValue>${(calculations.tax || 0).toLocaleString()}</SummaryValue>
                      </SummaryRow>
                    </SummarySection>

                    <TotalRow>
                      <SummaryLabel>Total:</SummaryLabel>
                      <SummaryValue>${(calculations.total || 0).toLocaleString()}</SummaryValue>
                    </TotalRow>

                    <DepositRow>
                      <SummaryLabel>Deposit (15%):</SummaryLabel>
                      <SummaryValue>${(calculations.deposit || 0).toLocaleString()}</SummaryValue>
                    </DepositRow>
                  </>
                )}

                {/* Action Buttons */}
                <ButtonGroup>
                  <Button 
                    $variant="secondary"
                    onClick={handleReset}
                  >
                    🔄 Reset
                  </Button>
                  <Button 
                    $variant="primary"
                    onClick={handleAddToCart}
                    disabled={!isOrderComplete}
                  >
                    ✓ Add to Cart
                  </Button>
                </ButtonGroup>

                {!isOrderComplete && (
                  <ValidationMessage>
                    Complete required selections: Building Type, Width, Length, and Height
                  </ValidationMessage>
                )}
              </SummaryCard>
            </div>
          </GridContainer>
        </Wrapper>
      </ContentWrapper>
    </Container>
  );
};

export default OrderBuilder;