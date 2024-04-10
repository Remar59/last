import React, { useState } from 'react';
import authService from '../services/authService';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    authService.login(email, password).then(
      (data) => {
        console.log(data);
        onClose(); // Close modal on successful login
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default LoginModal;
