import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LinkAccount } from '../components/LinkAccount';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
  }
  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        required
        legend="Email"
        type="email"
        placeholder="your@email.com"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        legend="Password"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
      <LinkAccount href="/signup" linkContext="Don't have an account?">
        Sign Up
      </LinkAccount>
    </form>
  );
}
