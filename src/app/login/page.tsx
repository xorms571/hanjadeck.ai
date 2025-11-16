"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Container className="max-w-md w-full p-8 space-y-8">
            <div className="text-center">
                <Image src="/logo-lg.svg" alt="Hanja Deck" width={80} height={80} className="mx-auto" />
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    Log in to your account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <Input
                        name="email"
                        type="email"
                        label="Email address"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}

                <div>
                    <button type="submit" className="w-full">
                        Log in
                    </button>
                </div>
                <p className="text-sm font-normal text-center mt-4 text-gray-600">
                    Don't have an account? <Link href='/signup' className="text-(--primary) hover:underline">Sign up</Link>
                </p>
            </form>
        </Container>
    </div>
  );
}
