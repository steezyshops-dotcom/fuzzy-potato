import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm'; // Import the "dumb" UI component

// This is a "smart" component. It handles all the logic.
const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission
    setError(null); // Clear any previous errors

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Use fetch to send a POST request to our backend register endpoint
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to register');
      }

    //   // If registration is successful, redirect to the login page
    //   console.log('Registration successful:', data);
    //   navigate('/login'); // We'll create the /login route next

        console.log('Registration successful:', data);
        navigate('/login'); // We will re-enable this once the login page exists
        alert('SUCCESS! User has been registered. Check the console and your database.');

    } catch (err) {
      // If there's an error, update the error state to display it to the user
      setError(err.message);
      console.error('Registration error:', err);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default RegisterPage;