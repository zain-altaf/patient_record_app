'use client';

import { RegisterForm } from '@medplum/react';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// ✅ Load environment variables correctly
const googleClientId = process.env.NEXT_PUBLIC_MEDPLUM_GOOGLE_CLIENT_ID || '';
const medplumProjectId = process.env.NEXT_PUBLIC_MEDPLUM_PROJECT_ID || '';
const recaptchaSiteKey = process.env.NEXT_PUBLIC_MEDPLUM_RECAPTCHA_SITE_KEY || '';

export default function RegisterPage() {
  const router = useRouter();
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).grecaptcha) {
      setRecaptchaLoaded(true);
    }
  }, []);

  return (
    <>
      {/* ✅ Load Google reCAPTCHA before using it */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
        onLoad={() => setRecaptchaLoaded(true)}
      />

      <div className="bg-white rounded-lg shadow-lg p-8">
        {recaptchaLoaded ? (
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
