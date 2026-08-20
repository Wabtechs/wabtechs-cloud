'use client';

import Link from 'next/link';
import {
  Shield,
  Zap,
  ArrowRight,
  Check,
  Building2,
  Key,
  Bell,
  Code,
  Boxes,
  Lock,
  ChevronRight,
  Star,
  TrendingUp,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Users,
  Globe,
  Server,
  Database,
} from 'lucide-react';
import {
  FadeIn,
  StaggerChildren,
  StaggerItem,
  ScaleIn,
  SlideInText,
  FloatBlob,
  HoverCard,
} from './animations';

function SectionBadge({ text }: { text: string }) {
  return (
    <FadeIn delay={0.1}>
      <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
        <span className="h-px w-6 bg-primary" />
        {text}
        <span className="h-px w-6 bg-primary" />
      </span>
    </FadeIn>
  );
}

const services = [
  { icon: Building2, title: 'Organization Management', description: 'Multi-tenant architecture with branches, departments, and role-based access control.' },
  { icon: Key, title: 'License Control', description: 'Create, activate, and track licenses per organization. Quota management and expiration alerts.' },
  { icon: Shield, title: 'Security & Compliance', description: 'Sessions, MFA, audit logs, and real-time threat monitoring. Stay compliant without the hassle.' },
  { icon: Boxes, title: 'Application Marketplace', description: 'Browse, install, and configure apps. Centralized billing and usage tracking across your stack.' },
  { icon: Bell, title: 'Smart Notifications', description: 'Multi-channel alerts with granular preferences. Email, SMS, push — you decide.' },
  { icon: Code, title: 'Developer API', description: 'Full REST API with keys, rate limiting, and webhooks. Ship integrations in hours.' },
];

const features = [
  { icon: Server, title: '99.9% Uptime SLA', description: 'Enterprise-grade infrastructure with automatic failover. Your platform stays online.' },
  { icon: Globe, title: 'Global CDN', description: 'Assets served from edge locations worldwide. Sub-50ms latency for every request.' },
  { icon: Database, title: 'Real-time Analytics', description: 'Monitor usage, performance, and security events in real-time with custom dashboards.' },
  { icon: Lock, title: 'SOC 2 Compliant', description: 'Industry-standard security practices with encrypted data at rest and in transit.' },
];

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '50', label: 'Avg Latency (ms)', suffix: 'ms' },
  { value: '10K+', label: 'API Calls / Min' },
  { value: '24/7', label: 'Monitoring' },
];

const processSteps = [
  { step: '01', title: 'Create Account', description: 'Sign up in seconds. No credit card required. Start free and scale when ready.' },
  { step: '02', title: 'Configure Org', description: 'Set up your organization, invite team members, configure roles in minutes.' },
  { step: '03', title: 'Connect & Deploy', description: 'Link applications, set up API keys, manage everything from one dashboard.' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'CTO, NovaTech', quote: 'Wabtechs Cloud transformed how we manage our entire platform. One dashboard for orgs, licenses, and security — it just works.', rating: 5 },
  { name: 'Marcus Rodriguez', role: 'Engineering Lead, DataFlow', quote: 'The developer API is incredibly well-designed. We integrated our entire CI/CD pipeline in under a day.', rating: 5 },
  { name: 'Aisha Patel', role: 'VP of Ops, CloudScale', quote: 'Multi-tenant management used to be a nightmare. Wabtechs Cloud gave us clarity and control we never had before.', rating: 5 },
];

const pricingPlans = [
  { tag: 'Starter', name: 'Free Plan', price: 'Free', period: '', limit: '1 Organization', features: ['Up to 5 users', '10 API keys', 'Basic analytics', 'Community support', 'Standard security'], cta: 'Get Started', highlighted: false },
  { tag: 'Professional', name: 'Growth Plan', price: '$29', period: '/month', limit: 'Unlimited Orgs', features: ['Up to 50 users', '100 API keys', 'Advanced analytics', 'Priority support', 'Custom domains', 'Webhooks'], cta: 'Start Free Trial', highlighted: true },
  { tag: 'Enterprise', name: 'Scale Plan', price: 'Custom', period: '', limit: 'Unlimited Everything', features: ['Unlimited users', 'Unlimited API keys', 'Dedicated support', 'SLA guarantee', 'On-premise option', 'Custom integrations'], cta: 'Contact Sales', highlighted: false },
];

const footerServices = ['Organization Management', 'License Tracking', 'Security Monitoring', 'Application Marketplace', 'Developer API'];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ═══ Header ═══ */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600">
              <span className="text-lg font-bold text-white">W</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Wabtechs Cloud</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {[{ label: 'Features', href: '#features' }, { label: 'Services', href: '#services' }, { label: 'Process', href: '#process' }, { label: 'Pricing', href: '#pricing' }].map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>
            ))}
            <a href="https://docs.wabtechs.com" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block">Sign in</Link>
            <Link href="/auth/register" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30">Get Started</Link>
          </div>
        </div>
      </header>

      <main>
        {/* ═══ Hero ═══ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <FloatBlob className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
          <FloatBlob className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />

          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="max-w-2xl">
                <FadeIn delay={0.2}>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                    <Zap className="h-3.5 w-3.5" />
                    Now in Public Beta
                  </div>
                </FadeIn>
                <SlideInText delay={0.4}>
                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    One Portal to{' '}
                    <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                      Manage Your Ecosystem
                    </span>
                  </h1>
                </SlideInText>
                <FadeIn delay={0.6}>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
                    Organizations, licenses, applications, and security — all from a single, powerful dashboard. Built for teams that move fast.
                  </p>
                </FadeIn>
                <FadeIn delay={0.8}>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link href="/auth/register" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30">
                      Get Started Free
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a href="https://docs.wabtechs.com" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-7 py-4 text-base font-semibold text-slate-300 transition-all hover:border-slate-400 hover:text-white">
                      Read the Docs
                    </a>
                  </div>
                </FadeIn>
                <FadeIn delay={1.0}>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                    {['No credit card required', 'Free tier forever', 'Setup in 5 minutes'].map((t) => (
                      <div key={t} className="flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-green-400" />
                        {t}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Dashboard mockup */}
              <ScaleIn delay={0.6} className="relative hidden lg:block">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-blue-500/20 blur-2xl" />
                <div className="relative rounded-2xl border border-slate-700/50 bg-slate-800/80 p-1 shadow-2xl backdrop-blur-sm">
                  <div className="rounded-xl bg-slate-900 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                      <div className="ml-3 rounded bg-slate-800 px-3 py-1 text-xs text-slate-500">cloud.wabtechs.com</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Organizations', value: '12', text: 'text-primary' },
                        { label: 'Licenses', value: '847', text: 'text-green-400' },
                        { label: 'API Calls', value: '2.4M', text: 'text-blue-400' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-lg bg-slate-800/80 p-3">
                          <div className="text-[11px] font-medium text-slate-500">{item.label}</div>
                          <div className={`mt-1 text-lg font-bold ${item.text}`}>{item.value}</div>
                          <div className="mt-2 h-1 rounded-full bg-primary/20" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-slate-800/80 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-500">Recent Activity</span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live
                        </span>
                      </div>
                      {['Org "Acme Inc" created — 3 users invited', 'License ACT-2847 activated', 'API key rotated for DataFlow', 'Security alert resolved'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <div className="h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </section>

        {/* ═══ Stats Bar ═══ */}
        <section className="relative -mt-1 bg-gradient-to-r from-primary to-blue-600">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <StaggerChildren className="grid grid-cols-2 gap-6 md:grid-cols-4" staggerDelay={0.1}>
              {stats.map((stat) => (
                <StaggerItem key={stat.label} className="text-center text-white">
                  <div className="text-3xl font-bold sm:text-4xl">
                    {stat.value}
                    {stat.suffix && <span className="text-lg font-normal text-white/70">{stat.suffix}</span>}
                  </div>
                  <div className="mt-1 text-sm text-white/80">{stat.label}</div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ═══ About / Features ═══ */}
        <section id="features" className="relative overflow-hidden py-24 sm:py-32">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <SectionBadge text="Why Wabtechs Cloud" />
                <FadeIn delay={0.2}>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Make Sure Your Platform <span className="text-primary">Scales Confidently</span>
                  </h2>
                  <p className="mt-5 max-w-lg text-lg text-muted-foreground leading-relaxed">
                    We envision a future where your team is at the forefront of their industry, setting new standards through the power of a unified platform.
                  </p>
                </FadeIn>
                <StaggerChildren className="mt-10 space-y-5" staggerDelay={0.1}>
                  {features.map((f) => (
                    <StaggerItem key={f.title}>
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                          <f.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{f.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
                <FadeIn delay={0.6}>
                  <Link href="/auth/register" className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30">
                    Get Started Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </FadeIn>
              </div>

              <StaggerChildren className="relative grid gap-4 sm:grid-cols-2" staggerDelay={0.15}>
                {services.slice(0, 4).map((s, i) => (
                  <StaggerItem key={s.title}>
                    <HoverCard className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${i === 1 || i === 3 ? 'mt-6' : ''}`}>
                      <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
                        <s.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold">{s.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </section>

        {/* ═══ Services ═══ */}
        <section id="services" className="relative overflow-hidden bg-slate-50 py-24 sm:py-32 dark:bg-slate-900/50">
          <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-16 text-center">
              <SectionBadge text="What We Offer" />
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Our Demanding Services</h2>
            </FadeIn>
            <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {services.map((s) => (
                <StaggerItem key={s.title}>
                  <HoverCard className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-primary/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative p-7">
                      <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-3.5 shadow-lg shadow-primary/20">
                        <s.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                      <div className="mt-5">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                          Read More <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ═══ Process ═══ */}
        <section id="process" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-16 text-center">
              <SectionBadge text="How It Works" />
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">We are building great future together</h2>
              <p className="mt-4 text-lg text-muted-foreground">Three simple steps from sign-up to full control.</p>
            </FadeIn>
            <div className="relative grid gap-8 md:grid-cols-3">
              <div className="absolute left-[20%] right-[20%] top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />
              <StaggerChildren className="contents" staggerDelay={0.2}>
                {processSteps.map((item) => (
                  <StaggerItem key={item.step} className="relative text-center">
                    <div className="relative mx-auto mb-6">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-2xl font-bold text-white shadow-xl shadow-primary/25">{item.step}</div>
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">{item.description}</p>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </section>

        {/* ═══ Testimonials ═══ */}
        <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32 dark:bg-slate-900/50">
          <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-16 text-center">
              <SectionBadge text="Testimonials" />
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Hear from Our Happy Customers</h2>
            </FadeIn>
            <StaggerChildren className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
              {testimonials.map((t) => (
                <StaggerItem key={t.name}>
                  <HoverCard className="relative rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-3 border-t pt-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-sm font-bold text-white">{t.name.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ═══ CTA Banner ═══ */}
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <FloatBlob className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-[100px]" />
          <FloatBlob className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <FadeIn direction="left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Empower Your Business{' '}
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">With Wabtechs Cloud</span>
                </h2>
                <p className="mt-4 max-w-lg text-lg text-slate-300">Join teams already using Wabtechs Cloud to manage their entire ecosystem from a single, powerful dashboard.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/auth/register" className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-blue-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35">
                    Create Your Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="mailto:hello@wabtechs.com" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-7 py-4 text-base font-semibold text-slate-300 transition-all hover:border-slate-400 hover:text-white">
                    Talk to Sales
                  </a>
                </div>
              </FadeIn>
              <StaggerChildren className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
                {[
                  { icon: Building2, label: 'Organizations', desc: 'Multi-tenant' },
                  { icon: Lock, label: 'Security', desc: 'Enterprise-grade' },
                  { icon: Code, label: 'API', desc: 'Full REST + SDK' },
                  { icon: Zap, label: 'Performance', desc: '<50ms latency' },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <HoverCard className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 backdrop-blur-sm transition-colors hover:border-primary/30">
                      <item.icon className="mb-3 h-7 w-7 text-primary" />
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.desc}</div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </section>

        {/* ═══ Pricing ═══ */}
        <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-16 text-center">
              <SectionBadge text="Pricing Plans" />
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Affordable Pricing Packages</h2>
            </FadeIn>
            <StaggerChildren className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3" staggerDelay={0.15}>
              {pricingPlans.map((plan) => (
                <StaggerItem key={plan.tag}>
                  <HoverCard className={`relative flex flex-col rounded-2xl border p-8 transition-all ${plan.highlighted ? 'border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-xl shadow-primary/10 ring-1 ring-primary' : 'border-slate-200 hover:shadow-lg dark:border-slate-800'}`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-blue-600 px-5 py-1 text-xs font-semibold text-white shadow-lg shadow-primary/25">
                        Most Popular
                      </div>
                    )}
                    <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">{plan.tag}</span>
                    <p className="mb-4 text-sm text-muted-foreground">{plan.name}</p>
                    <div className="mb-2 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                    </div>
                    <p className="mb-1 text-xs text-muted-foreground">Billed Annually</p>
                    <span className="mb-6 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{plan.limit}</span>
                    <ul className="mb-8 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={plan.tag === 'Enterprise' ? 'mailto:sales@wabtechs.com' : '/auth/register'} className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all ${plan.highlighted ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35' : 'border hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                      {plan.cta}
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="border-t bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600">
                  <span className="text-lg font-bold text-white">W</span>
                </div>
                <span className="text-xl font-bold">Wabtechs Cloud</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                We are passionate about empowering businesses through innovative and reliable technology solutions.
              </p>
              <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Paris, France</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@wabtechs.com</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +33 1 00 00 00 00</div>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold">Our Services</h4>
              <ul className="space-y-2.5">
                {footerServices.map((s) => (
                  <li key={s}><a href="#services" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ChevronRight className="h-3 w-3" />{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold">Company</h4>
              <ul className="space-y-2.5">
                {[{ label: 'About', href: 'https://wabtechs.com' }, { label: 'Contact', href: 'mailto:hello@wabtechs.com' }, { label: 'Documentation', href: 'https://docs.wabtechs.com' }, { label: 'Status', href: 'https://status.wabtechs.com' }].map((l) => (
                  <li key={l.label}><a href={l.href} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ChevronRight className="h-3 w-3" />{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold">Developers</h4>
              <ul className="space-y-2.5">
                {[{ label: 'GitHub', href: 'https://github.com/wabtechs' }, { label: 'API Reference', href: 'https://docs.wabtechs.com/api' }, { label: 'SDK', href: 'https://docs.wabtechs.com/sdk' }, { label: 'Changelog', href: 'https://docs.wabtechs.com/changelog' }].map((l) => (
                  <li key={l.label}><a href={l.href} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ChevronRight className="h-3 w-3" />{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:flex-row">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Wabtechs. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</a>
              <a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Use</a>
              <a href="https://status.wabtechs.com" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Site Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
