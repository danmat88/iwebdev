import type { HeroConfig } from '../../../config/hero_types';
import { globalStats } from '../../global/stats.config';
import { getMapHotspots } from '../../global/locations.config';
import { getTestimonialsByIds } from '../../global/testimonials.config';
import { heroCarouselCards } from '../../global/community.config';

const heroTestimonialIds = ['sarah-kim-1', 'marcus-chen-1', 'priya-sharma-1', 'james-miller-1'];
const heroTestimonials = getTestimonialsByIds(heroTestimonialIds).map((testimonial) => ({
  text: testimonial.text,
  author: testimonial.author,
  role: testimonial.company ? `${testimonial.role} at ${testimonial.company}` : testimonial.role,
  avatar: testimonial.avatar,
  country: testimonial.country,
}));

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

  testimonials: heroTestimonials,

  testimonialIds: heroTestimonialIds,

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

  carouselCards: heroCarouselCards
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
