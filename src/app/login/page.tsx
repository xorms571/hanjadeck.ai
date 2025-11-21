"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import BackgroundImage from '../components/BackgroundImage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading to true on submission

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user } = await response.json();
        router.push(`/dashboard/${user.id}`);
        router.refresh(); // To ensure the server-side state is updated
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <Container className="mx-auto lg:mx-0 max-w-[674px] h-[779.7px] relative md:h-[862px] p-6 md:px-16 md:py-10 flex flex-col">
      <h3 className="font-bold text-[22px]! md:text-[32px]! mb-12 mt-[58px]">Log in to your Account</h3>
      <form className="flex flex-col h-full justify-between" onSubmit={handleSubmit}>
        <div>
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
          {error && (
            <p className="text-sm text-red-600!">{error}</p>
          )}
          <BackgroundImage currentStep={0} />
        </div>
        <div>
          <p className="text-sm font-normal text-center mt-4 text-gray-600">
            Don't have an account? <Link href='/signup' className="text-(--primary) hover:underline">Sign up</Link>
          </p>
          <Button type='submit' className="w-full mt-6 max-w-full text-[16px] md:text-[22px]" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </Container>
  );
}
