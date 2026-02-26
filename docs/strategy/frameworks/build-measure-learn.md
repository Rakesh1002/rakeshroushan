# Build-Measure-Learn Framework

## Overview

The Lean Startup loop adapted for the 100-startups-in-100-days challenge. Optimize for speed and learning, not perfection.

---

## The Loop

```
         ┌─────────────────────────────────────────┐
         │                                         │
         ▼                                         │
    ┌─────────┐                               ┌────────┐
    │  IDEAS  │                               │  LEARN │
    └────┬────┘                               └────▲───┘
         │                                         │
         │ Build                            Analyze │
         │ (1-3 days)                       (1 day) │
         │                                         │
         ▼                                         │
    ┌─────────┐        Measure              ┌──────────┐
    │ PRODUCT │ ─────────────────────────── │   DATA   │
    │  (MVP)  │        (7 days)             │ (Metrics)│
    └─────────┘                             └──────────┘
```

---

## Cycle 1: Build (1-3 Days)

### What is an MVP?

**Minimum Viable Product** = Smallest thing that delivers value and gets feedback.

| MVP Type | Time | Use When |
|----------|------|----------|
| Landing Page | 2 hours | Testing demand |
| Wizard of Oz | 4 hours | Simulating product manually |
| Concierge | 1 day | Doing service manually |
| Single Feature | 1-2 days | Core value test |
| Full MVP | 3-7 days | Ready for paying customers |

### MVP Scope Rules

**Include:**
- One core feature that solves the main problem
- Payment integration (validate willingness to pay)
- Basic analytics
- Error handling

**Exclude:**
- User settings/preferences
- Admin dashboard
- Multiple payment tiers
- Social features
- Integrations
- i18n/localization

### Build Checklist

```
□ Core feature working
□ User can sign up
□ User can pay (Stripe test mode first)
□ Basic landing page
□ Terms & Privacy links
□ Analytics tracking
□ Error tracking
□ Works on mobile
□ Deployed to production URL
```

### Time-Boxing

| Activity | Max Time |
|----------|----------|
| Planning | 1 hour |
| Design/UI | 2 hours |
| Core feature | 8 hours |
| Auth/payments | 4 hours |
| Polish | 2 hours |
| Deploy | 1 hour |
| **Total** | **18 hours** |

If you're exceeding time limits, cut scope.

---

## Cycle 2: Measure (7 Days)

### Key Metrics (Pirate Metrics: AARRR)

```
┌──────────────────────────────────────────────────────┐
│                    PIRATE METRICS                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│  A - Acquisition:  How do users find you?           │
│      Metric: Visitors, Signup rate                  │
│                                                      │
│  A - Activation:   Do they have a good first        │
│      experience?                                     │
│      Metric: Completed onboarding, First use        │
│                                                      │
│  R - Retention:    Do they come back?               │
│      Metric: DAU/WAU/MAU, Return rate               │
│                                                      │
│  R - Revenue:      Do they pay?                     │
│      Metric: Conversion rate, MRR, LTV              │
│                                                      │
│  R - Referral:     Do they tell others?             │
│      Metric: NPS, Referral rate                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Week 1 Dashboard

Track these metrics in your first 7 days:

| Metric | Target | Actual |
|--------|--------|--------|
| Visitors | 500 | |
| Signups | 50 (10%) | |
| Activated Users | 25 (50%) | |
| Paying Users | 5 (10%) | |
| Revenue | $100 | |

### How to Measure

**Analytics Setup** (Use PostHog or Plausible)
```javascript
// Track key events
analytics.track('signup_completed', { source: 'landing' });
analytics.track('onboarding_completed');
analytics.track('first_use_completed');
analytics.track('payment_initiated');
analytics.track('payment_completed', { amount: 29, plan: 'pro' });
```

**Event Funnel**
```
Landing Page View → Signup → Onboarding → First Use → Payment
      100%           10%        50%          70%        20%
```

### Data Collection Channels

| Channel | What to Collect |
|---------|-----------------|
| Analytics | Quantitative: visits, clicks, conversions |
| Support | Qualitative: questions, complaints |
| Reviews | Qualitative: positive/negative feedback |
| Surveys | Qualitative: NPS, satisfaction |
| Interviews | Qualitative: deep understanding |

---

## Cycle 3: Learn (1 Day)

### Weekly Learning Review

Every 7 days, answer these questions:

```
1. ACQUISITION
   - Where did users come from?
   - Which channel performed best?
   - What was CAC?

2. ACTIVATION
   - Did users complete onboarding?
   - Where did they drop off?
   - What confused them?

3. RETENTION
   - Did users come back?
   - What triggered return visits?
   - Why did users churn?

4. REVENUE
   - Did users pay?
   - What price point worked?
   - What prevented payment?

5. REFERRAL
   - Did users share?
   - What made them share?
   - NPS score?
```

### Hypothesis Testing

For each product, track hypotheses:

```
HYPOTHESIS LOG

Hypothesis #1:
- Belief: [What we believed]
- Test: [How we tested]
- Result: [What happened]
- Learning: [What we learned]
- Action: [What we'll do next]

Example:
- Belief: Users will pay $29/mo for AI editing
- Test: Launched with $29/mo pricing
- Result: 2% conversion (target was 5%)
- Learning: Price might be too high for solo podcasters
- Action: Test $19/mo tier next week
```

### Decision Matrix

Based on learnings, decide next action:

| Signal | Action |
|--------|--------|
| High activation + high payment | Scale acquisition |
| High activation + low payment | Adjust pricing or value prop |
| Low activation + high intent | Fix onboarding |
| Low activation + low intent | Pivot or kill |

---

## Fast Feedback Loops

### 24-Hour Feedback Loop (Daily)

```
Morning:  Check metrics dashboard (10 min)
Midday:   Review support tickets (10 min)
Evening:  Implement one fix/improvement (1-2 hours)
Night:    Deploy and measure next day
```

### 7-Day Learning Cycle

```
Day 1: Launch
Day 2-6: Collect data, fix bugs, talk to users
Day 7: Review metrics, update hypotheses
Day 8: Decide: iterate, pivot, or kill
```

### One Metric That Matters (OMTM)

At any stage, focus on ONE metric:

| Stage | OMTM | Why |
|-------|------|-----|
| Pre-launch | Waitlist signups | Validates demand |
| Week 1 | Activation rate | Product works |
| Week 2-4 | Conversion to paid | Business works |
| Month 2+ | Retention/churn | Sustainable |

---

## Pivoting

### When to Pivot

Pivot if after 30 days you see:
- <10 active users
- $0 revenue
- No organic growth
- Negative feedback pattern

### Pivot Types

| Pivot Type | What Changes | Example |
|------------|--------------|---------|
| Customer | Target user | B2C → B2B |
| Problem | Problem focus | Editing → Recording |
| Solution | How you solve | AI → Templates |
| Channel | Distribution | SEO → Paid ads |
| Revenue | Monetization | Subscription → Usage |
| Platform | Technology | Web → Mobile |

### How to Pivot

1. Document learnings from v1
2. Identify most promising pivot
3. Validate pivot with 24-hour validation framework
4. Build new MVP (don't throw away everything)
5. Announce pivot to existing users

---

## Killing Products

### When to Kill

Kill if after 60 days:
- < $100 MRR
- No path to $1k MRR visible
- Every improvement fails
- You dread working on it

### How to Kill

1. **Announce**: Email users, give 30-day notice
2. **Migrate**: Offer data export
3. **Refund**: Refund recent payments
4. **Archive**: Keep code for future reference
5. **Learn**: Document why it failed

### Kill Checklist

```
□ Notified all users
□ Offered data export
□ Processed refunds
□ Updated landing page ("Discontinued")
□ Wrote post-mortem
□ Archived codebase
□ Updated portfolio
```

---

## Templates

### Weekly Metrics Template

```markdown
## Week [X] Metrics - [Product Name]

### Key Metrics
| Metric | Last Week | This Week | Change |
|--------|-----------|-----------|--------|
| Visitors | | | |
| Signups | | | |
| Activation | | | |
| Revenue | | | |
| MRR | | | |

### Hypothesis Testing
Hypothesis tested: [Description]
Result: [Validated / Invalidated / Inconclusive]
Learning: [What we learned]

### Top 3 User Feedback
1. [Feedback 1]
2. [Feedback 2]
3. [Feedback 3]

### Actions for Next Week
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

### Post-Mortem Template

```markdown
## Post-Mortem: [Product Name]

### Summary
- Launched: [Date]
- Killed: [Date]
- Duration: [X] days
- Peak MRR: $[X]
- Total Users: [X]

### What We Believed
[Original hypothesis]

### What Actually Happened
[Reality]

### Why It Failed
1. [Reason 1]
2. [Reason 2]
3. [Reason 3]

### What We Learned
1. [Learning 1]
2. [Learning 2]
3. [Learning 3]

### How This Applies to Future Products
[Application]
```

---

## Speed Optimizations

### Build Faster
- Use templates (Next.js, shadcn)
- Copy-paste from previous projects
- AI-assisted development (Cursor)
- Skip features aggressively

### Measure Faster
- Set up analytics before launch
- Automated dashboards
- Real-time alerts
- Daily metric reviews

### Learn Faster
- Talk to 3 users per week
- Read every support ticket
- Respond within 1 hour
- A/B test continuously

---

*Last Updated: January 2026*
*Speed of learning = speed of success.*

