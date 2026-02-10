export interface SubMenuItem {
  label: string;
  href: string;
  desc: string;
  icon: string;
  highlight?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  featured?: boolean;
  submenu?: SubMenuItem[];
}

export interface Theme {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: 'lucide:home'
  },
  {
    label: 'About',
    href: '/about',
    icon: 'lucide:lightbulb',
    submenu: [
      {
        label: 'About IAWD',
        href: '/about',
        desc: 'Our mission and story',
        icon: 'lucide:book-open'
      },
      {
        label: 'Leadership',
        href: '/about/leadership',
        desc: 'Meet our team',
        icon: 'lucide:users'
      },
      {
        label: 'FAQ',
        href: '/support/faq',
        desc: 'Common questions',
        icon: 'lucide:help-circle'
      },
      {
        label: 'Contact Us',
        href: '/support/contact',
        desc: 'Get in touch',
        icon: 'lucide:mail'
      },
    ]
  },
  {
    label: 'Membership',
    href: '/membership',
    icon: 'lucide:star',
    featured: true,
    submenu: [
      {
        label: 'Why Join?',
        href: '/membership',
        desc: 'Discover the benefits',
        icon: 'lucide:target'
      },
      {
        label: 'Benefits',
        href: '/membership/benefits',
        desc: 'What you get',
        icon: 'lucide:gift'
      },
      {
        label: 'Community',
        href: '/membership/community',
        desc: 'Connect with peers',
        icon: 'lucide:handshake'
      },
      {
        label: 'Join or Renew',
        href: '/membership/join',
        desc: 'Become a member',
        icon: 'lucide:rocket',
        highlight: true
      },
    ]
  },
  {
    label: 'Training',
    href: '/training',
    icon: 'lucide:book-marked',
    submenu: [
      {
        label: 'Webinars',
        href: '/training/webinars',
        desc: 'Online sessions',
        icon: 'lucide:video'
      },
      {
        label: 'Live Events',
        href: '/training/events',
        desc: 'In-person meetups',
        icon: 'lucide:calendar-days'
      },
      {
        label: 'Certifications',
        href: '/training/certifications',
        desc: 'Get certified',
        icon: 'lucide:trophy'
      },
    ]
  },
];

export const themes: Theme[] = [
  {
    id: 'iawd',
    name: 'IAWD',
    color: '#00b2a7',
    icon: 'lucide:sparkles'
  },
];

export function getNavItemByHref(href: string): NavItem | undefined {
  return navItems.find(item => item.href === href);
}

export function getNavItemsWithSubmenus(): NavItem[] {
  return navItems.filter(item => item.submenu && item.submenu.length > 0);
}

export function getFeaturedNavItems(): NavItem[] {
  return navItems.filter(item => item.featured);
}

export function getAllSubmenuItems(): SubMenuItem[] {
  return navItems
    .filter(item => item.submenu)
    .flatMap(item => item.submenu || []);
}

export function getHighlightedSubmenuItems(): SubMenuItem[] {
  return getAllSubmenuItems().filter(item => item.highlight);
}
