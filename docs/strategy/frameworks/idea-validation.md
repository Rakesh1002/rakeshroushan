# 24-Hour Idea Validation Framework

## Overview

This framework enables rapid validation of startup ideas within 24 hours. The goal is to gather enough signal to decide: Build, Pivot, or Kill.

---

## The 24-Hour Validation Sprint

```
Hour 0-2:   Problem Definition
Hour 2-6:   Market Research
Hour 6-12:  Demand Signals
Hour 12-18: Competition Analysis
Hour 18-22: Solution Validation
Hour 22-24: Go/No-Go Decision
```

---

## Step 1: Problem Definition (Hours 0-2)

### Problem Statement Template

Fill out this template in <30 minutes:

```
PROBLEM STATEMENT

1. Who has this problem?
   [Specific person/role, not "everyone"]

2. What is the problem?
   [One sentence, specific and measurable]

3. When do they experience this problem?
   [Trigger/situation]

4. How painful is this problem? (1-10)
   [1 = annoying, 10 = business-critical]

5. How are they solving it today?
   [Current workaround or competitor]

6. How much would they pay to solve it?
   [$ amount, be specific]

Example:
1. Solo podcasters with <5,000 downloads/episode
2. Editing takes 4+ hours per episode
3. After every recording session
4. 8/10 - It's the #1 reason they quit
5. Manual editing in Audacity or paying $50-100/episode
6. $20-50/month for unlimited editing
```

### Problem Score Card

| Criteria                             | Score (1-5) |
| ------------------------------------ | ----------- |
| Problem is frequent (daily/weekly)   |             |
| Problem is painful (people complain) |             |
| Problem has budget (people pay now)  |             |
| Problem is growing (trend up)        |             |
| I understand this problem personally |             |
| **Total**                            | /25         |

**Threshold**: Score ≥15 to continue

---

## Step 2: Market Research (Hours 2-6)

### Google Trends Analysis

1. Go to [trends.google.com](https://trends.google.com)
2. Search for:
   - Problem keywords
   - Solution keywords
   - Competitor names
3. Check:
   - Is trend growing, stable, or declining?
   - Geographic interest
   - Related queries

### Reddit Research

Search these patterns:

```
site:reddit.com "[problem]"
site:reddit.com "I need [solution]"
site:reddit.com "looking for [solution]"
site:reddit.com "alternative to [competitor]"
```

**What to look for:**

- Upvotes on problem-related posts
- Comments expressing frustration
- Requests for recommendations
- Complaints about existing solutions

### X/Twitter Research

Search for:

```
"I wish there was" [topic]
"looking for" [solution]
"anyone know" [solution]
"frustrated with" [competitor]
"[competitor] sucks"
```

### Collect Evidence

| Source          | Signal | Link |
| --------------- | ------ | ---- |
| Reddit          |        |      |
| X/Twitter       |        |      |
| Google Trends   |        |      |
| Forum/Community |        |      |

**Need at least 10 signals to continue.**

---

## Step 3: Demand Signals (Hours 6-12)

### Existing Product Hunt Launches

Search ProductHunt for:

- Similar products
- Competitors
- Related categories

**Check:**

- Upvotes received
- Comments (positive/negative)
- Reviews
- Launch date (recent = growing market)

### App Store / Play Store

Search for competitor apps:

- Download counts
- Reviews and ratings
- Recent reviews (complaints = opportunities)
- Pricing

### Keyword Research

Use Ahrefs, Ubersuggest, or free alternatives:

| Keyword | Monthly Searches | Difficulty | CPC |
| ------- | ---------------- | ---------- | --- |
|         |                  |            |     |
|         |                  |            |     |
|         |                  |            |     |

**Good signals:**

- Monthly searches > 1,000
- CPC > $1 (people pay for ads = monetizable)
- Low-medium difficulty

### Create Waitlist Page (Optional but Powerful)

**Time**: 1-2 hours
**Tools**: Carrd, Typedream, or simple HTML

```
Landing Page Structure:
1. Headline: [Big promise]
2. Subhead: [Who it's for + key benefit]
3. Email signup form
4. Simple footer

Promote on:
- X/Twitter
- Relevant subreddits
- Indie Hackers
- LinkedIn
```

**Validation threshold**: 50+ signups in 24 hours = strong signal

---

## Step 4: Competition Analysis (Hours 12-18)

### Competitor Matrix

| Competitor | Pricing | Strengths | Weaknesses | Reviews |
| ---------- | ------- | --------- | ---------- | ------- |
|            |         |           |            |         |
|            |         |           |            |         |
|            |         |           |            |         |

### Competitive Gap Analysis

```
What do competitors do WELL?
1.
2.
3.

What do competitors do POORLY?
1.
2.
3.

What do customers WISH existed?
1.
2.
3.
```

### Positioning Options

| Position        | Description             |
| --------------- | ----------------------- |
| **Cheaper**     | Same thing, lower price |
| **Better**      | Superior core feature   |
| **Faster**      | Speed advantage         |
| **Simpler**     | Easier to use           |
| **Specialized** | Niche focus             |
| **Integrated**  | Works with X            |

**Choose 1-2 positioning angles.**

---

## Step 5: Solution Validation (Hours 18-22)

### Mock Solution Test

Create a simple mockup or description of your solution:

1. **Write the landing page copy** (even if not live)
2. **Create 3-5 screenshots** (Figma/v0.dev)
3. **Define core features** (3 max for MVP)

### Founder-Market Fit Check

| Question                                   | Yes/No |
| ------------------------------------------ | ------ |
| Can I build MVP in ≤7 days?                |        |
| Do I have distribution for this market?    |        |
| Am I excited to work on this for 1 year?   |        |
| Do I understand the customer deeply?       |        |
| Can I be top 3 in a niche within 6 months? |        |

**Need 4/5 Yes to proceed.**

### Quick Survey (Optional)

If you have access to target audience:

```
Survey Questions (max 5):
1. Do you experience [problem]? (Yes/No)
2. How often? (Daily/Weekly/Monthly/Rarely)
3. How do you currently solve it?
4. Would you pay for a better solution? (Yes/No)
5. How much would you pay? (Price options)
```

**Tools**: Typeform, Google Forms, X poll

---

## Step 6: Go/No-Go Decision (Hours 22-24)

### Final Validation Scorecard

| Criteria             | Weight | Score (1-5) | Weighted |
| -------------------- | ------ | ----------- | -------- |
| Problem severity     | 3x     |             |          |
| Market size          | 2x     |             |          |
| Growing demand       | 2x     |             |          |
| Competition gap      | 2x     |             |          |
| Founder-market fit   | 2x     |             |          |
| Speed to MVP         | 1x     |             |          |
| Monetization clarity | 2x     |             |          |
| **Total**            |        |             | /70      |

### Decision Thresholds

| Score | Decision                                        |
| ----- | ----------------------------------------------- |
| 55-70 | BUILD NOW - High confidence                     |
| 40-54 | BUILD WITH CAUTION - Validate more during build |
| 25-39 | PIVOT - Change angle or target market           |
| <25   | KILL - Move to next idea                        |

---

## Validation Report Template

```markdown
# Validation Report: [Product Name]

## Date: [Date]

## Time Spent: [X] hours

## Problem Statement

[Fill from Step 1]

## Market Signals

- Google Trends: [Growing/Stable/Declining]
- Reddit mentions: [X posts found]
- Twitter mentions: [X tweets found]
- Search volume: [X/month]

## Competition

- Main competitors: [List]
- Gap identified: [Your angle]
- Positioning: [Your position]

## Demand Evidence

- Waitlist signups: [X]
- Survey responses: [X]
- People willing to pay: [X%]

## Founder-Market Fit

[4/5 criteria met: Yes/No]

## Final Score: [X/70]

## Decision: [BUILD / PIVOT / KILL]

## If BUILD, MVP Scope:

1. [Core feature 1]
2. [Core feature 2]
3. [Core feature 3]

## Launch Timeline: [X days]
```

---

## Speed Validation Hacks

### 30-Minute Validation (Ultra-Fast)

If you need to validate even faster:

1. **Search Twitter** for complaints about competitors (5 min)
2. **Check Reddit** for problem mentions (5 min)
3. **Look at competitor reviews** on G2/Capterra (5 min)
4. **Check Google Trends** for keywords (5 min)
5. **Rate your founder-market fit** (5 min)
6. **Make decision** (5 min)

### Pre-Validated Ideas

Some ideas are pre-validated:

- Clones of successful products in new markets
- B2B versions of B2C products
- Vertical versions of horizontal products
- "X but for Y" products

For these, skip validation and go straight to building.

---

## Common Validation Mistakes

| Mistake                    | Fix                           |
| -------------------------- | ----------------------------- |
| Asking friends/family      | Ask strangers who match ICP   |
| "Would you use this?"      | Ask "Would you pay for this?" |
| Building before validating | Validate before writing code  |
| Ignoring negative signals  | Negative signals are data     |
| Falling in love with idea  | Stay objective, kill fast     |

---

## Resources

- [Google Trends](https://trends.google.com)
- [Reddit Search](https://reddit.com/search)
- [ProductHunt](https://producthunt.com)
- [Exploding Topics](https://explodingtopics.com)
- [SparkToro](https://sparktoro.com)
- [Carrd](https://carrd.co) - Quick landing pages

---

_Last Updated: January 2026_
_Validate fast, fail fast, learn fast._
