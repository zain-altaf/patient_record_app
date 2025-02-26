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
  const [bypassRecaptcha, setBypassRecaptcha] = useState(false);

  useEffect(() => {
    // Debug info
    const debugInfo = `reCAPTCHA site key: ${recaptchaSiteKey}`;
    console.log(debugInfo);
    setEnvDebug(debugInfo);

    if (!recaptchaSiteKey) {
      console.warn('reCAPTCHA site key is missing, proceeding without reCAPTCHA');
      setBypassRecaptcha(true);
      return;
    }

    // Check if reCAPTCHA is already loaded and ready
    const checkRecaptchaReady = () => {
      if (typeof window !== 'undefined' && (window as any).grecaptcha && (window as any).grecaptcha.ready) {
        (window as any).grecaptcha.ready(() => {
          console.log('reCAPTCHA is ready');
          setRecaptchaLoaded(true);
        });
      } else {
        // If not ready yet, check again after a short delay
        setTimeout(checkRecaptchaReady, 100);
      }
    };

    checkRecaptchaReady();

    // Set a timeout to bypass reCAPTCHA if it doesn't load within 5 seconds
    const timeoutId = setTimeout(() => {
      if (!recaptchaLoaded) {
        console.warn('reCAPTCHA failed to load within timeout, proceeding without it');
        setBypassRecaptcha(true);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [recaptchaLoaded]);

  // Try loading reCAPTCHA with a different approach
  const loadRecaptcha = () => {
    try {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('reCAPTCHA script loaded manually');
        // Wait for grecaptcha to be fully initialized
        if ((window as any).grecaptcha && (window as any).grecaptcha.ready) {
          (window as any).grecaptcha.ready(() => {
            setRecaptchaLoaded(true);
          });
        } else {
          setTimeout(() => {
            if ((window as any).grecaptcha) {
              setRecaptchaLoaded(true);
            } else {
              setLoadError('reCAPTCHA failed to initialize');
            }
          }, 1000);
        }
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

  // Function to bypass reCAPTCHA and continue
  const continueWithoutRecaptcha = () => {
    setBypassRecaptcha(true);
  };

  return (
    <>
      {/* Load Google reCAPTCHA only if we have a site key */}
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="beforeInteractive"
          onLoad={() => {
            console.log('reCAPTCHA script loaded');
            // Wait for grecaptcha to be fully initialized
            if ((window as any).grecaptcha && (window as any).grecaptcha.ready) {
              (window as any).grecaptcha.ready(() => {
                setRecaptchaLoaded(true);
              });
            } else {
              setTimeout(() => {
                if ((window as any).grecaptcha) {
                  setRecaptchaLoaded(true);
                }
              }, 1000);
            }
          }}
          onError={(e) => {
            console.error('Failed to load reCAPTCHA', e);
            setLoadError('Failed to load reCAPTCHA');
            // Try alternative loading method
            loadRecaptcha();
          }}
        />
      )}

      {/* Add TypeScript interface for window object */}
      <Script id="recaptcha-types" strategy="beforeInteractive">
        {`
          interface Window {
            grecaptcha: any;
          }
        `}
      </Script>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {loadError && !bypassRecaptcha ? (
          <div className="text-center text-red-500">
            <p>Error: {loadError}</p>
            <p className="mt-2">Environment Debug: {envDebug}</p>
            <div className="mt-4 flex flex-col gap-2">
              <button onClick={loadRecaptcha} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Retry Loading reCAPTCHA
              </button>
              <button
                onClick={continueWithoutRecaptcha}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Continue Without reCAPTCHA
              </button>
            </div>
          </div>
        ) : recaptchaLoaded || bypassRecaptcha ? (
          <RegisterForm
            type="patient"
            projectId={medplumProjectId}
            googleClientId={googleClientId}
            recaptchaSiteKey={bypassRecaptcha ? undefined : recaptchaSiteKey}
            onSuccess={() => {
              router.push('/homepage');
            }}
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-2">
                <UserCircle className="w-16 h-16 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Register</h2>
              {bypassRecaptcha && (
                <div className="mt-2 text-amber-600 text-sm">
                  <p>Proceeding without reCAPTCHA verification</p>
                </div>
              )}
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
            <button
              onClick={continueWithoutRecaptcha}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              Skip reCAPTCHA and Continue
            </button>
          </div>
        )}
      </div>
    </>
  );
}
