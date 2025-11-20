// client/src/components/ColorSelector.jsx
// ✅ COLOR SELECTION FOR ROOF, SIDES, AND TRIM
// ✅ All colors from On Time Metal, LLC
// ✅ Beautiful visual selection interface

import React from 'react';
import styled from 'styled-components';

// ✅ ALL AVAILABLE COLORS FROM ON TIME METAL
const COLORS = {
  prime: [
    { name: 'Galvalume', hex: '#B8B8B8', metallic: true },
    { name: 'Black', hex: '#000000' },
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Pewter Gray', hex: '#96A8A1' },
    { name: 'Bright White', hex: '#FFFFFF' },
    { name: 'Alamo', hex: '#E8DCC8' },
    { name: 'Forest Green', hex: '#014421' },
    { name: 'Green', hex: '#2E7D32' },
    { name: 'Crimson Red', hex: '#8B0000' },
    { name: 'Red', hex: '#C41E3A' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Gallery Blue', hex: '#4169E1' },
    { name: 'Blue', hex: '#003D82' },
    { name: 'Tan', hex: '#D2B48C' },
  ],
  primeAndThrifty: [
    { name: 'Copper', hex: '#B87333', metallic: true },
    { name: 'Brown', hex: '#654321' },
    { name: 'Burnished Slate', hex: '#A8A8A8' },
    { name: 'Light Stone', hex: '#B0A99F' },
    { name: 'Clay', hex: '#4A5568' },
  ]
};

const ColorSelector = ({ selectedColors, onColorChange }) => {
  const allColors = [...COLORS.prime, ...COLORS.primeAndThrifty];

  return (
    <Container>
      <SectionTitle>🎨 Color Selection</SectionTitle>
      <Description>Choose colors for your roof, sides, and trim</Description>

      {/* ROOF COLOR */}
      <ColorSection>
        <ColorLabel>Roof Color</ColorLabel>
        <ColorGrid>
          {allColors.map((color) => (
            <ColorOption
              key={`roof-${color.name}`}
              color={color.hex}
              metallic={color.metallic}
              selected={selectedColors.roof === color.name}
              onClick={() => onColorChange('roof', color.name)}
              title={color.name}
            >
              {selectedColors.roof === color.name && (
                <CheckMark>✓</CheckMark>
              )}
            </ColorOption>
          ))}
        </ColorGrid>
        <SelectedColor>
          Selected: <strong>{selectedColors.roof || 'None'}</strong>
        </SelectedColor>
      </ColorSection>

      {/* SIDE COLOR */}
      <ColorSection>
        <ColorLabel>Side Color</ColorLabel>
        <ColorGrid>
          {allColors.map((color) => (
            <ColorOption
              key={`side-${color.name}`}
              color={color.hex}
              metallic={color.metallic}
              selected={selectedColors.side === color.name}
              onClick={() => onColorChange('side', color.name)}
              title={color.name}
            >
              {selectedColors.side === color.name && (
                <CheckMark>✓</CheckMark>
              )}
            </ColorOption>
          ))}
        </ColorGrid>
        <SelectedColor>
          Selected: <strong>{selectedColors.side || 'None'}</strong>
        </SelectedColor>
      </ColorSection>

      {/* TRIM COLOR */}
      <ColorSection>
        <ColorLabel>Trim Color</ColorLabel>
        <ColorGrid>
          {allColors.map((color) => (
            <ColorOption
              key={`trim-${color.name}`}
              color={color.hex}
              metallic={color.metallic}
              selected={selectedColors.trim === color.name}
              onClick={() => onColorChange('trim', color.name)}
              title={color.name}
            >
              {selectedColors.trim === color.name && (
                <CheckMark>✓</CheckMark>
              )}
            </ColorOption>
          ))}
        </ColorGrid>
        <SelectedColor>
          Selected: <strong>{selectedColors.trim || 'None'}</strong>
        </SelectedColor>
      </ColorSection>

      {/* QUICK SUMMARY */}
      <ColorSummary>
        <SummaryTitle>Your Color Selections:</SummaryTitle>
        <SummaryItem>
          <SummaryLabel>Roof:</SummaryLabel>
          <SummaryValue>{selectedColors.roof || 'Not selected'}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>Sides:</SummaryLabel>
          <SummaryValue>{selectedColors.side || 'Not selected'}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>Trim:</SummaryLabel>
          <SummaryValue>{selectedColors.trim || 'Not selected'}</SummaryValue>
        </SummaryItem>
      </ColorSummary>
    </Container>
  );
};

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin: 25px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  margin: 0 0 30px 0;
`;

const ColorSection = styled.div`
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 2px solid #ecf0f1;

  &:last-of-type {
    border-bottom: none;
  }
`;

const ColorLabel = styled.h3`
  font-size: 20px;
  color: #34495e;
  margin: 0 0 15px 0;
  font-weight: 600;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 12px;
  margin-bottom: 15px;
`;

const ColorOption = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  border: ${props => props.selected ? '4px solid #3498db' : '2px solid #ddd'};
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${props => props.selected ? '0 4px 12px rgba(52, 152, 219, 0.4)' : '0 2px 6px rgba(0, 0, 0, 0.1)'};
  
  ${props => props.metallic && `
    background: linear-gradient(135deg, ${props.color} 0%, #ffffff 50%, ${props.color} 100%);
  `}

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    border-color: #3498db;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CheckMark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: white;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6);
  font-weight: bold;
`;

const SelectedColor = styled.div`
  font-size: 15px;
  color: #555;
  margin-top: 10px;
  
  strong {
    color: #3498db;
    font-weight: 600;
  }
`;

const ColorSummary = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 20px 25px;
  margin-top: 30px;
  color: white;
`;

const SummaryTitle = styled.h4`
  font-size: 18px;
  margin: 0 0 15px 0;
  font-weight: 600;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-size: 15px;
  opacity: 0.9;
`;

const SummaryValue = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export default ColorSelector;

// ✅ EXPORT COLOR DATA FOR OTHER COMPONENTS
export const COLOR_DATA = COLORS;
export const ALL_COLORS = [...COLORS.prime, ...COLORS.primeAndThrifty];