/* eslint-disable react/no-unescaped-entities */
'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Appelle ton endpoint GraphQL ici
    console.log('Register:', { email, username, password });
  };

  return (
    <Form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">S'inscrire</button>
    </Form>
  );
}
