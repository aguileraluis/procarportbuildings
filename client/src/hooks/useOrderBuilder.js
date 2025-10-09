// client/src/hooks/useOrderBuilder.js
// Custom hook for managing order state

import { useState, useMemo, useCallback } from 'react';
import { calculateTotal, calculateSubtotal } from '../utils/priceCalculator';
import pricingData from '../data/pricingData';

export const useOrderBuilder = () => {
  const [order, setOrder] = useState({
    carportType: 'standard',
    carportSize: '',
    carportPrice: 0,
    carportLabel: '',
    roofType: '',
    roofSize: '',
    roofPrice: 0,
    roofLabel: '',
    options: {
      bothSidesClosed: { selected: false, price: 200, label: 'Both Sides Closed' },
      verticalSides: { selected: false, price: 300, label: 'Vertical Sides' },
      eachEnd: { selected: false, price: 150, label: 'Each End' },
      bothEnds: { selected: false, price: 280, label: 'Both Ends' },
    },
  });

  // Get current carport pricing table
  const currentCarportPricing = useMemo(() => {
    return pricingData.carportPricing[order.carportType] || pricingData.carportPricing.standard;
  }, [order.carportType]);

  // Get current roof pricing table
  const currentRoofPricing = useMemo(() => {
    if (!order.roofType) return {};
    return pricingData.roofPricing[order.roofType] || {};
  }, [order.roofType]);

  // Calculate prices
  const calculations = useMemo(() => {
    const subtotal = calculateSubtotal({
      carportPrice: order.carportPrice,
      roofPrice: order.roofPrice,
      options: order.options,
    });
    return calculateTotal(subtotal);
  }, [order.carportPrice, order.roofPrice, order.options]);

  // Set carport type
  const setCarportType = useCallback((type) => {
    setOrder(prev => ({
      ...prev,
      carportType: type,
      carportSize: '',
      carportPrice: 0,
      carportLabel: '',
    }));
  }, []);

  // Set carport size
  const setCarportSize = useCallback((sizeKey) => {
    const priceData = currentCarportPricing[sizeKey];
    if (priceData) {
      setOrder(prev => ({
        ...prev,
        carportSize: sizeKey,
        carportPrice: priceData.price,
        carportLabel: priceData.label,
      }));
    }
  }, [currentCarportPricing]);

  // Set roof type
  const setRoofType = useCallback((roofType) => {
    setOrder(prev => ({
      ...prev,
      roofType,
      roofSize: '',
      roofPrice: 0,
      roofLabel: '',
    }));
  }, []);

  // Set roof size
  const setRoofSize = useCallback((sizeKey) => {
    const priceData = currentRoofPricing[sizeKey];
    if (priceData) {
      setOrder(prev => ({
        ...prev,
        roofSize: sizeKey,
        roofPrice: priceData.price,
        roofLabel: priceData.label,
      }));
    } else if (sizeKey === '') {
      setOrder(prev => ({
        ...prev,
        roofSize: '',
        roofPrice: 0,
        roofLabel: '',
      }));
    }
  }, [currentRoofPricing]);

  // Toggle option
  const toggleOption = useCallback((optionKey) => {
    setOrder(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [optionKey]: {
          ...prev.options[optionKey],
          selected: !prev.options[optionKey].selected,
        },
      },
    }));
  }, []);

  // Reset order
  const resetOrder = useCallback(() => {
    setOrder({
      carportType: 'standard',
      carportSize: '',
      carportPrice: 0,
      carportLabel: '',
      roofType: '',
      roofSize: '',
      roofPrice: 0,
      roofLabel: '',
      options: {
        bothSidesClosed: { selected: false, price: 200, label: 'Both Sides Closed' },
        verticalSides: { selected: false, price: 300, label: 'Vertical Sides' },
        eachEnd: { selected: false, price: 150, label: 'Each End' },
        bothEnds: { selected: false, price: 280, label: 'Both Ends' },
      },
    });
  }, []);

  // Get order summary for cart
  const getOrderSummary = useCallback(() => {
    return {
      carportType: order.carportType,
      carportSize: order.carportLabel,
      roofSize: order.roofLabel,
      selectedOptions: Object.keys(order.options)
        .filter(key => order.options[key].selected)
        .map(key => order.options[key].label),
      pricing: calculations,
    };
  }, [order, calculations]);

  return {
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
    getOrderSummary,
  };
};

export default useOrderBuilder;