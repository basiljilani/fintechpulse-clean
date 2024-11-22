import React, { useState } from 'react';
import { saveUserData } from '@/lib/apiservices';


const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      if (!email || !token) {
        setMessage('Email and token are required.');
        setLoading(false);
        return;
      }

      const response = await saveUserData({ email }, token);
      setMessage('User data saved successfully!');
      console.log('User data saved successfully:', response);
    } catch (error: any) {
      console.error('Error saving user data:', error);
      setMessage(
        error?.message || 'Failed to save user data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save User Data'}
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
