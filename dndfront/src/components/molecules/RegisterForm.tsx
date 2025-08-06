/* eslint-disable react/no-unescaped-entities */
'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import { useCreateUserMutation } from '@/graphql/generated';


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function RegisterForm() {
  const [createUser] = useCreateUserMutation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUser({ variables: { data: { email, username, password } } });
      console.log('User created:', result.data?.createUser);
    } catch (err) {
      console.error('Error creating user:', err);
    }
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
