import React, { useContext, useState } from 'react';
import { RecipeContext } from '../../context/RecipeContext';

const AddRecipePage = () => {
  const { addNewRecipe } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    picture: '',
    category: '',
    preparationTime: '',
    cookingTime: '',
    servings: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewRecipe(recipe);
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );
};

export default AddRecipePage;
