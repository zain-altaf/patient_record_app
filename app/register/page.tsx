'use client';

import { MedplumClient } from '@medplum/core';
import { RegisterForm, useMedplumProfile } from '@medplum/react';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// TODO: change in prod since it's configured to run on localhost:3000
const googleClientId = '921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com';
const MEDPLUM_PROJECT_ID = '9602358d-eeb0-4de8-bccf-e2438b5c9162';
export const MEDPLUM_RECAPTCHA_SITE_KEY = '6LfFd_8gAAAAAOCVrZQ_aF2CN5b7s91NEYIu5GxL';

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
