/**
 * GLOBAL TESTIMONIALS CONFIGURATION
 * ==================================
 * THE SINGLE SOURCE OF TRUTH for all testimonials
 *
 * This file consolidates all testimonial references across the site.
 * Uses a tagging system to control where each testimonial appears.
 *
 * Tags:
 * - 'hero' - Appears in hero section rotating carousel
 * - 'benefits' - Appears on benefits page
 * - 'pricing' - Appears on pricing page
 * - 'career' - Career-focused testimonials
 * - 'learning' - Learning/education testimonials
 * - 'community' - Community-focused testimonials
 */

import { z } from 'zod';

// ============================================
// VALIDATION SCHEMA
// ============================================

export const TestimonialSchema = z.object({
  id: z.string(),
  text: z.string().min(10),
  author: z.string(),
  role: z.string(),
  company: z.string().optional(),
  avatar: z.string().length(2),
  country: z.string().length(2),
  rating: z.number().min(1).max(5).optional(),
  highlight: z.string().optional(),
  videoThumb: z.string().nullable().optional(),
  tags: z.array(z.enum(['hero', 'benefits', 'pricing', 'career', 'learning', 'community'])),
  featured: z.boolean().default(false),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

// ============================================
// GLOBAL TESTIMONIALS (Merged from all sources)
// ============================================

export const testimonials: Testimonial[] = [
  {
    id: 'sarah-kim-1',
    text: 'IAWD changed my career trajectory completely. The mentorship alone is worth 10x.',
    author: 'Sarah Kim',
    role: 'Frontend Developer',
    company: 'Spotify',
    avatar: 'SK',
    country: 'us',
    rating: 5,
    tags: ['hero', 'career', 'learning'],
    featured: true,
  },
  {
    id: 'marcus-chen-1',
    text: 'From self-taught to senior engineer in 18 months. The community support here is unmatched.',
    author: 'Marcus Chen',
    role: 'Senior Engineer',
    company: 'Stripe',
    avatar: 'MC',
    country: 'ca',
    rating: 5,
    tags: ['hero', 'career', 'community'],
    featured: true,
  },
  {
    id: 'priya-sharma-1',
    text: 'I landed my dream job 3 months after joining. The mock interviews were game-changers.',
    author: 'Priya Sharma',
    role: 'Full Stack Developer',
    company: 'Google',
    avatar: 'PS',
    country: 'in',
    rating: 5,
    tags: ['hero', 'career'],
    featured: true,
  },
  {
    id: 'james-miller-1',
    text: 'As a career changer at 40, I felt welcomed from day one. Now I lead a dev team.',
    author: 'James Miller',
    role: 'Tech Lead',
    company: 'Shopify',
    avatar: 'JM',
    country: 'gb',
    rating: 5,
    tags: ['hero', 'career', 'community'],
    featured: true,
  },
  {
    id: 'maria-santos-1',
    text: 'IAWD gave me the community I needed to go from self-taught to professional. The mentorship program changed everything.',
    author: 'Maria Santos',
    role: 'Frontend Developer',
    company: 'Spotify',
    avatar: 'MS',
    country: 'br',
    rating: 5,
    highlight: 'Got hired at Spotify',
    videoThumb: null,
    tags: ['benefits', 'career', 'learning', 'community'],
    featured: true,
  },
  {
    id: 'james-chen-1',
    text: 'The webinars and networking events helped me land my dream job. Worth every penny of the membership.',
    author: 'James Chen',
    role: 'Full Stack Engineer',
    company: 'Google',
    avatar: 'JC',
    country: 'us',
    rating: 5,
    highlight: '30% salary increase',
    videoThumb: null,
    tags: ['benefits', 'career', 'learning'],
    featured: true,
  },
  {
    id: 'aisha-okonkwo-1',
    text: 'Finally, a community that understands developers outside of Silicon Valley. IAWD is truly global.',
    author: 'Aisha Okonkwo',
    role: 'Backend Developer',
    company: 'Flutterwave',
    avatar: 'AO',
    country: 'ng',
    rating: 5,
    highlight: 'Found 3 co-founders',
    videoThumb: null,
    tags: ['benefits', 'community'],
    featured: true,
  },
  {
    id: 'thomas-mueller-1',
    text: 'The certificate programs helped me transition from marketing to development. The structured learning was exactly what I needed.',
    author: 'Thomas Mueller',
    role: 'Junior Developer',
    company: 'SAP',
    avatar: 'TM',
    country: 'de',
    rating: 5,
    highlight: 'Career switch success',
    videoThumb: null,
    tags: ['benefits', 'learning', 'career'],
    featured: true,
  },
];

// ============================================
// VALIDATION
// ============================================

// Validate on load (dev only)
if (import.meta.env.DEV) {
  try {
    testimonials.forEach((testimonial) => {
      TestimonialSchema.parse(testimonial);
    });
    console.log('✅ Global testimonials validated successfully');
  } catch (error) {
    console.error('❌ Global testimonials validation failed:', error);
    throw error;
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get testimonials by tag
 */
export function getTestimonialsByTag(tag: string): Testimonial[] {
  return testimonials.filter(t => t.tags.includes(tag as any));
}

/**
 * Get featured testimonials
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.featured);
}

/**
 * Get random testimonial(s)
 */
export function getRandomTestimonial(tag?: string): Testimonial {
  const pool = tag ? getTestimonialsByTag(tag) : testimonials;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Get testimonials by multiple tags (OR logic)
 */
export function getTestimonialsByTags(tags: string[]): Testimonial[] {
  return testimonials.filter(t =>
    t.tags.some(tag => tags.includes(tag))
  );
}

/**
 * Get testimonial by ID
 */
export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find(t => t.id === id);
}

/**
 * Get testimonials by IDs
 */
export function getTestimonialsByIds(ids: string[]): Testimonial[] {
  return ids
    .map(id => testimonials.find(t => t.id === id))
    .filter((t): t is Testimonial => t !== undefined);
}

/**
 * Get testimonials for hero section (rotating carousel)
 */
export function getHeroTestimonials(): Testimonial[] {
  return getTestimonialsByTag('hero');
}

/**
 * Get testimonials for benefits page
 */
export function getBenefitsTestimonials(): Testimonial[] {
  return getTestimonialsByTag('benefits');
}
