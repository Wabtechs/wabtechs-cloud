import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Wabtechs Cloud',
    template: '%s | Wabtechs Cloud',
  },
  description: 'Central portal for managing your Wabtechs ecosystem',
  keywords: ['Wabtechs', 'Cloud', 'SaaS', 'Dashboard', 'Organizations', 'Applications'],
  authors: [{ name: 'Wabtechs' }],
  creator: 'Wabtechs',
  publisher: 'Wabtechs',
  robots: {
    index: true,
    follow: true,
  },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      siteName: 'Wabtechs Cloud',
      title: 'Wabtechs Cloud',
      description: 'Central portal for managing your Wabtechs ecosystem',
    },
  twitter: {
    card: 'summary_large_image',
    title: 'Wabtechs Cloud',
    description: 'Central portal for managing your Wabtechs ecosystem',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}