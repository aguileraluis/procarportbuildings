import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { mobile } from '../responsive';

const Nav = styled.nav`
  background: white;
  padding: 15px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: '12px 15px' })}
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;

  ${mobile({ fontSize: '16px' })}
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${mobile({ gap: '10px' })}
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${mobile({ display: 'none' })}
`;

const Username = styled.span`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const Role = styled.span`
  font-size: 12px;
  color: #666;
  text-transform: capitalize;
`;

const LogoutButton = styled.button`
  padding: 8px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }

  ${mobile({ padding: '6px 15px', fontSize: '14px' })}
`;

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout'
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

  return (
    <Nav>
      <Logo>ProCarport Buildings</Logo>
      <UserSection>
        {user && (
          <>
            <UserInfo>
              <Username>{user.username}</Username>
              <Role>{user.role}</Role>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        )}
      </UserSection>
    </Nav>
  );
};

export default Navigation;