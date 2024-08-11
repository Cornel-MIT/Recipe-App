import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(() => {
    return localStorage.getItem('profilePicture') || null;
  });

  useEffect(() => {
    if (profilePicture) {
      localStorage.setItem('profilePicture', profilePicture);
    }
  }, [profilePicture]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setProfilePicture(base64);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
            onClick={() => document.getElementById('profilePicInput').click()}
          />
        ) : (
          <button onClick={() => document.getElementById('profilePicInput').click()}>
            Add Profile Picture
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          id="profilePicInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <div className="user-details">
          <h3>{user?.username}</h3>
          <p>User ID: {user?.id}</p>
          {/* Add more user details as needed */}
        </div>
      </div>
    </div>
  );
};

export default Profile;