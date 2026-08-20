import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Wabtechs Cloud',
    template: '%s | Wabtechs Cloud',
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {children}
    </div>
  );
}
