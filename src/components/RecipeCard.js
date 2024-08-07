import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, onDelete }) {
  return (
    <div className="recipe-card">
      <h2>{recipe.name}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Preparation Time:</strong> {recipe.preparation}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <div className="recipe-card-actions">
        <Link to={`/edit-recipe/${recipe.id}`} className="btn">Edit</Link>
        <button onClick={() => onDelete(recipe.id)} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default RecipeCard;
