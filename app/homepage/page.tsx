'use client';

import React from 'react';
import { Suspense } from 'react';
import { ResourceTable, useMedplum, useMedplumProfile } from '@medplum/react';
import { useRouter } from 'next/navigation';

const styles = {
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

const page = () => {
  const medplum = useMedplum();
  const profile = useMedplumProfile();
  const router = useRouter();

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  console.log('Profile data:', profile);

  const handleSignOut = async () => {
    try {
      await medplum.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
        <div style={styles.profileHeader}>
          <h2 style={{ fontSize: '1.5rem', color: '#2c3e50' }}>Your Profile</h2>
          <div>
            <button onClick={() => router.push('/medical-records')} style={styles.signOutButton}>
              Medical Records
            </button>
            <button
              onClick={() => router.push('/patient-profile')}
              style={{ ...styles.signOutButton, marginLeft: '1rem' }}
            >
              View Profile
            </button>
            <button onClick={handleSignOut} style={{ ...styles.signOutButton, marginLeft: '1rem' }}>
              Sign out
            </button>
          </div>
        </div>
        <div style={{ backgroundColor: '#f8f9fa', borderRadius: '4px', padding: '1rem' }}>
          {profile && <ResourceTable value={profile} ignoreMissingValues />}
        </div>
      </Suspense>
    </div>
  );
};

export default page;
