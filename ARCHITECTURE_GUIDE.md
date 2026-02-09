# 🏗️ Component Architecture - Think Like an Architect

## Your Question (The Smart One!)

> "The homepage has header, sections (hero, pricing, faq, contact) but these are different from the pages... The pages will have their own components and sections, right?"

**YES! Exactly!** This is the key insight. Let me explain the mental model.

---

## 🧠 The Mental Model

### Three Types of Components

```
1. SHARED/GLOBAL
   Used everywhere, never changes
   Example: Header, Footer, Button
   
2. REUSABLE/FLEXIBLE  
   Used in multiple places but with different data
   Example: Hero (homepage hero vs page hero), Card components
   
3. PAGE-SPECIFIC
   Only used in ONE place
   Example: Homepage pricing grid, About page timeline
```

---

## 📊 Let's Map YOUR Actual Site

### Your Homepage
```
Homepage
├── Header (SHARED - same everywhere)
├── Hero (HOMEPAGE SPECIFIC - big, fancy, unique)
├── Features Section (HOMEPAGE SPECIFIC)
├── Pricing Section (HOMEPAGE SPECIFIC - shows all plans)
├── Testimonials (REUSABLE - but homepage version)
├── FAQ (HOMEPAGE SPECIFIC - selected questions)
├── Contact CTA (HOMEPAGE SPECIFIC - unique design)
└── Footer (SHARED - same everywhere)
```

### Your Pricing Page
```
Pricing Page
├── Header (SHARED - same as homepage)
├── Hero (PAGE SPECIFIC - different from homepage)
│   └── Simple title + description
├── Pricing Section (PAGE SPECIFIC - detailed comparison)
│   └── More detailed than homepage version
├── FAQ (PAGE SPECIFIC - all pricing questions)
└── Footer (SHARED - same as homepage)
```

### Your About Page
```
About Page
├── Header (SHARED)
├── Hero (PAGE SPECIFIC - about focus)
├── Mission Section (PAGE SPECIFIC - only on about)
├── Team Section (PAGE SPECIFIC - only on about)
├── Timeline (PAGE SPECIFIC - only on about)
└── Footer (SHARED)
```

---

## 🤔 The Key Insight

**Homepage sections are OFTEN different from page sections!**

### Homepage Hero vs Page Hero

**Homepage Hero (components/home/Hero.astro):**
```astro
<!-- Big, animated, multiple elements -->
<section class="hero-home">
  <div class="hero-content">
    <h1 class="huge-title">Welcome to IAWD</h1>
    <p class="big-subtitle">Join 12,000+ developers</p>
    <div class="cta-buttons">
      <button>Get Started</button>
      <button>Watch Video</button>
    </div>
    <div class="stats-bar">
      <div>12K Members</div>
      <div>120 Countries</div>
    </div>
  </div>
  <div class="hero-image">
    <img src="fancy-graphic.svg" />
  </div>
</section>
```

**Page Hero (components/common/PageHero.astro):**
```astro
<!-- Simple, reusable, takes props -->
<section class="page-hero">
  <div class="container">
    <span class="label">{label}</span>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
</section>
```

**See the difference?**
- Homepage Hero: Complex, unique, hardcoded
- Page Hero: Simple, reusable, flexible

---

## 🗂️ The Right Structure

```
src/
├── components/
│   ├── layout/              # SHARED - Used everywhere
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Navigation.astro
│   │
│   ├── common/              # REUSABLE - Flexible, used on multiple pages
│   │   ├── PageHero.astro         # Simple hero for regular pages
│   │   ├── SectionHeader.astro    # Section titles
│   │   ├── Button.astro           # Reusable button
│   │   └── Card.astro             # Generic card
│   │
│   ├── cards/               # REUSABLE - Specific card types
│   │   ├── BlogCard.astro
│   │   ├── TeamCard.astro
│   │   ├── TestimonialCard.astro
│   │   └── PricingCard.astro
│   │
│   ├── home/                # HOMEPAGE SPECIFIC
│   │   ├── HomeHero.astro         # Fancy homepage hero
│   │   ├── HomeFeatures.astro     # Homepage features grid
│   │   ├── HomePricing.astro      # Homepage pricing preview
│   │   ├── HomeTestimonials.astro # Homepage testimonials carousel
│   │   └── HomeFAQ.astro          # Homepage FAQ preview
│   │
│   ├── pricing/             # PRICING PAGE SPECIFIC
│   │   ├── PricingHero.astro
│   │   ├── PricingComparison.astro  # Detailed comparison table
│   │   ├── PricingFAQ.astro         # All pricing FAQs
│   │   └── PricingCalculator.astro   # Price calculator
│   │
│   ├── about/               # ABOUT PAGE SPECIFIC
│   │   ├── AboutHero.astro
│   │   ├── MissionSection.astro
│   │   ├── TeamGrid.astro
│   │   ├── Timeline.astro
│   │   └── Values.astro
│   │
│   └── blog/                # BLOG SPECIFIC
│       ├── BlogHero.astro
│       ├── BlogGrid.astro
│       ├── BlogSidebar.astro
│       └── RelatedPosts.astro
│
├── layouts/
│   ├── Layout.astro         # Base layout (wraps everything)
│   ├── HomeLayout.astro     # Homepage specific layout
│   └── PageLayout.astro     # Regular page layout
│
├── pages/
│   ├── index.astro          # Homepage (uses home/ components)
│   ├── pricing.astro        # Pricing (uses pricing/ components)
│   ├── about.astro          # About (uses about/ components)
│   └── blog/
│       └── [slug].astro     # Blog posts (uses blog/ components)
│
└── data/
    ├── team.ts              # Team data (used by about page)
    ├── pricing.ts           # Pricing plans (used by home + pricing)
    ├── testimonials.ts      # Testimonials (used by home + other pages)
    └── blog.ts              # Blog posts data
```

---

## 🎯 Decision Framework

### Question 1: Is it used on EVERY page?
**YES** → `components/layout/`
- Header
- Footer
- Navigation

**NO** → Continue to Question 2

### Question 2: Is it used on MULTIPLE pages with DIFFERENT data?
**YES** → `components/common/` or `components/cards/`
- PageHero (same structure, different content)
- Button (same look, different text)
- Card components (same structure, different data)

**NO** → Continue to Question 3

### Question 3: Is it SPECIFIC to ONE page or section?
**YES** → `components/{page-name}/`
- HomeHero → `components/home/`
- PricingComparison → `components/pricing/`
- TeamGrid → `components/about/`

---

## 📝 Real Examples from Your Site

### Example 1: Hero Components

**Shared PageHero (components/common/PageHero.astro):**
```astro
---
interface Props {
  label: string;
  title: string;
  description: string;
}
const { label, title, description } = Astro.props;
---

<section class="page-hero">
  <span class="label">{label}</span>
  <h1>{title}</h1>
  <p>{description}</p>
</section>
```

**Used on multiple pages:**
```astro
<!-- pages/about.astro -->
<PageHero 
  label="About Us"
  title="Our Story"
  description="Learn about IAWD..."
/>

<!-- pages/contact.astro -->
<PageHero 
  label="Contact"
  title="Get in Touch"
  description="We'd love to hear from you..."
/>
```

**But Homepage has its own (components/home/HomeHero.astro):**
```astro
<!-- No props, unique design -->
<section class="home-hero">
  <div class="hero-content">
    <h1 class="massive-title">
      Join the Largest<br/>
      <span class="gradient">Web Developer</span><br/>
      Community
    </h1>
    <p class="hero-stats">
      <span>12,000+ Members</span>
      <span>120 Countries</span>
      <span>500+ Webinars</span>
    </p>
    <div class="hero-cta">
      <button class="btn-primary">Start Learning</button>
      <button class="btn-secondary">Watch Demo</button>
    </div>
  </div>
  <div class="hero-visual">
    <!-- Complex animation/graphic -->
  </div>
</section>
```

### Example 2: Pricing Components

**Homepage Pricing Preview (components/home/HomePricing.astro):**
```astro
---
import { pricingPlans } from '../../data/pricing';
---

<section class="home-pricing">
  <h2>Simple Pricing</h2>
  <div class="pricing-cards">
    {pricingPlans.slice(0, 2).map(plan => (
      <div class="pricing-card-simple">
        <h3>{plan.name}</h3>
        <div class="price">${plan.price}</div>
        <ul>
          {plan.features.slice(0, 3).map(f => <li>{f}</li>)}
        </ul>
        <a href="/pricing">Learn More</a>
      </div>
    ))}
  </div>
</section>
```

**Pricing Page Full Comparison (components/pricing/PricingComparison.astro):**
```astro
---
import { pricingPlans } from '../../data/pricing';
---

<section class="pricing-comparison">
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Feature</th>
        {pricingPlans.map(plan => <th>{plan.name}</th>)}
      </tr>
    </thead>
    <tbody>
      {allFeatures.map(feature => (
        <tr>
          <td>{feature.name}</td>
          {pricingPlans.map(plan => (
            <td>{plan.features.includes(feature) ? '✓' : '–'}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</section>
```

**See?** Same data, different components!

### Example 3: FAQ Components

**Homepage FAQ Preview (components/home/HomeFAQ.astro):**
```astro
---
import { faqItems } from '../../data/faq';
const topFAQs = faqItems.slice(0, 4); // Only show 4
---

<section class="home-faq">
  <h2>Quick Questions</h2>
  <div class="faq-grid">
    {topFAQs.map(faq => (
      <div class="faq-item">
        <h3>{faq.question}</h3>
        <p>{faq.answer.substring(0, 100)}...</p>
      </div>
    ))}
  </div>
  <a href="/faq">View All FAQs</a>
</section>
```

**FAQ Page Full List (components/faq/FAQList.astro):**
```astro
---
import { faqItems, categories } from '../../data/faq';
---

<section class="faq-page">
  <div class="faq-sidebar">
    {categories.map(cat => (
      <a href={`#${cat}`}>{cat}</a>
    ))}
  </div>
  <div class="faq-content">
    {categories.map(category => (
      <div id={category}>
        <h2>{category}</h2>
        {faqItems
          .filter(faq => faq.category === category)
          .map(faq => (
            <details>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
      </div>
    ))}
  </div>
</section>
```

---

## 🎨 When to Share vs When to Separate

### ✅ Share It (Reusable Component)

**When:**
- Structure is the same
- Just data changes
- Used on 3+ pages
- Simple, focused component

**Example:**
```astro
<!-- components/cards/TestimonialCard.astro -->
<!-- Used on: homepage, about, pricing -->
<div class="testimonial-card">
  <p>{text}</p>
  <span>{author}</span>
</div>
```

### ❌ Separate It (Page-Specific)

**When:**
- Unique design for that page
- Complex, lots of custom elements
- Not reusable elsewhere
- Tightly coupled to page logic

**Example:**
```astro
<!-- components/home/HomeHero.astro -->
<!-- Only used on homepage, very specific -->
<section class="home-hero">
  <!-- Complex, unique layout -->
</section>
```

---

## 🔄 Composition Pattern

**The Pro Way:** Build page-specific sections FROM reusable components

### Example: About Team Section

**DON'T** make TeamSection page-specific:
```astro
<!-- ❌ components/about/TeamSection.astro -->
<section>
  <h2>Our Team</h2>
  {team.map(member => (
    <div class="member">
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </div>
  ))}
</section>
```

**DO** compose from reusable parts:
```astro
<!-- ✅ components/about/TeamSection.astro -->
---
import SectionHeader from '../common/SectionHeader.astro';
import PersonCard from '../cards/PersonCard.astro';
import { team } from '../../data/team';
---

<section>
  <SectionHeader 
    title="Our Team"
    description="Meet the people..."
  />
  <div class="team-grid">
    {team.map(member => <PersonCard {...member} />)}
  </div>
</section>
```

**Why?** Now PersonCard is reusable anywhere!

---

## 📋 Your Checklist for Each Component

Ask yourself:

1. **Where is it used?**
   - Everywhere → `layout/`
   - Multiple pages, flexible → `common/` or `cards/`
   - One page only → `{page-name}/`

2. **Can I make it more flexible?**
   - Accept props instead of hardcoding
   - Use data from data files
   - Make layout adaptable

3. **Can I break it into smaller pieces?**
   - Extract reusable cards
   - Separate layout from content
   - Compose from primitives

4. **Does this already exist?**
   - Check `common/` first
   - Can I extend existing component?
   - Or do I need a new one?

---

## 🏗️ Building Your Homepage

Here's how I'd structure YOUR homepage:

```astro
---
// pages/index.astro
import Layout from '../layouts/Layout.astro';

// Shared
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';

// Homepage specific
import HomeHero from '../components/home/HomeHero.astro';
import HomeFeatures from '../components/home/HomeFeatures.astro';
import HomePricing from '../components/home/HomePricing.astro';
import HomeTestimonials from '../components/home/HomeTestimonials.astro';
import HomeFAQ from '../components/home/HomeFAQ.astro';
import HomeCTA from '../components/home/HomeCTA.astro';
---

<Layout title="IAWD - Web Developer Community">
  <HomeHero />
  <HomeFeatures />
  <HomePricing />
  <HomeTestimonials />
  <HomeFAQ />
  <HomeCTA />
</Layout>
```

```
components/home/
├── HomeHero.astro          # Unique homepage hero
├── HomeFeatures.astro      # Uses FeatureCard from cards/
├── HomePricing.astro       # Uses PricingCard from cards/
├── HomeTestimonials.astro  # Uses TestimonialCard from cards/
├── HomeFAQ.astro           # Uses data/faq.ts
└── HomeCTA.astro           # Simple, could be reusable later
```

---

## 🏗️ Building Your About Page

```astro
---
// pages/about.astro
import Layout from '../layouts/Layout.astro';
import PageHero from '../components/common/PageHero.astro';

// About specific
import MissionSection from '../components/about/MissionSection.astro';
import TeamSection from '../components/about/TeamSection.astro';
import Timeline from '../components/about/Timeline.astro';
import Values from '../components/about/Values.astro';
---

<Layout title="About IAWD">
  <PageHero 
    label="About Us"
    title="Our Story"
    description="Learn about IAWD..."
  />
  <MissionSection />
  <TeamSection />
  <Timeline />
  <Values />
</Layout>
```

```
components/about/
├── MissionSection.astro    # About-specific
├── TeamSection.astro       # Uses PersonCard from cards/
├── Timeline.astro          # About-specific
└── Values.astro            # About-specific
```

---

## 💡 Pro Tips

### Tip 1: Start Page-Specific, Extract Later

```
1. Build component for homepage
2. Use it for a while
3. Need same thing on another page?
4. THEN make it reusable and move to common/
```

**Don't** prematurely optimize!

### Tip 2: Data Should Always Be Shared

Even if components are page-specific, data should be in `data/`:

```astro
<!-- ❌ DON'T -->
<section>
  <h2>Our Team</h2>
  <div>Sarah Chen - CEO</div>
  <div>John Doe - CTO</div>
</section>

<!-- ✅ DO -->
<section>
  <h2>Our Team</h2>
  {team.map(member => <div>{member.name} - {member.role}</div>)}
</section>
```

### Tip 3: Name Components by Location or Purpose

**Good names:**
- `HomeHero.astro` - Used on homepage
- `PricingComparison.astro` - Shows pricing comparison
- `BlogSidebar.astro` - Sidebar for blog

**Bad names:**
- `Hero2.astro` - What's hero 1?
- `Section.astro` - Which section?
- `Component.astro` - ??

### Tip 4: Use Layouts for Page Types

```astro
<!-- layouts/HomeLayout.astro -->
<!-- Special layout just for homepage -->

<!-- layouts/PageLayout.astro -->
<!-- Layout for regular pages -->

<!-- layouts/BlogLayout.astro -->
<!-- Layout for blog posts -->
```

---

## 🎯 Summary

### The Three Rules

1. **Shared Everywhere?** → `components/layout/`
2. **Reusable with Different Data?** → `components/common/` or `components/cards/`
3. **Page-Specific?** → `components/{page-name}/`

### The Mental Model

```
Homepage = Unique sections using reusable components
About Page = Unique sections using reusable components
Pricing Page = Unique sections using reusable components

Reusable Components = Cards, buttons, heroes, etc.
Data = Always shared in data/ files
```

### Your Structure

```
components/
├── layout/         # Header, Footer (everywhere)
├── common/         # PageHero, Button (flexible, multiple pages)
├── cards/          # PersonCard, PricingCard (specific cards)
├── home/           # HomeHero, HomePricing (homepage only)
├── about/          # TeamSection, Timeline (about only)
├── pricing/        # PricingComparison (pricing only)
└── blog/           # BlogSidebar, RelatedPosts (blog only)
```

---

Does this make sense now? You have **page-specific sections** that **use reusable components** with **shared data**. That's the pro way! 🚀
