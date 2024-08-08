import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: 'Dessert',
    preparation: '',
    cookingTime: '',
    servings: '',
    image: '' 
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/recipes/${id}`)
        .then(response => setRecipe(response.data))
        .catch(error => console.log(error));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe({
          ...recipe,
          image: reader.result 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios.put(`http://localhost:5000/recipes/${id}`, recipe)
        .then(() => navigate('/'))
        .catch(error => console.log(error));
    } else {
      axios.post('http://localhost:5000/recipes', recipe)
        .then(() => navigate('/'))
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit Recipe' : 'Add Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        />
        <select name="category" value={recipe.category} onChange={handleChange} required>
          <option value="Dessert">Dessert</option>
          <option value="Main Course">Main Course</option>
          <option value="Appetizers">Appetizers</option>
        </select>
        <input
          type="text"
          name="preparation"
          placeholder="Preparation"
          value={recipe.preparation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cookingTime"
          placeholder="Cooking Time"
          value={recipe.cookingTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="servings"
          placeholder="Servings"
          value={recipe.servings}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">{isEdit ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>
    </div>
  );
}

export default AddRecipe;
