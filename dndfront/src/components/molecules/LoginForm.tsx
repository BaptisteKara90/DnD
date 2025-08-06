'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Appelle ton endpoint GraphQL ici
    console.log('Login:', { email, password });
  };

  return (
    <Form onSubmit={handleLogin}>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
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
      <button type="submit">Se connecter</button>
    </Form>
  );
}
