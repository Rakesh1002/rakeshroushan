# Automation-First Framework

## Overview

As a solo founder building 100 products, automation is not optional—it's survival. This framework covers CI/CD, monitoring, operations, and scaling without hiring.

---

## Automation Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOMATION ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CODE                                                           │
│  └── GitHub (version control)                                  │
│      └── GitHub Actions (CI/CD)                                │
│          └── Cloudflare Pages (auto-deploy)                    │
│              └── Uptime monitoring                             │
│                                                                 │
│  MONITORING                                                     │
│  └── PostHog (analytics)                                       │
│  └── Sentry (errors)                                           │
│  └── BetterStack (uptime + logs)                               │
│                                                                 │
│  OPERATIONS                                                     │
│  └── Stripe (payments, auto-billing)                           │
│  └── Resend (transactional email)                              │
│  └── Crisp (support + chatbot)                                 │
│                                                                 │
│  WORKFLOWS                                                      │
│  └── Zapier/Make (integrations)                                │
│  └── n8n (self-hosted, complex flows)                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          command: pages deploy .next --project-name=my-project
```

### Deployment Triggers

| Event | Action |
|-------|--------|
| Push to main | Auto-deploy to production |
| Pull request | Deploy preview environment |
| Tag created | Create GitHub release |

### Zero-Downtime Deploys

Cloudflare Pages provides:
- Instant rollbacks
- Preview deployments
- Automatic SSL
- Global CDN

---

## Monitoring & Alerting

### Error Tracking (Sentry)

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  beforeSend(event) {
    // Filter out known non-critical errors
    if (event.exception?.values?.[0]?.type === 'AbortError') {
      return null;
    }
    return event;
  },
});
```

### Alert Rules

| Severity | Condition | Alert |
|----------|-----------|-------|
| Critical | Error rate > 5% | Slack + SMS |
| High | Error rate > 1% | Slack |
| Medium | New error type | Email |
| Low | Performance degradation | Daily digest |

### Uptime Monitoring

Use BetterStack (formerly Better Uptime):

```
Monitors to set up per product:
1. Homepage (check every 1 min)
2. API health endpoint (check every 1 min)
3. Payment webhook (check every 5 min)
4. Login flow (synthetic, every 5 min)

Alert channels:
- Slack (all alerts)
- SMS (critical only)
- Email (daily summary)
```

### Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: await checkDatabase(),
    redis: await checkRedis(),
    stripe: await checkStripe(),
  };
  
  const allHealthy = Object.values(checks).every(v => v === 'ok' || v === true);
  
  return NextResponse.json(checks, { 
    status: allHealthy ? 200 : 503 
  });
}

async function checkDatabase() {
  try {
    // Run simple query
    await db.execute('SELECT 1');
    return 'ok';
  } catch {
    return 'error';
  }
}
```

---

## Payment Automation

### Stripe Billing Automation

```typescript
// Automatic subscription management
// All handled by Stripe:
// - Recurring billing
// - Failed payment retries
// - Invoice generation
// - Tax calculation
// - Dunning (failed payment emails)

// Webhook handler
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'customer.subscription.created':
      await activateSubscription(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await deactivateSubscription(event.data.object);
      break;
    case 'invoice.payment_failed':
      await notifyPaymentFailed(event.data.object);
      break;
    case 'invoice.paid':
      await confirmPayment(event.data.object);
      break;
  }
}
```

### Automated Billing Emails

Configure in Stripe Dashboard:
- ✅ Invoice sent
- ✅ Payment receipt
- ✅ Payment failed
- ✅ Subscription ending soon
- ✅ Subscription canceled

---

## Support Automation

### Chatbot Setup (Crisp)

```
Automated responses:

Trigger: "pricing" or "how much"
Response: "Our pricing starts at $X/month. 
          View plans at [link]. 
          Have specific questions? 
          I'll connect you with our team."

Trigger: "refund" or "cancel"
Response: "I can help with that. 
          For refunds, please email support@.
          To cancel, go to Settings > Billing.
          Is there anything we could do better?"

Trigger: After-hours message
Response: "Thanks for reaching out! 
          We're currently offline but will 
          respond within 24 hours.
          Check our FAQ: [link]"
```

### Auto-Responses

| Trigger | Response | Escalation |
|---------|----------|------------|
| Pricing question | Link to pricing page | None |
| Bug report | Acknowledge + ticket | High priority |
| Feature request | Thank + add to list | None |
| Billing issue | Instructions | Human if unresolved |
| Angry customer | Empathy + escalate | Immediate human |

### FAQ Automation

Create comprehensive FAQ, link in:
- Chatbot responses
- Auto-reply emails
- Help center
- Onboarding flow

---

## Email Automation

### Transactional Emails (Resend)

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(user: User) {
  await resend.emails.send({
    from: 'welcome@myapp.com',
    to: user.email,
    subject: 'Welcome to MyApp!',
    react: WelcomeEmail({ name: user.name }),
  });
}

export async function sendTrialEndingEmail(user: User) {
  await resend.emails.send({
    from: 'team@myapp.com',
    to: user.email,
    subject: 'Your trial ends in 3 days',
    react: TrialEndingEmail({ name: user.name }),
  });
}
```

### Automated Email Sequences

| Event | Email | Timing |
|-------|-------|--------|
| Signup | Welcome | Immediate |
| Day 1 | Getting started | +24h |
| Day 3 | Feature highlight | +72h |
| Trial ending | Upgrade CTA | -3 days |
| Trial expired | Last chance | +1 day |
| Churned | Win-back | +30 days |

---

## Workflow Automation

### Zapier/Make Workflows

```
WORKFLOW 1: New Customer Alert
Trigger: Stripe payment succeeded
Actions:
1. Add to Slack #revenue channel
2. Add to Google Sheet
3. Send welcome email
4. Add to CRM

WORKFLOW 2: Churn Alert  
Trigger: Stripe subscription canceled
Actions:
1. Alert Slack #churn
2. Send exit survey
3. Update CRM

WORKFLOW 3: Support Ticket Tracking
Trigger: New Crisp conversation
Actions:
1. Create Linear issue
2. Log to spreadsheet
3. Alert if VIP customer

WORKFLOW 4: Weekly Metrics
Trigger: Every Sunday 6 PM
Actions:
1. Pull Stripe MRR
2. Pull PostHog metrics  
3. Compile report
4. Send to email
```

### n8n Self-Hosted Flows

For complex, frequent workflows (save $$):

```
Use n8n for:
- High-volume automations (>1000/month)
- Complex multi-step workflows
- Data processing pipelines
- Custom integrations

Host on DigitalOcean droplet ($12/mo)
```

---

## Scheduled Tasks

### Cron Jobs

```typescript
// Using Cloudflare Workers Cron Triggers
// wrangler.toml
[triggers]
crons = [
  "0 * * * *",   // Every hour
  "0 0 * * *",   // Daily at midnight
  "0 0 * * 0",   // Weekly on Sunday
]

// worker.ts
export default {
  async scheduled(event, env, ctx) {
    switch (event.cron) {
      case "0 * * * *":
        await hourlyTasks();
        break;
      case "0 0 * * *":
        await dailyTasks();
        break;
      case "0 0 * * 0":
        await weeklyTasks();
        break;
    }
  }
};

async function dailyTasks() {
  await sendTrialEndingReminders();
  await cleanupExpiredSessions();
  await generateDailyReport();
}
```

### Task Schedule

| Frequency | Tasks |
|-----------|-------|
| Hourly | Sync external data, cache refresh |
| Daily | Trial reminders, cleanup, reports |
| Weekly | Metrics compilation, backups |
| Monthly | Invoice reconciliation, audits |

---

## Scaling Without Hiring

### Automate Before You Hire

| Task | Cost to Hire | Cost to Automate |
|------|--------------|------------------|
| Support (L1) | $3k/mo | $100/mo (Crisp) |
| Email marketing | $5k/mo | $50/mo (Loops) |
| Social posting | $2k/mo | $30/mo (Buffer) |
| Data entry | $2k/mo | $20/mo (Zapier) |
| Bookkeeping | $500/mo | $50/mo (Wave) |

### Automation Priority Order

```
1. Payment & billing (Stripe)
2. Deployment (GitHub Actions + Cloudflare)
3. Error alerting (Sentry)
4. Support (Crisp chatbot)
5. Email sequences (Resend + Loops)
6. Metrics reporting (Zapier + Google Sheets)
7. Social media (Buffer)
8. Customer success (Loops)
```

---

## Self-Service Everything

### Reduce Support Load

| Customer Need | Self-Service Solution |
|---------------|----------------------|
| Cancel subscription | Settings page button |
| Download invoice | Stripe customer portal |
| Update payment | Stripe customer portal |
| Reset password | Email flow |
| Delete account | Settings page |
| Export data | One-click export |
| Get refund | Clear policy + form |

### Stripe Customer Portal

```typescript
// Create portal session
const session = await stripe.billingPortal.sessions.create({
  customer: stripeCustomerId,
  return_url: `${process.env.APP_URL}/settings/billing`,
});

// Redirect customer
redirect(session.url);
```

Customers can self-manage:
- View invoices
- Update payment method
- Change subscription
- Cancel subscription
- Download receipts

---

## Automated Testing

### Essential Test Coverage

```typescript
// tests/critical-paths.test.ts

describe('Critical User Paths', () => {
  test('user can sign up', async () => {
    // Test signup flow
  });
  
  test('user can subscribe', async () => {
    // Test payment flow with Stripe test mode
  });
  
  test('core feature works', async () => {
    // Test main value proposition
  });
  
  test('user can cancel', async () => {
    // Test cancellation flow
  });
});
```

### Automated Smoke Tests

Run after every deploy:

```yaml
# .github/workflows/smoke-tests.yml
on:
  deployment_status:

jobs:
  smoke-tests:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Run smoke tests
        run: |
          curl -f ${{ github.event.deployment_status.target_url }}/api/health
          # Add more smoke tests
```

---

## Backup Automation

### Database Backups

```bash
# DigitalOcean Managed Database: Automatic daily backups
# Supabase: Automatic daily backups

# For self-managed: cron job
0 2 * * * pg_dump $DATABASE_URL | gzip > /backups/db-$(date +%Y%m%d).sql.gz

# Upload to R2
0 3 * * * aws s3 sync /backups s3://backups-bucket --endpoint-url=$R2_ENDPOINT
```

### Configuration Backups

```yaml
# .github/workflows/backup-config.yml
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Export Stripe products
        run: stripe products list > stripe-products.json
      
      - name: Export Cloudflare config
        run: wrangler pages list > cf-pages.json
      
      - name: Commit to backup repo
        run: |
          git add .
          git commit -m "Weekly backup $(date)"
          git push
```

---

## Metrics Dashboard

### Auto-Generated Weekly Report

```markdown
# Weekly Metrics - Week [X]

## Revenue
- MRR: $X (+Y% vs last week)
- New MRR: $X
- Churned MRR: $X
- Net New MRR: $X

## Users
- Total Users: X
- New Signups: X
- Active Users (7d): X
- Trial Conversions: X%

## Product
- Uptime: 99.9%
- Avg Response Time: Xms
- Error Rate: X%
- Support Tickets: X

## Top Actions This Week
1. [Auto-generated from git commits]
2. [Auto-generated from releases]
3. [Auto-generated from major events]
```

### Dashboard Tools

| Tool | Use | Cost |
|------|-----|------|
| PostHog | Product analytics | Free to $450/mo |
| Chartbrew | Custom dashboards | $20/mo |
| Google Data Studio | Business metrics | Free |
| Stripe Dashboard | Revenue metrics | Free |

---

## Quick Reference

```
┌────────────────────────────────────────────────────┐
│          AUTOMATION QUICK REFERENCE                │
├────────────────────────────────────────────────────┤
│                                                    │
│  DEPLOY:       GitHub → Actions → Cloudflare      │
│  ERRORS:       Sentry (auto-capture, Slack)       │
│  UPTIME:       BetterStack (1-min checks)         │
│  PAYMENTS:     Stripe (handles everything)        │
│  EMAIL:        Resend (transactional)             │
│  SUPPORT:      Crisp (chatbot + human)            │
│  WORKFLOWS:    Zapier (simple) / n8n (complex)    │
│  ANALYTICS:    PostHog (events + sessions)        │
│  BACKUPS:      Daily automated + weekly verify    │
│                                                    │
│  RULE: If you do it twice, automate it.          │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

*Last Updated: January 2026*
*Automate yourself out of a job. Then build the next thing.*

