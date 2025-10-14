// client/src/hooks/useOrderBuilder.js
import { useState, useMemo } from 'react';
import pricingData from '../data/pricingData';

const { SALES_TAX_RATE, carportPricing, roofPricing } = pricingData;

export const useOrderBuilder = () => {
  const [order, setOrder] = useState({
    carportType: 'standard',
    carportSize: '',
    carportLabel: '',
    roofType: 'regular',
    roofSize: '',
    roofLabel: '',
    options: {
      bothSidesClosed: { selected: false, price: 0 },
      verticalSides: { selected: false, price: 0 },
      eachEnd: { selected: false, price: 0 },
      bothEnds: { selected: false, price: 0 },
    },
  });

  // Get current pricing tables based on selected type
  const currentCarportPricing = useMemo(() => {
    return carportPricing[order.carportType] || {};
  }, [order.carportType]);

  const currentRoofPricing = useMemo(() => {
    const carportType = order.carportType;
    const roofType = order.roofType;

    if (carportType === 'standard') {
      if (roofType === 'regular') return roofPricing.standardRegular;
      if (roofType === 'boxed') return roofPricing.standardBoxed;
      if (roofType === 'vertical') return roofPricing.standardVertical;
    } else if (carportType === 'triple') {
      if (roofType === 'regular') return roofPricing.tripleRegular;
      if (roofType === 'boxed') return roofPricing.tripleBoxed;
      if (roofType === 'vertical') return roofPricing.tripleVertical;
    } else if (carportType === 'commercial') {
      if (roofType === '40') return roofPricing.commercial40;
      if (roofType === '50') return roofPricing.commercial50;
    }

    return {};
  }, [order.carportType, order.roofType]);

  // Calculate totals
  const calculations = useMemo(() => {
    let subtotal = 0;

    // Add carport base price
    if (order.carportSize && currentCarportPricing[order.carportSize]) {
      subtotal += currentCarportPricing[order.carportSize].price;
    }

    // Add roof price
    if (order.roofSize && currentRoofPricing[order.roofSize]) {
      subtotal += currentRoofPricing[order.roofSize].price;
    }

    // Add options
    Object.values(order.options).forEach((option) => {
      if (option.selected) {
        subtotal += option.price;
      }
    });

    const tax = subtotal * SALES_TAX_RATE;
    const total = subtotal + tax;
    const deposit = total * 0.15;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      deposit: deposit.toFixed(2),
    };
  }, [order, currentCarportPricing, currentRoofPricing]);

  // Set carport type and reset selections
  const setCarportType = (type) => {
    setOrder({
      carportType: type,
      carportSize: '',
      carportLabel: '',
      roofType: type === 'commercial' ? '40' : 'regular',
      roofSize: '',
      roofLabel: '',
      options: {
        bothSidesClosed: { selected: false, price: 0 },
        verticalSides: { selected: false, price: 0 },
        eachEnd: { selected: false, price: 0 },
        bothEnds: { selected: false, price: 0 },
      },
    });
  };

  // Set carport size
  const setCarportSize = (size) => {
    const pricing = currentCarportPricing[size];
    setOrder((prev) => ({
      ...prev,
      carportSize: size,
      carportLabel: pricing ? pricing.label : '',
    }));
  };

  // Set roof type
  const setRoofType = (type) => {
    setOrder((prev) => ({
      ...prev,
      roofType: type,
      roofSize: '',
      roofLabel: '',
    }));
  };

  // Set roof size
  const setRoofSize = (size) => {
    const pricing = currentRoofPricing[size];
    setOrder((prev) => ({
      ...prev,
      roofSize: size,
      roofLabel: pricing ? pricing.label : '',
    }));
  };

  // Toggle option
  const toggleOption = (optionKey, price = 0) => {
    setOrder((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [optionKey]: {
          selected: !prev.options[optionKey].selected,
          price: !prev.options[optionKey].selected ? price : 0,
        },
      },
    }));
  };

  // Reset order
  const resetOrder = () => {
    setOrder({
      carportType: 'standard',
      carportSize: '',
      carportLabel: '',
      roofType: 'regular',
      roofSize: '',
      roofLabel: '',
      options: {
        bothSidesClosed: { selected: false, price: 0 },
        verticalSides: { selected: false, price: 0 },
        eachEnd: { selected: false, price: 0 },
        bothEnds: { selected: false, price: 0 },
      },
    });
  };

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
  };
};