# 🌳 Component Decision Tree - With Real Examples

## The Decision Process

Use this flowchart for EVERY component you need to organize.

```
                    START
                      |
                      ▼
         ┌─────────────────────────┐
         │ Is this component used  │
         │ on EVERY page?          │
         └─────────────────────────┘
                /            \
              YES             NO
               |               |
               ▼               ▼
         ┌─────────┐    ┌──────────────────────┐
         │ layout/ │    │ Is it used on        │
         └─────────┘    │ MULTIPLE pages with  │
                        │ DIFFERENT data/props?│
                        └──────────────────────┘
                             /            \
                           YES             NO
                            |               |
                            ▼               ▼
                    ┌──────────────┐  ┌─────────────────┐
                    │ Is it a card │  │ Is it specific  │
                    │ component?   │  │ to ONE page?    │
                    └──────────────┘  └─────────────────┘
                      /        \            |
                    YES         NO          YES
                     |           |           |
                     ▼           ▼           ▼
                 ┌───────┐  ┌────────┐  ┌────────────┐
                 │cards/ │  │common/ │  │{page-name}/│
                 └───────┘  └────────┘  └────────────┘
```

---

## Real Examples from YOUR Project

### Example 1: Header Component

**Questions:**
1. Used on every page? **YES** ✓
2. Same everywhere? **YES** ✓

**Decision:** `components/layout/Header.astro`

**Why:** It's literally on every page, looks identical everywhere.

---

### Example 2: Hero Component

**Questions:**
1. Used on every page? **NO** (only homepage, about, pricing)
2. Used on multiple pages? **YES**
3. Same everywhere? **NO** (very different on each page)

**Analysis:**
- Homepage: Big fancy hero with stats, animation, dual CTAs
- About page: Simple title + description
- Pricing page: Simple title + description

**Decision:**
- Homepage: `components/home/HomeHero.astro` (unique)
- Others: `components/common/PageHero.astro` (flexible, reusable)

**Implementation:**

```astro
<!-- components/home/HomeHero.astro -->
<!-- Hardcoded, homepage specific -->
<section class="home-hero">
  <div class="hero-content">
    <h1 class="massive-title">
      Join the Largest<br/>
      Web Developer Community
    </h1>
    <div class="hero-stats">
      <div>12K Members</div>
      <div>120 Countries</div>
    </div>
    <div class="cta-buttons">
      <button class="btn-primary">Get Started</button>
      <button class="btn-secondary">Watch Demo</button>
    </div>
  </div>
  <div class="hero-visual">
    <img src="/hero-graphic.svg" alt="" />
  </div>
</section>
```

```astro
<!-- components/common/PageHero.astro -->
<!-- Flexible, takes props -->
---
interface Props {
  label: string;
  title: string;
  description: string;
}
const { label, title, description } = Astro.props;
---

<section class="page-hero">
  <div class="container">
    <span class="label">{label}</span>
    <h1>{title}</h1>
    <p class="description">{description}</p>
  </div>
</section>
```

**Usage:**

```astro
<!-- pages/index.astro -->
<HomeHero />

<!-- pages/about.astro -->
<PageHero 
  label="About Us"
  title="Our Story"
  description="Learn about IAWD..."
/>

<!-- pages/pricing.astro -->
<PageHero 
  label="Pricing"
  title="Simple, Transparent Pricing"
  description="Choose the plan..."
/>
```

---

### Example 3: Pricing Component

**Scenario:** You have pricing shown on:
- Homepage (preview of 2 plans)
- Pricing page (detailed comparison of all plans)

**Questions:**
1. Used on multiple pages? **YES**
2. Same component? **NO** (very different layouts)

**Decision:** Make TWO components

**Why?** 
- Homepage version: Simple cards, just price + 3 features
- Pricing page: Full comparison table with ALL features

**Implementation:**

```astro
<!-- components/home/HomePricing.astro -->
---
import { pricingPlans } from '../../data/pricing';
import PricingCard from '../cards/PricingCard.astro';
---

<section class="home-pricing">
  <h2>Simple Pricing</h2>
  <div class="pricing-preview">
    {pricingPlans.slice(0, 2).map(plan => (
      <PricingCard 
        name={plan.name}
        price={plan.price}
        features={plan.features.slice(0, 3)}
        simple={true}
      />
    ))}
  </div>
  <a href="/pricing" class="view-all">See all plans →</a>
</section>
```

```astro
<!-- components/pricing/PricingComparison.astro -->
---
import { pricingPlans, allFeatures } from '../../data/pricing';
---

<section class="pricing-comparison">
  <h2>Compare All Plans</h2>
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
            <td>
              {plan.features.includes(feature.id) ? '✓' : '–'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</section>
```

**Both use the same PricingCard:**
```astro
<!-- components/cards/PricingCard.astro -->
---
interface Props {
  name: string;
  price: number;
  features: string[];
  simple?: boolean;
}
---

<div class="pricing-card">
  <h3>{name}</h3>
  <div class="price">${price}</div>
  <ul>
    {features.map(f => <li>{f}</li>)}
  </ul>
</div>
```

---

### Example 4: FAQ Component

**Scenario:** FAQ appears on:
- Homepage (4 questions preview)
- FAQ page (all questions, searchable, categorized)

**Questions:**
1. Used on multiple pages? **YES**
2. Same layout? **NO** (homepage is simple, FAQ page is complex)

**Decision:** Two components, one reusable item component

**Structure:**
```
components/
├── home/
│   └── HomeFAQ.astro          # Simple preview
├── faq/
│   └── FAQPage.astro          # Full page with search
└── common/
    └── FAQItem.astro          # Reusable Q&A item
```

**Implementation:**

```astro
<!-- components/common/FAQItem.astro -->
---
interface Props {
  question: string;
  answer: string;
}
const { question, answer } = Astro.props;
---

<details class="faq-item">
  <summary>{question}</summary>
  <p>{answer}</p>
</details>
```

```astro
<!-- components/home/HomeFAQ.astro -->
---
import FAQItem from '../common/FAQItem.astro';
import { faqItems } from '../../data/faq';

const topQuestions = faqItems.slice(0, 4);
---

<section class="home-faq">
  <h2>Quick Questions</h2>
  <div class="faq-preview">
    {topQuestions.map(faq => (
      <FAQItem question={faq.question} answer={faq.answer} />
    ))}
  </div>
  <a href="/faq">View all FAQs →</a>
</section>
```

```astro
<!-- components/faq/FAQPage.astro -->
---
import FAQItem from '../common/FAQItem.astro';
import { faqItems, categories } from '../../data/faq';
---

<div class="faq-page">
  <input type="search" placeholder="Search FAQs..." />
  
  <div class="faq-categories">
    {categories.map(cat => (
      <a href={`#${cat}`}>{cat}</a>
    ))}
  </div>
  
  {categories.map(category => (
    <section id={category}>
      <h2>{category}</h2>
      {faqItems
        .filter(faq => faq.category === category)
        .map(faq => (
          <FAQItem question={faq.question} answer={faq.answer} />
        ))}
    </section>
  ))}
</div>
```

---

### Example 5: Blog Card

**Questions:**
1. Used on every page? **NO**
2. Used on multiple pages? **YES** (blog listing, homepage, search results)
3. Same everywhere? **YES** (just different data)
4. Is it a card? **YES**

**Decision:** `components/cards/BlogCard.astro`

**Why?** It's a reusable card component used in multiple places with different data.

**Implementation:**

```astro
<!-- components/cards/BlogCard.astro -->
---
interface Props {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author?: string;
  compact?: boolean;
}

const { title, excerpt, date, slug, author, compact = false } = Astro.props;
---

<article class={`blog-card ${compact ? 'compact' : ''}`}>
  <h3><a href={`/blog/${slug}`}>{title}</a></h3>
  {!compact && <p class="excerpt">{excerpt}</p>}
  <div class="meta">
    <time>{date}</time>
    {author && <span>by {author}</span>}
  </div>
</article>
```

**Usage everywhere:**

```astro
<!-- pages/blog/index.astro -->
{posts.map(post => (
  <BlogCard 
    title={post.title}
    excerpt={post.excerpt}
    date={post.date}
    slug={post.slug}
  />
))}

<!-- pages/index.astro (homepage) -->
<section class="recent-posts">
  <h2>Latest Posts</h2>
  {recentPosts.map(post => (
    <BlogCard {...post} compact={true} />
  ))}
</section>
```

---

### Example 6: Contact Form

**Questions:**
1. Used on every page? **NO**
2. Used on multiple pages? **NO** (only contact page)
3. Specific to one page? **YES**

**Decision:** `components/contact/ContactForm.astro` 

**OR** `components/forms/ContactForm.astro` if you have multiple forms

**Why?** It's only used on the contact page.

**Alternative:** If it's your ONLY form, you could keep it at `components/forms/ContactForm.astro` for clarity.

---

### Example 7: Team Section

**Scenario:** Team members shown on About page

**Questions:**
1. Used on multiple pages? **NO** (only about)
2. Specific to one page? **YES**

**Decision:** `components/about/TeamSection.astro`

**But wait!** It uses PersonCard, which IS reusable!

**Structure:**
```
components/
├── about/
│   └── TeamSection.astro      # Page-specific section
└── cards/
    └── PersonCard.astro       # Reusable card
```

**Implementation:**

```astro
<!-- components/cards/PersonCard.astro -->
---
interface Props {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
}
const { name, role, bio, avatar, linkedin } = Astro.props;
---

<div class="person-card">
  <div class="avatar">{avatar}</div>
  <h3>{name}</h3>
  <p class="role">{role}</p>
  <p class="bio">{bio}</p>
  {linkedin && (
    <a href={linkedin}>LinkedIn →</a>
  )}
</div>
```

```astro
<!-- components/about/TeamSection.astro -->
---
import PersonCard from '../cards/PersonCard.astro';
import { team } from '../../data/team';
---

<section class="team-section">
  <h2>Meet Our Team</h2>
  <div class="team-grid">
    {team.map(member => (
      <PersonCard {...member} />
    ))}
  </div>
</section>
```

**Why this works:**
- TeamSection is about-specific (layout, heading, grid)
- PersonCard is reusable (can use on homepage, leadership page, etc.)

---

## Decision Examples Summary

| Component | Used Where? | Same Design? | Decision | Location |
|-----------|-------------|--------------|----------|----------|
| Header | Every page | Yes | Shared | `layout/` |
| Footer | Every page | Yes | Shared | `layout/` |
| HomeHero | Homepage only | N/A | Page-specific | `home/` |
| PageHero | Multiple pages | Yes (with props) | Reusable | `common/` |
| BlogCard | Multiple pages | Yes | Card | `cards/` |
| PersonCard | Multiple pages | Yes | Card | `cards/` |
| HomePricing | Homepage only | N/A | Page-specific | `home/` |
| PricingComparison | Pricing page only | N/A | Page-specific | `pricing/` |
| TeamSection | About page only | N/A | Page-specific | `about/` |
| ContactForm | Contact page only | N/A | Page-specific | `contact/` |
| FAQItem | Multiple places | Yes | Reusable | `common/` |
| HomeFAQ | Homepage only | N/A | Page-specific | `home/` |
| Button | Everywhere | Yes (with props) | Reusable | `common/` |

---

## The Pattern You'll See

Most projects have:

```
components/
├── layout/              # 3-5 components (Header, Footer, Nav)
├── common/              # 5-10 components (PageHero, Button, etc.)
├── cards/               # 5-15 components (BlogCard, PersonCard, etc.)
├── home/                # 5-10 components (homepage sections)
├── about/               # 3-5 components (about sections)
├── pricing/             # 2-4 components (pricing sections)
└── {other-pages}/       # 2-5 components each
```

**Rule of thumb:**
- Layout: Small (everything shared)
- Common: Medium (frequently reused)
- Cards: Medium (specific reusable components)
- Page folders: Small-Medium (page-specific)

---

## When in Doubt

**Start page-specific, extract later:**

1. Build component for one page
2. Use it
3. Need it elsewhere?
4. **THEN** make it reusable

**Example:**

```
Week 1: Build TeamSection for about page
        → components/about/TeamSection.astro
        
Week 3: Need team members on homepage too
        
Option A: Extract PersonCard
        → Move card to components/cards/PersonCard.astro
        → Use in both about/TeamSection and home/HomeTeam
        
Option B: Reuse TeamSection if it fits
        → Import TeamSection on homepage
```

**Don't prematurely optimize!** Build for today, refactor for tomorrow.

---

## Visual Structure

```
Your Website
│
├─ EVERY PAGE
│  ├─ Header ────────────────► components/layout/
│  └─ Footer ────────────────► components/layout/
│
├─ HOMEPAGE
│  ├─ HomeHero ──────────────► components/home/
│  ├─ Features (uses cards) ─► components/cards/
│  ├─ HomePricing ───────────► components/home/
│  └─ HomeTestimonials ──────► components/home/
│
├─ ABOUT PAGE
│  ├─ PageHero ──────────────► components/common/
│  ├─ TeamSection ───────────► components/about/
│  │  └─ uses PersonCard ────► components/cards/
│  └─ Timeline ──────────────► components/about/
│
├─ PRICING PAGE
│  ├─ PageHero ──────────────► components/common/
│  ├─ PricingComparison ─────► components/pricing/
│  └─ PricingFAQ ────────────► components/pricing/
│
└─ BLOG
   ├─ PageHero ──────────────► components/common/
   ├─ BlogGrid ──────────────► components/blog/
   │  └─ uses BlogCard ──────► components/cards/
   └─ BlogSidebar ───────────► components/blog/
```

---

## Your Cheat Sheet

```
┌──────────────────────────────────────────────────────┐
│ QUICK DECISION GUIDE                                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Q: On every page?                                    │
│ A: layout/                                           │
│                                                      │
│ Q: Multiple pages, takes props, flexible?           │
│ A: common/                                           │
│                                                      │
│ Q: Card-like component (person, blog, product)?     │
│ A: cards/                                            │
│                                                      │
│ Q: Form component?                                   │
│ A: forms/                                            │
│                                                      │
│ Q: Only used on homepage?                            │
│ A: home/                                             │
│                                                      │
│ Q: Only used on {page} page?                         │
│ A: {page}/                                           │
│                                                      │
│ Q: Still not sure?                                   │
│ A: Put in page folder, refactor later if needed     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Now you can confidently organize ANY component! 🎯
