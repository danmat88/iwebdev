import type { HeroConfig } from '../../../config/hero_types';
import { globalStats } from '../../global/stats.config';
import { getMapHotspots } from '../../global/locations.config';

export const heroConfig: HeroConfig = {
  announcement: {
    show: true,
    liveIndicator: {
      show: true,
      color: 'red'
    },
    headline: '2026 Global Dev Summit', // UPDATED: 2025 → 2026
    subtext: 'Registration open · 500 spots left',
    cta: 'Register',
    url: '/training/events', // UPDATED: /events → /training/events
    icon: 'lucide:arrow-right'
  },

  title: {
    line1: 'The developer',
    line2: 'community you',
    line3: '', // This line uses typed words
    typedWords: [
      { text: 'deserve.', color: 'var(--accent)' },
      { text: 'need.', color: 'var(--accent-2)' },
      { text: 'dreamed of.', color: 'var(--accent-3)' },
      { text: 'belong to.', color: 'var(--accent)' },
      { text: 'will love.', color: 'var(--accent-2)' }
    ]
  },

  subtitle: {
    main: 'Join',
    memberCount: globalStats.members.total, // FROM GLOBAL STATS
    highlight: `${globalStats.countries.display} countries` // FROM GLOBAL STATS
  },

  statPills: [
    {
      id: 'webinars',
      icon: 'lucide:video',
      value: globalStats.webinars.display, // FROM GLOBAL STATS
      label: 'Webinars/yr',
      colorClass: 'webinars',
      badge: {
        type: 'live',
        value: '3 live'
      }
    },
    {
      id: 'mentors',
      icon: 'lucide:graduation-cap',
      value: `${globalStats.mentors}+`, // FROM GLOBAL STATS
      label: 'Mentors',
      colorClass: 'mentors',
      badge: {
        type: 'rating',
        value: '4.9',
        icon: 'lucide:star'
      }
    },
    {
      id: 'certs',
      icon: 'lucide:award',
      value: globalStats.certifications.toString(), // FROM GLOBAL STATS
      label: 'Cert Tracks',
      colorClass: 'certs'
    }
  ],

  cta: {
    buttons: [
      {
        type: 'primary',
        icon: 'lucide:rocket',
        mainText: 'Start Your Journey',
        subText: 'Free tier available · No credit card',
        url: '/membership/join'
      },
      {
        type: 'secondary',
        variant: 'video',
        icon: 'lucide:play',
        mainText: 'Watch story',
        url: '#demo',
        duration: '2:30'
      }
    ]
  },

  testimonials: [
    {
      text: 'IAWD changed my career trajectory completely. The mentorship alone is worth 10x.',
      author: 'Sarah Kim',
      role: 'Frontend Developer at Spotify',
      avatar: 'SK',
      country: 'us'
    },
    {
      text: 'From self-taught to senior engineer in 18 months. The community support here is unmatched.',
      author: 'Marcus Chen',
      role: 'Senior Engineer at Stripe',
      avatar: 'MC',
      country: 'ca'
    },
    {
      text: 'I landed my dream job 3 months after joining. The mock interviews were game-changers.',
      author: 'Priya Sharma',
      role: 'Full Stack Dev at Google',
      avatar: 'PS',
      country: 'in'
    },
    {
      text: 'As a career changer at 40, I felt welcomed from day one. Now I lead a dev team.',
      author: 'James Miller',
      role: 'Tech Lead at Shopify',
      avatar: 'JM',
      country: 'gb'
    }
  ],

  testimonialIds: ['sarah-kim-1', 'marcus-chen-1', 'priya-sharma-1', 'james-miller-1'],

  trustMarquee: [
    {
      icon: 'lucide:heart-handshake',
      text: '501(c)(3) Nonprofit'
    },
    {
      icon: 'lucide:globe-2',
      text: `${globalStats.countries.display} Countries` // FROM GLOBAL STATS
    },
    {
      icon: 'lucide:smile-plus',
      text: 'Beginner Friendly'
    },
    {
      icon: 'lucide:shield-check',
      text: 'Privacy First'
    },
    {
      icon: 'lucide:users',
      text: '24/7 Community'
    },
    {
      icon: 'lucide:star',
      text: '5.0 Member Rating'
    }
  ],

  scrollIndicator: {
    show: true,
    text: 'Discover more',
    icon: 'lucide:chevron-down'
  },

  terminal: {
    lines: [
      {
        type: 'input',
        command: 'npx create-career@latest'
      },
      {
        type: 'output',
        output: ''
      },
      {
        type: 'output',
        output: '<span class="t-cyan">◆</span> <span class="t-bold">Welcome to Career Builder</span> <span class="t-dim">v2.0.1</span>'
      },
      {
        type: 'output',
        output: ''
      },
      {
        type: 'output',
        output: '<span class="t-green">?</span> What\'s your goal?'
      },
      {
        type: 'output',
        output: '  <span class="t-dim">○</span> Just browsing'
      },
      {
        type: 'output',
        output: '  <span class="t-dim">○</span> Learn something new'
      },
      {
        type: 'output',
        output: '  <span class="t-cyan">●</span> <span class="t-bold">Transform my career</span>'
      },
      {
        type: 'output',
        output: ''
      },
      {
        type: 'output',
        output: '<span class="t-dim">⣿ Creating your personalized path…</span>'
      },
      {
        type: 'output',
        output: ''
      },
      {
        type: 'output',
        output: '<span class="t-green">✓</span> Unlocked <span class="t-cyan">mentorship</span> access'
      },
      {
        type: 'output',
        output: '<span class="t-green">✓</span> Unlocked <span class="t-cyan">certification</span> tracks'
      },
      {
        type: 'output',
        output: '<span class="t-green">✓</span> Unlocked <span class="t-cyan">global</span> community'
      },
      {
        type: 'output',
        output: '<span class="t-green">✓</span> Unlocked <span class="t-cyan">live</span> workshops'
      },
      {
        type: 'output',
        output: ''
      },
      {
        type: 'output',
        output: '<span class="t-bold t-green">✨ Success!</span> Your journey begins now.'
      }
    ]
  },

  mapHotspots: getMapHotspots(), // Imported from global locations config

  carouselCards: [
    {
      index: 0,
      title: 'REMOTE_SESSION://live',
      status: 'CONNECTED',
      statusType: 'connected',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=90',
      imageAlt: 'Pair Programming',
      location: 'San Francisco, CA',
      activityType: 'Pair Programming',
      activityMetric: '12 watching',
      stats: {
        duration: '2hr',
        latency: '94ms',
        status: 'HOT'
      },
      sessionId: '#SESSION_4F7A9B'
    },
    {
      index: 1,
      title: 'SYNC_PROTOCOL://daily',
      status: 'SYNCING',
      statusType: 'syncing',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&q=90',
      imageAlt: 'Team Standup',
      location: 'Berlin, Germany',
      activityType: 'Team Standup',
      activityMetric: '8 members',
      stats: {
        duration: '15m',
        latency: '52ms',
        status: 'LIVE'
      },
      sessionId: '#SYNC_8E2C4D'
    },
    {
      index: 2,
      title: 'FOCUS_MODE://engaged',
      status: 'FOCUSED',
      statusType: 'focused',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&q=90',
      imageAlt: 'Deep Work',
      location: 'Tokyo, Japan',
      activityType: 'Deep Work',
      activityMetric: '4hr 🔥',
      stats: {
        duration: '4hr',
        latency: '28ms',
        status: 'FIRE'
      },
      sessionId: '#FOCUS_A3D8F1'
    },
    {
      index: 3,
      title: 'HACK_EVENT://48h-challenge',
      status: 'BUILDING',
      statusType: 'building',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=90',
      imageAlt: 'Hackathon',
      location: 'London, UK',
      activityType: 'Hackathon',
      activityMetric: '156 active',
      stats: {
        duration: '23h',
        latency: '71ms',
        status: 'FAST'
      },
      sessionId: '#HACK_9B4E7C'
    },
    {
      index: 4,
      title: 'BRAINSTORM://creative-mode',
      status: 'IDEATING',
      statusType: 'active',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop&q=90',
      imageAlt: 'Brainstorming',
      location: 'Amsterdam, NL',
      activityType: 'Brainstorming',
      activityMetric: '6 collaborators',
      stats: {
        duration: '90m',
        latency: '38ms',
        status: 'FLOW'
      },
      sessionId: '#BRAIN_C5F3A8'
    }
  ]
};

export function getStatPillById(id: string) {
  return heroConfig.statPills.find(pill => pill.id === id);
}

export function getLiveStatPills() {
  return heroConfig.statPills.filter(pill => pill.badge?.type === 'live');
}

export function getCarouselCardByIndex(index: number) {
  return heroConfig.carouselCards.find(card => card.index === index);
}

export function getRandomTestimonial() {
  const randomIndex = Math.floor(Math.random() * heroConfig.testimonials.length);
  return heroConfig.testimonials[randomIndex];
}

export function getHotspotByCity(city: string) {
  return heroConfig.mapHotspots.find(hotspot => hotspot.city === city);
}

export function getPrimaryCTA() {
  return heroConfig.cta.buttons.find(btn => btn.type === 'primary');
}

export function getSecondaryCTAs() {
  return heroConfig.cta.buttons.filter(btn => btn.type === 'secondary');
}
