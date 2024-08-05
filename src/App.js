import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login and Register/LoginPage';
import RegistrationPage from './components/Login and Register/RegistrationPage';
import AddRecipePage from './components/features/AddRecipePage';
import EditRecipePage from './components/features/EditRecipePage';
import SearchRecipes from './components/features/SearchRecipes';


const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
            <Route path="/search" element={<SearchRecipes />} />
          </Routes>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
};

export default App;
