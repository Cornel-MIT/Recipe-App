import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.instructions}</p>
      <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link>
    </div>
  );
};

export default RecipeCard;
