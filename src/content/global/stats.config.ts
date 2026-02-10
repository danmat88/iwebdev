import { z } from 'zod';

export const StatsSchema = z.object({
  members: z.object({
    total: z.number().positive(),
    display: z.string(),
    trend: z.string().optional(),
  }),
  countries: z.object({
    total: z.number().positive(),
    display: z.string(),
  }),
  webinars: z.object({
    yearly: z.number().positive(),
    display: z.string(),
  }),
  mentors: z.number().positive(),
  certifications: z.number().positive(),
  satisfaction: z.number().min(0).max(100),
  courses: z.object({
    total: z.number().positive(),
    display: z.string(),
  }).optional(),
  events: z.object({
    total: z.number().positive(),
    display: z.string(),
  }).optional(),
});

export type Stats = z.infer<typeof StatsSchema>;

export const globalStats: Stats = {
  members: {
    total: 10847,
    display: '10K+',
    trend: '+127 this month',
  },
  countries: {
    total: 80,
    display: '80+',
  },
  webinars: {
    yearly: 50,
    display: '50+',
  },
  mentors: 200,
  certifications: 12,
  satisfaction: 98,
  courses: {
    total: 200,
    display: '200+',
  },
  events: {
    total: 500,
    display: '500+',
  },
};

if (import.meta.env.DEV) {
  try {
    StatsSchema.parse(globalStats);
    console.log('✅ Global stats validated successfully');
  } catch (error) {
    console.error('❌ Global stats validation failed:', error);
    throw error;
  }
}

export function getMemberCount(format: 'exact' | 'display' = 'display'): string | number {
  return format === 'exact' ? globalStats.members.total : globalStats.members.display;
}

export function getCountryCount(format: 'exact' | 'display' = 'display'): string | number {
  return format === 'exact' ? globalStats.countries.total : globalStats.countries.display;
}

export function getAllStats() {
  return {
    members: globalStats.members.display,
    countries: globalStats.countries.display,
    webinars: globalStats.webinars.display,
    mentors: `${globalStats.mentors}+`,
    certifications: globalStats.certifications.toString(),
    satisfaction: `${globalStats.satisfaction}%`,
    courses: globalStats.courses?.display,
    events: globalStats.events?.display,
  };
}
