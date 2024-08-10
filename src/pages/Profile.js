import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
      localStorage.setItem('profilePic', reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="profile-input"
      />
      <label htmlFor="profile-input">
        <img
          src={profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-pic"
        />
      </label>
    </div>
  );
};

export default Profile;

