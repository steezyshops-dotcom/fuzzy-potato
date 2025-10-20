import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  // State to hold the form input values (email and password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // This function handles the form submission when the user clicks "Login"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send POST request to backend login endpoint
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to login');
      }

      //Save JWT token and user info in localStorage
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      console.log('Login successful, token received:', data.token);

      //Navigate to account dashboard
      navigate('/account');

    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <LoginForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginPage;
