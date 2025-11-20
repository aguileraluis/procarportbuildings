import React from 'react';
import styled from 'styled-components';
import { Phone, MailOutline, Room } from '@mui/icons-material';
import { mobile } from '../responsive';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 50px 30px 30px;
  margin-top: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  
  ${mobile({ padding: '40px 20px 20px' })}
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 50px;
  
  ${mobile({ 
    gridTemplateColumns: '1fr',
    gap: '35px'
  })}
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CompanyName = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
  
  ${mobile({ fontSize: '26px' })}
`;

const StaffBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(40, 167, 69, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: fit-content;
  border: 1px solid rgba(40, 167, 69, 0.3);
  color: #28a745;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.9;
  margin: 0;
  max-width: 500px;
  
  ${mobile({ fontSize: '14px' })}
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
  
  ${mobile({ fontSize: '16px' })}
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.95;
  transition: all 0.2s ease;
  padding: 8px 0;

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    opacity: 0.8;
    margin-top: 2px;
  }
  
  a {
    color: white;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      color: #28a745;
      transform: translateX(3px);
    }
  }

  &:hover {
    opacity: 1;
  }
  
  ${mobile({ fontSize: '14px' })}
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  margin: 30px 0 20px;
`;

const BottomSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Copyright = styled.div`
  font-size: 14px;
  opacity: 0.8;
  
  ${mobile({ fontSize: '13px' })}
`;

const SystemNote = styled.div`
  font-size: 12px;
  opacity: 0.6;
  font-style: italic;
  
  ${mobile({ fontSize: '11px' })}
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <BrandSection>
          <CompanyName>ProCarport Buildings</CompanyName>
          <StaffBadge>Staff Order System</StaffBadge>
          <Description>
            Internal order management platform for processing customer carport 
            orders, quotes, and customer service requests.
          </Description>
        </BrandSection>
        
        <ContactSection>
          <SectionTitle>Contact Information</SectionTitle>
          
          <ContactItem>
            <Room />
            <span>P.O Box 127, Boonville NC 27011</span>
          </ContactItem>
          
          <ContactItem>
            <Phone />
            <a href="tel:3364681131">336.468.1131</a>
          </ContactItem>
          
          <ContactItem>
            <MailOutline />
            <a href="mailto:procarportbuildings@gmail.com">
              procarportbuildings@gmail.com
            </a>
          </ContactItem>
        </ContactSection>
      </FooterContent>
      
      <Divider />
      
      <BottomSection>
        <Copyright>
          © {currentYear} ProCarport Buildings. All rights reserved.
        </Copyright>
        <SystemNote>
          Staff Use Only - Internal Order Management System
        </SystemNote>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;