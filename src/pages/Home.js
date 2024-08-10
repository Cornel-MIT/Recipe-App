// import React, { useState, useEffect } from 'react';
// import './Home.css';

// const categories = ["Dessert", "Main Course", "Appetizers"];

// const Home = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [currentRecipe, setCurrentRecipe] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     ingredients: '',
//     instructions: '',
//     category: categories[0],
//     preparation: '',
//     cookingTime: '',
//     servings: '',
//     image: '' // Added for base64 image
//   });

//   useEffect(() => {
//     // Load recipes from JSON Server
//     fetch('http://localhost:5000/recipes')
//       .then(response => response.json())
//       .then(data => setRecipes(data));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData(prev => ({ ...prev, image: reader.result }));
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Check for duplicate recipe
//     const existingRecipe = recipes.find(recipe => recipe.name === formData.name);
//     if (existingRecipe) {
//       alert('Recipe with this name already exists.');
//       return;
//     }
    
//     if (currentRecipe) {
//       // Update existing recipe
//       const response = await fetch(`http://localhost:5000/recipes/${currentRecipe.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const updatedRecipe = await response.json();
//       setRecipes(recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
//     } else {
//       // Add new recipe
//       const response = await fetch('http://localhost:5000/recipes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const newRecipe = await response.json();
//       setRecipes([...recipes, newRecipe]);
//     }
    
//     // Reset form and hide it
//     setFormData({
//       name: '',
//       ingredients: '',
//       instructions: '',
//       category: categories[0],
//       preparation: '',
//       cookingTime: '',
//       servings: '',
//       image: ''
//     });
//     setCurrentRecipe(null);
//     setFormVisible(false);
//   };

//   const handleEdit = (recipe) => {
//     setFormData(recipe);
//     setCurrentRecipe(recipe);
//     setFormVisible(true);
//   };

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:5000/recipes/${id}`, {
//       method: 'DELETE',
//     });
//     setRecipes(recipes.filter(recipe => recipe.id !== id));
//   };

//   return (
//     <div className="home-container">
//       <h2>Recipe Manager</h2>
      
//       {!formVisible ? (
//         <button onClick={() => setFormVisible(true)}>Add Recipe</button>
//       ) : (
//         <form onSubmit={handleSubmit} className="recipe-form">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Recipe Name"
//             required
//           />
//           <textarea
//             name="ingredients"
//             value={formData.ingredients}
//             onChange={handleInputChange}
//             placeholder="Ingredients"
//             required
//           />
//           <textarea
//             name="instructions"
//             value={formData.instructions}
//             onChange={handleInputChange}
//             placeholder="Instructions"
//             required
//           />
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//           >
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="preparation"
//             value={formData.preparation}
//             onChange={handleInputChange}
//             placeholder="Preparation"
//             required
//           />
//           <input
//             type="text"
//             name="cookingTime"
//             value={formData.cookingTime}
//             onChange={handleInputChange}
//             placeholder="Cooking Time"
//             required
//           />
//           <input
//             type="number"
//             name="servings"
//             value={formData.servings}
//             onChange={handleInputChange}
//             placeholder="Servings"
//             required
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//           {formData.image && (
//             <img
//               src={formData.image}
//               alt="Recipe"
//               style={{ maxWidth: '100%', marginTop: '10px' }}
//             />
//           )}
//           <button type="submit">{currentRecipe ? 'Update Recipe' : 'Add Recipe'}</button>
//           <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
//         </form>
//       )}

//       <div className="recipe-list">
//         {recipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card">
//             <h3>{recipe.name}</h3>
//             <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
//             <p><strong>Instructions:</strong> {recipe.instructions}</p>
//             <p><strong>Category:</strong> {recipe.category}</p>
//             <p><strong>Preparation:</strong> {recipe.preparation}</p>
//             <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
//             <p><strong>Servings:</strong> {recipe.servings}</p>
//             {recipe.image && (
//               <img
//                 src={recipe.image}
//                 alt="Recipe"
//                 style={{ maxWidth: '100%', marginTop: '10px' }}
//               />
//             )}
//             <button onClick={() => handleEdit(recipe)}>Edit</button>
//             <button onClick={() => handleDelete(recipe.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React, { useState, useEffect } from 'react';
// import './Home.css';

// const categories = ["Dessert", "Main Course", "Appetizers"];

// const Home = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [currentRecipe, setCurrentRecipe] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     ingredients: '',
//     instructions: '',
//     category: categories[0],
//     preparation: '',
//     cookingTime: '',
//     servings: '',
//     image: '' 
//   });

//   useEffect(() => {

//     fetch('http://localhost:5000/recipes')
//       .then(response => response.json())
//       .then(data => setRecipes(data));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData(prev => ({ ...prev, image: reader.result }));
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    

//     const existingRecipe = recipes.find(recipe => recipe.name === formData.name && recipe.id !== currentRecipe?.id);
//     if (existingRecipe) {
//       alert('Recipe with this name already exists.');
//       return;
//     }
    
//     if (currentRecipe) {

//       const response = await fetch(`http://localhost:5000/recipes/${currentRecipe.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const updatedRecipe = await response.json();
//       setRecipes(recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
//     } else {

//       const response = await fetch('http://localhost:5000/recipes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const newRecipe = await response.json();
//       setRecipes([...recipes, newRecipe]);
//     }

//     setFormData({
//       name: '',
//       ingredients: '',
//       instructions: '',
//       category: categories[0],
//       preparation: '',
//       cookingTime: '',
//       servings: '',
//       image: ''
//     });
//     setCurrentRecipe(null);
//     setFormVisible(false);
//   };

//   const handleEdit = (recipe) => {
//     setFormData(recipe);
//     setCurrentRecipe(recipe);
//     setFormVisible(true);
//   };

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:5000/recipes/${id}`, {
//       method: 'DELETE',
//     });
//     setRecipes(recipes.filter(recipe => recipe.id !== id));
//   };

//   return (
//     <div className="home-container">
//       <h2>Recipe Manager</h2>
      
//       {!formVisible ? (
//         <button onClick={() => setFormVisible(true)}>Add Recipe</button>
//       ) : (
//         <form onSubmit={handleSubmit} className="recipe-form">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Recipe Name"
//             required
//           />
//           <textarea
//             name="ingredients"
//             value={formData.ingredients}
//             onChange={handleInputChange}
//             placeholder="Ingredients"
//             required
//           />
//           <textarea
//             name="instructions"
//             value={formData.instructions}
//             onChange={handleInputChange}
//             placeholder="Instructions"
//             required
//           />
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//           >
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="preparation"
//             value={formData.preparation}
//             onChange={handleInputChange}
//             placeholder="Preparation"
//             required
//           />
//           <input
//             type="text"
//             name="cookingTime"
//             value={formData.cookingTime}
//             onChange={handleInputChange}
//             placeholder="Cooking Time"
//             required
//           />
//           <input
//             type="number"
//             name="servings"
//             value={formData.servings}
//             onChange={handleInputChange}
//             placeholder="Servings"
//             required
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//           {formData.image && (
//             <img
//               src={formData.image}
//               alt="Recipe"
//               style={{ maxWidth: '100%', marginTop: '10px' }}
//             />
//           )}
//           <button type="submit">{currentRecipe ? 'Update Recipe' : 'Add Recipe'}</button>
//           <button type="button" onClick={() => {
//             setFormVisible(false);
//             setCurrentRecipe(null);
//             setFormData({
//               name: '',
//               ingredients: '',
//               instructions: '',
//               category: categories[0],
//               preparation: '',
//               cookingTime: '',
//               servings: '',
//               image: ''
//             });
//           }}>Cancel</button>
//         </form>
//       )}

//       <div className="recipe-list">
//         {recipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card">
//             <h3>{recipe.name}</h3>
//             <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
//             <p><strong>Instructions:</strong> {recipe.instructions}</p>
//             <p><strong>Category:</strong> {recipe.category}</p>
//             <p><strong>Preparation:</strong> {recipe.preparation}</p>
//             <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
//             <p><strong>Servings:</strong> {recipe.servings}</p>
//             {recipe.image && (
//               <img
//                 src={recipe.image}
//                 alt="Recipe"
//                 style={{ maxWidth: '100%', marginTop: '10px' }}
//               />
//             )}
//             <button onClick={() => handleEdit(recipe)}>Edit</button>
//             <button onClick={() => handleDelete(recipe.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import './Home.css';
import Profile from './Profile';

const categories = ["Dessert", "Main Course", "Appetizers"];

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);  // State for filtered recipes
  const [formVisible, setFormVisible] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');  // State for search input
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: categories[0],
    preparation: '',
    cookingTime: '',
    servings: '',
    image: '' 
  });

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data);
      });
  }, []);

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
    
    const existingRecipe = recipes.find(recipe => recipe.name === formData.name && recipe.id !== currentRecipe?.id);
    if (existingRecipe) {
      alert('Recipe with this name already exists.');
      return;
    }
    
    if (currentRecipe) {
      const response = await fetch(`http://localhost:5000/recipes/${currentRecipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updatedRecipe = await response.json();
      setRecipes(recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
    } else {
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newRecipe = await response.json();
      setRecipes([...recipes, newRecipe]);
    }

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
    setCurrentRecipe(null);
    setFormVisible(false);
  };

  const handleEdit = (recipe) => {
    setFormData(recipe);
    setCurrentRecipe(recipe);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/recipes/${id}`, {
      method: 'DELETE',
    });
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setFilteredRecipes(recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query)
      ));
    } else {
      setFilteredRecipes(recipes);
    }
  };

  return (
    <div className="home-container">
      <Profile />
      <h2>Recipe Manager</h2>
      
      <div className="controls">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="search-input"
        />
        <button onClick={() => setFormVisible(true)}>Add Recipe</button>
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
            <button className="btn-edit" onClick={() => handleEdit(recipe)}>Edit</button>
            <button className="btn-delete" onClick={() => handleDelete(recipe.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
