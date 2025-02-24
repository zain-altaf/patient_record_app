"use client"

import { SignInForm } from "@medplum/react"
import { UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { RegisterPage } from "./RegisterPage"

const googleClientId = "921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com"

export function SignInPage() {
  const router = useRouter()

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <SignInForm 
        googleClientId={googleClientId}
        onRegister={() => router.push('/register')}
      >
        <div className="text-center mb-6">
          <UserCircle className="w-16 h-16 text-blue-500 mx-auto mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Sign in</h2>
        </div>
      </SignInForm>
    </div>
  )
}
