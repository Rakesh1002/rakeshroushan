# Banking Setup Guide

## Overview

This guide covers setting up banking infrastructure for RR Holdings Inc. (US) and RR Tech Pvt Ltd (India), including payment processing, treasury management, and international transfers.

---

## US Banking: Mercury

### Why Mercury?

| Feature | Benefit |
|---------|---------|
| No Monthly Fees | $0/month |
| No Minimum Balance | Start with any amount |
| Virtual Cards | Separate cards per subscription |
| Team Access | Add contractors with view-only |
| API Access | Integrate with accounting |
| Treasury | 4%+ APY on idle cash |
| Startup-Friendly | Designed for tech companies |

### Application Process

```
1. Go to mercury.com
2. Click "Open an Account"
3. Select "Corporation"
4. Required Documents:
   - EIN Confirmation Letter (CP 575)
   - Certificate of Incorporation
   - Passport or Government ID
   - Proof of Address

5. Wait 1-3 business days for approval
6. Receive account details via email
7. Order debit card (arrives in 5-7 days)
```

### Account Setup Checklist

- [ ] **Primary Checking Account** - Main operating account
- [ ] **Treasury Account** - For holding reserves (4%+ APY)
- [ ] **Virtual Cards** - Create separate cards for:
  - [ ] Stripe Atlas/formation costs
  - [ ] AWS/Cloud infrastructure
  - [ ] SaaS subscriptions
  - [ ] Marketing/ads
  - [ ] AI APIs (OpenAI, Anthropic)
- [ ] **Team Access** - View-only for bookkeeper/accountant

### Mercury Features to Enable

```
Settings → Banking:
□ Wire transfers (domestic & international)
□ ACH transfers
□ Check deposits (mobile)
□ Bill pay

Settings → Cards:
□ Create virtual cards with spending limits
□ Set category restrictions
□ Enable notifications

Settings → Integrations:
□ Connect to QuickBooks/Xero
□ Enable Plaid for bank connections
□ API access for custom integrations
```

### Treasury Setup (For Idle Cash)

```
Mercury Treasury offers 4%+ APY on balances.

Process:
1. Go to Treasury section
2. Set target checking balance (e.g., $10,000)
3. Excess automatically moves to Treasury
4. Funds available next business day when needed

Note: Treasury funds are swept to partner banks
with $5M+ FDIC coverage through sweep network.
```

---

## Alternative US Banks

### Relay (relay.com)
- Multiple checking accounts for budgeting
- Good for separating project funds
- Free plan available

### Brex
- Corporate card with rewards
- Higher limits for funded startups
- Requires funding/revenue

### Ramp
- Spend management + corporate cards
- Automated expense categorization
- Requires established revenue

---

## Payment Processing: Stripe

### Account Setup

```
1. Go to stripe.com
2. Create account (or use Stripe Atlas account)
3. Complete business verification:
   - Business details
   - Personal details (owner)
   - Bank account (Mercury)
   - Tax information

4. Activate account
5. Receive first payout in 7-14 days (new accounts)
```

### Stripe Products to Enable

| Product | Use Case | Setup |
|---------|----------|-------|
| **Payments** | One-time charges | Default enabled |
| **Billing** | Subscriptions | Dashboard → Billing |
| **Checkout** | Hosted payment pages | Pre-built UI |
| **Elements** | Custom payment forms | Developer integration |
| **Connect** | Marketplace payments | If building platform |
| **Tax** | Automatic sales tax | Billing → Tax |
| **Invoicing** | B2B invoices | Dashboard → Invoices |
| **Radar** | Fraud protection | Default enabled |

### Payout Configuration

```
Settings → Payouts:
- Bank Account: Mercury (add via Plaid or manual)
- Payout Schedule: Daily (T+2) or Manual
- Statement Descriptor: "RRHOLDINGS" or product name

Settings → Branding:
- Logo upload
- Brand colors
- Checkout appearance
```

### Stripe Fees

| Type | Fee |
|------|-----|
| Domestic Cards | 2.9% + $0.30 |
| International Cards | 3.9% + $0.30 |
| ACH Direct Debit | 0.8% (capped at $5) |
| Wire Transfers | $8 per transfer |
| Invoicing | Free (card fees apply) |
| Billing/Subscriptions | 0.5% + card fees |

### Alternative: Lemon Squeezy

For simpler setup (handles taxes/VAT):
- Single integration for global sales
- Automatic tax collection
- 5% + $0.50 per transaction
- Best for digital products, SaaS

---

## India Banking: HDFC Bank

### Why HDFC?

| Feature | Benefit |
|---------|---------|
| Largest Private Bank | Extensive branch network |
| Good Forex Services | Competitive rates |
| Net Banking | Full-featured online banking |
| Business Account | Current account with no min balance options |
| SWIFT/Wire | Easy international transfers |

### Account Types

| Type | Best For | Minimum Balance |
|------|----------|-----------------|
| **Current Account** | Business operations | ₹10,000-25,000 |
| **Trade Current Account** | Import/export focus | ₹25,000 |
| **Startup Account** | New businesses | ₹10,000 |

### Required Documents

```
Company Documents:
□ Certificate of Incorporation
□ MOA and AOA
□ PAN Card of Company
□ GST Registration (if available)
□ Board Resolution for account opening
□ List of authorized signatories

Director/Signatory Documents:
□ PAN Card
□ Aadhaar Card
□ Passport-size photographs
□ Address proof

Registered Office:
□ Address proof (rent agreement or ownership)
□ Utility bill (latest)
```

### Account Opening Process

```
1. Visit nearest HDFC Bank branch
2. Meet with Business Banking representative
3. Fill Current Account opening form
4. Submit all documents
5. Initial deposit (₹10,000-25,000)
6. Account activated in 2-3 business days
7. Receive:
   - Account number
   - Cheque book
   - Debit card
   - Net banking credentials
   - SWIFT/IFSC codes
```

### HDFC Features to Enable

```
NetBanking Setup:
□ Register for corporate net banking
□ Add authorized users with limits
□ Enable transaction alerts (SMS/Email)
□ Set up payment templates for recurring transfers

Trade Services (for receiving foreign currency):
□ Apply for AD (Authorized Dealer) facility
□ Get FIRC for inward remittances
□ Set up beneficiary templates
```

---

## Alternative India Banks

### ICICI Bank
- Good startup programs
- InstaBIZ app for mobile banking
- Similar features to HDFC

### Kotak Mahindra Bank
- Lower minimum balance options
- Good digital banking
- Competitive forex rates

### RazorpayX (Neo-Bank)
- API-first banking
- Automated payouts
- Integrates with Razorpay payments
- Good for developer-focused operations

---

## International Wire Transfer Setup

### US to India (Mercury → HDFC)

```
From Mercury:
1. Go to Payments → Send Wire
2. Select International Wire
3. Enter beneficiary details:

   Beneficiary Name: RR Tech Private Limited
   Bank Name: HDFC Bank Ltd
   Bank Address: [Branch Address]
   Account Number: [Current Account Number]
   SWIFT Code: HDFCINBB (or branch-specific)
   IFSC Code: [Branch IFSC]
   
4. Purpose Code: P0802 (Software/IT services)
5. Amount in USD (converted to INR by receiving bank)
6. Add reference: "Invoice [Number] - [Month] Services"
7. Wire fee: $5-15

Timeline: 1-3 business days
```

### Purpose Codes (Common)

| Code | Description |
|------|-------------|
| P0802 | Software & IT services |
| P0803 | Info services (data processing) |
| P0806 | Technical services |
| P1006 | Management fees |
| S0305 | Business travel |

### Documentation for Inward Remittance

```
Required for each wire received in India:
1. Invoice copy
2. Purpose of remittance
3. Declaration form (provided by bank)

Bank provides:
- FIRC (Foreign Inward Remittance Certificate)
- Keep for GST and tax compliance
```

---

## Monthly Transfer Process

### Step-by-Step: Pay Indian Subsidiary

```
1. Indian Subsidiary Issues Invoice
   - Date: Last day of month
   - Amount: Cost + 15% markup
   - GST: 0% (Export of services)
   - Due: Net 30

2. US Parent Initiates Wire (Mercury)
   - Log into Mercury
   - Create international wire
   - Enter amount in USD
   - Reference invoice number
   - Submit for processing

3. Indian Subsidiary Receives Funds
   - Funds credited in INR
   - Collect FIRC from bank
   - Update accounting records

4. Documentation
   - Save wire confirmation
   - Save FIRC
   - Update transfer pricing documentation
```

### Transfer Frequency Recommendation

| Monthly Revenue | Transfer Frequency |
|-----------------|-------------------|
| < $5,000 | Quarterly |
| $5,000 - $20,000 | Monthly |
| > $20,000 | Bi-weekly or as needed |

**Why?** Wire fees ($5-15 each) add up. Batch smaller amounts.

---

## India Payment Processing: Razorpay

### For INR Revenue (Indian Customers)

If any startups target Indian customers directly:

```
1. Sign up at razorpay.com
2. Business verification:
   - PAN of company
   - GST registration
   - Bank account details
   - Business website/app

3. Activation: 2-5 business days

4. Integration: Similar to Stripe
   - Checkout
   - Subscriptions
   - Payment Links
```

### Razorpay Fees

| Type | Fee |
|------|-----|
| Domestic Cards | 2% |
| UPI | 0% (free) |
| Net Banking | 1.5-2% |
| Wallets | 1.5-2% |

---

## Accounting Integration

### US Entity (QuickBooks Online)

```
Setup:
1. Create QuickBooks Online account
2. Connect Mercury via Plaid
3. Connect Stripe directly
4. Set up chart of accounts:
   - Revenue (by product/startup)
   - Operating expenses
   - Intercompany transfers
   - Payroll (if applicable)

Automation:
- Bank transactions sync daily
- Categorization rules
- Invoice tracking
- Monthly reconciliation
```

### India Entity (Zoho Books / Tally)

```
Zoho Books (Cloud-based):
- GST compliant
- Bank reconciliation
- Invoice management
- Good for small businesses

Tally Prime:
- Standard in India
- CA-preferred
- More complex but powerful
```

---

## Bank Account Summary

### US Entity Accounts

| Account | Bank | Purpose |
|---------|------|---------|
| Primary Checking | Mercury | Operating expenses |
| Treasury | Mercury | Reserve funds (4%+ APY) |
| Stripe | Stripe | Payment processing |

### India Entity Accounts

| Account | Bank | Purpose |
|---------|------|---------|
| Current Account | HDFC | Operations, salaries |
| Razorpay | Razorpay | INR payments (if needed) |

---

## Security Best Practices

### Mercury Security
- [ ] Enable 2FA (authenticator app, not SMS)
- [ ] Set up login notifications
- [ ] Use virtual cards for subscriptions
- [ ] Review authorized users regularly
- [ ] Set spending limits on cards

### HDFC Security
- [ ] Enable transaction alerts
- [ ] Use only official app/website
- [ ] Don't share OTPs
- [ ] Review statements monthly
- [ ] Limit number of signatories

### General
- [ ] Never share banking credentials
- [ ] Use password manager (1Password, Bitwarden)
- [ ] Separate personal and business banking completely
- [ ] Regular reconciliation of all accounts

---

## Quick Reference

### Mercury Bank Details
```
Bank Name: Mercury
Routing Number: [Provided after account opening]
Account Number: [Provided after account opening]
Bank Address: 201 Mission St, Suite 900, San Francisco, CA 94105
SWIFT (for international): [Request if needed]
```

### HDFC Bank Details (Template)
```
Bank Name: HDFC Bank Ltd
Branch: [Your Branch Name]
Account Number: [Your Account Number]
IFSC Code: HDFC0[BRANCH CODE]
SWIFT Code: HDFCINBB[BRANCH CODE]
Bank Address: [Branch Address]
```

---

## Next Steps

1. ✅ Form US entity first
2. ➡️ Apply for Mercury account immediately after EIN
3. ➡️ Set up Stripe account
4. ➡️ Form India entity
5. ➡️ Open HDFC account
6. ➡️ Set up first wire transfer
7. ➡️ Connect accounting software

---

*Last Updated: January 2026*
*Keep this document updated with actual account details (in a secure location).*

