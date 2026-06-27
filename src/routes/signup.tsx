import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { signUp } from '@/lib/auth'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    const { error } = await signUp(email, password)

    if (error) {
      alert(error.message)
      return
    }

    alert('Account created')
  }

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  )
}
