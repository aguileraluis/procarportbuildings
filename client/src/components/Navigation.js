import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid #28a745;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

const BrandSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    height: 45px;
    width: 45px;
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const CompanyName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: white;
  letter-spacing: -0.5px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const StaffBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #28a745;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(40, 167, 69, 0.15);
  padding: 3px 8px;
  border-radius: 10px;
  width: fit-content;
`;

const MenuToggle = styled.div`
  display: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 80px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 100%;
    height: calc(100vh - 80px);
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 30px;
    gap: 0;
    transition: left 0.3s ease-in-out;
    overflow-y: auto;
  }
`;

const NavItem = styled.li`
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 20px;
  display: block;
  border-radius: 8px;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #28a745;
    transform: translateY(-2px);
  }

  @media screen and (max-width: 768px) {
    padding: 18px 20px;
    font-size: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0;

    &:hover {
      transform: none;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <BrandSection to="/" onClick={closeMenu}>
          <Logo 
            src="https://i.postimg.cc/K8m6BPQ6/LOGO-modified.png" 
            alt="Pro Carport Buildings Logo" 
          />
          <BrandText>
            <CompanyName>Pro Carport Buildings</CompanyName>
            <StaffBadge>Staff System</StaffBadge>
          </BrandText>
        </BrandSection>

        <MenuToggle onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;