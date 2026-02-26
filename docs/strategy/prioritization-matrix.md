# Prioritization Matrix

## Overview

This document provides frameworks and scoring for prioritizing which startups to build first. The goal is to maximize learning and revenue while minimizing time to first dollar.

---

## ICE Scoring Framework

### What is ICE?

**I**mpact × **C**onfidence × **E**ase = ICE Score

| Factor | Description | Scale |
|--------|-------------|-------|
| **Impact** | Potential revenue and strategic value | 1-10 |
| **Confidence** | How sure are we this will work? | 1-10 |
| **Ease** | How quickly can we ship? | 1-10 |

**ICE Score = I × C × E** (Max: 1000)

---

## Scoring Criteria

### Impact (1-10)

| Score | Description | Revenue Potential |
|-------|-------------|------------------|
| 10 | Game-changer, massive market | $50k+ MRR |
| 8-9 | High potential, proven market | $20-50k MRR |
| 6-7 | Good potential, niche market | $10-20k MRR |
| 4-5 | Moderate potential | $5-10k MRR |
| 2-3 | Small potential | $1-5k MRR |
| 1 | Minimal impact | <$1k MRR |

### Confidence (1-10)

| Score | Description | Evidence |
|-------|-------------|----------|
| 10 | Proven demand | Pre-orders, waitlist, existing customers |
| 8-9 | Strong signals | Competitor success, clear pain point |
| 6-7 | Good indicators | Reddit discussions, Twitter demand |
| 4-5 | Moderate belief | Personal experience, limited validation |
| 2-3 | Assumption | Hypothesis only |
| 1 | Wild guess | No evidence |

### Ease (1-10)

| Score | Description | Timeline |
|-------|-------------|----------|
| 10 | Ship today | Already built, needs polish |
| 8-9 | Ship this week | 80%+ done, clear path |
| 6-7 | Ship in 2 weeks | 50%+ done, some unknowns |
| 4-5 | Ship in 1 month | Significant work needed |
| 2-3 | Ship in 2-3 months | Major development required |
| 1 | Ship in 6+ months | Research/exploration needed |

---

## ICE Scores: Tier 1 Products

| Rank | Product | Impact | Confidence | Ease | ICE Score | Priority |
|------|---------|--------|------------|------|-----------|----------|
| 1 | **AudioPod** | 9 | 8 | 7 | **504** | Launch Week 1 |
| 2 | **UnQuest** | 8 | 8 | 8 | **512** | Launch Week 1 |
| 3 | **JEET** | 8 | 7 | 7 | **392** | Launch Week 2 |
| 4 | **TeleStack** | 7 | 7 | 6 | **294** | Launch Week 3 |

### Analysis

**AudioPod** (504)
- Impact: 9 - Large market (podcasting $4B+), clear monetization
- Confidence: 8 - Descript proves demand, open-source angle differentiates
- Ease: 7 - Has codebase, AI integration needs work

**UnQuest** (512)
- Impact: 8 - Every founder needs research, recurring need
- Confidence: 8 - SparkToro, Exploding Topics prove market
- Ease: 8 - Has codebase, mostly integration work

**JEET** (392)
- Impact: 8 - Huge market (India coaching $50B+), B2B2C scale
- Confidence: 7 - Proven market but competitive
- Ease: 7 - Has codebase, content creation is ongoing

**TeleStack** (294)
- Impact: 7 - Healthcare SaaS is sticky, high LTV
- Confidence: 7 - Klara, Luma prove model
- Ease: 6 - Voice AI integration complex

---

## ICE Scores: Tier 2 Products

| Rank | Product | Impact | Confidence | Ease | ICE Score | Priority |
|------|---------|--------|------------|------|-----------|----------|
| 5 | **WhatsByy** | 7 | 8 | 7 | **392** | Week 4 |
| 6 | **UnSearch** | 6 | 7 | 8 | **336** | Week 4 |
| 7 | **NameMyApp** | 4 | 8 | 9 | **288** | Week 5 |
| 8 | **AudioWhisper** | 6 | 7 | 6 | **252** | Week 5 |
| 9 | **BuildNative** | 6 | 6 | 5 | **180** | Week 6 |
| 10 | **DevGrowth** | 5 | 6 | 6 | **180** | Week 6 |

---

## ICE Scores: Tier 3 Products

| Rank | Product | Impact | Confidence | Ease | ICE Score | Priority |
|------|---------|--------|------------|------|-----------|----------|
| 11 | Aura | 6 | 6 | 5 | 180 | Week 7 |
| 12 | Tweety | 5 | 6 | 6 | 180 | Week 7 |
| 13 | AboutAI | 4 | 7 | 7 | 196 | Week 8 |
| 14 | Focusly | 4 | 6 | 8 | 192 | Week 8 |
| 15 | Yobi | 6 | 5 | 4 | 120 | Week 9 |
| 16 | EdCo | 5 | 5 | 5 | 125 | Week 9 |
| 17 | Riley | 7 | 4 | 4 | 112 | Week 10 |

---

## Alternative Framework: RICE

### What is RICE?

**R**each × **I**mpact × **C**onfidence / **E**ffort = RICE Score

Better for comparing features within a product, but can also work for product prioritization.

| Factor | Description |
|--------|-------------|
| **Reach** | How many users will this impact per quarter? |
| **Impact** | How much will it move the needle? (0.25-3) |
| **Confidence** | How sure are we? (0-100%) |
| **Effort** | Person-weeks to complete |

---

## Speed-to-Revenue Matrix

### Prioritize by Time to First Dollar

| Speed | Products | Time to $1 |
|-------|----------|-----------|
| **Immediate** | NameMyApp, Focusly | 1 week |
| **Fast** | AudioPod, UnQuest | 2 weeks |
| **Medium** | JEET, TeleStack, WhatsByy | 1 month |
| **Slow** | BuildNative, Yobi | 2+ months |

### Quick Wins First
Ship products that can generate ANY revenue quickly, then iterate:

```
Week 1: NameMyApp (simple, viral potential)
        Focusly (small but quick)
        
Week 2: AudioPod (beta launch)
        UnQuest (beta launch)
        
Week 3: JEET (soft launch with 2-3 institutes)
        TeleStack (pilot with 1-2 clinics)
```

---

## Market Size Analysis

### TAM/SAM/SOM

| Product | TAM | SAM | SOM (Y1) |
|---------|-----|-----|----------|
| AudioPod | $4B | $400M | $1M |
| UnQuest | $5B | $500M | $500K |
| JEET | $50B | $5B | $200K |
| TeleStack | $10B | $1B | $120K |
| WhatsByy | $2B | $200M | $100K |

### SOM Calculation
Serviceable Obtainable Market = Realistic Y1 revenue target
- Conservative: 0.01-0.1% of SAM
- Aggressive: 0.1-1% of SAM

---

## Competition Analysis

### Competitive Intensity Score

| Score | Description | Examples |
|-------|-------------|----------|
| 1 | Blue ocean, no competition | Novel ideas |
| 3 | Few competitors, room to grow | UnSearch, AudioPod |
| 5 | Moderate competition | UnQuest, TeleStack |
| 7 | Crowded market | Focusly, Tweety |
| 10 | Red ocean, dominated | JEET (but B2B angle) |

### Competition-Adjusted Priority

| Product | ICE | Competition | Adjusted Score |
|---------|-----|-------------|----------------|
| AudioPod | 504 | 3 | 168 |
| UnQuest | 512 | 5 | 102 |
| UnSearch | 336 | 3 | 112 |
| JEET | 392 | 7 | 56 |

**Insight**: Lower competition products might be better first launches.

---

## Dependency Analysis

### Products That Enable Others

```
UnSearch (API) ──► UnQuest (uses web search)
                └► AI Cofounder (uses web search)
                
AudioPod ──► AP-Publish (ebook to audiobook)
         └► AP-Play (audiobook player)

JEET ──► VaaniKosh (language learning add-on)
```

### Build Dependencies First
If A enables B, prioritize A even if B has higher ICE.

---

## Resource Allocation

### Solo Founder Capacity

```
Available hours per week: 60-80
Split:
- Deep work (coding): 40 hours
- Marketing/sales: 10 hours  
- Admin/operations: 5 hours
- Learning/research: 5 hours
```

### Parallel vs Sequential

**Sequential (Recommended for Launch)**
- Focus on 1-2 products at a time
- Ship completely, then move on
- Avoid context switching

**Parallel (After Initial Revenue)**
- Maintain 2-3 revenue products
- Experiment with 1-2 new ideas
- Kill or scale based on data

---

## Decision Framework

### Should I Build This?

```
┌─────────────────────────────────────────────────┐
│              BUILD THIS PRODUCT?                │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Can I build MVP in ≤7 days?                │
│     No ──► Simplify scope or skip              │
│     Yes ──► Continue                           │
│                                                 │
│  2. Will anyone pay $10+ for this?             │
│     No ──► Skip (or make it paid feature)      │
│     Yes ──► Continue                           │
│                                                 │
│  3. Can I reach 100 potential customers        │
│     in 48 hours?                               │
│     No ──► Find better distribution first      │
│     Yes ──► Continue                           │
│                                                 │
│  4. Does this excite me to work on?            │
│     No ──► Consider skipping                   │
│     Yes ──► BUILD IT                           │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Kill Criteria

When to abandon a product:
- 30 days post-launch, <10 users: Kill
- 60 days post-launch, $0 revenue: Kill or pivot
- 90 days, <$500 MRR: Automate and move on
- No growth for 30 days: Re-evaluate

---

## Final Priority Stack Rank

### Top 10 to Build First

| Rank | Product | ICE | Notes |
|------|---------|-----|-------|
| 1 | UnQuest | 512 | Highest ICE, your expertise area |
| 2 | AudioPod | 504 | High ICE, differentiated |
| 3 | JEET | 392 | B2B revenue, high LTV |
| 4 | WhatsByy | 392 | India market timing |
| 5 | UnSearch | 336 | Enables other products |
| 6 | TeleStack | 294 | Healthcare = sticky |
| 7 | NameMyApp | 288 | Quick win, viral |
| 8 | AudioWhisper | 252 | Clear competitor to beat |
| 9 | AboutAI | 196 | Content flywheel |
| 10 | Focusly | 192 | Easy ship, small win |

---

## Review Cadence

### Weekly Review
- Update ICE scores based on new information
- Move products between tiers
- Celebrate launches and revenue

### Monthly Review
- Full portfolio review
- Kill underperformers
- Add new ideas to backlog

---

*Last Updated: January 2026*
*Re-score products monthly as you learn more.*

