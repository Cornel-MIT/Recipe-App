import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const userData = await loginUser(credentials);
      if (userData) {
        setUser(userData);
        navigate('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const register = async (userData) => {
    try {
      const registeredUser = await registerUser(userData);
      if (registeredUser) {
        setUser(registeredUser);
        navigate('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
