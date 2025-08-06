'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { LoginForm } from '../molecules/LoginForm';
import { RegisterForm } from '../molecules/RegisterForm';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  max-width: 400px;
  margin: 10vh auto;
  padding: 2rem;
  border-radius: 8px;
`;

const Toggle = styled.button`
  background: none;
  border: none;
  color: #0070f3;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

type AuthModalProps = {
  onClose: () => void;
};

export function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <Toggle onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin
            ? "Pas encore de compte ? S'inscrire"
            : "Déjà un compte ? Se connecter"}
        </Toggle>
      </Modal>
    </Overlay>
  );
}
