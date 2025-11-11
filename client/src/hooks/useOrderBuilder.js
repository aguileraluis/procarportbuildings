// client/src/hooks/useOrderBuilder.js
// ✅ UPDATED: Added COLOR SELECTION support
// ✅ Vertical 2 Tone works for BOTH carports AND commercial buildings
// ✅ ALL EXISTING FEATURES PRESERVED

import { useState, useMemo } from 'react';
import {
  HEIGHT_CHARGES,
  HEIGHT_CHARGES_TRIPLE_WIDE,
  COMMERCIAL_HEIGHT_CHARGES,
  BOTH_SIDES_CLOSED,
  BOTH_SIDES_CLOSED_TRIPLE_WIDE,
  COMMERCIAL_BOTH_SIDES_CLOSED,
  VERTICAL_SIDES_BOTH,
  EACH_END_CLOSED,
  EACH_END_CLOSED_TRIPLE_WIDE,
  COMMERCIAL_EACH_END_CLOSED,
  VERTICAL_END_PER,
  VERTICAL_END_PER_TRIPLE_WIDE,
  VERTICAL_2_TONE_BOTH,
  VERTICAL_2_TONE_PER,
  COMMERCIAL_VERTICAL_2_TONE,
  COMMERCIAL_VERTICAL_2_TONE_END,
  GARAGE_DOORS_WHITE,
  GARAGE_DOORS_COLORED,
  SIDE_OPENINGS_WITH_GARAGE,
  SIDE_OPENINGS_WITHOUT_GARAGE,
  WALK_IN_DOOR,
  WINDOW_30x30,
  WINDOW_30x36,
  INSULATION_DOUBLE_BUBBLE_PER_SQFT,
  INSULATION_FIBERGLASS_PER_SQFT,
  CERTIFIED_GABLE_END,
  COLORED_SCREWS_PERCENTAGE,
  FRAMEOUTS,
  HALF_PANEL_WITH_TRIM,
  CUT_PANEL,
  PANELS_3FT,
  ALL_WIDTHS,
  COMMERCIAL_WIDTHS,
  STANDARD_HEIGHTS,
  COMMERCIAL_HEIGHTS,
  ROOF_STYLES,
  BUILDING_TYPES,
  TAX_RATE,
  DEPOSIT_RATE,
  isTripleWide,
  isCommercial,
  getHeightKey,
  getVerticalSidesKey,
  getSideOpeningKey,
  calculateSquareFootage,
  getPanelLengthKey,
  getBasePrice,
  getAvailableLengths,
  getEachEndClosedPrice,
  getVerticalEndPrice,
  getCommercialVertical2ToneEndPrice,
  getHeightCharge,
  getBothSidesClosedPrice,
} from '../pricingData';

export const useOrderBuilder = () => {
  const [order, setOrder] = useState({
    buildingType: 'carport',
    roofStyle: 'regular',
    width: '',
    length: '',
    height: '6',
    
    // ✅ COLOR SELECTIONS
    colors: {
      roof: '',
      side: '',
      trim: '',
    },
    
    counters: {
      eachEndClosed: 0,
      sideOpenings: 0,
      walkInDoor: 0,
      window30x30: 0,
      window30x36: 0,
      certifiedGableEnd: 0,
      frameouts: 0,
      halfPanelWithTrim: 0,
      cutPanel: 0,
      panels3ft: 0,
    },
    
    verticalEndCount: 0,
    vertical2ToneEndCount: 0,
    
    options: {
      bothSidesClosed: false,
      verticalSidesBoth: false,
      vertical2ToneBoth: false,
      insulationDoubleBubble: false,
      insulationFiberglass: false,
      coloredScrews: false,
    },
    
    garageDoors: [],
  });

  // ✅ COLOR CHANGE HANDLER
  const handleColorChange = (type, colorName) => {
    setOrder((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [type]: colorName,
      },
    }));
  };

  // Available widths based on building type
  const availableWidths = order.buildingType === 'commercial' ? COMMERCIAL_WIDTHS : ALL_WIDTHS;

  // Available lengths based on building type, roof style, and width
  const availableLengths = useMemo(() => {
    return getAvailableLengths(order.roofStyle, order.width, order.buildingType);
  }, [order.roofStyle, order.width, order.buildingType]);

  // Available heights based on building type
  const availableHeights = order.buildingType === 'commercial' ? COMMERCIAL_HEIGHTS : STANDARD_HEIGHTS;

  // Roof styles based on building type
  const roofStyles = order.buildingType === 'commercial' 
    ? [{ value: 'vertical', label: 'Vertical', icon: '⬆️' }]
    : ROOF_STYLES;

  // Get base price using building type
  const basePrice = useMemo(() => {
    if (!order.width || !order.length) return 0;
    return getBasePrice(order.roofStyle, order.width, order.length, order.buildingType);
  }, [order.roofStyle, order.width, order.length, order.buildingType]);

  // Get height charge using building type
  const heightCharge = useMemo(() => {
    if (!order.width || !order.length) return 0;
    if (order.buildingType === 'carport' && order.height === '6') return 0;
    if (order.buildingType === 'commercial' && order.height === '8') return 0;
    return getHeightCharge(order.height, order.length, order.width, order.buildingType);
  }, [order.height, order.length, order.width, order.buildingType]);

  // Get Both Sides Closed price using building type
  const bothSidesClosedPrice = useMemo(() => {
    if (!order.options.bothSidesClosed || !order.width || !order.length) return 0;
    return getBothSidesClosedPrice(order.height, order.length, order.width, order.buildingType);
  }, [order.options.bothSidesClosed, order.height, order.length, order.width, order.buildingType]);

  // Vertical Sides (Both) - Carports only
  const verticalSidesBothPrice = useMemo(() => {
    if (order.buildingType === 'commercial') return 0;
    if (!order.options.verticalSidesBoth || !order.length) return 0;
    const heightKey = getVerticalSidesKey(order.height);
    return VERTICAL_SIDES_BOTH[heightKey]?.[order.length] || 0;
  }, [order.buildingType, order.options.verticalSidesBoth, order.height, order.length]);

  // Each End Closed using building type
  const eachEndClosedPricePerEnd = useMemo(() => {
    if (!order.width) return 0;
    return getEachEndClosedPrice(order.height, order.width, order.buildingType);
  }, [order.height, order.width, order.buildingType]);

  const eachEndClosedPrice = useMemo(() => {
    if (!order.width || order.counters.eachEndClosed === 0) return 0;
    const pricePerEnd = getEachEndClosedPrice(order.height, order.width, order.buildingType);
    return pricePerEnd * order.counters.eachEndClosed;
  }, [order.counters.eachEndClosed, order.height, order.width, order.buildingType]);

  // Vertical End - Carports only
  const verticalEndPricePerEnd = useMemo(() => {
    if (order.buildingType === 'commercial') return 0;
    if (!order.width) return 0;
    return getVerticalEndPrice(order.width);
  }, [order.buildingType, order.width]);

  const verticalEndPrice = useMemo(() => {
    if (order.buildingType === 'commercial') return 0;
    if (!order.width || order.verticalEndCount === 0) return 0;
    const pricePerEnd = getVerticalEndPrice(order.width);
    return pricePerEnd * order.verticalEndCount;
  }, [order.buildingType, order.verticalEndCount, order.width]);

  // Vertical 2 Tone (Both) - BOTH CARPORTS AND COMMERCIAL
  const vertical2ToneBothPrice = useMemo(() => {
    if (!order.options.vertical2ToneBoth || !order.length) return 0;
    
    if (order.buildingType === 'commercial') {
      return COMMERCIAL_VERTICAL_2_TONE[order.length] || 0;
    } else {
      return VERTICAL_2_TONE_BOTH[order.length] || 0;
    }
  }, [order.buildingType, order.options.vertical2ToneBoth, order.length]);

  // Vertical 2 Tone End - SUPPORTS COMMERCIAL TOO
  const vertical2ToneEndPricePerEnd = useMemo(() => {
    if (!order.width) return 0;
    
    if (order.buildingType === 'commercial') {
      return COMMERCIAL_VERTICAL_2_TONE_END[order.width] || 0;
    } else {
      return VERTICAL_2_TONE_PER[order.width] || 0;
    }
  }, [order.buildingType, order.width]);

  const vertical2ToneEndPrice = useMemo(() => {
    if (!order.width || order.vertical2ToneEndCount === 0) return 0;
    
    let pricePerEnd;
    if (order.buildingType === 'commercial') {
      pricePerEnd = COMMERCIAL_VERTICAL_2_TONE_END[order.width] || 0;
    } else {
      pricePerEnd = VERTICAL_2_TONE_PER[order.width] || 0;
    }
    
    return pricePerEnd * order.vertical2ToneEndCount;
  }, [order.buildingType, order.vertical2ToneEndCount, order.width]);

  // Garage Doors
  const garageDoorPrice = useMemo(() => {
    return order.garageDoors.reduce((total, door) => {
      const priceTable = door.color === 'white' ? GARAGE_DOORS_WHITE : GARAGE_DOORS_COLORED;
      const price = priceTable[door.certification]?.[door.size] || 0;
      return total + price;
    }, 0);
  }, [order.garageDoors]);

  // Side Openings
  const sideOpeningPriceEach = useMemo(() => {
    if (!order.width) return 0;
    const hasGarage = order.garageDoors.length > 0;
    const key = getSideOpeningKey(order.width);
    if (!key) return 0;
    const priceTable = hasGarage ? SIDE_OPENINGS_WITH_GARAGE : SIDE_OPENINGS_WITHOUT_GARAGE;
    return priceTable[key] || 0;
  }, [order.width, order.garageDoors.length]);

  const sideOpeningPrice = useMemo(() => {
    if (!order.width || order.counters.sideOpenings === 0) return 0;
    return sideOpeningPriceEach * order.counters.sideOpenings;
  }, [order.width, order.counters.sideOpenings, sideOpeningPriceEach]);

  // Walk-in Doors
  const walkInDoorPriceEach = WALK_IN_DOOR;
  const walkInDoorPrice = useMemo(() => {
    return WALK_IN_DOOR * order.counters.walkInDoor;
  }, [order.counters.walkInDoor]);

  // Windows 30x30
  const window30x30PriceEach = WINDOW_30x30;
  const window30x30Price = useMemo(() => {
    return WINDOW_30x30 * order.counters.window30x30;
  }, [order.counters.window30x30]);

  // Windows 30x36
  const window30x36PriceEach = WINDOW_30x36;
  const window30x36Price = useMemo(() => {
    return WINDOW_30x36 * order.counters.window30x36;
  }, [order.counters.window30x36]);

  // Square footage
  const squareFootage = useMemo(() => {
    if (!order.width || !order.length) return 0;
    return calculateSquareFootage(order.width, order.length);
  }, [order.width, order.length]);

  // Insulation - Double Bubble
  const insulationDoubleBubblePrice = useMemo(() => {
    if (!order.options.insulationDoubleBubble || !squareFootage) return 0;
    return squareFootage * INSULATION_DOUBLE_BUBBLE_PER_SQFT;
  }, [order.options.insulationDoubleBubble, squareFootage]);

  // Insulation - Fiberglass
  const insulationFiberglassPrice = useMemo(() => {
    if (!order.options.insulationFiberglass || !squareFootage) return 0;
    return squareFootage * INSULATION_FIBERGLASS_PER_SQFT;
  }, [order.options.insulationFiberglass, squareFootage]);

  // Certified Gable End
  const certifiedGableEndPriceEach = CERTIFIED_GABLE_END;
  const certifiedGableEndPrice = useMemo(() => {
    return CERTIFIED_GABLE_END * order.counters.certifiedGableEnd;
  }, [order.counters.certifiedGableEnd]);

  // Colored Screws
  const coloredScrewsPrice = useMemo(() => {
    if (!order.options.coloredScrews) return 0;
    const subtotalBeforeScrews = 
      basePrice + 
      heightCharge + 
      bothSidesClosedPrice + 
      verticalSidesBothPrice + 
      eachEndClosedPrice + 
      verticalEndPrice +
      vertical2ToneBothPrice +
      vertical2ToneEndPrice +
      garageDoorPrice +
      sideOpeningPrice +
      walkInDoorPrice +
      window30x30Price +
      window30x36Price +
      insulationDoubleBubblePrice +
      insulationFiberglassPrice +
      certifiedGableEndPrice;
    return subtotalBeforeScrews * COLORED_SCREWS_PERCENTAGE;
  }, [
    order.options.coloredScrews,
    basePrice,
    heightCharge,
    bothSidesClosedPrice,
    verticalSidesBothPrice,
    eachEndClosedPrice,
    verticalEndPrice,
    vertical2ToneBothPrice,
    vertical2ToneEndPrice,
    garageDoorPrice,
    sideOpeningPrice,
    walkInDoorPrice,
    window30x30Price,
    window30x36Price,
    insulationDoubleBubblePrice,
    insulationFiberglassPrice,
    certifiedGableEndPrice
  ]);

  // Frameouts
  const frameoutPriceEach = FRAMEOUTS.angle45;
  const frameoutPrice = useMemo(() => {
    return FRAMEOUTS.angle45 * order.counters.frameouts;
  }, [order.counters.frameouts]);

  // Half Panel with Trim
  const halfPanelWithTrimPrice = useMemo(() => {
    if (!order.length || order.counters.halfPanelWithTrim === 0) return 0;
    const panelLengthKey = getPanelLengthKey(order.length);
    return (HALF_PANEL_WITH_TRIM[panelLengthKey] || 0) * order.counters.halfPanelWithTrim;
  }, [order.length, order.counters.halfPanelWithTrim]);

  // Cut Panel
  const cutPanelPrice = useMemo(() => {
    if (!order.length || order.counters.cutPanel === 0) return 0;
    const panelLengthKey = getPanelLengthKey(order.length);
    return (CUT_PANEL[panelLengthKey] || 0) * order.counters.cutPanel;
  }, [order.length, order.counters.cutPanel]);

  // 3ft Panels
  const panels3ftPrice = useMemo(() => {
    if (!order.length || order.counters.panels3ft === 0) return 0;
    const panelLengthKey = getPanelLengthKey(order.length);
    return (PANELS_3FT[panelLengthKey] || 0) * order.counters.panels3ft;
  }, [order.length, order.counters.panels3ft]);

  // Calculate totals
  const calculations = useMemo(() => {
    const subtotal = 
      basePrice + 
      heightCharge + 
      bothSidesClosedPrice + 
      verticalSidesBothPrice + 
      eachEndClosedPrice + 
      verticalEndPrice +
      vertical2ToneBothPrice +
      vertical2ToneEndPrice +
      garageDoorPrice +
      sideOpeningPrice +
      walkInDoorPrice +
      window30x30Price +
      window30x36Price +
      insulationDoubleBubblePrice +
      insulationFiberglassPrice +
      certifiedGableEndPrice +
      coloredScrewsPrice +
      frameoutPrice +
      halfPanelWithTrimPrice +
      cutPanelPrice +
      panels3ftPrice;
    
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const total = subtotal + tax;
    const deposit = Math.round(total * DEPOSIT_RATE * 100) / 100;

    return {
      basePrice,
      heightCharge,
      bothSidesClosedPrice,
      verticalSidesBothPrice,
      eachEndClosedPrice,
      eachEndClosedPricePerEnd,
      verticalEndPrice,
      verticalEndPricePerEnd,
      vertical2ToneBothPrice,
      vertical2ToneEndPrice,
      vertical2ToneEndPricePerEnd,
      garageDoorPrice,
      sideOpeningPrice,
      sideOpeningPriceEach,
      walkInDoorPrice,
      walkInDoorPriceEach,
      window30x30Price,
      window30x30PriceEach,
      window30x36Price,
      window30x36PriceEach,
      insulationDoubleBubblePrice,
      insulationFiberglassPrice,
      squareFootage,
      certifiedGableEndPrice,
      certifiedGableEndPriceEach,
      coloredScrewsPrice,
      frameoutPrice,
      frameoutPriceEach,
      halfPanelWithTrimPrice,
      cutPanelPrice,
      panels3ftPrice,
      subtotal,
      tax,
      total,
      deposit,
    };
  }, [
    basePrice,
    heightCharge,
    bothSidesClosedPrice,
    verticalSidesBothPrice,
    eachEndClosedPrice,
    eachEndClosedPricePerEnd,
    verticalEndPrice,
    verticalEndPricePerEnd,
    vertical2ToneBothPrice,
    vertical2ToneEndPrice,
    vertical2ToneEndPricePerEnd,
    garageDoorPrice,
    sideOpeningPrice,
    sideOpeningPriceEach,
    walkInDoorPrice,
    window30x30Price,
    window30x36Price,
    insulationDoubleBubblePrice,
    insulationFiberglassPrice,
    squareFootage,
    certifiedGableEndPrice,
    coloredScrewsPrice,
    frameoutPrice,
    halfPanelWithTrimPrice,
    cutPanelPrice,
    panels3ftPrice,
  ]);

  // Get labels for display
  const labels = useMemo(() => {
    const roofStyleLabel = roofStyles.find(rs => rs.value === order.roofStyle)?.label || 'Regular';
    const buildingTypeLabel = order.buildingType === 'commercial' ? 'Commercial Building' : 'Carport';
    
    return {
      buildingType: buildingTypeLabel,
      roofStyle: roofStyleLabel,
      size: order.width && order.length ? `${order.width}' × ${order.length}'` : 'Not selected',
      height: order.height ? `${order.height}' Tall` : 'Not selected',
    };
  }, [order.buildingType, order.roofStyle, order.width, order.length, order.height, roofStyles]);

  // Set building type
  const setBuildingType = (buildingType) => {
    setOrder({
      buildingType,
      roofStyle: buildingType === 'commercial' ? 'vertical' : 'regular',
      width: '',
      length: '',
      height: buildingType === 'commercial' ? '8' : '6',
      colors: { roof: '', side: '', trim: '' }, // ✅ Reset colors
      counters: {
        eachEndClosed: 0,
        sideOpenings: 0,
        walkInDoor: 0,
        window30x30: 0,
        window30x36: 0,
        certifiedGableEnd: 0,
        frameouts: 0,
        halfPanelWithTrim: 0,
        cutPanel: 0,
        panels3ft: 0,
      },
      verticalEndCount: 0,
      vertical2ToneEndCount: 0,
      options: {
        bothSidesClosed: false,
        verticalSidesBoth: false,
        vertical2ToneBoth: false,
        insulationDoubleBubble: false,
        insulationFiberglass: false,
        coloredScrews: false,
      },
      garageDoors: [],
    });
  };

  // Actions for roof style and dimensions
  const setRoofStyle = (roofStyle) => {
    setOrder((prev) => {
      const newAvailableLengths = getAvailableLengths(roofStyle, prev.width, prev.buildingType);
      const shouldResetLength = prev.length && !newAvailableLengths.includes(prev.length);
      
      return {
        ...prev,
        roofStyle,
        ...(shouldResetLength ? { length: '' } : {})
      };
    });
  };

  const setWidth = (width) => {
    setOrder((prev) => {
      const newAvailableLengths = getAvailableLengths(prev.roofStyle, width, prev.buildingType);
      const shouldResetLength = prev.length && !newAvailableLengths.includes(prev.length);
      
      return {
        ...prev,
        width,
        ...(shouldResetLength ? { length: '' } : {})
      };
    });
  };

  const setLength = (length) => {
    setOrder((prev) => ({ ...prev, length }));
  };

  const setHeight = (height) => {
    setOrder((prev) => ({ ...prev, height }));
  };

  const toggleOption = (optionName) => {
    setOrder((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [optionName]: !prev.options[optionName],
      },
    }));
  };

  const setVerticalEndCount = (count) => {
    setOrder((prev) => ({
      ...prev,
      verticalEndCount: count,
    }));
  };

  const setVertical2ToneEndCount = (count) => {
    setOrder((prev) => ({
      ...prev,
      vertical2ToneEndCount: count,
    }));
  };

  const addGarageDoor = (size, certification, color) => {
    setOrder((prev) => ({
      ...prev,
      garageDoors: [...prev.garageDoors, { size, certification, color }],
    }));
  };

  const removeGarageDoor = (index) => {
    setOrder((prev) => ({
      ...prev,
      garageDoors: prev.garageDoors.filter((_, i) => i !== index),
    }));
  };

  const updateCounter = (counterName, delta) => {
    setOrder((prev) => ({
      ...prev,
      counters: {
        ...prev.counters,
        [counterName]: Math.max(0, prev.counters[counterName] + delta),
      },
    }));
  };

  const setSideOpeningType = (type) => {
    // No longer needed - auto-detects based on garage doors
    // Kept for backwards compatibility
  };

  const resetOrder = () => {
    setOrder({
      buildingType: 'carport',
      roofStyle: 'regular',
      width: '',
      length: '',
      height: '6',
      colors: { roof: '', side: '', trim: '' }, // ✅ Reset colors
      counters: {
        eachEndClosed: 0,
        sideOpenings: 0,
        walkInDoor: 0,
        window30x30: 0,
        window30x36: 0,
        certifiedGableEnd: 0,
        frameouts: 0,
        halfPanelWithTrim: 0,
        cutPanel: 0,
        panels3ft: 0,
      },
      verticalEndCount: 0,
      vertical2ToneEndCount: 0,
      options: {
        bothSidesClosed: false,
        verticalSidesBoth: false,
        vertical2ToneBoth: false,
        insulationDoubleBubble: false,
        insulationFiberglass: false,
        coloredScrews: false,
      },
      garageDoors: [],
    });
  };

  const isOrderComplete = Boolean(order.width && order.length && order.height);

  return {
    order,
    availableWidths,
    availableLengths,
    availableHeights,
    roofStyles,
    buildingTypes: BUILDING_TYPES,
    calculations,
    labels,
    isOrderComplete,
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
    handleColorChange, // ✅ Export color handler
  };
};