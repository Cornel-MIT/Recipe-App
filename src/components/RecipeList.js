import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/recipes/${id}`)
      .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)))
      .catch(error => console.error('Error deleting recipe:', error));
  };

  return (
    <div>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default RecipeList;
