import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Wrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;

  ${mobile({ padding: '30px', margin: '0 20px' })}
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const CompanyName = styled.h1`
  color: #2c3e50;
  font-size: 28px;
  margin: 0 0 10px 0;

  ${mobile({ fontSize: '24px' })}
`;

const Tagline = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 22px;

  ${mobile({ fontSize: '20px' })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:read-only {
    background: #e9ecef;
    cursor: not-allowed;
  }

  ${mobile({ padding: '10px 12px', fontSize: '14px' })}
`;

const Button = styled.button`
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  ${mobile({ padding: '12px', fontSize: '15px' })}
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #fcc;
`;

const InfoText = styled.p`
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 20px;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);

    const result = await login(username, password);

    setLoading(false);

    if (result.success) {
      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/order');
    } else {
      setError(result.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Logo>
          <CompanyName>ProCarport Buildings</CompanyName>
          <Tagline>Staff Order System</Tagline>
        </Logo>

        <Title>Staff Login</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </FormField>

          <FormField>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </FormField>

          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <InfoText>
          Authorized staff only. Contact admin if you need access.
        </InfoText>
      </Wrapper>
    </Container>
  );
};

export default Login;