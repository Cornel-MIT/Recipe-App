import React, { createContext, useState, useEffect } from 'react';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from '../backend/RecipeService';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await getRecipes();
      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  const addNewRecipe = async (newRecipe) => {
    const response = await addRecipe(newRecipe);
    setRecipes([...recipes, response.data]);
  };

  const updateExistingRecipe = async (id, updatedRecipe) => {
    const response = await updateRecipe(id, updatedRecipe);
    setRecipes(recipes.map(recipe => recipe.id === id ? response.data : recipe));
  };

  const deleteRecipe = async (id) => {
    await deleteRecipe(id);
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addNewRecipe, updateExistingRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
