import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, onDelete }) {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instructions}</p>
      <p>Category: {recipe.category}</p>
      <p>Preparation: {recipe.preparation}</p>
      <p>Cooking Time: {recipe.cookingTime}</p>
      <p>Servings: {recipe.servings}</p>
      <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link>
      <button onClick={() => onDelete(recipe.id)}>Delete</button>
    </div>
  );
}

export default RecipeCard;
