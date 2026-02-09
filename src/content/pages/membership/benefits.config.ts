/**
 * BENEFITS CONFIGURATION
 * ======================
 * Member benefits page configuration
 *
 * DATA SOURCES:
 * - Stats: Imported from ../../global/stats.config (single source of truth)
 * - Locations: Imported from ../../global/locations.config
 * - Testimonials: Imported from ../../global/testimonials.config
 */

import { globalStats } from '../../global/stats.config';
import { getMemberMapHotspots } from '../../global/locations.config';
import { getBenefitsTestimonials } from '../../global/testimonials.config';
import { pricingConfig } from './pricing.config';

const professionalTier = pricingConfig.tiers.find((tier) => tier.id === 'professional');
const pricingCurrency = professionalTier?.pricing?.currency ?? '$';
const annualPrice = professionalTier?.pricing?.annual?.price ?? pricingConfig.valueCalculator.yourInvestment;
const annualOriginalPrice = professionalTier?.pricing?.annual?.originalPrice ?? annualPrice;
const annualSavingsAmount = Math.max(0, annualOriginalPrice - annualPrice);
const annualDiscountPercent =
  annualOriginalPrice > annualPrice
    ? Math.round((annualSavingsAmount / annualOriginalPrice) * 100)
    : 0;

export const benefitsConfig = {
  header: {
    badge: 'Member Benefits',
    tagline: `Join ${globalStats.members.display} developers in ${globalStats.countries.display} countries`,
    title: {
      line1: 'More Than',
      line2: 'Just Code',
    },
    subtitle: 'Education, mentorship, and professional growth for web developers at every level.',
  },

  // Homepage preview section (consumed by HomeBenefits.astro)
  homePreview: {
    title: {
      line1: 'Everything you need to',
      line2: 'succeed',
    },
    subtitle: `Join ${globalStats.members.display} developers accelerating their careers in ${globalStats.countries.display} countries.`,
    ctaText: 'Explore All Benefits',
    ctaUrl: '/membership/benefits',
    benefitIds: ['webinars', 'mentorship', 'certificates', 'forums', 'jobs', 'resume'],
  },

  // Animated hero stats (FROM GLOBAL STATS)
  heroStats: [
    {
      value: globalStats.members.total,
      suffix: '+',
      label: 'Members',
      icon: 'lucide:users',
      trend: globalStats.members.trend,
    },
    {
      value: globalStats.countries.total,
      suffix: '',
      label: 'Countries',
      icon: 'lucide:globe',
      trend: 'Truly global',
    },
    {
      value: globalStats.webinars.yearly,
      suffix: '+',
      label: 'Webinars/yr',
      icon: 'lucide:video',
      trend: 'Every week',
    },
    {
      value: globalStats.satisfaction,
      suffix: '%',
      label: 'Satisfaction',
      icon: 'lucide:heart',
      trend: 'Would recommend',
    },
  ],

  // ROI Calculator data
  roiCalculator: {
    title: 'Calculate Your ROI',
    subtitle: "See what you'd save as a member",
    items: [
      {
        id: 'webinars',
        label: 'Webinars (50+/yr)',
        value: 2500,
        icon: 'lucide:video',
        desc: '$50 each elsewhere',
      },
      {
        id: 'courses',
        label: 'Platform discounts',
        value: 800,
        icon: 'lucide:percent',
        desc: '40% off partners',
      },
      {
        id: 'resume',
        label: 'Resume reviews',
        value: 300,
        icon: 'lucide:file-check',
        desc: '3 reviews/yr',
      },
      {
        id: 'mentorship',
        label: 'Mentorship hours',
        value: 1200,
        icon: 'lucide:handshake',
        desc: '12 hrs @ $100/hr',
      },
      {
        id: 'conference',
        label: 'Summit ticket',
        value: 500,
        icon: 'lucide:calendar',
        desc: 'Included free',
      },
      {
        id: 'job',
        label: 'Job board access',
        value: 400,
        icon: 'lucide:briefcase',
        desc: '$400/yr value',
      },
    ],
    membershipCost: annualPrice,
    ctaText: "That's {x}x your investment",
  },

  // Filterable benefits explorer
  benefits: [
    // Learning
    {
      id: 'webinars',
      category: 'learning',
      title: 'Live Webinars',
      desc: 'Weekly expert sessions on trending topics',
      icon: 'lucide:video',
      stat: '50+/year',
      popular: true,
      new: false,
    },
    {
      id: 'recordings',
      category: 'learning',
      title: 'Recording Library',
      desc: 'Access all past webinars on-demand',
      icon: 'lucide:play-circle',
      stat: '200+ hours',
      popular: true,
      new: false,
    },
    {
      id: 'certificates',
      category: 'learning',
      title: 'Certificates',
      desc: 'Earn recognized credentials',
      icon: 'lucide:award',
      stat: '12 tracks',
      popular: true,
      new: false,
    },
    {
      id: 'discounts',
      category: 'learning',
      title: 'Learning Discounts',
      desc: 'Save on Udemy, Pluralsight, more',
      icon: 'lucide:percent',
      stat: 'Up to 40%',
      popular: false,
      new: false,
    },
    {
      id: 'resources',
      category: 'learning',
      title: 'Resource Library',
      desc: 'Templates, guides, code snippets',
      icon: 'lucide:library',
      stat: '500+ items',
      popular: false,
      new: true,
    },
    {
      id: 'challenges',
      category: 'learning',
      title: 'Coding Challenges',
      desc: 'Weekly challenges with prizes',
      icon: 'lucide:trophy',
      stat: 'Weekly',
      popular: false,
      new: true,
    },

    // Community
    {
      id: 'forums',
      category: 'community',
      title: 'Member Forums',
      desc: '24/7 discussions and help',
      icon: 'lucide:message-circle',
      stat: 'Always on',
      popular: true,
      new: false,
    },
    {
      id: 'mentorship',
      category: 'community',
      title: 'Mentorship',
      desc: 'Get matched with senior devs',
      icon: 'lucide:handshake',
      stat: '1-on-1',
      popular: true,
      new: false,
    },
    {
      id: 'chapters',
      category: 'community',
      title: 'Local Chapters',
      desc: 'Meetups in your city',
      icon: 'lucide:map-pin',
      stat: '45 cities',
      popular: false,
      new: false,
    },
    {
      id: 'summit',
      category: 'community',
      title: 'Annual Summit',
      desc: '3-day flagship conference',
      icon: 'lucide:calendar',
      stat: 'Free entry',
      popular: true,
      new: false,
    },
    {
      id: 'slack',
      category: 'community',
      title: 'Private Slack',
      desc: 'Real-time community chat',
      icon: 'lucide:hash',
      stat: '5k+ members',
      popular: false,
      new: false,
    },
    {
      id: 'study',
      category: 'community',
      title: 'Study Groups',
      desc: 'Learn together, stay accountable',
      icon: 'lucide:users',
      stat: '20+ groups',
      popular: false,
      new: true,
    },

    // Career
    {
      id: 'jobs',
      category: 'career',
      title: 'Job Board',
      desc: 'Exclusive developer positions',
      icon: 'lucide:briefcase',
      stat: '150+ jobs',
      popular: true,
      new: false,
    },
    {
      id: 'resume',
      category: 'career',
      title: 'Resume Reviews',
      desc: 'Expert feedback on your CV',
      icon: 'lucide:file-check',
      stat: '3/year',
      popular: true,
      new: false,
    },
    {
      id: 'interviews',
      category: 'career',
      title: 'Mock Interviews',
      desc: 'Practice with real scenarios',
      icon: 'lucide:mic',
      stat: '1-on-1',
      popular: false,
      new: false,
    },
    {
      id: 'badge',
      category: 'career',
      title: 'IAWD Badge',
      desc: 'Verified member credential',
      icon: 'lucide:badge-check',
      stat: 'LinkedIn',
      popular: false,
      new: false,
    },
    {
      id: 'salary',
      category: 'career',
      title: 'Salary Insights',
      desc: 'Compensation data by role/region',
      icon: 'lucide:trending-up',
      stat: 'Updated',
      popular: false,
      new: true,
    },
    {
      id: 'referrals',
      category: 'career',
      title: 'Referral Network',
      desc: 'Get referred by members at top companies',
      icon: 'lucide:share-2',
      stat: '50+ companies',
      popular: false,
      new: true,
    },
  ],

  categories: [
    { id: 'all', label: 'All Benefits', icon: 'lucide:grid-3x3', count: 18 },
    { id: 'learning', label: 'Learning', icon: 'lucide:graduation-cap', count: 6, color: 'var(--cyan-400)' },
    { id: 'community', label: 'Community', icon: 'lucide:users', count: 6, color: 'var(--indigo-400)' },
    { id: 'career', label: 'Career', icon: 'lucide:rocket', count: 6, color: 'var(--pink-400)' },
  ],

  // Comparison: Member vs Non-Member
  comparison: {
    title: 'Member vs Free',
    member: {
      label: 'IAWD Member',
      price: `${pricingCurrency}${annualPrice}/year`,
      features: [
        { text: 'All 50+ webinars', included: true },
        { text: 'Full recording library', included: true },
        { text: 'Certificate programs', included: true },
        { text: '1-on-1 mentorship', included: true },
        { text: 'Job board access', included: true },
        { text: 'Resume reviews (3/yr)', included: true },
        { text: 'Annual Summit ticket', included: true },
        { text: 'Private Slack access', included: true },
        { text: 'Partner discounts', included: true },
        { text: 'Local chapter events', included: true },
      ],
    },
    free: {
      label: 'Free Account',
      price: '$0',
      features: [
        { text: '2 webinars/month', included: 'partial' },
        { text: 'Limited recordings', included: 'partial' },
        { text: 'Certificate programs', included: false },
        { text: '1-on-1 mentorship', included: false },
        { text: 'Job board access', included: 'partial' },
        { text: 'Resume reviews', included: false },
        { text: 'Annual Summit ticket', included: false },
        { text: 'Private Slack access', included: false },
        { text: 'Partner discounts', included: false },
        { text: 'Local chapter events', included: 'partial' },
      ],
    },
  },

  // Achievement system
  achievements: {
    title: 'Unlock Achievements',
    badges: [
      { id: 'newcomer', name: 'Newcomer', desc: 'Complete your profile', icon: 'lucide:user-check', unlocked: true, xp: 50 },
      { id: 'learner', name: 'Eager Learner', desc: 'Attend 5 webinars', icon: 'lucide:book-open', unlocked: true, xp: 100 },
      { id: 'networker', name: 'Networker', desc: 'Connect with 10 members', icon: 'lucide:users', unlocked: false, xp: 150 },
      { id: 'helper', name: 'Helpful Hand', desc: 'Answer 5 forum questions', icon: 'lucide:message-circle', unlocked: false, xp: 200 },
      { id: 'certified', name: 'Certified Pro', desc: 'Earn your first certificate', icon: 'lucide:award', unlocked: false, xp: 300 },
      { id: 'mentor', name: 'Mentor', desc: 'Become a mentor', icon: 'lucide:heart-handshake', unlocked: false, xp: 500 },
    ],
  },

  // World map hotspots (FROM GLOBAL LOCATIONS)
  memberMap: {
    title: 'Our Global Community',
    hotspots: getMemberMapHotspots(),
  },

  // Video testimonials (FROM GLOBAL TESTIMONIALS)
  testimonials: getBenefitsTestimonials(),

  // Live activity feed
  activityFeed: [
    { type: 'join', user: 'Alex M.', location: 'San Francisco', country: 'us', time: 'Just now' },
    { type: 'certificate', user: 'Yuki T.', achievement: 'React Fundamentals', country: 'jp', time: '2m ago' },
    { type: 'webinar', user: 'Carlos R.', event: 'CSS Grid Mastery', country: 'mx', time: '5m ago' },
    { type: 'mentor', user: 'Emma W.', action: 'matched with mentor', country: 'gb', time: '8m ago' },
    { type: 'job', user: 'Raj P.', achievement: 'Got hired at Microsoft!', country: 'in', time: '12m ago' },
    { type: 'badge', user: 'Sofia L.', achievement: 'Certified Pro badge', country: 'de', time: '15m ago' },
    { type: 'forum', user: 'Chen W.', action: 'answered 10 questions', country: 'cn', time: '18m ago' },
    { type: 'join', user: 'Olga K.', location: 'Warsaw', country: 'pl', time: '22m ago' },
  ],

  // Upcoming events
  events: [
    {
      title: 'Modern CSS Techniques',
      type: 'Webinar',
      date: '2026-02-15T14:00:00',
      speaker: { name: 'Sarah Chen', avatar: 'SC', role: 'CSS Wizard' },
      attendees: 234,
      maxAttendees: 300,
      tags: ['CSS', 'Frontend'],
    },
    {
      title: 'TypeScript Deep Dive',
      type: 'Workshop',
      date: '2026-02-18T11:00:00',
      speaker: { name: 'Mike Johnson', avatar: 'MJ', role: 'TS Expert' },
      attendees: 156,
      maxAttendees: 200,
      tags: ['TypeScript', 'Advanced'],
    },
    {
      title: 'Career AMA',
      type: 'Live Q&A',
      date: '2026-02-20T18:00:00',
      speaker: { name: 'Panel', avatar: 'PA', role: 'Industry Leaders' },
      attendees: 89,
      maxAttendees: 500,
      tags: ['Career', 'Networking'],
    },
  ],

  // Journey/onboarding
  journey: [
    {
      step: 1,
      title: 'Create Profile',
      desc: 'Set up your developer identity',
      icon: 'lucide:user-plus',
      time: '2 min',
      details: ['Add your skills', 'Set your goals', 'Upload photo'],
    },
    {
      step: 2,
      title: 'Join Community',
      desc: 'Connect with fellow devs',
      icon: 'lucide:users',
      time: '5 min',
      details: ['Join Slack', 'Find local chapter', 'Introduce yourself'],
    },
    {
      step: 3,
      title: 'Start Learning',
      desc: 'Dive into resources',
      icon: 'lucide:book-open',
      time: 'Ongoing',
      details: ['Attend first webinar', 'Browse library', 'Set reminders'],
    },
    {
      step: 4,
      title: 'Get Mentored',
      desc: 'Match with a mentor',
      icon: 'lucide:handshake',
      time: '1 week',
      details: ['Complete assessment', 'Get matched', 'Schedule intro call'],
    },
    {
      step: 5,
      title: 'Level Up',
      desc: 'Grow your career',
      icon: 'lucide:rocket',
      time: 'Ongoing',
      details: ['Earn certificates', 'Apply to jobs', 'Get promoted'],
    },
  ],

  // Keyboard shortcuts
  shortcuts: [
    { key: '1', action: 'View Learning benefits' },
    { key: '2', action: 'View Community benefits' },
    { key: '3', action: 'View Career benefits' },
    { key: '/', action: 'Focus search' },
    { key: '?', action: 'Show shortcuts' },
  ],

  // CTA
  cta: {
    primary: {
      text: 'Join IAWD Today',
      subtext:
        annualDiscountPercent > 0
          ? `${annualDiscountPercent}% off - ${pricingCurrency}${annualPrice}/year (normally ${pricingCurrency}${annualOriginalPrice})`
          : `${pricingCurrency}${annualPrice}/year`,
      url: '/membership/join',
      urgency:
        annualSavingsAmount > 0
          ? `Save ${pricingCurrency}${annualSavingsAmount} with annual billing`
          : 'Flexible plans, cancel anytime',
    },
    secondary: {
      text: 'Take a Tour',
      url: '/membership',
    },
    guarantee: '30-day money-back guarantee',
  },
};
