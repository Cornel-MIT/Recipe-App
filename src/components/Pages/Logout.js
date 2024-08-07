// import React, { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// function Logout() {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// }

// export default Logout;



import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
