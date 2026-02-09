/**
 * GLOBAL TEAM CONFIGURATION
 * ==========================
 * THE SINGLE SOURCE OF TRUTH for team member data
 *
 * This file consolidates all team member references across the site.
 * Used for: Contact page, About page, Leadership page, etc.
 */

import { z } from 'zod';

// ============================================
// VALIDATION SCHEMA
// ============================================

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  department: z.string().optional(),
  avatar: z.string().length(2),
  color: z.string().optional(),
  status: z.enum(['online', 'away', 'offline']).optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  social: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }).optional(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

// ============================================
// GLOBAL TEAM MEMBERS
// ============================================

export const teamMembers: TeamMember[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Support Lead',
    department: 'Customer Success',
    avatar: 'SC',
    color: '#22d3ee',
    status: 'online',
    email: 'sarah.chen@iawd.org',
    bio: 'Leading our support team with over 8 years of experience in developer communities.',
  },
  {
    id: 'marcus-webb',
    name: 'Marcus Webb',
    role: 'Tech Support',
    department: 'Technical',
    avatar: 'MW',
    color: '#818cf8',
    status: 'online',
    email: 'marcus.webb@iawd.org',
    bio: 'Full-stack developer helping members troubleshoot technical challenges.',
  },
  {
    id: 'priya-sharma-team',
    name: 'Priya Sharma',
    role: 'Success Manager',
    department: 'Customer Success',
    avatar: 'PS',
    color: '#f472b6',
    status: 'away',
    email: 'priya.sharma@iawd.org',
    bio: 'Ensuring every member gets the most value from their IAWD membership.',
  },
  {
    id: 'james-liu',
    name: 'James Liu',
    role: 'Partnerships',
    department: 'Business Development',
    avatar: 'JL',
    color: '#34d399',
    status: 'online',
    email: 'james.liu@iawd.org',
    bio: 'Building partnerships with companies and educational platforms globally.',
  },
];

// ============================================
// VALIDATION
// ============================================

// Validate on load (dev only)
if (import.meta.env.DEV) {
  try {
    teamMembers.forEach((member) => {
      TeamMemberSchema.parse(member);
    });
    console.log('✅ Global team members validated successfully');
  } catch (error) {
    console.error('❌ Global team members validation failed:', error);
    throw error;
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get team member by ID
 */
export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(m => m.id === id);
}

/**
 * Get team members by department
 */
export function getTeamMembersByDepartment(department: string): TeamMember[] {
  return teamMembers.filter(m => m.department === department);
}

/**
 * Get online team members
 */
export function getOnlineTeamMembers(): TeamMember[] {
  return teamMembers.filter(m => m.status === 'online');
}

/**
 * Get team member count by status
 */
export function getTeamMemberCountByStatus(status: 'online' | 'away' | 'offline'): number {
  return teamMembers.filter(m => m.status === status).length;
}

/**
 * Format team members for contact section
 */
export function getContactTeam() {
  return teamMembers.map(m => ({
    name: m.name,
    role: m.role,
    avatar: m.avatar,
    color: m.color,
    status: m.status,
  }));
}
