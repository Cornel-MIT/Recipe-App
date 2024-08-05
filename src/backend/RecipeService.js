import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export const getRecipes = () => api.get('/recipes');
export const addRecipe = (recipe) => api.post('/recipes', recipe);
export const updateRecipe = (id, recipe) => api.put(`/recipes/${id}`, recipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);
