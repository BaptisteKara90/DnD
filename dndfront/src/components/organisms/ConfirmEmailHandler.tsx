'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useConfirmEmailMutation } from '@/graphql/generated';

export function ConfirmEmailHandler() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [confirmEmail] = useConfirmEmailMutation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const confirm = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        await confirmEmail({ variables: { token } });
        setStatus('success');
        setTimeout(() => router.push('/'), 3000);
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    confirm();
  }, [token]); 

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {status === 'loading' && <p>Confirmation en cours...</p>}
      {status === 'success' && <p>✅ Email confirmé ! Redirection en cours...</p>}
      {status === 'error' && <p>❌ Erreur de confirmation.</p>}
    </div>
  );
}