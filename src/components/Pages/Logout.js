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
