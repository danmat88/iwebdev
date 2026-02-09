/**
 * PRICING CONFIGURATION
 * =====================
 * This file contains all pricing data for easy maintenance.
 * Non-technical staff can edit this file to update pricing, features, and content.
 * 
 * ICONS:
 * We use Lucide icons via astro-icon. Browse all icons at: https://lucide.dev/icons
 * Format: "lucide:icon-name" (e.g., "lucide:star", "lucide:heart", "lucide:zap")
 * 
 * HOW TO UPDATE:
 * 1. Find the section you want to change
 * 2. Edit the text, numbers, or features
 * 3. Save the file
 * 4. Rebuild the site
 * 
 * IMPORTANT: Keep the structure intact (don't remove commas, brackets, or quotes)
 */

export const pricingConfig = {
  // ============================================
  // HEADER SECTION
  // ============================================
  header: {
    launchBadge: {
      show: true,
      icon: "⚡",
      text: "Launch Special",
      discount: "50% OFF"
    },
    title: {
      line1: "Choose your",
      line2: "growth path" // This gets gradient styling
    },
    subtitle: "Flexible pricing that scales with your ambition"
  },

  // ============================================
  // BILLING TOGGLE
  // ============================================
  billingToggle: {
    annual: {
      label: "Annual",
      saveText: "Save 50%"
    },
    monthly: {
      label: "Monthly"
    }
  },

  // ============================================
  // PRICING TIERS
  // ============================================
  tiers: [
    // ------------------------------------------
    // TIER 1: COMMUNITY (FREE)
    // ------------------------------------------
    {
      id: "community",
      name: "Community",
      tagline: "Start learning with the community",
      icon: "lucide:users", // Any Lucide icon: lucide:heart, lucide:star, etc.
      featured: false,
      
      pricing: {
        type: "free", // Options: free, paid, custom
        amount: "Free",
        period: "forever",
        annual: null,
        monthly: null
      },

      features: [
        { text: "Community forums access", included: true },
        { text: "Monthly newsletter", included: true },
        { text: "Recorded webinars", included: true },
        { text: "Basic job board", included: true },
        { text: "Live workshops", included: false },
        { text: "Certifications", included: false },
        { text: "Mentorship", included: false }
      ],

      cta: {
        text: "Join Free",
        url: "/membership/join?tier=community",
        style: "outline" // Options: outline, primary, secondary
      }
    },

    // ------------------------------------------
    // TIER 2: PROFESSIONAL (FEATURED)
    // ------------------------------------------
    {
      id: "professional",
      name: "Professional",
      tagline: "Full access to accelerate growth",
      icon: "lucide:star",
      featured: true,
      featuredLabel: "Most Popular",
      
      pricing: {
        type: "paid",
        annual: {
          price: 99,
          originalPrice: 199, // Show strikethrough price
          savings: "Save $100/year"
        },
        monthly: {
          price: 18,
          originalPrice: null
        },
        currency: "$",
        period: {
          annual: "/year",
          monthly: "/month"
        }
      },

      features: [
        { text: "All Community features", included: true, bold: true },
        { text: "Live webinars & workshops", included: true },
        { text: "Certificate programs", included: true },
        { text: "1-on-1 mentorship", included: true },
        { text: "Priority event registration", included: true },
        { text: "Platform discounts", included: true },
        { text: "Exclusive networking", included: true },
        { text: "Member directory", included: true }
      ],

      cta: {
        text: "Start Professional",
        url: "/membership/join?tier=professional",
        style: "primary"
      }
    },

    // ------------------------------------------
    // TIER 3: ENTERPRISE
    // ------------------------------------------
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Solutions for teams & organizations",
      icon: "lucide:building",
      featured: false,
      
      pricing: {
        type: "custom",
        amount: "Custom",
        period: "pricing"
      },

      features: [
        { text: "All Professional features", included: true, bold: true },
        { text: "Team management", included: true },
        { text: "Custom training programs", included: true },
        { text: "Account manager", included: true },
        { text: "Volume discounts", included: true },
        { text: "Custom integrations", included: true },
        { text: "SLA guarantees", included: true }
      ],

      cta: {
        text: "Contact Sales",
        url: "/support/contact?inquiry=enterprise",
        style: "outline"
      }
    }
  ],

  // ============================================
  // VALUE CALCULATOR (for Professional tier)
  // ============================================
  valueCalculator: {
    show: true,
    title: "Your Professional Membership Value",
    badge: "Calculated annually",
    items: [
      {
        label: "Live webinars (4/month × $49)",
        value: 2352
      },
      {
        label: "Certificate program",
        value: 899
      },
      {
        label: "Platform discounts (avg savings)",
        value: 320
      },
      {
        label: "1-on-1 mentorship sessions",
        value: 600
      }
    ],
    // Calculated automatically from items above
    yourInvestment: 99, // Should match Professional annual price
    footnote: "Calculated based on market rates"
  },

  // ============================================
  // TRUST INDICATORS (Footer badges)
  // ============================================
  trustIndicators: [
    {
      icon: "lucide:shield",
      text: "30-day money-back guarantee"
    },
    {
      icon: "lucide:lock",
      text: "Secure payment"
    },
    {
      icon: "lucide:x-circle",
      text: "Cancel anytime"
    }
  ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate total value from calculator items
 */
export function calculateTotalValue() {
  return pricingConfig.valueCalculator.items.reduce((sum, item) => sum + item.value, 0);
}

/**
 * Calculate ROI percentage
 */
export function calculateROI() {
  const totalValue = calculateTotalValue();
  const investment = pricingConfig.valueCalculator.yourInvestment;
  return Math.round(((totalValue - investment) / investment) * 100);
}

/**
 * Get tier by ID
 */
export function getTierById(id: string) {
  return pricingConfig.tiers.find(tier => tier.id === id);
}
