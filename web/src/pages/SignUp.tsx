import { useState } from 'react';
import { z, ZodError } from 'zod';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LinkAccount } from '../components/LinkAccount';

const signUpSchema = z
  .object({
    name: z.string().trim().min(3, { error: 'Name is required' }),
    email: z.email({ error: 'Invalid Email' }),
    password: z.string().min(6, { error: 'Password must have 6 characters' }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      alert('Unable to register');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        required
        legend="Name"
        type="text"
        placeholder="your name"
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        required
        legend="Email"
        type="email"
        placeholder="your@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        legend="Password"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        required
        legend="Password Confirm"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading}>
        Sign Up
      </Button>

      <LinkAccount linkContext="Already have an account?">Sign In</LinkAccount>
    </form>
  );
}
