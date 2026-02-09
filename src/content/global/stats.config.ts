/**
 * GLOBAL STATISTICS CONFIGURATION
 * ================================
 * THE SINGLE SOURCE OF TRUTH for all site statistics
 *
 * This file consolidates all stat references across the site to prevent inconsistencies.
 * All components should import from this file rather than hardcoding stats.
 *
 * Canonical Values (as of 2026):
 * - Members: 10,847 (display as "10K+")
 * - Countries: 80 (display as "80+")
 * - Webinars: 50/year
 * - Mentors: 200+
 * - Certifications: 12 tracks
 * - Satisfaction: 98%
 */

import { z } from 'zod';

// ============================================
// VALIDATION SCHEMA
// ============================================

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

// ============================================
// CANONICAL STATISTICS
// ============================================

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

// ============================================
// VALIDATION
// ============================================

// Validate on load (dev only)
if (import.meta.env.DEV) {
  try {
    StatsSchema.parse(globalStats);
    console.log('✅ Global stats validated successfully');
  } catch (error) {
    console.error('❌ Global stats validation failed:', error);
    throw error;
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get member count for display
 */
export function getMemberCount(format: 'exact' | 'display' = 'display'): string | number {
  return format === 'exact' ? globalStats.members.total : globalStats.members.display;
}

/**
 * Get country count for display
 */
export function getCountryCount(format: 'exact' | 'display' = 'display'): string | number {
  return format === 'exact' ? globalStats.countries.total : globalStats.countries.display;
}

/**
 * Get all stats in a formatted object
 */
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
