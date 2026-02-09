/**
 * GLOBAL SITE CONFIGURATION
 * ==========================
 * THE SINGLE SOURCE OF TRUTH for site metadata
 *
 * This file consolidates all site-wide configuration.
 * Imports from globalStats to ensure consistency.
 */

import { globalStats } from './stats.config';

export const siteConfig = {
  // Organization info
  name: 'IAWD',
  fullName: 'International Association of Web Developers',
  tagline: 'Your global developer home base',
  description: 'A nonprofit organization committed to supporting aspiring and professional web developers around the world.',

  // URLs
  url: 'https://iwebdev.org',
  membersUrl: 'https://members.iwebdev.org',

  // Dates
  year: 2026,
  founded: 2024,

  // Contact
  email: 'hello@iawd.org',
  supportEmail: 'support@iawd.org',

  // Social media
  social: {
    twitter: 'https://twitter.com/iawd',
    linkedin: 'https://linkedin.com/company/iawd',
    github: 'https://github.com/iawd',
    youtube: 'https://youtube.com/@iawd',
    discord: 'https://discord.gg/iawd',
  },

  // Stats (imported from global stats for consistency)
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
