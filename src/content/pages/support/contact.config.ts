/**
 * CONTACT CONFIGURATION
 * ======================
 * Contact section configuration
 *
 * DATA SOURCES:
 * - Team: Imported from ../../global/team.config (single source of truth)
 */

import type { ContactConfig } from '../../../config/contact.types';
import { getContactTeam } from '../../global/team.config';

export const contactConfig: ContactConfig = {
  hero: {
    badge: 'Get in Touch',
    status: 'Online Now',
    title: {
      line1: "Let's",
      line2: 'connect'
    },
    subtitle: 'Whether you have a question, feedback, or just want to say hello — our team is here to help.'
  },

  stats: [
    { value: '<2h', label: 'Avg Response', icon: 'lucide:zap' },
    { value: '98%', label: 'Satisfaction', icon: 'lucide:heart' },
    { value: '24/7', label: 'Community', icon: 'lucide:globe' }
  ],

  methods: [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Get instant help from our team',
      icon: 'lucide:message-circle',
      badge: { text: 'Fastest', icon: 'lucide:zap', variant: 'primary' },
      status: { text: '4 team members online', online: true },
      preview: 'chat'
    },
    {
      id: 'message',
      title: 'Send Message',
      description: 'Email us with full details',
      icon: 'lucide:mail',
      badge: { text: 'Detailed', icon: 'lucide:file-text', variant: 'secondary' },
      status: { text: 'Reply within 24 hours', icon: 'lucide:clock' },
      preview: 'message'
    },
    {
      id: 'call',
      title: 'Schedule Call',
      description: 'Book a video chat with us',
      icon: 'lucide:video',
      badge: { text: 'Personal', icon: 'lucide:video', variant: 'tertiary' },
      status: { text: 'Next available: Today 2pm', icon: 'lucide:calendar' },
      preview: 'call'
    }
  ],

  // Team members (FROM GLOBAL TEAM CONFIG)
  team: getContactTeam(), // Imported from global team config

  topics: [
    { id: 'general', label: 'General', icon: 'lucide:message-circle' },
    { id: 'support', label: 'Support', icon: 'lucide:life-buoy' },
    { id: 'membership', label: 'Membership', icon: 'lucide:badge-check' },
    { id: 'partnerships', label: 'Partnerships', icon: 'lucide:handshake' },
    { id: 'billing', label: 'Billing', icon: 'lucide:credit-card' },
    { id: 'feedback', label: 'Feedback', icon: 'lucide:star' }
  ],

  socials: [
    { icon: 'lucide:twitter', url: 'https://twitter.com/iawd', label: 'Twitter' },
    { icon: 'lucide:linkedin', url: 'https://linkedin.com/company/iawd', label: 'LinkedIn' },
    { icon: 'lucide:github', url: 'https://github.com/iawd', label: 'GitHub' },
    { icon: 'lucide:youtube', url: 'https://youtube.com/@iawd', label: 'YouTube' }
  ],

  quickLinks: [
    { label: 'FAQ', href: '/support/faq' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Status', href: 'https://status.iwebdev.org' }
  ],

  offices: [
    {
      city: 'San Francisco',
      address: '123 Market St, Suite 400',
      timezone: 'PST (UTC-8)',
      email: 'sf@iawd.org'
    },
    {
      city: 'London',
      address: '10 Downing Street',
      timezone: 'GMT (UTC+0)',
      email: 'london@iawd.org'
    },
    {
      city: 'Singapore',
      address: '1 Raffles Place',
      timezone: 'SGT (UTC+8)',
      email: 'sg@iawd.org'
    }
  ],

  cta: {
    title: 'Still have questions?',
    description: 'Our community is here to help 24/7',
    primaryButton: {
      text: 'Join Community',
      url: '/membership/join'
    },
    secondaryButton: {
      text: 'Browse FAQ',
      url: '/support/faq'
    }
  }
};
