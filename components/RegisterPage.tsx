"use client"

import { RegisterForm } from "@medplum/react"
import { UserCircle } from "lucide-react"

const googleClientId = "921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com"

export function RegisterPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <RegisterForm googleClientId={googleClientId} type={"patient"} onSuccess={function (): void {
              throw new Error("Function not implemented.")
          } }>
        <div className="text-center mb-6">
          <UserCircle className="w-16 h-16 text-blue-500 mx-auto mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Register</h2>
        </div>
      </RegisterForm>
    </div>
  )
}
