'use client';

import styled from '@emotion/styled';
import { useLoginMutation } from '@/graphql/generated';
import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutation, { loading, error }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({ variables: { email, password } });

      if (!data?.login || !data.login.token || !data.login.user) {
        throw new Error("Données de connexion incomplètes");
      }

      const { token, user } = data.login;

      // Stocker le token
      localStorage.setItem('token', token);

      // Mettre à jour le contexte
      login(user, token);

      console.log('Connexion réussie :', user);
    } catch (err) {
      console.error('Erreur de connexion :', err);
    }
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
      <button type="submit" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
      {error && <p style={{ color: 'red' }}>Erreur : {error.message}</p>}
    </Form>
  );
}
