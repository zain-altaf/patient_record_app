'use client';
import { Container, ResourceTable, SignInForm, useMedplum, useMedplumProfile } from '@medplum/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const googleClientId = '921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com';

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '2rem',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#7f8c8d',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  signInHeader: {
    textAlign: 'center' as const,
    marginBottom: '1rem',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default function HomePage(): JSX.Element {
  const medplum = useMedplum();

  const profile = useMedplumProfile();
  const router = useRouter();

  React.useEffect(() => {
    if (profile) {
      router.push('/homepage');
    }
  }, [profile, router]);

  return (
    <div style={styles.pageContainer}>
      <Container>
        <header style={styles.header}>
          <Image
            src="/logo.svg"
            alt="Health Care Management App Logo"
            width={80}
            height={80}
            style={{ margin: '0 auto 1rem' }}
          />
          <h1 style={styles.title}>Welcome to Your Health Care Management App</h1>
          <p style={styles.subtitle}>Manage your health with ease and confidence</p>
        </header>

        <div style={styles.card}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={() => router.push('/signin')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/register')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
