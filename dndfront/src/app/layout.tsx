import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from './providers/AuthProvider';
import { Navbar } from '@/components/organisms/navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
