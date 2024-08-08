import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, onDelete }) {
  if (!recipe) {
    return <div>No recipe data available</div>;
  }

  const { name, image, category, preparation, cookingTime, servings, ingredients, instructions } = recipe;

  return (
    <div className="recipe-card">
      {image ? (
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // Adjust as needed
        />
      ) : (
        <p>No image available</p> 
      )}
      <h2>{name}</h2>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Preparation Time:</strong> {preparation}</p>
      <p><strong>Cooking Time:</strong> {cookingTime}</p>
      <p><strong>Servings:</strong> {servings}</p>
      <p><strong>Ingredients:</strong> {ingredients}</p>
      <p><strong>Instructions:</strong> {instructions}</p>
      <div className="recipe-card-actions">
        <Link to={`/edit-recipe/${recipe.id}`} className="btn">Edit</Link>
        <button onClick={() => onDelete(recipe.id)} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default RecipeCard;

