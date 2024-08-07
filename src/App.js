import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddRecipe from './components/AddRecipe';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<AddRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
