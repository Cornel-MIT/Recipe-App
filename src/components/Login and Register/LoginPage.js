// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// const LoginPage = () => {
//   const { login } = useContext(AuthContext);
//   const [credentials, setCredentials] = useState({ username: '', password: '' });

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.get(`http://localhost:5000/users?username=${credentials.username}&password=${credentials.password}`);
//     if (response.data.length > 0) {
//       login(response.data[0]);
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="username" onChange={handleChange} placeholder="Username" />
//       <input name="password" type="password" onChange={handleChange} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;


import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
