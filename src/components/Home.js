import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios.get('http://localhost:5000/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.log(error));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/recipes/${id}`)
      .then(() => fetchRecipes())
      .catch(error => console.log(error));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(search.toLowerCase()) ||
    recipe.instructions.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>All Recipes</h1>
      <Link to="/add-recipe">Add New Recipe</Link>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={search}
        onChange={handleSearchChange}
      />
      <div>
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home;
