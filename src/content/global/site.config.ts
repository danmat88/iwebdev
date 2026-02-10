import { globalStats } from './stats.config';

export const siteConfig = {
  name: 'IAWD',
  fullName: 'International Association of Web Developers',
  tagline: 'Your global developer home base',
  description: 'A nonprofit organization committed to supporting aspiring and professional web developers around the world.',

  url: 'https://iwebdev.org',
  membersUrl: 'https://members.iwebdev.org',

  year: 2026,
  founded: 2024,

  email: 'hello@iawd.org',
  supportEmail: 'support@iawd.org',

  social: {
    twitter: 'https://twitter.com/iawd',
    linkedin: 'https://linkedin.com/company/iawd',
    github: 'https://github.com/iawd',
    youtube: 'https://youtube.com/@iawd',
    discord: 'https://discord.gg/iawd',
  },

  stats: {
    members: globalStats.members.display,
    countries: globalStats.countries.display,
    courses: globalStats.courses?.display || '200+',
    events: globalStats.events?.display || '500+',
    webinars: globalStats.webinars.display,
    satisfaction: `${globalStats.satisfaction}%`,
  },
};

export type SiteConfig = typeof siteConfig;
