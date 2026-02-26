# Decision Matrix Framework

## Overview

Clear frameworks for making fast, consistent decisions about products, features, and strategy. When in doubt, refer to these matrices.

---

## The Master Decision: Build, Scale, Pivot, or Kill

```
                        REVENUE
                    Low        High
                ┌─────────┬─────────┐
           High │  SCALE  │  SCALE  │
    ENGAGEMENT  │ (focus) │ (invest)│
                ├─────────┼─────────┤
           Low  │  PIVOT  │  FIX    │
                │ or KILL │(retention)│
                └─────────┴─────────┘
```

### Decision Rules

| Engagement | Revenue | Action |
|------------|---------|--------|
| High | High | **SCALE** - Invest heavily, hire, expand |
| High | Low | **SCALE (Focus)** - Improve monetization |
| Low | High | **FIX** - Improve retention, onboarding |
| Low | Low | **PIVOT or KILL** - 30 days to improve or kill |

---

## Daily Decision: What to Work On

### The 2x2 Priority Matrix

```
                      IMPACT
                   Low        High
              ┌─────────┬─────────┐
         Low  │   DON'T │  DO     │
   EFFORT     │   DO    │  FIRST  │
              ├─────────┼─────────┤
         High │   NEVER │  MAYBE  │
              │   DO    │  LATER  │
              └─────────┴─────────┘
```

### Decision Rules

1. **High Impact + Low Effort** = Do immediately
2. **High Impact + High Effort** = Schedule for focused time
3. **Low Impact + Low Effort** = Quick wins only if time permits
4. **Low Impact + High Effort** = Delete from list

---

## Feature Decision: Should We Build This?

### The RICE Quick Check

| Factor | Score | Weight | Result |
|--------|-------|--------|--------|
| Reach (users affected) | 1-10 | x1 | |
| Impact (on key metric) | 1-3 | x1 | |
| Confidence | 0.5-1 | x1 | |
| Effort (person-days) | 0.5-10 | ÷ | |

**RICE Score = (Reach × Impact × Confidence) / Effort**

### Decision Thresholds

| RICE Score | Decision |
|------------|----------|
| > 50 | Build immediately |
| 20-50 | Build this week |
| 5-20 | Add to backlog |
| < 5 | Don't build |

---

## Product Decision: Keep, Pivot, or Kill?

### 30-Day Checkpoint

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Total signups | 100 | | 🔴🟡🟢 |
| Active users | 30 | | 🔴🟡🟢 |
| Paying users | 5 | | 🔴🟡🟢 |
| Revenue | $100 | | 🔴🟡🟢 |

### Decision Matrix

| Active Users | Revenue | Decision |
|--------------|---------|----------|
| ≥30 | ≥$100 | **KEEP** - Continue building |
| ≥30 | <$100 | **KEEP** - Fix monetization |
| 10-29 | Any | **PIVOT** - Change something |
| <10 | <$100 | **KILL** - Move on |

### 60-Day Checkpoint

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Active users | 100 | | 🔴🟡🟢 |
| Paying users | 20 | | 🔴🟡🟢 |
| MRR | $500 | | 🔴🟡🟢 |
| Month-over-month growth | 20% | | 🔴🟡🟢 |

**KILL if not hitting targets after 60 days.**

---

## Pricing Decision: What to Charge?

### Quick Pricing Formula

```
Step 1: Research competitor pricing
        Low: $___  Mid: $___  High: $___

Step 2: Determine value to customer
        Time saved: ___ hours × $___ /hour = $___
        Money saved: $___
        Money earned: $___

Step 3: Set price at 10% of value
        Value: $___  → Price: $___ /month
```

### Pricing Decision Tree

```
Is there a clear market price?
├── Yes → Match or undercut by 20%
└── No → 
    Is the value quantifiable?
    ├── Yes → 10% of value
    └── No → 
        Is it B2B or B2C?
        ├── B2B → $49-199/month
        └── B2C → $9-29/month
```

### When to Change Pricing

| Signal | Action |
|--------|--------|
| >80% say "too cheap" | Raise price 30% |
| <20% convert | Lower price or add tier |
| Many ask for annual | Add annual with 20% discount |
| Enterprise inquiries | Add custom tier |

---

## Market Decision: Which Market First?

### Beachhead Market Criteria

Score each potential market (1-5):

| Criterion | Description | Market A | Market B |
|-----------|-------------|----------|----------|
| **Size** | Enough to sustain business | | |
| **Access** | Can you reach them? | | |
| **Pain** | How urgent is the problem? | | |
| **Budget** | Can they pay? | | |
| **Competition** | Can you win? | | |
| **Timing** | Is now the right time? | | |
| **Total** | Sum of scores | | |

**Choose highest scoring market as beachhead.**

---

## Channel Decision: Where to Acquire Users?

### Channel Scoring Matrix

| Channel | Cost | Speed | Scale | Fit | Total |
|---------|------|-------|-------|-----|-------|
| SEO | 1 | 1 | 5 | | |
| Content | 2 | 2 | 4 | | |
| Social (X) | 1 | 4 | 3 | | |
| Paid Ads | 4 | 5 | 5 | | |
| Product Hunt | 1 | 5 | 2 | | |
| Cold Outreach | 2 | 3 | 2 | | |
| Referral | 1 | 3 | 4 | | |
| Partnerships | 2 | 2 | 4 | | |

**Scale: 1=Low, 5=High**

### Channel Decision Tree

```
How much budget do you have?
├── $0 → SEO, Content, Social, Product Hunt
├── <$1000/mo → Add Paid Ads (limited)
└── >$1000/mo → Full channel mix

How fast do you need users?
├── This week → Product Hunt, Social, Paid
├── This month → Add Content, Outreach
└── This quarter → Add SEO

What's your product type?
├── B2C → Social, Content, SEO, Paid
├── B2B SaaS → Outreach, LinkedIn, Content
└── Developer → Twitter, HN, Reddit, GitHub
```

---

## Technical Decision: Build vs Buy vs Borrow

### Decision Matrix

| Factor | Build | Buy | Borrow (Open Source) |
|--------|-------|-----|---------------------|
| Time | Weeks-Months | Hours-Days | Days |
| Cost | High (your time) | $10-1000/mo | Free |
| Control | Full | Limited | Moderate |
| Maintenance | High | Low | Medium |

### When to Build
- Core differentiator
- No good solutions exist
- Need full control
- Long-term strategic value

### When to Buy
- Non-core functionality
- Time-sensitive
- Better solutions exist
- Cost is reasonable

### When to Borrow (Open Source)
- Standard functionality
- Community support available
- Budget-constrained
- Can self-host

### Common Decisions

| Need | Decision |
|------|----------|
| Auth | **Buy** (Clerk, Auth0) |
| Payments | **Buy** (Stripe) |
| Database | **Buy** (Supabase) or **Borrow** (Postgres) |
| Analytics | **Buy** (PostHog) or **Borrow** (Umami) |
| UI Components | **Borrow** (shadcn/ui) |
| Core AI | **Build** (your secret sauce) |
| Email | **Buy** (Resend, Postmark) |
| Hosting | **Buy** (Cloudflare, Vercel) |

---

## Hiring Decision: When to Hire?

### Decision Tree

```
Is revenue > $10k MRR?
├── No → Don't hire, use contractors
└── Yes →
    Is the task:
    ├── Core to product → Consider part-time hire
    ├── Repeatable → Hire VA
    └── Specialized → Contractor
```

### Contractor vs Employee vs VA

| Need | Solution |
|------|----------|
| Development | Contractor (hourly or project) |
| Customer support | VA ($5-15/hr) |
| Content | Contractor (per piece) |
| Design | Contractor (project) |
| Operations | VA or part-time |

**Rule: No full-time employees until $50k MRR**

---

## Investment Decision: Should I Raise?

### Bootstrap vs Raise Decision

| Factor | Bootstrap | Raise |
|--------|-----------|-------|
| Profitability | Slower growth, but own 100% | Fast growth, dilution |
| Lifestyle | More freedom | More pressure |
| Risk | Lower | Higher |
| Exit options | Flexible | VC-scale exit needed |

### When to Stay Bootstrapped
- $100k MRR goal (not $100M)
- Don't want to manage team of 50+
- Want flexibility and control
- Can reach profitability with savings

### When to Consider Raising
- Need capital for inventory/hardware
- Winner-take-all market
- Want to build large company
- Need to move faster than bootstrapping allows

---

## Decision Speed Rules

### 10-10-10 Rule

Before any decision, ask:
- How will I feel about this in **10 minutes**?
- How will I feel in **10 months**?
- How will I feel in **10 years**?

### Reversibility Rule

| Decision Type | Time to Decide |
|---------------|---------------|
| Easily reversible | 5 minutes |
| Somewhat reversible | 1 day |
| Hard to reverse | 1 week max |

**Most decisions are reversible. Decide fast.**

### Default to Action

When unsure between two options:

```
Option A vs Option B

Is one significantly riskier?
├── No → Choose faster/cheaper option
└── Yes → Choose less risky option

Still can't decide?
└── Flip a coin. If disappointed with result,
    choose the other one. If not, go with it.
```

---

## Quick Reference Card

```
┌────────────────────────────────────────────────────┐
│           DECISION QUICK REFERENCE                 │
├────────────────────────────────────────────────────┤
│                                                    │
│  BUILD?                                           │
│  High impact + Low effort = YES                   │
│                                                    │
│  PRICE?                                           │
│  10% of customer value                            │
│                                                    │
│  KEEP PRODUCT?                                    │
│  30 days: 30 users + $100 → Keep                  │
│  60 days: 100 users + $500 MRR → Keep             │
│                                                    │
│  HIRE?                                            │
│  <$10k MRR = contractors only                     │
│                                                    │
│  RAISE?                                           │
│  Probably no. Bootstrap to $100k MRR.             │
│                                                    │
│  WHEN IN DOUBT?                                   │
│  Decide in 5 minutes. Most decisions reversible.  │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

*Last Updated: January 2026*
*Fast decisions > perfect decisions.*

