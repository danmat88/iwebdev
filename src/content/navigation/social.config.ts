export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/iwebdev',
    icon: 'lucide:github'
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/iwebdev',
    icon: 'lucide:message-circle'
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/iwebdev',
    icon: 'lucide:twitter'
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/iwebdev',
    icon: 'lucide:linkedin'
  },
];

export function getSocialByLabel(label: string): SocialLink | undefined {
  return socials.find(s => s.label.toLowerCase() === label.toLowerCase());
}

export function getSocialByPlatform(platform: string): SocialLink | undefined {
  return socials.find(s =>
    s.label.toLowerCase().includes(platform.toLowerCase()) ||
    s.href.includes(platform.toLowerCase())
  );
}
