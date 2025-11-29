// client/src/pages/OrderBuilder.js
// REFINED CARPORT & COMMERCIAL ORDER BUILDER
// ✅ Compact, professional UI with improved usability
// ✅ Smaller components, better information density
// ✅ Clean visual hierarchy

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
  COMMERCIAL_VERTICAL_2_TONE,
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
// REFINED STYLED COMPONENTS - Compact & Professional
// ============================================================================

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f0f2f5;
`;

const ModernNav = styled.nav`
  background: white;
  padding: 12px 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  ${mobile({ padding: '10px 15px', flexDirection: 'column', gap: '10px' })}
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CompanyName = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
  ${mobile({ fontSize: '16px' })}
`;

const StaffBadge = styled.div`
  background: #48bb78;
  color: white;
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  ${mobile({ width: '100%', justifyContent: 'space-between' })}
`;

const UserInfo = styled.div`
  text-align: right;
  ${mobile({ textAlign: 'left' })}
`;

const Username = styled.div`
  font-weight: 600;
  color: #2d3748;
  font-size: 13px;
`;

const Role = styled.div`
  font-size: 11px;
  color: #718096;
  text-transform: capitalize;
`;

const LogoutButton = styled.button`
  padding: 6px 14px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c53030;
  }
`;

const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
  ${mobile({ padding: '12px' })}
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1a365d;
  margin: 0 0 4px 0;
  ${mobile({ fontSize: '18px' })}
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 13px;
  margin: 0;
  ${mobile({ fontSize: '12px' })}
`;

// Compact Progress Bar
const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  ${mobile({ gap: '6px' })}
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${props => props.$completed ? '#c6f6d5' : props.$active ? '#bee3f8' : '#edf2f7'};
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$completed ? '#276749' : props.$active ? '#2b6cb0' : '#718096'};
  transition: all 0.2s ease;
  ${mobile({ padding: '4px 8px', fontSize: '10px' })}
`;

const StepIcon = styled.span`
  font-size: 12px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: start;
  ${mobile({ gridTemplateColumns: '1fr', gap: '15px' })}
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0; /* Allows proper scrolling behavior */
`;

// Compact Section Cards
const Section = styled.div`
  background: ${props => props.$disabled ? '#f7fafc' : 'white'};
  border-radius: 10px;
  padding: 16px;
  border: 1px solid ${props => props.$disabled ? '#e2e8f0' : '#e2e8f0'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  transition: all 0.2s ease;
  ${mobile({ padding: '12px' })}
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #4299e1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  ${mobile({ fontSize: '13px' })}
`;

const RequiredBadge = styled.span`
  background: #fed7d7;
  color: #c53030;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 8px;
`;

const SectionDescription = styled.p`
  color: #718096;
  font-size: 12px;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

// Compact Button Grid
const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns || 'repeat(auto-fill, minmax(70px, 1fr))'};
  gap: 6px;
  ${mobile({ gap: '5px' })}
`;

const SelectButton = styled.button`
  padding: ${props => props.$large ? '14px 10px' : '10px 8px'};
  background: ${props => props.$active ? '#4299e1' : 'white'};
  color: ${props => props.$active ? 'white' : '#2d3748'};
  border: 1.5px solid ${props => props.$active ? '#4299e1' : '#e2e8f0'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-weight: 600;
  font-size: 13px;

  &:hover {
    border-color: #4299e1;
    transform: translateY(-1px);
  }

  ${mobile({ padding: '8px 6px', fontSize: '12px' })}
`;

const SelectButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const ButtonIcon = styled.span`
  font-size: 20px;
  ${mobile({ fontSize: '18px' })}
`;

const ButtonLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  ${mobile({ fontSize: '11px' })}
`;

const ButtonSublabel = styled.span`
  font-size: 10px;
  opacity: 0.7;
`;

// Compact Option Cards
const OptionCard = styled.div`
  background: white;
  border: 1.5px solid ${props => props.$active ? '#48bb78' : '#e2e8f0'};
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:hover {
    border-color: ${props => props.$active ? '#48bb78' : '#4299e1'};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #2d3748;
  margin-bottom: 2px;
`;

const OptionDescription = styled.div`
  font-size: 11px;
  color: #718096;
`;

const OptionPrice = styled.div`
  font-size: 12px;
  color: ${props => props.$free ? '#48bb78' : '#4299e1'};
  font-weight: 700;
  margin-top: 2px;
`;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.$checked ? '#48bb78' : '#e2e8f0'};
  border-radius: 5px;
  background: ${props => props.$checked ? '#48bb78' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  transition: all 0.15s ease;
  flex-shrink: 0;
`;

// Compact Counter Groups
const CounterGroup = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const CounterLabel = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: #2d3748;
  margin-bottom: 8px;
`;

const CounterButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const CounterControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CounterButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1.5px solid #e2e8f0;
  background: white;
  color: #4299e1;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #4299e1;
    color: white;
    border-color: #4299e1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CounterValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  min-width: 30px;
  text-align: center;
`;

const CounterTotal = styled.div`
  margin-top: 6px;
  color: #4299e1;
  font-weight: 600;
  font-size: 12px;
`;

// Garage Door Components
const GarageDoorList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const GarageDoorItem = styled.div`
  background: #f7fafc;
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
  font-size: 12px;
`;

const GarageDoorInfo = styled.div`
  color: #2d3748;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  padding: 4px 10px;
  background: #fc8181;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f56565;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  width: 100%;

  &:hover {
    background: #38a169;
  }
`;

// Dropdown Styling
const SelectDropdown = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #2d3748;
  background: white;
  cursor: pointer;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  ${mobile({ gridTemplateColumns: '1fr' })}
`;

// Sticky Summary Card - Always visible on scroll
const SummaryWrapper = styled.div`
  position: sticky;
  top: 70px;
  height: fit-content;
  ${mobile({ position: 'static' })}
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  
  /* Custom scrollbar for the summary */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
  
  ${mobile({ maxHeight: 'none' })}
`;

const SummaryTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #1a365d;
  text-align: center;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
`;

const SummarySection = styled.div`
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #edf2f7;

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SummarySectionTitle = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #a0aec0;
  margin-bottom: 8px;
  font-weight: 700;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 12px;
  align-items: center;
`;

const SummaryLabel = styled.span`
  color: #718096;
  font-weight: 500;
`;

const SummaryValue = styled.span`
  font-weight: 700;
  color: #2d3748;
`;

const TotalSection = styled.div`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  margin: 12px -16px -16px -16px;
  padding: 16px;
  border-radius: 0 0 12px 12px;
  color: white;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 6px;
  opacity: 0.9;
`;

const GrandTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.2);
  margin-top: 8px;
`;

const DepositRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255,255,255,0.15);
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
`;

const Button = styled.button`
  padding: 10px;
  background: ${props => props.$variant === 'primary' ? '#48bb78' : '#edf2f7'};
  color: ${props => props.$variant === 'primary' ? 'white' : '#4a5568'};
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

const ValidationMessage = styled.div`
  background: #fefcbf;
  border: 1px solid #ecc94b;
  color: #744210;
  padding: 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
`;

const InfoBanner = styled.div`
  padding: 10px 14px;
  background: #ebf8ff;
  border-radius: 8px;
  border: 1px solid #bee3f8;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2b6cb0;
  font-weight: 600;
  font-size: 12px;
`;

const SelectedBadge = styled.div`
  margin-top: 10px;
  padding: 8px 12px;
  background: #c6f6d5;
  border-radius: 6px;
  color: #276749;
  font-weight: 600;
  text-align: center;
  font-size: 12px;
`;

const PriceBadge = styled.div`
  margin-top: 10px;
  padding: 8px 12px;
  background: #feebc8;
  border-radius: 6px;
  color: #c05621;
  font-weight: 600;
  text-align: center;
  font-size: 12px;
`;

// Two-column layout for options
const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
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

  const [garageDoorForm, setGarageDoorForm] = useState({
    size: "6'x6'",
    certification: 'uncertified',
    color: 'white'
  });

  const progress = {
    buildingType: !!safeOrder.buildingType,
    roofStyle: safeOrder.buildingType === 'commercial' ? true : !!safeOrder.roofStyle,
    width: !!safeOrder.width,
    length: !!safeOrder.length,
    height: !!safeOrder.height,
  };

  const isCommercialBuilding = safeOrder.buildingType === 'commercial';

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#718096',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
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
        title: 'Incomplete Order',
        html: `<p>Please complete: <strong>${missing.join(', ')}</strong></p>`,
        icon: 'warning',
        confirmButtonColor: '#4299e1',
      });
      return;
    }

    Swal.fire({
      title: 'Add to Cart?',
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>${labels.buildingType}</strong> - ${labels.roofStyle}</p>
          <p>${labels.size} at ${labels.height}</p>
          <p style="font-size: 18px; color: #48bb78; font-weight: 700;">$${(calculations.total || 0).toLocaleString()}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#48bb78',
      cancelButtonColor: '#718096',
      confirmButtonText: 'Add to Cart',
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
        } catch (error) {
          console.error('Error saving order data:', error);
          Swal.fire({ title: 'Error', text: 'Failed to save order data.', icon: 'error' });
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
          title: 'Added to Cart!',
          icon: 'success',
          timer: 1200,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate(`/cart/${calculations.subtotal || 0}/${calculations.tax || 0}`);
        }, 1200);
      }
    });
  };

  const handleReset = () => {
    Swal.fire({
      title: 'Reset Order?',
      text: 'This will clear all selections',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#718096',
      confirmButtonText: 'Reset',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (resetOrder) resetOrder();
        setGarageDoorForm({ size: "6'x6'", certification: 'uncertified', color: 'white' });
        Swal.fire({ title: 'Reset!', icon: 'success', timer: 800, showConfirmButton: false });
      }
    });
  };

  const handleAddGarageDoor = () => {
    if (addGarageDoor) {
      addGarageDoor(garageDoorForm.size, garageDoorForm.certification, garageDoorForm.color);
      Swal.fire({
        title: 'Door Added!',
        text: `${garageDoorForm.size} ${garageDoorForm.color}`,
        icon: 'success',
        timer: 800,
        showConfirmButton: false
      });
    }
  };

  const getHeightChargeForDisplay = (height) => {
    if (!safeOrder.width || !safeOrder.length) return 0;
    if (isCommercialBuilding && height === '8') return 0;
    if (!isCommercialBuilding && height === '6') return 0;
    return getHeightCharge(height, safeOrder.length, safeOrder.width, safeOrder.buildingType) || 0;
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

  if (!order || !setBuildingType) {
    return (
      <Container>
        <ContentWrapper>
          <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px' }}>
            <h2 style={{ color: '#e53e3e', marginBottom: '15px' }}>Error Loading</h2>
            <p style={{ color: '#718096', marginBottom: '20px' }}>Failed to initialize order builder.</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ padding: '10px 20px', background: '#4299e1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              Reload
            </button>
          </div>
        </ContentWrapper>
      </Container>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Container>
      <ModernNav>
        <LeftNav>
          <CompanyName>ProCarport Buildings</CompanyName>
          <StaffBadge>Staff Portal</StaffBadge>
        </LeftNav>
        {user && (
          <UserSection>
            <UserInfo>
              <Username>{user.username}</Username>
              <Role>{user.role}</Role>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserSection>
        )}
      </ModernNav>

      <ContentWrapper>
        <PageHeader>
          <Title>Build Your Order</Title>
          <Subtitle>Carports (12'-30') • Commercial (32'-60')</Subtitle>
        </PageHeader>

        {/* Compact Progress */}
        <ProgressBar>
          <ProgressStep $completed={progress.buildingType}>
            <StepIcon>{progress.buildingType ? '✓' : '1'}</StepIcon> Type
          </ProgressStep>
          <ProgressStep $completed={progress.roofStyle} $active={progress.buildingType && !progress.roofStyle}>
            <StepIcon>{progress.roofStyle ? '✓' : '2'}</StepIcon> Roof
          </ProgressStep>
          <ProgressStep $completed={progress.width} $active={progress.roofStyle && !progress.width}>
            <StepIcon>{progress.width ? '✓' : '3'}</StepIcon> Width
          </ProgressStep>
          <ProgressStep $completed={progress.length} $active={progress.width && !progress.length}>
            <StepIcon>{progress.length ? '✓' : '4'}</StepIcon> Length
          </ProgressStep>
          <ProgressStep $completed={progress.height} $active={progress.length && !progress.height}>
            <StepIcon>{progress.height ? '✓' : '5'}</StepIcon> Height
          </ProgressStep>
          <ProgressStep $active={progress.height}>
            <StepIcon>6</StepIcon> Options
          </ProgressStep>
        </ProgressBar>

        <GridContainer>
          <LeftColumn>
            {/* BUILDING TYPE */}
            <Section>
              <SectionHeader>
                <SectionTitleGroup>
                  <StepBadge>🏢</StepBadge>
                  <SectionTitle>Building Type<RequiredBadge>Required</RequiredBadge></SectionTitle>
                </SectionTitleGroup>
              </SectionHeader>
              <ButtonGrid $columns="repeat(2, 1fr)">
                {buildingTypes.map((type) => (
                  <SelectButton
                    key={type.value}
                    $active={safeOrder.buildingType === type.value}
                    $large
                    onClick={() => setBuildingType && setBuildingType(type.value)}
                  >
                    <SelectButtonContent>
                      <ButtonIcon>{type.icon}</ButtonIcon>
                      <ButtonLabel>{type.label}</ButtonLabel>
                    </SelectButtonContent>
                  </SelectButton>
                ))}
              </ButtonGrid>
            </Section>

            {/* ROOF STYLE - Only for carports */}
            {!isCommercialBuilding && (
              <Section>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>1</StepBadge>
                    <SectionTitle>Roof Style<RequiredBadge>Required</RequiredBadge></SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <ButtonGrid $columns="repeat(3, 1fr)">
                  {roofStyles.map((style) => (
                    <SelectButton
                      key={style.value}
                      $active={safeOrder.roofStyle === style.value}
                      onClick={() => setRoofStyle && setRoofStyle(style.value)}
                    >
                      <SelectButtonContent>
                        <ButtonIcon>{style.icon}</ButtonIcon>
                        <ButtonLabel>{style.label}</ButtonLabel>
                      </SelectButtonContent>
                    </SelectButton>
                  ))}
                </ButtonGrid>
              </Section>
            )}

            {isCommercialBuilding && (
              <InfoBanner>
                <span>ℹ️</span> Commercial buildings use Vertical roof only
              </InfoBanner>
            )}

            {/* WIDTH & LENGTH - Side by side */}
            <TwoColumnGrid>
              <Section>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '1' : '2'}</StepBadge>
                    <SectionTitle>Width<RequiredBadge>Req</RequiredBadge></SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <ButtonGrid $columns={isCommercialBuilding ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'}>
                  {availableWidths.map((w) => (
                    <SelectButton
                      key={w}
                      $active={safeOrder.width === w}
                      onClick={() => setWidth && setWidth(w)}
                    >
                      {w}'
                    </SelectButton>
                  ))}
                </ButtonGrid>
              </Section>

              <Section $disabled={!safeOrder.width}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '2' : '3'}</StepBadge>
                    <SectionTitle>Length<RequiredBadge>Req</RequiredBadge></SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>
                <ButtonGrid $columns="repeat(4, 1fr)">
                  {availableLengths.map((l) => (
                    <SelectButton
                      key={l}
                      $active={safeOrder.length === l}
                      onClick={() => setLength && setLength(l)}
                    >
                      {l}'
                    </SelectButton>
                  ))}
                </ButtonGrid>
                {safeOrder.width && safeOrder.length && (calculations.basePrice || 0) > 0 && (
                  <SelectedBadge>
                    {safeOrder.width}' × {safeOrder.length}' = ${(calculations.basePrice || 0).toLocaleString()}
                  </SelectedBadge>
                )}
              </Section>
            </TwoColumnGrid>

            {/* HEIGHT */}
            <Section $disabled={!safeOrder.width || !safeOrder.length}>
              <SectionHeader>
                <SectionTitleGroup>
                  <StepBadge>{isCommercialBuilding ? '3' : '4'}</StepBadge>
                  <SectionTitle>Height<RequiredBadge>Required</RequiredBadge></SectionTitle>
                </SectionTitleGroup>
              </SectionHeader>
              <SectionDescription>
                {isCommercialBuilding ? "8' is base height" : "6' is standard"} • Taller = extra cost
              </SectionDescription>
              <ButtonGrid $columns="repeat(6, 1fr)">
                {availableHeights.map((h) => {
                  const charge = getHeightChargeForDisplay(h);
                  const isBase = isCommercialBuilding ? h === '8' : h === '6';
                  return (
                    <SelectButton
                      key={h}
                      $active={safeOrder.height === h}
                      onClick={() => setHeight && setHeight(h)}
                    >
                      <SelectButtonContent>
                        <span style={{ fontWeight: 700 }}>{h}'</span>
                        {safeOrder.length && !isBase && charge > 0 && (
                          <ButtonSublabel>+${charge.toLocaleString()}</ButtonSublabel>
                        )}
                      </SelectButtonContent>
                    </SelectButton>
                  );
                })}
              </ButtonGrid>
              {safeOrder.height && (calculations.heightCharge || 0) > 0 && (
                <PriceBadge>
                  Height upgrade: +${(calculations.heightCharge || 0).toLocaleString()}
                </PriceBadge>
              )}
            </Section>

            {/* COLORS */}
            <ColorSelector selectedColors={order.colors} onColorChange={handleColorChange} />

            {/* ENCLOSURES */}
            <Section $disabled={!safeOrder.height}>
              <SectionHeader>
                <SectionTitleGroup>
                  <StepBadge>{isCommercialBuilding ? '4' : '5'}</StepBadge>
                  <SectionTitle>Enclosures</SectionTitle>
                </SectionTitleGroup>
              </SectionHeader>

              <OptionCard
                $active={safeOrder.options.bothSidesClosed}
                onClick={() => toggleOption && toggleOption('bothSidesClosed')}
              >
                <OptionInfo>
                  <OptionName>Both Sides Closed</OptionName>
                  {(calculations.bothSidesClosedPrice || 0) > 0 && (
                    <OptionPrice>+${(calculations.bothSidesClosedPrice || 0).toLocaleString()}</OptionPrice>
                  )}
                </OptionInfo>
                <Checkbox $checked={safeOrder.options.bothSidesClosed}>
                  {safeOrder.options.bothSidesClosed && '✓'}
                </Checkbox>
              </OptionCard>

              {!isCommercialBuilding && (
                <OptionCard
                  $active={safeOrder.options.verticalSidesBoth}
                  onClick={() => toggleOption && toggleOption('verticalSidesBoth')}
                >
                  <OptionInfo>
                    <OptionName>Vertical Sides (Both)</OptionName>
                    {(calculations.verticalSidesBothPrice || 0) > 0 && (
                      <OptionPrice>+${(calculations.verticalSidesBothPrice || 0).toLocaleString()}</OptionPrice>
                    )}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.verticalSidesBoth}>
                    {safeOrder.options.verticalSidesBoth && '✓'}
                  </Checkbox>
                </OptionCard>
              )}

              <OptionCard
                $active={safeOrder.options.vertical2ToneBoth}
                onClick={() => toggleOption && toggleOption('vertical2ToneBoth')}
              >
                <OptionInfo>
                  <OptionName>Vertical 2 Tone (Both)</OptionName>
                  {(calculations.vertical2ToneBothPrice || 0) > 0 && (
                    <OptionPrice>+${(calculations.vertical2ToneBothPrice || 0).toLocaleString()}</OptionPrice>
                  )}
                </OptionInfo>
                <Checkbox $checked={safeOrder.options.vertical2ToneBoth}>
                  {safeOrder.options.vertical2ToneBoth && '✓'}
                </Checkbox>
              </OptionCard>

              {/* End Closures */}
              <CounterGroup>
                <CounterLabel>Each End Closed - ${(calculations.eachEndClosedPricePerEnd || 0).toLocaleString()}/end</CounterLabel>
                <CounterControl>
                  <CounterButton onClick={() => updateCounter && updateCounter('eachEndClosed', -1)} disabled={(safeOrder.counters.eachEndClosed || 0) === 0}>−</CounterButton>
                  <CounterValue>{safeOrder.counters.eachEndClosed || 0}</CounterValue>
                  <CounterButton onClick={() => updateCounter && updateCounter('eachEndClosed', 1)} disabled={(safeOrder.counters.eachEndClosed || 0) >= 2}>+</CounterButton>
                </CounterControl>
                {(safeOrder.counters.eachEndClosed || 0) > 0 && <CounterTotal>Total: ${(calculations.eachEndClosedPrice || 0).toLocaleString()}</CounterTotal>}
              </CounterGroup>

              {!isCommercialBuilding && (
                <CounterGroup>
                  <CounterLabel>Vertical End - ${(calculations.verticalEndPricePerEnd || 0).toLocaleString()}/end</CounterLabel>
                  <CounterButtons>
                    <SelectButton $active={safeOrder.verticalEndCount === 0} onClick={() => setVerticalEndCount && setVerticalEndCount(0)}>None</SelectButton>
                    <SelectButton $active={safeOrder.verticalEndCount === 1} onClick={() => setVerticalEndCount && setVerticalEndCount(1)}>1</SelectButton>
                    <SelectButton $active={safeOrder.verticalEndCount === 2} onClick={() => setVerticalEndCount && setVerticalEndCount(2)}>2</SelectButton>
                  </CounterButtons>
                  {safeOrder.verticalEndCount > 0 && <CounterTotal>Total: ${(calculations.verticalEndPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>
              )}

              <CounterGroup>
                <CounterLabel>Vertical 2 Tone End - ${(calculations.vertical2ToneEndPricePerEnd || 0).toLocaleString()}/end</CounterLabel>
                <CounterButtons>
                  <SelectButton $active={safeOrder.vertical2ToneEndCount === 0} onClick={() => setVertical2ToneEndCount && setVertical2ToneEndCount(0)}>None</SelectButton>
                  <SelectButton $active={safeOrder.vertical2ToneEndCount === 1} onClick={() => setVertical2ToneEndCount && setVertical2ToneEndCount(1)}>1</SelectButton>
                  <SelectButton $active={safeOrder.vertical2ToneEndCount === 2} onClick={() => setVertical2ToneEndCount && setVertical2ToneEndCount(2)}>2</SelectButton>
                </CounterButtons>
                {safeOrder.vertical2ToneEndCount > 0 && <CounterTotal>Total: ${(calculations.vertical2ToneEndPrice || 0).toLocaleString()}</CounterTotal>}
              </CounterGroup>
            </Section>

            {/* GARAGE DOORS & SIDE OPENINGS - Side by side */}
            <TwoColumnGrid>
              <Section $disabled={!safeOrder.height}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '5' : '6'}</StepBadge>
                    <SectionTitle>Garage Doors</SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>

                <DropdownGrid>
                  <SelectDropdown value={garageDoorForm.size} onChange={(e) => setGarageDoorForm({...garageDoorForm, size: e.target.value})}>
                    {GARAGE_DOOR_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
                  </SelectDropdown>
                  <SelectDropdown value={garageDoorForm.certification} onChange={(e) => setGarageDoorForm({...garageDoorForm, certification: e.target.value})}>
                    <option value="uncertified">Uncert</option>
                    <option value="certified">Cert</option>
                  </SelectDropdown>
                  <SelectDropdown value={garageDoorForm.color} onChange={(e) => setGarageDoorForm({...garageDoorForm, color: e.target.value})}>
                    <option value="white">White</option>
                    <option value="colored">Color</option>
                  </SelectDropdown>
                </DropdownGrid>

                <AddButton onClick={handleAddGarageDoor}>+ Add Door</AddButton>

                {safeOrder.garageDoors.length > 0 && (
                  <GarageDoorList>
                    {safeOrder.garageDoors.map((door, index) => (
                      <GarageDoorItem key={index}>
                        <GarageDoorInfo>{door.size} {door.color}</GarageDoorInfo>
                        <RemoveButton onClick={() => removeGarageDoor && removeGarageDoor(index)}>×</RemoveButton>
                      </GarageDoorItem>
                    ))}
                  </GarageDoorList>
                )}

                {(calculations.garageDoorPrice || 0) > 0 && <CounterTotal>Total: ${(calculations.garageDoorPrice || 0).toLocaleString()}</CounterTotal>}
              </Section>

              <Section $disabled={!safeOrder.height}>
                <SectionHeader>
                  <SectionTitleGroup>
                    <StepBadge>{isCommercialBuilding ? '6' : '7'}</StepBadge>
                    <SectionTitle>Side Openings</SectionTitle>
                  </SectionTitleGroup>
                </SectionHeader>

                <CounterGroup>
                  <CounterLabel>Openings - ${(calculations.sideOpeningPriceEach || 0).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('sideOpenings', -1)} disabled={(safeOrder.counters.sideOpenings || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.sideOpenings || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('sideOpenings', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.sideOpenings || 0) > 0 && <CounterTotal>Total: ${(calculations.sideOpeningPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>
              </Section>
            </TwoColumnGrid>

            {/* ADDITIONAL OPTIONS */}
            <Section $disabled={!safeOrder.height}>
              <SectionHeader>
                <SectionTitleGroup>
                  <StepBadge>{isCommercialBuilding ? '7' : '8'}</StepBadge>
                  <SectionTitle>Additional Options</SectionTitle>
                </SectionTitleGroup>
              </SectionHeader>

              <TwoColumnGrid>
                <CounterGroup>
                  <CounterLabel>Walk-in Door - ${(calculations.walkInDoorPriceEach || 0).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('walkInDoor', -1)} disabled={(safeOrder.counters.walkInDoor || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.walkInDoor || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('walkInDoor', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.walkInDoor || 0) > 0 && <CounterTotal>${(calculations.walkInDoorPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>

                <CounterGroup>
                  <CounterLabel>Windows 30×30 - ${(calculations.window30x30PriceEach || 0).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('window30x30', -1)} disabled={(safeOrder.counters.window30x30 || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.window30x30 || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('window30x30', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.window30x30 || 0) > 0 && <CounterTotal>${(calculations.window30x30Price || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>

                <CounterGroup>
                  <CounterLabel>Windows 30×36 - ${(calculations.window30x36PriceEach || 0).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('window30x36', -1)} disabled={(safeOrder.counters.window30x36 || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.window30x36 || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('window30x36', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.window30x36 || 0) > 0 && <CounterTotal>${(calculations.window30x36Price || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>

                <CounterGroup>
                  <CounterLabel>Certified Gable - ${(calculations.certifiedGableEndPriceEach || 0).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('certifiedGableEnd', -1)} disabled={(safeOrder.counters.certifiedGableEnd || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.certifiedGableEnd || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('certifiedGableEnd', 1)} disabled={(safeOrder.counters.certifiedGableEnd || 0) >= 2}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.certifiedGableEnd || 0) > 0 && <CounterTotal>${(calculations.certifiedGableEndPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>
              </TwoColumnGrid>

              <div style={{ marginTop: '10px' }}>
                <OptionCard $active={safeOrder.options.insulationDoubleBubble} onClick={() => toggleOption && toggleOption('insulationDoubleBubble')}>
                  <OptionInfo>
                    <OptionName>Insulation (Double Bubble)</OptionName>
                    {(calculations.insulationDoubleBubblePrice || 0) > 0 && <OptionPrice>+${(calculations.insulationDoubleBubblePrice || 0).toLocaleString()}</OptionPrice>}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.insulationDoubleBubble}>{safeOrder.options.insulationDoubleBubble && '✓'}</Checkbox>
                </OptionCard>

                <OptionCard $active={safeOrder.options.insulationFiberglass} onClick={() => toggleOption && toggleOption('insulationFiberglass')}>
                  <OptionInfo>
                    <OptionName>Insulation (Fiberglass)</OptionName>
                    {(calculations.insulationFiberglassPrice || 0) > 0 && <OptionPrice>+${(calculations.insulationFiberglassPrice || 0).toLocaleString()}</OptionPrice>}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.insulationFiberglass}>{safeOrder.options.insulationFiberglass && '✓'}</Checkbox>
                </OptionCard>

                <OptionCard $active={safeOrder.options.coloredScrews} onClick={() => toggleOption && toggleOption('coloredScrews')}>
                  <OptionInfo>
                    <OptionName>Colored Screws</OptionName>
                    {(calculations.coloredScrewsPrice || 0) > 0 && <OptionPrice>+${(calculations.coloredScrewsPrice || 0).toLocaleString()}</OptionPrice>}
                  </OptionInfo>
                  <Checkbox $checked={safeOrder.options.coloredScrews}>{safeOrder.options.coloredScrews && '✓'}</Checkbox>
                </OptionCard>
              </div>
            </Section>

            {/* CUSTOM PANELS */}
            <Section $disabled={!safeOrder.height}>
              <SectionHeader>
                <SectionTitleGroup>
                  <StepBadge>{isCommercialBuilding ? '8' : '9'}</StepBadge>
                  <SectionTitle>Custom Panels</SectionTitle>
                </SectionTitleGroup>
              </SectionHeader>

              <TwoColumnGrid>
                <CounterGroup>
                  <CounterLabel>Frameouts - ${(calculations.frameoutPriceEach || 0).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('frameouts', -1)} disabled={(safeOrder.counters.frameouts || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.frameouts || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('frameouts', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.frameouts || 0) > 0 && <CounterTotal>${(calculations.frameoutPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>

                <CounterGroup>
                  <CounterLabel>½ Panel w/ Trim - ${getPanelPrice('halfPanel', 1).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('halfPanelWithTrim', -1)} disabled={(safeOrder.counters.halfPanelWithTrim || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.halfPanelWithTrim || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('halfPanelWithTrim', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.halfPanelWithTrim || 0) > 0 && <CounterTotal>${(calculations.halfPanelWithTrimPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>

                <CounterGroup>
                  <CounterLabel>Cut Panel - ${getPanelPrice('cutPanel', 1).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('cutPanel', -1)} disabled={(safeOrder.counters.cutPanel || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.cutPanel || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('cutPanel', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.cutPanel || 0) > 0 && <CounterTotal>${(calculations.cutPanelPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>

                <CounterGroup>
                  <CounterLabel>3ft Panels - ${getPanelPrice('panels3ft', 1).toLocaleString()}/ea</CounterLabel>
                  <CounterControl>
                    <CounterButton onClick={() => updateCounter && updateCounter('panels3ft', -1)} disabled={(safeOrder.counters.panels3ft || 0) === 0}>−</CounterButton>
                    <CounterValue>{safeOrder.counters.panels3ft || 0}</CounterValue>
                    <CounterButton onClick={() => updateCounter && updateCounter('panels3ft', 1)}>+</CounterButton>
                  </CounterControl>
                  {(safeOrder.counters.panels3ft || 0) > 0 && <CounterTotal>${(calculations.panels3ftPrice || 0).toLocaleString()}</CounterTotal>}
                </CounterGroup>
              </TwoColumnGrid>
            </Section>
          </LeftColumn>

          {/* SUMMARY CARD - Sticky on scroll */}
          <SummaryWrapper>
            <SummaryCard>
              <SummaryTitle>📋 Order Summary</SummaryTitle>

              <SummarySection>
                <SummarySectionTitle>Configuration</SummarySectionTitle>
                {safeOrder.buildingType && <SummaryRow><SummaryLabel>Type</SummaryLabel><SummaryValue>{labels.buildingType}</SummaryValue></SummaryRow>}
                {safeOrder.roofStyle && <SummaryRow><SummaryLabel>Roof</SummaryLabel><SummaryValue>{labels.roofStyle}</SummaryValue></SummaryRow>}
                {safeOrder.width && safeOrder.length && <SummaryRow><SummaryLabel>Size</SummaryLabel><SummaryValue>{labels.size}</SummaryValue></SummaryRow>}
                {safeOrder.height && <SummaryRow><SummaryLabel>Height</SummaryLabel><SummaryValue>{labels.height}</SummaryValue></SummaryRow>}
              </SummarySection>

              {(order.colors?.roof || order.colors?.side || order.colors?.trim) && (
                <SummarySection>
                  <SummarySectionTitle>Colors</SummarySectionTitle>
                  {order.colors.roof && <SummaryRow><SummaryLabel>Roof</SummaryLabel><SummaryValue>{order.colors.roof}</SummaryValue></SummaryRow>}
                  {order.colors.side && <SummaryRow><SummaryLabel>Sides</SummaryLabel><SummaryValue>{order.colors.side}</SummaryValue></SummaryRow>}
                  {order.colors.trim && <SummaryRow><SummaryLabel>Trim</SummaryLabel><SummaryValue>{order.colors.trim}</SummaryValue></SummaryRow>}
                </SummarySection>
              )}

              {(calculations.basePrice || 0) > 0 && (
                <SummarySection>
                  <SummarySectionTitle>Pricing</SummarySectionTitle>
                  <SummaryRow><SummaryLabel>Base</SummaryLabel><SummaryValue>${(calculations.basePrice || 0).toLocaleString()}</SummaryValue></SummaryRow>
                  {(calculations.heightCharge || 0) > 0 && <SummaryRow><SummaryLabel>Height</SummaryLabel><SummaryValue>+${(calculations.heightCharge || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.bothSidesClosedPrice || 0) > 0 && <SummaryRow><SummaryLabel>Sides</SummaryLabel><SummaryValue>+${(calculations.bothSidesClosedPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.verticalSidesBothPrice || 0) > 0 && <SummaryRow><SummaryLabel>Vert Sides</SummaryLabel><SummaryValue>+${(calculations.verticalSidesBothPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.vertical2ToneBothPrice || 0) > 0 && <SummaryRow><SummaryLabel>V2T Sides</SummaryLabel><SummaryValue>+${(calculations.vertical2ToneBothPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.eachEndClosedPrice || 0) > 0 && <SummaryRow><SummaryLabel>Ends ({safeOrder.counters.eachEndClosed})</SummaryLabel><SummaryValue>+${(calculations.eachEndClosedPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.verticalEndPrice || 0) > 0 && <SummaryRow><SummaryLabel>Vert Ends</SummaryLabel><SummaryValue>+${(calculations.verticalEndPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.vertical2ToneEndPrice || 0) > 0 && <SummaryRow><SummaryLabel>V2T Ends</SummaryLabel><SummaryValue>+${(calculations.vertical2ToneEndPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.garageDoorPrice || 0) > 0 && <SummaryRow><SummaryLabel>Doors ({safeOrder.garageDoors.length})</SummaryLabel><SummaryValue>+${(calculations.garageDoorPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.sideOpeningPrice || 0) > 0 && <SummaryRow><SummaryLabel>Openings</SummaryLabel><SummaryValue>+${(calculations.sideOpeningPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.walkInDoorPrice || 0) > 0 && <SummaryRow><SummaryLabel>Walk-in</SummaryLabel><SummaryValue>+${(calculations.walkInDoorPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.window30x30Price || 0) > 0 && <SummaryRow><SummaryLabel>Win 30×30</SummaryLabel><SummaryValue>+${(calculations.window30x30Price || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.window30x36Price || 0) > 0 && <SummaryRow><SummaryLabel>Win 30×36</SummaryLabel><SummaryValue>+${(calculations.window30x36Price || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.insulationDoubleBubblePrice || 0) > 0 && <SummaryRow><SummaryLabel>Insul DB</SummaryLabel><SummaryValue>+${(calculations.insulationDoubleBubblePrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.insulationFiberglassPrice || 0) > 0 && <SummaryRow><SummaryLabel>Insul FG</SummaryLabel><SummaryValue>+${(calculations.insulationFiberglassPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.certifiedGableEndPrice || 0) > 0 && <SummaryRow><SummaryLabel>Gable</SummaryLabel><SummaryValue>+${(calculations.certifiedGableEndPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.coloredScrewsPrice || 0) > 0 && <SummaryRow><SummaryLabel>Screws</SummaryLabel><SummaryValue>+${(calculations.coloredScrewsPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.frameoutPrice || 0) > 0 && <SummaryRow><SummaryLabel>Frameouts</SummaryLabel><SummaryValue>+${(calculations.frameoutPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.halfPanelWithTrimPrice || 0) > 0 && <SummaryRow><SummaryLabel>½ Panels</SummaryLabel><SummaryValue>+${(calculations.halfPanelWithTrimPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.cutPanelPrice || 0) > 0 && <SummaryRow><SummaryLabel>Cut Panels</SummaryLabel><SummaryValue>+${(calculations.cutPanelPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                  {(calculations.panels3ftPrice || 0) > 0 && <SummaryRow><SummaryLabel>3ft Panels</SummaryLabel><SummaryValue>+${(calculations.panels3ftPrice || 0).toLocaleString()}</SummaryValue></SummaryRow>}
                </SummarySection>
              )}

              {(calculations.subtotal || 0) > 0 && (
                <TotalSection>
                  <TotalRow><span>Subtotal</span><span>${(calculations.subtotal || 0).toLocaleString()}</span></TotalRow>
                  <TotalRow><span>Tax (6.75%)</span><span>${(calculations.tax || 0).toLocaleString()}</span></TotalRow>
                  <GrandTotal><span>Total</span><span>${(calculations.total || 0).toLocaleString()}</span></GrandTotal>
                  <DepositRow><span>Deposit (15%)</span><span>${(calculations.deposit || 0).toLocaleString()}</span></DepositRow>
                </TotalSection>
              )}

              <ButtonGroup>
                <Button onClick={handleReset}>🔄 Reset</Button>
                <Button $variant="primary" onClick={handleAddToCart} disabled={!isOrderComplete}>✓ Add to Cart</Button>
              </ButtonGroup>

              {!isOrderComplete && <ValidationMessage>Complete: Type, Width, Length, Height</ValidationMessage>}
            </SummaryCard>
          </SummaryWrapper>
        </GridContainer>
      </ContentWrapper>
    </Container>
  );
};

export default OrderBuilder;