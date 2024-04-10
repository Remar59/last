import React, { useState } from 'react';
import authService from '../services/authService';

const RegisterModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    authService.register(username, email, password).then(
      (response) => {
        console.log(response.data);
        onClose(); // Close modal on successful registration
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default RegisterModal;
