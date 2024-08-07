// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './components/services/AuthContext';
// import Home from './components/Pages/Home';
// import AddRecipe from './components/Pages/AddRecipe';
// import Login from './components/Pages/Login';
// import Logout from './components/Pages/Logout';
// import Register from './components/Pages/Register';

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//           <Route path="/logout" element={user ? <Logout /> : <Navigate to="/login" />} />
//           <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
//           <Route path="/add-recipe" element={user ? <AddRecipe /> : <Navigate to="/login" />} />
//           <Route path="/edit-recipe/:id" element={user ? <AddRecipe /> : <Navigate to="/login" />} />
//           <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './components/Pages/Home';
import AddRecipe from './components/Pages/AddRecipe';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Logout from './components/Pages/Logout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default App;
