/**
 * FAQ CONFIGURATION
 * =================
 * All FAQ data in one place - easy to maintain!
 * 
 * FEATURES:
 * ✨ Live search with highlighting
 * 🏷️ Category filtering
 * 🔗 Shareable question links (anchor URLs)
 * 👍 "Was this helpful?" feedback
 * 📱 Mobile-optimized
 * ⌨️ Keyboard navigation
 * ♿ Fully accessible
 */

import type { FAQConfig } from './faq.types';
import { pricingConfig } from '../membership/pricing.config';
import { benefitsConfig } from '../membership/benefits.config';

const professionalTier = pricingConfig.tiers.find((tier) => tier.id === 'professional');
const professionalAnnualPrice =
  professionalTier?.pricing?.annual?.price ?? pricingConfig.valueCalculator.yourInvestment;
const professionalMonthlyPrice = professionalTier?.pricing?.monthly?.price ?? null;
const professionalOriginalPrice =
  professionalTier?.pricing?.annual?.originalPrice ?? professionalAnnualPrice;
const professionalDiscount =
  professionalOriginalPrice > professionalAnnualPrice
    ? Math.round(((professionalOriginalPrice - professionalAnnualPrice) / professionalOriginalPrice) * 100)
    : 0;

const mentorshipCoverage =
  benefitsConfig.roiCalculator.items.find((item) => item.id === 'mentorship')?.desc ??
  '1-on-1 mentorship support';
const learningDiscountValue =
  benefitsConfig.benefits.find((benefit) => benefit.id === 'discounts')?.stat ??
  'partner discounts';

export const faqConfig: FAQConfig = {
  // ============================================
  // HEADER
  // ============================================
  title: "Frequently Asked Questions",
  subtitle: "Find answers to common questions about our platform, features, and pricing",
  searchPlaceholder: "Search for answers...",

  // ============================================
  // CATEGORIES
  // ============================================
  categories: [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: "lucide:rocket",
      description: "New here? Start with these basics"
    },
    {
      id: "account",
      name: "Account & Billing",
      icon: "lucide:user",
      description: "Manage your account and payments"
    },
    {
      id: "features",
      name: "Features",
      icon: "lucide:sparkles",
      description: "Learn about our platform features"
    },
    {
      id: "technical",
      name: "Technical",
      icon: "lucide:code",
      description: "Technical questions and troubleshooting"
    }
  ],

  // ============================================
  // FAQ ITEMS
  // ============================================
  faqs: [
    // GETTING STARTED
    {
      id: "what-is-platform",
      question: "What is iWebDev?",
      answer: "iWebDev is a comprehensive web development learning platform that helps you master modern web technologies through interactive courses, live workshops, and hands-on projects. We offer everything from beginner HTML/CSS to advanced React, Node.js, and full-stack development.",
      category: "getting-started",
      tags: ["platform", "overview", "basics"],
      popular: true
    },
    {
      id: "how-to-start",
      question: "How do I get started?",
      answer: `Getting started is easy! Simply sign up for a free account, browse our course catalog, and start learning. Community members get access to forums and introductory content. Upgrade to Professional for full access to live workshops, certifications, and mentorship ($${professionalAnnualPrice}/year${professionalMonthlyPrice ? ` or $${professionalMonthlyPrice}/month` : ''}).`,
      category: "getting-started",
      tags: ["signup", "beginner", "start"],
      popular: true,
      related: ["free-vs-paid", "what-included"]
    },
    {
      id: "free-trial",
      question: "Is there a free trial?",
      answer: professionalDiscount > 0
        ? `You can start with our Community tier for free forever. For full access, Professional is currently ${professionalDiscount}% off at $${professionalAnnualPrice}/year (normally $${professionalOriginalPrice}), and you can cancel anytime.`
        : `You can start with our Community tier for free forever. For full access, upgrade to Professional at $${professionalAnnualPrice}/year and cancel anytime.`,
      category: "getting-started",
      tags: ["trial", "free", "testing"],
      popular: true,
      related: ["cancel-anytime", "refund-policy"]
    },

    // ACCOUNT & BILLING
    {
      id: "free-vs-paid",
      question: "What's the difference between Free and Professional?",
      answer: "Free members get access to community forums, monthly newsletters, and recorded webinars. Professional members get everything in Free PLUS: all live workshops, certificate programs, 1-on-1 mentorship, priority event registration, platform discounts, exclusive networking, and member directory access.",
      category: "account",
      tags: ["comparison", "pricing", "features"],
      popular: true,
      related: ["what-included", "upgrade"]
    },
    {
      id: "upgrade",
      question: "How do I upgrade my account?",
      answer: `Click on your profile icon in the top right, select 'Upgrade to Professional', choose annual ($${professionalAnnualPrice})${professionalMonthlyPrice ? ` or monthly ($${professionalMonthlyPrice})` : ''}, and complete checkout. You'll get instant access to all premium features.`,
      category: "account",
      tags: ["upgrade", "premium", "payment"],
      related: ["payment-methods", "invoices"]
    },
    {
      id: "cancel-anytime",
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. If you cancel, you'll continue to have access until the end of your current billing period.",
      category: "account",
      tags: ["cancel", "subscription", "billing"],
      popular: true,
      related: ["refund-policy", "downgrade"]
    },
    {
      id: "refund-policy",
      question: "What's your refund policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied within the first 30 days, contact support for a full refund. No questions asked. After 30 days, we prorate refunds based on unused time remaining in your subscription.",
      category: "account",
      tags: ["refund", "money-back", "guarantee"],
      related: ["cancel-anytime", "support"]
    },
    {
      id: "payment-methods",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. For Enterprise customers, we also offer invoice billing and purchase orders. All payments are processed securely through Stripe.",
      category: "account",
      tags: ["payment", "billing", "credit card"],
      related: ["invoices", "upgrade"]
    },
    {
      id: "invoices",
      question: "Can I get invoices for my payments?",
      answer: "Yes! Invoices are automatically generated for each payment and sent to your email. You can also download invoices anytime from your account settings under 'Billing History'. Enterprise customers can request customized invoices.",
      category: "account",
      tags: ["invoice", "receipt", "billing"],
      related: ["payment-methods", "enterprise"]
    },

    // FEATURES
    {
      id: "what-included",
      question: "What's included in Professional membership?",
      answer: `Professional membership includes: all Community features plus live webinars and workshops, certificate programs, 1-on-1 mentorship (${mentorshipCoverage}), priority event registration, ${learningDiscountValue} on partner platforms, exclusive networking, member directory access, and offline downloads.`,
      category: "features",
      tags: ["professional", "features", "included"],
      popular: true,
      related: ["certificates", "mentorship", "workshops"]
    },
    {
      id: "certificates",
      question: "Do you offer certificates?",
      answer: "Yes! Professional members can earn certificates for completing courses and programs. Our certificates are recognized by industry partners and can be shared on LinkedIn. Each certificate includes verification links and shows your achievement date and skills mastered.",
      category: "features",
      tags: ["certificate", "credentials", "diploma"],
      related: ["what-included", "professional-value"]
    },
    {
      id: "offline-access",
      question: "Can I download courses for offline viewing?",
      answer: "Professional members can download course videos for offline viewing through our mobile apps (iOS and Android). Downloads expire after 30 days for licensing reasons, but you can re-download anytime. Quizzes and interactive content require an internet connection.",
      category: "features",
      tags: ["offline", "download", "mobile"],
      related: ["mobile-app", "what-included"]
    },
    {
      id: "mobile-app",
      question: "Is there a mobile app?",
      answer: "Yes! Our mobile apps for iOS and Android let you learn on the go. Features include: offline video downloads, progress syncing, push notifications for new content, and access to community forums. Your progress syncs automatically across all devices.",
      category: "features",
      tags: ["mobile", "app", "ios", "android"],
      related: ["offline-access", "devices"]
    },
    {
      id: "mentorship",
      question: "How does 1-on-1 mentorship work?",
      answer: `Professional members get mentorship access as part of the plan (${mentorshipCoverage}). Book sessions through your dashboard with mentors who match your goals. Sessions can cover career advice, code reviews, project guidance, or interview prep, and are scheduled by availability.`,
      category: "features",
      tags: ["mentor", "1-on-1", "coaching"],
      related: ["what-included", "professional-value"]
    },

    // TECHNICAL
    {
      id: "devices",
      question: "How many devices can I use?",
      answer: "You can use your account on unlimited devices, but you can only stream on 2 devices simultaneously. Device limits prevent account sharing. If you need more simultaneous streams, consider our Enterprise plan for teams.",
      category: "technical",
      tags: ["devices", "limit", "streaming"],
      related: ["mobile-app", "enterprise"]
    },
    {
      id: "video-quality",
      question: "What video quality do you offer?",
      answer: "All courses are available in HD (1080p). Video quality auto-adjusts based on your internet connection. You can manually select quality in the video player settings. Professional members can download videos in full HD for offline viewing.",
      category: "technical",
      tags: ["video", "quality", "HD", "streaming"],
      related: ["offline-access", "bandwidth"]
    },
    {
      id: "system-requirements",
      question: "What are the system requirements?",
      answer: "Any modern browser (Chrome, Firefox, Safari, Edge) from the last 2 years works great. For best experience: 5+ Mbps internet connection, 4GB+ RAM, and updated browser. Mobile apps require iOS 13+ or Android 8+. JavaScript must be enabled.",
      category: "technical",
      tags: ["requirements", "browser", "compatibility"],
      related: ["video-quality", "mobile-app"]
    },
    {
      id: "troubleshooting",
      question: "Video won't play - what do I do?",
      answer: "Try these steps: 1) Refresh the page, 2) Clear browser cache and cookies, 3) Try a different browser, 4) Disable browser extensions, 5) Check your internet connection. Still having issues? Contact our support team with details about your browser, operating system, and error messages.",
      category: "technical",
      tags: ["troubleshooting", "video", "error", "bug"],
      related: ["support", "system-requirements"]
    },
    {
      id: "support",
      question: "How do I contact support?",
      answer: "Email us at support@iwebdev.com for general inquiries (24-hour response). Professional members get priority support with 4-hour response times on weekdays. You can also use live chat (available 9am-5pm EST) or submit a ticket through your dashboard.",
      category: "technical",
      tags: ["support", "help", "contact"],
      related: ["troubleshooting", "refund-policy"]
    }
  ],

  // ============================================
  // CONTACT CTA
  // ============================================
  contactCTA: {
    show: true,
    title: "Still have questions?",
    description: "Can't find the answer you're looking for? Our support team is here to help.",
    primaryButton: {
      text: "Contact Support",
      url: "/support/contact"
    },
    secondaryButton: {
      text: "Join Community",
      url: "/membership/community"
    }
  },

  // ============================================
  // FEEDBACK SYSTEM
  // ============================================
  feedback: {
    enabled: true,
    positiveText: "Yes, this was helpful",
    negativeText: "No, I need more help",
    thankYouText: "Thanks for your feedback!"
  },

  // ============================================
  // EMPTY STATE
  // ============================================
  emptyState: {
    title: "No results found",
    description: "Try adjusting your search or browse by category"
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get FAQ by ID
 */
export function getFAQById(id: string) {
  return faqConfig.faqs.find(faq => faq.id === id);
}

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(categoryId: string) {
  return faqConfig.faqs.filter(faq => faq.category === categoryId);
}

/**
 * Get popular FAQs
 */
export function getPopularFAQs() {
  return faqConfig.faqs.filter(faq => faq.popular);
}

/**
 * Get related FAQs
 */
export function getRelatedFAQs(faqId: string) {
  const faq = getFAQById(faqId);
  if (!faq?.related) return [];
  
  return faq.related
    .map(id => getFAQById(id))
    .filter(Boolean);
}

/**
 * Search FAQs
 */
export function searchFAQs(query: string) {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return faqConfig.faqs;
  
  return faqConfig.faqs.filter(faq => {
    const questionMatch = faq.question.toLowerCase().includes(searchTerm);
    const answerMatch = faq.answer.toLowerCase().includes(searchTerm);
    const tagMatch = faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
    
    return questionMatch || answerMatch || tagMatch;
  });
}
