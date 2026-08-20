import * as React from 'react';
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Ban,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  Clock,
  Command,
  Copy,
  CreditCard,
  Database,
  Download,
  Eye,
  EyeOff,
  File,
  FileText,
  FileWarning,
  Filter,
  Folder,
  Gauge,
  Globe,
  Heart,
  Home,
  Image,
  Inbox,
  Info,
  Keyboard,
  Layers,
  LayoutDashboard,
  Link,
  LoaderCircle,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Paintbrush,
  Paperclip,
  Pencil,
  ChartColumn,
  ChartPie,
  Phone,
  Plus,
  RefreshCw,
  Rocket,
  RotateCcw,
  Search,
  Send,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Tag,
  Timer,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Truck,
  Type,
  Upload,
  User,
  Users,
  Wallet,
  WifiOff,
  X,
  type LucideIcon,
} from 'lucide-react';

/**
 * Registre des icônes par nom. Moteur remplaçable :
 * `setIconRegistry({...})` permet d'injecter un autre fournisseur d'icônes.
 */
const defaultRegistry: Record<string, LucideIcon> = {
  activity: Activity,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowUpRight: ArrowUpRight,
  ban: Ban,
  'bar-chart': ChartColumn,
  bell: Bell,
  bookmark: Bookmark,
  briefcase: Briefcase,
  building: Building2,
  calendar: Calendar,
  'calendar-days': CalendarDays,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'circle-alert': CircleAlert,
  'circle-check': CircleCheck,
  'circle-help': CircleHelp,
  'circle-x': CircleX,
  clock: Clock,
  command: Command,
  copy: Copy,
  'credit-card': CreditCard,
  database: Database,
  download: Download,
  eye: Eye,
  'eye-off': EyeOff,
  file: File,
  'file-text': FileText,
  'file-warning': FileWarning,
  filter: Filter,
  folder: Folder,
  gauge: Gauge,
  globe: Globe,
  heart: Heart,
  home: Home,
  image: Image,
  inbox: Inbox,
  info: Info,
  keyboard: Keyboard,
  layers: Layers,
  'layout-dashboard': LayoutDashboard,
  link: Link,
  loader: LoaderCircle,
  lock: Lock,
  'log-out': LogOut,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  monitor: Monitor,
  moon: Moon,
  'more-horizontal': MoreHorizontal,
  'more-vertical': MoreVertical,
  package: Package,
  paintbrush: Paintbrush,
  paperclip: Paperclip,
  pencil: Pencil,
  phone: Phone,
  'pie-chart': ChartPie,
  plus: Plus,
  'refresh-cw': RefreshCw,
  rocket: Rocket,
  'rotate-ccw': RotateCcw,
  search: Search,
  send: Send,
  settings: Settings,
  share: Share2,
  shield: Shield,
  'shield-check': ShieldCheck,
  'sliders-horizontal': SlidersHorizontal,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  tag: Tag,
  timer: Timer,
  'trash-2': Trash2,
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  'triangle-alert': TriangleAlert,
  truck: Truck,
  type: Type,
  upload: Upload,
  user: User,
  users: Users,
  wallet: Wallet,
  'wifi-off': WifiOff,
  x: X,
};

let registry: Record<string, LucideIcon> = { ...defaultRegistry };

/** Remplacer le registre complet (fournisseur d'icônes alternatif). */
export function setIconRegistry(next: Record<string, LucideIcon>): void {
  registry = { ...next };
}

/** Ajouter / surcharger une icône nommée. */
export function registerIcon(name: string, component: LucideIcon): void {
  registry[name] = component;
}

/** Récupérer le composant d'une icône par nom. */
export function getIcon(name: string): LucideIcon | undefined {
  return registry[name];
}

export type IconName = keyof typeof defaultRegistry;

export interface IconProps extends React.ComponentProps<'svg'> {
  /** Nom d'icône du registre (ex. "search"). */
  name: string;
  /** Taille en pixels (défaut 16). */
  size?: number;
  /** Libellé accessible (remplace l'aria-hidden par défaut). */
  title?: string;
  /** Épaisseur du trait (defaut 2). */
  strokeWidth?: number;
}

/**
 * Icône par nom : `<Icon name="search" />`.
 * Sans `title`, l'icône est décorative (`aria-hidden`).
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 16, title, strokeWidth = 2, ...props },
  ref,
) {
  const Component = getIcon(name);

  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Wabtechs Icons] Icône inconnue : "${name}"`);
    }
    return null;
  }

  const accessibilityProps = title
    ? ({ role: 'img', 'aria-label': title } as const)
    : ({ 'aria-hidden': true } as const);

  return (
    <Component
      ref={ref}
      size={size}
      strokeWidth={strokeWidth}
      {...accessibilityProps}
      {...props}
    />
  );
});
