'use client';

import './globals.css';
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { AuthProvider } from './providers/AuthProvider';
import { Navbar } from '@/components/organisms/navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
