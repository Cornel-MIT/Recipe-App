import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../../context/RecipeContext';
import { useParams } from 'react-router-dom';

const EditRecipePage = () => {
  const { id } = useParams();
  const { recipes, updateExistingRecipe } = useContext(RecipeContext);
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

  useEffect(() => {
    const recipeToEdit = recipes.find(recipe => recipe.id === parseInt(id));
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
    }
  }, [id, recipes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExistingRecipe(id, recipe);
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );
};

export default EditRecipePage;
