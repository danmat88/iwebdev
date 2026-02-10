export interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: Record<string, FooterLink[]> = {
  About: [
    { label: 'About IAWD', href: '/about' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Contact Us', href: '/support/contact' },
    { label: 'Support IAWD', href: '/donate' },
  ],
  Members: [
    { label: 'Join IAWD', href: '/membership/join' },
    { label: 'Member Benefits', href: '/membership/benefits' },
    { label: 'Community', href: '/membership/community' },
    { label: 'Member Login', href: 'https://members.iwebdev.org' },
  ],
  Training: [
    { label: 'Webinars', href: '/training/webinars' },
    { label: 'Live Events', href: '/training/events' },
    { label: 'Certifications', href: '/training/certifications' },
    { label: 'FAQ', href: '/support/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Code of Conduct', href: '/legal/conduct' },
  ]
};

export function getFooterLinksByCategory(category: string): FooterLink[] {
  return footerLinks[category] || [];
}

export function getFooterCategories(): string[] {
  return Object.keys(footerLinks);
}

export function getAllFooterLinks(): FooterLink[] {
  return Object.values(footerLinks).flat();
}
