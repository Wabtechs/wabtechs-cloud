import { Metadata } from 'next';
import { LandingPage } from '@/components/landing/landing-page';

export const metadata: Metadata = {
  title: 'Wabtechs Cloud — Central Portal for Your Ecosystem',
  description:
    'Manage organizations, licenses, applications, and security from a single dashboard. Built for teams that move fast.',
  openGraph: {
    title: 'Wabtechs Cloud',
    description: 'Central portal for managing your Wabtechs ecosystem',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

export default function Page() {
  return <LandingPage />;
}
