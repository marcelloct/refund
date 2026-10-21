import { AxiosError } from 'axios';
import { useActionState } from 'react';
import { z, ZodError } from 'zod';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LinkAccount } from '../components/LinkAccount';
import { api } from '../services/api';

const signInSchema = z.object({
  email: z.email({ error: 'Invalid Email' }),
  password: z.string({ error: 'Password is Required' }).trim(),
});

export function SignIn() {
  // state will store error message
  // formAction triggers the signIn function and pass the previous state to it and the data from the form.You can get access to state and isLoading too.
  // isLoading is true while async function (signIn) is pending, after is false
  const [state, formAction, isLoading] = useActionState(signIn, null); // First parameter it's the function to be executed, the second one is the initial 'state' value(s)

  // first parameter is the 'state' previous state (not used in this case)
  // second parameter get the data from form based on name parameter
  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      });

      const response = await api.post('/sessions', data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: 'Invalid Credentials' };
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" action={formAction}>
      <Input
        name="email"
        required
        legend="Email"
        type="email"
        placeholder="your@email.com"
        autoFocus
      />
      <Input
        name="password"
        required
        legend="Password"
        type="password"
        placeholder="••••••••"
      />

      {state?.message && (
        <p className="text-sm text-red-500 text-center my-4 font-medium">
          {state.message}
        </p>
      )}

      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
      <LinkAccount href="/signup" linkContext="Don't have an account?">
        Sign Up
      </LinkAccount>
    </form>
  );
}
