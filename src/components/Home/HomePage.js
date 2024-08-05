import React, { useContext } from 'react';
import { RecipeContext } from '../../context/RecipeContext';

const HomePage = () => {
  const { recipes, deleteExistingRecipe } = useContext(RecipeContext);

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.instructions}</p>
          <button onClick={() => deleteExistingRecipe(recipe.id)}>Delete</button>
          <button>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;


