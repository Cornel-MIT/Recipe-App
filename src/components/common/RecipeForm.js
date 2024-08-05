import React, { useState } from 'react';

const RecipeForm = ({ initialValues, onSubmit }) => {
  const [recipe, setRecipe] = useState(initialValues || {
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    preparationTime: '',
    cookingTime: '',
    servings: '',
    picture: ''
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...recipe,
      ingredients: recipe.ingredients.split(','),
      instructions: recipe.instructions.split('.')
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} value={recipe.name} placeholder="Recipe Name" />
      <input name="ingredients" onChange={handleChange} value={recipe.ingredients} placeholder="Ingredients (comma separated)" />
      <input name="instructions" onChange={handleChange} value={recipe.instructions} placeholder="Instructions (period separated)" />
      <input name="category" onChange={handleChange} value={recipe.category} placeholder="Category" />
      <input name="preparationTime" onChange={handleChange} value={recipe.preparationTime} placeholder="Preparation Time" />
      <input name="cookingTime" onChange={handleChange} value={recipe.cookingTime} placeholder="Cooking Time" />
      <input name="servings" onChange={handleChange} value={recipe.servings} placeholder="Servings" />
      <input name="picture" onChange={handleChange} value={recipe.picture} placeholder="Picture URL" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
