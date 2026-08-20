import { RegisterForm } from '@/components/auth/register-form';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create your Wabtechs Cloud account',
  robots: 'noindex, nofollow',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">W</span>
            </div>
            <span className="font-semibold text-xl">Wabtechs Cloud</span>
          </Link>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
