import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Profile from './Profile';
import { AuthContext } from '../context/AuthProvider';

const categories = ["Dessert", "Main Course", "Appetizers"];

const Home = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: categories[0],
    preparation: '',
    cookingTime: '',
    servings: '',
    image: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/login');
    } else {
      fetchRecipes();
    }
  }, [isAuthenticated, history]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recipes');
      const userRecipes = response.data.filter(recipe => recipe.userId === user.id);
      setRecipes(userRecipes);
      setFilteredRecipes(userRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = { ...formData, userId: user.id };

    try {
      if (currentRecipe) {
        await axios.put(`http://localhost:5000/recipes/${currentRecipe.id}`, recipeData);
      } else {
        await axios.post('http://localhost:5000/recipes', recipeData);
      }
      fetchRecipes();
      setFormVisible(false);
      setCurrentRecipe(null);
      setFormData({
        name: '',
        ingredients: '',
        instructions: '',
        category: categories[0],
        preparation: '',
        cookingTime: '',
        servings: '',
        image: ''
      });
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleEdit = (recipe) => {
    setFormData(recipe);
    setCurrentRecipe(recipe);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRecipes(
      recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query)
      )
    );
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div className="home-container">
      <Profile />
      <h2>Welcome, {user?.username}!</h2>
      
      <div className="controls">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="search-input"
        />
        <button onClick={() => setFormVisible(true)}>Add Recipe</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      {formVisible && (
        <form onSubmit={handleSubmit} className="recipe-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Recipe Name"
            required
          />
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            placeholder="Ingredients"
            required
          />
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            placeholder="Instructions"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            name="preparation"
            value={formData.preparation}
            onChange={handleInputChange}
            placeholder="Preparation"
            required
          />
          <input
            type="text"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleInputChange}
            placeholder="Cooking Time"
            required
          />
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleInputChange}
            placeholder="Servings"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Recipe"
              style={{ maxWidth: '100%', marginTop: '10px' }}
            />
          )}
          <button type="submit">{currentRecipe ? 'Update Recipe' : 'Add Recipe'}</button>
          <button type="button" onClick={() => {
            setFormVisible(false);
            setCurrentRecipe(null);
            setFormData({
              name: '',
              ingredients: '',
              instructions: '',
              category: categories[0],
              preparation: '',
              cookingTime: '',
              servings: '',
              image: ''
            });
          }}>Cancel</button>
        </form>
      )}

      <div className="recipe-list">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Preparation:</strong> {recipe.preparation}</p>
            <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            {recipe.image && (
              <img
                src={recipe.image}
                alt="Recipe"
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
            )}
            <div className="button-group">
              <button className="btn-edit" onClick={() => handleEdit(recipe)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;