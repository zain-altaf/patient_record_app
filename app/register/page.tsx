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
  const [envDebug, setEnvDebug] = useState('');

  useEffect(() => {
    // Check if reCAPTCHA is already loaded
    if (typeof window !== 'undefined' && (window as any).grecaptcha) {
      setRecaptchaLoaded(true);
    }

    // Debug info
    const debugInfo = `reCAPTCHA site key: ${recaptchaSiteKey}`;
    console.log(debugInfo);
    setEnvDebug(debugInfo);

    if (!recaptchaSiteKey) {
      setLoadError('reCAPTCHA site key is missing');
    }
  }, []);

  // Try loading reCAPTCHA with a different approach
  const loadRecaptcha = () => {
    try {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('reCAPTCHA script loaded manually');
        setRecaptchaLoaded(true);
      };
      script.onerror = (error) => {
        console.error('Failed to load reCAPTCHA manually', error);
        setLoadError(`Failed to load reCAPTCHA: ${error}`);
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error in manual reCAPTCHA loading', error);
      setLoadError(`Error in manual reCAPTCHA loading: ${error}`);
    }
  };

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
        onError={(e) => {
          console.error('Failed to load reCAPTCHA', e);
          setLoadError('Failed to load reCAPTCHA');
          // Try alternative loading method
          loadRecaptcha();
        }}
      />

      <div className="bg-white rounded-lg shadow-lg p-8">
        {loadError ? (
          <div className="text-center text-red-500">
            <p>Error: {loadError}</p>
            <p className="mt-2">Environment Debug: {envDebug}</p>
            <p className="mt-2">Please try again later or contact support.</p>
            <button onClick={loadRecaptcha} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Retry Loading reCAPTCHA
            </button>
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
            <p className="text-xs text-gray-500 mt-2">Environment Debug: {envDebug}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Taking too long to load?</p>
              <button
                onClick={loadRecaptcha}
                className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
              >
                Reload reCAPTCHA
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
