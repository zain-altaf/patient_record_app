'use client';

import { RegisterForm } from '@medplum/react';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Get environment variables
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const medplumProjectId = process.env.NEXT_PUBLIC_MEDPLUM_PROJECT_ID || '';
const recaptchaSiteKey = process.env.NEXT_PUBLIC_MEDPLUM_RECAPTCHA_SITE_KEY || '';

export default function RegisterPage() {
  const router = useRouter();
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    // Check if reCAPTCHA is already loaded
    if (typeof window !== 'undefined' && (window as any).grecaptcha) {
      setRecaptchaLoaded(true);
    }

    // Debug info
    console.log('reCAPTCHA site key:', recaptchaSiteKey);

    if (!recaptchaSiteKey) {
      setLoadError('reCAPTCHA site key is missing');
    }
  }, []);

  return (
    <>
      {/* Load Google reCAPTCHA */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
        strategy="lazyOnload"
        onLoad={() => {
          console.log('reCAPTCHA script loaded');
          setRecaptchaLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load reCAPTCHA');
          setLoadError('Failed to load reCAPTCHA');
        }}
      />

      <div className="bg-white rounded-lg shadow-lg p-8">
        {loadError ? (
          <div className="text-center text-red-500">
            <p>Error: {loadError}</p>
            <p className="mt-2">Please try again later or contact support.</p>
          </div>
        ) : recaptchaLoaded ? (
          <RegisterForm
            type="patient"
            projectId={medplumProjectId}
            googleClientId={googleClientId}
            recaptchaSiteKey={recaptchaSiteKey}
            onSuccess={() => {
              router.push('/homepage');
            }}
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-2">
                <UserCircle className="w-16 h-16 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Register</h2>
              <div className="mt-4">
                <Link href="/signin" className="text-blue-500 hover:text-blue-700 text-sm">
                  Already have an account? Sign in here
                </Link>
              </div>
            </div>
          </RegisterForm>
        ) : (
          <div className="text-center">
            <p>Loading reCAPTCHA...</p>
          </div>
        )}
      </div>
    </>
  );
}
