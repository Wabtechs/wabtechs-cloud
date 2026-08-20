'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@wabtechs/utils';
import { useUIStore } from '@/lib/store';
import {
  LayoutDashboard,
  Users,
  Box,
  Key,
  Shield,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  HelpCircle,
} from '@wabtechs/icons';
import { Button } from '@wabtechs/ui/button';
import { Separator } from '@wabtechs/ui/separator';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Organizations', href: '/organizations', icon: Building2 },
  { name: 'Applications', href: '/applications', icon: Box },
  { name: 'Licenses', href: '/licenses', icon: Key },
  { name: 'Security', href: '/security', icon: Shield },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Developers', href: '/developers/api-keys', icon: Settings },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed, sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-200 hidden lg:block',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent sidebarCollapsed={sidebarCollapsed} toggleSidebarCollapsed={toggleSidebarCollapsed} />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r bg-card lg:hidden">
            <SidebarContent sidebarCollapsed={false} toggleSidebarCollapsed={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}

function SidebarContent({ sidebarCollapsed, toggleSidebarCollapsed }: { sidebarCollapsed: boolean; toggleSidebarCollapsed: () => void }) {
  const pathname = usePathname();
  const { setSidebarOpen } = useUIStore();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!sidebarCollapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">W</span>
            </div>
            <span className="font-semibold text-lg">Wabtechs Cloud</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapsed}
          className={cn('h-8 w-8', sidebarCollapsed && 'justify-center')}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-3 overflow-y-auto" aria-label="Main navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                sidebarCollapsed && 'justify-center'
              )}
              title={sidebarCollapsed ? item.name : undefined}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <Link
          href="/help"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
            sidebarCollapsed && 'justify-center'
          )}
          title={sidebarCollapsed ? 'Help & Support' : undefined}
          onClick={() => setSidebarOpen(false)}
        >
          <HelpCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {!sidebarCollapsed && <span>Help & Support</span>}
        </Link>
      </div>
    </div>
  );
}
