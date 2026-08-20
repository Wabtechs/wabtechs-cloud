/**
 * @wabtechs/ui — entry point.
 *
 * Imports modulaires : `import { Button } from '@wabtechs/ui/button'`.
 */

export { cn, cx } from './lib/utils';

/* ------------------------------------------------------------------ */
/* Provider & contextes                                                */
/* ------------------------------------------------------------------ */
export { WabtechsProvider, useDensity, useDirection, useLocale, useWabtechs } from './providers/wabtechs-provider';
export type { WabtechsProviderProps } from './providers/wabtechs-provider';

/* ------------------------------------------------------------------ */
/* Thèmes (réexport du moteur)                                         */
/* ------------------------------------------------------------------ */
export {
  createWabtechsTheme,
  ThemeProvider,
  useSystemTheme,
  useTheme,
} from '@wabtechs/themes';
export type {
  CreateWabtechsThemeOptions,
  Density,
  Direction,
  ThemeColorOverrides,
  ThemeContextValue,
  ThemeName,
  ThemeProviderProps,
  WabtechsLocale,
  WabtechsTheme,
} from '@wabtechs/themes';

/* ------------------------------------------------------------------ */
/* Hooks (réexport de commodité)                                       */
/* ------------------------------------------------------------------ */
export {
  useControllableState,
  useDebounceValue,
  useEventListener,
  useHotkeys,
  useIsomorphicLayoutEffect,
  useLocalStorage,
  useMediaQuery,
  useMounted,
  usePrevious,
} from '@wabtechs/hooks';

/* ------------------------------------------------------------------ */
/* Feedback                                                            */
/* ------------------------------------------------------------------ */
export { Alert, AlertDescription, AlertTitle, alertVariants } from './components/alert';
export type { AlertDescriptionProps, AlertProps, AlertTitleProps } from './components/alert';
export { Spinner } from './components/spinner';
export type { SpinnerProps } from './components/spinner';
export { Toast } from './components/toast';
export type { ToastProps } from './components/toast';
export { Progress } from './components/progress';
export type { ProgressProps } from './components/progress';
export { ErrorState } from './components/error-state';
export type { ErrorStateProps } from './components/error-state';
export { LoadingState } from './components/loading-state';
export type { LoadingStateProps } from './components/loading-state';

/* ------------------------------------------------------------------ */
/* Data display                                                        */
/* ------------------------------------------------------------------ */
export {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from './components/avatar';
export type { AvatarFallbackProps, AvatarGroupProps, AvatarImageProps, AvatarProps } from './components/avatar';
export { Badge, badgeVariants } from './components/badge';
export type { BadgeProps } from './components/badge';
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/card';
export type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from './components/card';
export {
  CardSkeleton,
  DashboardSkeleton,
  FormSkeleton,
  ListSkeleton,
  Skeleton,
  TableSkeleton,
} from './components/skeleton';
export type {
  CardSkeletonProps,
  DashboardSkeletonProps,
  FormSkeletonProps,
  ListSkeletonProps,
  SkeletonProps,
  TableSkeletonProps,
} from './components/skeleton';
export { EmptyState } from './components/empty-state';
export type { EmptyStateProps } from './components/empty-state';
export { StatsCard } from './components/stats-card';
export type { StatsCardProps } from './components/stats-card';

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';
export { IconButton } from './components/icon-button';
export type { IconButtonProps } from './components/icon-button';

/* ------------------------------------------------------------------ */
/* Forms                                                               */
/* ------------------------------------------------------------------ */
export { Input } from './components/input';
export type { InputProps } from './components/input';
export { Textarea } from './components/textarea';
export type { TextareaProps } from './components/textarea';
export { Label } from './components/label';
export type { LabelProps } from './components/label';
export { FormField } from './components/form-field';
export type { FormFieldProps } from './components/form-field';
export { Checkbox } from './components/checkbox';
export type { CheckboxProps } from './components/checkbox';
export { RadioGroup, RadioGroupItem } from './components/radio-group';
export { Switch } from './components/switch';
export type { SwitchProps } from './components/switch';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './components/select';
export type { SelectProps, SelectTriggerProps } from './components/select';
export { SearchInput } from './components/search-input';
export type { SearchInputProps } from './components/search-input';

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/tabs';
export type { TabsProps } from './components/tabs';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/accordion';
export type { AccordionProps } from './components/accordion';
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from './components/breadcrumb';
export type { BreadcrumbItemProps, BreadcrumbProps } from './components/breadcrumb';
export { Pagination } from './components/pagination';
export type { PaginationProps } from './components/pagination';

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */
export { Container } from './components/container';
export type { ContainerProps } from './components/container';
export { HStack, Stack } from './components/stack';
export type { StackProps } from './components/stack';
export { Grid } from './components/grid';
export type { GridProps } from './components/grid';
export { Separator } from './components/separator';
export type { SeparatorProps } from './components/separator';
export { AspectRatio } from './components/aspect-ratio';
export type { AspectRatioProps } from './components/aspect-ratio';
export { ScrollArea, ScrollBar } from './components/scroll-area';
export type { ScrollAreaProps, ScrollBarProps } from './components/scroll-area';

/* ------------------------------------------------------------------ */
/* Overlay / guidance                                                  */
/* ------------------------------------------------------------------ */
export {
  SimpleTooltip,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/tooltip';
export type { SimpleTooltipProps, TooltipContentProps, TooltipProps } from './components/tooltip';
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './components/dialog';
export type { DialogCloseProps, DialogContentProps, DialogDescriptionProps, DialogFooterProps, DialogHeaderProps, DialogOverlayProps, DialogProps, DialogTitleProps, DialogTriggerProps } from './components/dialog';
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from './components/popover';
export type { PopoverContentProps, PopoverProps, PopoverTriggerProps } from './components/popover';
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from './components/sheet';
export type { SheetContentProps, SheetDescriptionProps, SheetFooterProps, SheetHeaderProps, SheetOverlayProps, SheetProps, SheetTitleProps, SheetTriggerProps } from './components/sheet';
export { ConfirmDialog } from './components/confirm-dialog';
export type { ConfirmDialogProps } from './components/confirm-dialog';
