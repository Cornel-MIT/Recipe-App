import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ user }) => (
            <>
              <Route exact path="/">
                {user ? <Redirect to="/home" /> : <Login />}
              </Route>
              <Route path="/login">
                {user ? <Redirect to="/home" /> : <Login />}
              </Route>
              <Route path="/register">
                {user ? <Redirect to="/home" /> : <Register />}
              </Route>
              <Route path="/home">
                {!user ? <Redirect to="/" /> : <Home />}
              </Route>
            </>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
};

export default App;
