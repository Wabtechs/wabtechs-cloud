const coreApiUrl = process.env.CORE_API_URL || 'http://localhost:3001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  transpilePackages: [
    '@wabtechs/ui',
    '@wabtechs/sdk',
    '@wabtechs/utils',
    '@wabtechs/hooks',
    '@wabtechs/icons',
    '@wabtechs/tokens',
    '@wabtechs/themes',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.wabtechs.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**.vercel.app' },
    ],
  },
  async headers() {
    // Build connect-src dynamically from CORE_API_URL.
    // In dev with localhost: allow localhost + Vercel-hosted Core.
    // In production: allow only the configured backend.
    const connectSrc =
      coreApiUrl.startsWith('http://localhost')
        ? "'self' http://localhost:* https://wabtechs-core.vercel.app"
        : `'self' ${coreApiUrl}`;

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              // default-src: only allow same-origin
              "default-src 'self'",
              // script-src: 'unsafe-eval' required for Next.js Turbopack HMR in dev;
              // 'unsafe-inline' required for Next.js hydration scripts.
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              // style-src: 'unsafe-inline' required for Tailwind CSS injected styles.
              "style-src 'self' 'unsafe-inline'",
              // img-src: https: allows avatars from GitHub/Google and Vercel deployments.
              "img-src 'self' data: blob: https:",
              "font-src 'self'",
              // connect-src: only self + configured backend URL.
              `connect-src ${connectSrc}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/core/:path*',
        destination: `${coreApiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
