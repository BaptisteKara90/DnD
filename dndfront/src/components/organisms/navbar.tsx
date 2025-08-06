'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import { AuthModal } from '@/components/organisms/AuthModal';

const NavbarWrapper = styled.nav`
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Burger = styled.button`
  display: block;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    margin-top: 0;
    gap: 2rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const NavLinkModal = styled('div')`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <NavbarWrapper>
      <Container>
        <Logo>D&D App</Logo>
        <Burger onClick={() => setOpen(!open)}>
          ☰
        </Burger>


      <NavLinks open={open}>
        <NavLink href="/">Accueil</NavLink>
        <NavLink href="/campaign">Campagnes</NavLink>
        <NavLinkModal onClick={() => setOpenModal(true)}>Connexion/inscription</NavLinkModal>
        {openModal && <AuthModal onClose={() => setOpenModal(false)} />}
      </NavLinks>
    </Container>
    </NavbarWrapper>
  );
}
