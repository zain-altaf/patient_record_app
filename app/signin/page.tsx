'use client';

import { SignInForm } from '@medplum/react';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { RegisterPage } from "./RegisterPage"

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <SignInForm
        googleClientId={googleClientId}
        onSuccess={() => {
          router.push('/homepage');
        }}
      >
        <div className="text-center mb-6">
          <UserCircle className="w-16 h-16 text-blue-500 mx-auto mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Sign in</h2>
          <div className="mt-4">
            <Link href="/register" className="text-blue-500 hover:text-blue-700 text-sm">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      </SignInForm>
    </div>
  );
}
