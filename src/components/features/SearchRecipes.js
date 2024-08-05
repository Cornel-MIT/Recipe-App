import React, { useContext, useState } from 'react';
import { RecipeContext } from '../../context/RecipeContext';

const SearchRecipes = () => {
  const { recipes } = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Search Recipes</h2>
      <input
        type="text"
        placeholder="Search by recipe name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRecipes;
