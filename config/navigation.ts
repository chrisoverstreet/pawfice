import {
  Calendar,
  CheckSquare,
  Home,
  MessageSquare,
  Settings,
  UserCog,
  Users,
} from 'lucide-react';

export const navigationItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Bookings', icon: Calendar, href: '/bookings' },
  { name: 'Pets & Owners', icon: Users, href: '/search' },
  { name: 'Messages', icon: MessageSquare, href: '/messages' },
  { name: 'Tasks', icon: CheckSquare, href: '/tasks' },
  { name: 'Staff', icon: UserCog, href: '/staff' },
  { name: 'Settings', icon: Settings, href: '/settings' },
] as const;

export default navigationItems;
