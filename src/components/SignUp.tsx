import React, { useState } from 'react';
import { saveUserData } from '@/services/apiService';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleSave = async () => {
    try {
      const response = await saveUserData(email, token);
      console.log('User data saved successfully:', response);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleSave}>Save User Data</button>
    </div>
  );
};

export default SignUp;

