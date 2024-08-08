import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const [userData, setUserData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post('/check-email', { email });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (await checkEmailExists(userData.email)) {
      setError('Email is already in use.');
      return;
    }

    try {
      await register(userData);
    } catch (error) {
      setError('Registration failed.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
