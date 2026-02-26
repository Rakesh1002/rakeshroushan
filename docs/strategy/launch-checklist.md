# Launch Checklist

## Overview

A comprehensive checklist for launching any product from the RR portfolio. Use this for every launch to ensure consistency and maximize impact.

---

## Pre-Launch (T-3 Days to T-1 Day)

### Product Readiness

#### Core Functionality
- [ ] Core feature works end-to-end
- [ ] User can complete primary job-to-be-done
- [ ] No critical bugs in happy path
- [ ] Error states handled gracefully
- [ ] Loading states for async operations

#### Authentication
- [ ] User can sign up (email or OAuth)
- [ ] User can log in
- [ ] User can reset password
- [ ] User can log out
- [ ] Session management works

#### Payments (If Applicable)
- [ ] Stripe integration tested in test mode
- [ ] Switched to live mode
- [ ] Pricing page shows correct prices
- [ ] Checkout flow works
- [ ] Subscription management (upgrade/downgrade)
- [ ] Cancellation flow works
- [ ] Webhook handlers deployed
- [ ] Receipt emails configured

### Landing Page

#### Above the Fold
- [ ] Clear headline (what it does)
- [ ] Subheadline (who it's for)
- [ ] Primary CTA button
- [ ] Hero image/demo/video
- [ ] Social proof (if available)

#### Below the Fold
- [ ] Feature highlights (3-5 max)
- [ ] How it works section
- [ ] Pricing section
- [ ] FAQ section
- [ ] Final CTA

#### Trust Elements
- [ ] Testimonials (or coming soon)
- [ ] Company/founder info
- [ ] Contact method
- [ ] Social media links

### Legal & Compliance

- [ ] Terms of Service published and linked
- [ ] Privacy Policy published and linked
- [ ] Cookie consent (if EU traffic expected)
- [ ] GDPR considerations addressed
- [ ] Data export capability

### Technical

#### Infrastructure
- [ ] Deployed to production URL
- [ ] Custom domain configured
- [ ] SSL certificate active (HTTPS)
- [ ] CDN configured (Cloudflare)
- [ ] Database backed up

#### Monitoring
- [ ] Analytics installed (PostHog/Plausible)
- [ ] Key events tracked
- [ ] Error tracking enabled (Sentry)
- [ ] Uptime monitoring configured
- [ ] Alerts set up for critical issues

#### Performance
- [ ] Lighthouse score > 80
- [ ] Mobile responsive
- [ ] Images optimized
- [ ] Core Web Vitals passing

### SEO

- [ ] Title tag (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Open Graph image (1200x630)
- [ ] Twitter Card configured
- [ ] Favicon and app icons
- [ ] Sitemap generated
- [ ] robots.txt configured

---

## Launch Day (T-0)

### Morning Prep (Before Launch)

- [ ] Final production test (full user journey)
- [ ] Test on mobile device
- [ ] Test purchase flow (use $1 test product if needed)
- [ ] Confirm analytics tracking
- [ ] Prepare response templates for questions

### Launch Sequence

#### Hour 1: Deploy & Verify
```
□ 9:00 AM - Final code deploy
□ 9:15 AM - Verify production is working
□ 9:30 AM - Enable analytics tracking
□ 9:45 AM - Test payment flow one more time
□ 10:00 AM - Ready for public announcement
```

#### Hour 2: Primary Announcements
```
□ 10:00 AM - Post on X/Twitter (main thread)
□ 10:05 AM - Post on personal LinkedIn
□ 10:10 AM - Post in relevant Slack communities
□ 10:15 AM - Post on Indie Hackers
□ 10:20 AM - Post on relevant subreddit(s)
□ 10:30 AM - Email to personal network
```

#### Hour 3-4: Secondary Distribution
```
□ 11:00 AM - Follow up on comments
□ 11:30 AM - Cross-post to other platforms
□ 12:00 PM - Lunch break (stay available)
□ 1:00 PM - Second wave of responses
```

#### Evening: Monitor & Respond
```
□ 3:00 PM - Check metrics, fix any issues
□ 5:00 PM - Thank everyone who shared
□ 7:00 PM - Post update/thank you thread
□ 9:00 PM - Final metrics check
```

### Launch Platforms

#### Tier 1 (Always Use)
| Platform | Template | Notes |
|----------|----------|-------|
| X/Twitter | Thread | Main launch platform |
| LinkedIn | Post | Personal profile |
| Indie Hackers | Launch post | Include link |
| Reddit | Relevant subreddit | Follow rules |

#### Tier 2 (If Applicable)
| Platform | Template | Notes |
|----------|----------|-------|
| Product Hunt | Full launch | Schedule for 12:01 AM PT |
| Hacker News | Show HN | Only for dev tools |
| Dev.to | Article | Only for dev tools |
| Discord communities | Message | Where you're active |

#### Tier 3 (Optional)
| Platform | Notes |
|----------|-------|
| Facebook groups | If relevant |
| Quora | Answer related questions |
| YouTube | Demo video |
| TikTok | Short demo |

---

## Launch Content Templates

### X/Twitter Thread Template

```
Tweet 1 (Hook):
I just launched [PRODUCT NAME] 🚀

[One sentence value prop]

Here's what it does and why I built it 🧵

Tweet 2 (Problem):
The problem:

[Describe the pain point in 2-3 sentences]

I was frustrated because [personal angle]

Tweet 3 (Solution):
So I built [PRODUCT NAME]

[What it does in one sentence]

Here's how it works:
[Screenshot or video]

Tweet 4 (Features):
Key features:

• [Feature 1]
• [Feature 2]
• [Feature 3]

[Screenshot]

Tweet 5 (Tech/Story):
Built with:
• [Tech stack]
• [Time to build]
• [Interesting detail]

Tweet 6 (CTA):
Try it free at [URL]

[Pricing info]

Would love your feedback! 🙏
```

### LinkedIn Post Template

```
🚀 Excited to launch [PRODUCT NAME]!

After [time] of building, it's finally live.

**The Problem:**
[2-3 sentences about the problem]

**The Solution:**
[PRODUCT NAME] helps [who] to [what] by [how].

**Key Features:**
• [Feature 1]
• [Feature 2]
• [Feature 3]

Try it at: [URL]

I'd love your feedback and support. Drop a comment or share if you know someone who could benefit!

#[relevant] #[hashtags]
```

### Indie Hackers Post Template

```
Title: 🚀 I just launched [PRODUCT NAME] - [tagline]

Hey IH!

I just launched [PRODUCT NAME] and wanted to share it with you all.

**What is it?**
[2-3 sentences explaining the product]

**Why I built it:**
[Personal story - the pain point you experienced]

**How it works:**
[Brief explanation + screenshot/gif]

**Pricing:**
[Your pricing model]

**Tech Stack:**
- [Stack item 1]
- [Stack item 2]

**What's next:**
[Roadmap items]

Would love any feedback! Happy to answer questions.

[Link to product]
```

### Reddit Post Template

```
Title: [Descriptive title without self-promotion]

Body:
Hey [subreddit],

I've been working on [problem] and wanted to share a solution I built.

**The Problem**
[Describe in community terms]

**What I Built**
[Description without being salesy]

**Looking for Feedback**
- What features would you want?
- What's missing?
- Would you use something like this?

Link in comments (if allowed) or DM me.
```

---

## Post-Launch (T+1 to T+7)

### Day 1 After Launch

- [ ] Respond to ALL comments and messages
- [ ] Fix any critical bugs reported
- [ ] Thank everyone who shared
- [ ] Send personal DMs to helpful commenters
- [ ] Check analytics for issues

### Day 2-3

- [ ] Write follow-up content (learnings, metrics)
- [ ] Continue responding to feedback
- [ ] Implement quick-win improvements
- [ ] Reach out to interested users directly

### Day 4-7

- [ ] Compile launch metrics
- [ ] Write internal post-mortem
- [ ] Prioritize feature requests
- [ ] Plan iteration based on feedback
- [ ] Set up ongoing marketing

### Launch Metrics to Track

| Metric | Target | Actual |
|--------|--------|--------|
| Landing page views | 1,000 | |
| Signups | 100 | |
| Trial starts | 50 | |
| Paid conversions | 5 | |
| Revenue | $100 | |
| X impressions | 10,000 | |
| X engagement | 5% | |
| Reddit upvotes | 100 | |
| Indie Hackers views | 500 | |

---

## Launch Post-Mortem Template

```markdown
# Launch Post-Mortem: [Product Name]

## Date: [Launch Date]

## Summary
- Product: [Name]
- URL: [URL]
- Launch channels: [List]
- Duration of launch push: [X days]

## Metrics

### Traffic
- Total visitors: [X]
- Unique visitors: [X]
- Top referrers: [List]

### Conversions
- Signups: [X] ([X]% conversion)
- Trials: [X]
- Paid: [X]
- Revenue: $[X]

### Engagement
- X/Twitter impressions: [X]
- X/Twitter engagement rate: [X]%
- Reddit upvotes: [X]
- IH views: [X]

## What Worked
1. [What worked well]
2. [What worked well]
3. [What worked well]

## What Didn't Work
1. [What didn't work]
2. [What didn't work]
3. [What didn't work]

## Lessons Learned
1. [Lesson]
2. [Lesson]
3. [Lesson]

## Action Items for Next Launch
1. [Action]
2. [Action]
3. [Action]
```

---

## Product Hunt Launch Guide

### When to Use Product Hunt

- Developer tools
- SaaS products
- Consumer apps with broad appeal
- Products with good visuals

### Product Hunt Prep (T-7 Days)

- [ ] Create maker account
- [ ] Upload product (draft mode)
- [ ] Prepare assets:
  - [ ] Logo (240x240)
  - [ ] Gallery images (1270x760) x 5
  - [ ] Video/GIF (optional but recommended)
- [ ] Write tagline (60 chars max)
- [ ] Write description
- [ ] Prepare first comment
- [ ] Line up hunter (if not self-hunting)
- [ ] Alert your community

### Product Hunt Launch Day

- [ ] Launch at 12:01 AM PT (avoid competition)
- [ ] Post first comment immediately
- [ ] Share on social (don't say "upvote on PH")
- [ ] Respond to every comment
- [ ] Send personal outreach to supporters
- [ ] Check rankings throughout day

### Product Hunt Tips

```
DO:
✓ Respond to every comment
✓ Share genuine story
✓ Post updates throughout day
✓ Thank supporters

DON'T:
✗ Ask for upvotes
✗ Use upvote groups
✗ Ignore negative feedback
✗ Spam communities
```

---

## Quick Reference Checklist

```
PRE-LAUNCH:
□ Core feature works
□ Auth works
□ Payments work
□ Landing page ready
□ Legal pages linked
□ Analytics installed
□ SEO basics done

LAUNCH DAY:
□ Final test
□ Deploy
□ X thread
□ LinkedIn
□ Indie Hackers
□ Reddit
□ Email network
□ Respond to all

POST-LAUNCH:
□ Thank everyone
□ Fix bugs
□ Track metrics
□ Plan iteration
```

---

*Last Updated: January 2026*
*Every launch is practice for the next one.*

