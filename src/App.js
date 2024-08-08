import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './components/Pages/Home';
import AddRecipe from './components/Pages/AddRecipe';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Logout from './components/Pages/Logout';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const AuthRedirect = () => {
  const { user } = React.useContext(AuthContext);

  if (user === undefined) {
    return null;
  }

  return user ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);

  if (user === undefined) {
    return null;
  }

  return user ? children : <Navigate to="/login" />;
};

export default App;
