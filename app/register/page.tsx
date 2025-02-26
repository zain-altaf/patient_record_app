'use client';

import { MedplumClient } from '@medplum/core';
import { RegisterForm, useMedplumProfile } from '@medplum/react';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Use environment variables for sensitive data
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const MEDPLUM_PROJECT_ID = process.env.MEDPLUM_PROJECT_ID;
export const MEDPLUM_RECAPTCHA_SITE_KEY = process.env.MEDPLUM_RECAPTCHA_SITE_KEY;

export default function RegisterPage() {
  const router = useRouter();

  return (
    // TODO: change default practitioner assignment in prod
    <div className="bg-white rounded-lg shadow-lg p-8">
      <RegisterForm
        type="patient"
        projectId={MEDPLUM_PROJECT_ID}
        googleClientId={googleClientId}
        recaptchaSiteKey={MEDPLUM_RECAPTCHA_SITE_KEY}
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
            <a href="/signin" className="text-blue-500 hover:text-blue-700 text-sm">
              Already have an account? Sign in here
            </a>
          </div>
        </div>
      </RegisterForm>
    </div>
  );
}
