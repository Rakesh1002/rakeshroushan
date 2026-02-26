# RR Holdings - Corporate Structure

## Overview

This document outlines the corporate structure for RR Holdings, a US Delaware C-Corporation with an Indian wholly-owned subsidiary. This structure enables:

1. **USD Revenue Collection** - Global customers pay in USD to the US entity
2. **INR Operations** - Development costs paid in INR through the Indian entity
3. **Tax Efficiency** - Proper transfer pricing and intercompany agreements
4. **Legal Protection** - Limited liability across jurisdictions
5. **Investment Ready** - Standard structure for US VC/angel investment

---

## Corporate Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    RR HOLDINGS INC.                             │
│                  Delaware C-Corporation                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Founder: Rakesh Roushan (100% Shareholder)             │    │
│  │  Role: CEO, Director                                     │    │
│  │  Registered Agent: Delaware (e.g., Harvard Business     │    │
│  │                    Services or similar)                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Assets:                                                         │
│  • All intellectual property (trademarks, copyrights, patents)  │
│  • Customer contracts and revenue                                │
│  • SaaS subscriptions and licensing agreements                   │
│  • 100% ownership of Indian subsidiary                          │
│                                                                  │
│  Bank Account: Mercury Bank (US)                                 │
│  Payment Processor: Stripe                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 100% Ownership (ODI Route)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RR TECH PRIVATE LIMITED                       │
│                  Indian Private Limited Company                  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Shareholder: RR Holdings Inc. (100%)                   │    │
│  │  Directors: Rakesh Roushan + 1 Nominee Director         │    │
│  │  Registered Office: [Your Address], India               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Operations:                                                     │
│  • Software development services                                 │
│  • IT infrastructure management                                  │
│  • Customer support operations                                   │
│  • Content creation and marketing                                │
│                                                                  │
│  Bank Account: HDFC Bank / ICICI Bank (India)                   │
│  Receives: Service fees from RR Holdings Inc.                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fund Flow Structure

### Revenue Collection (Inbound)

```
Customer (Global)
       │
       │ Pays for SaaS/Services
       ▼
┌──────────────────┐
│ Stripe / Paddle  │──────► USD Revenue
│ Payment Gateway  │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Mercury Bank    │──────► RR Holdings Inc. (US)
│  (US Account)    │
└──────────────────┘
```

### Operational Expenses (Outbound)

```
RR Holdings Inc. (US)
       │
       │ Intercompany Service Agreement
       │ (Transfer Pricing: Cost + 15-20% Markup)
       ▼
┌──────────────────┐
│  Wire Transfer   │──────► USD to INR Conversion
│  (SWIFT)         │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  HDFC/ICICI Bank │──────► RR Tech Pvt Ltd (India)
│  (India Account) │
└──────────────────┘
       │
       ├──► Salaries (if employees hired)
       ├──► Contractor payments
       ├──► Office expenses
       ├──► Cloud infrastructure (local)
       └──► Other operational costs
```

---

## Key Legal Documents Required

### 1. US Entity Documents

| Document                     | Purpose                        | Status      |
| ---------------------------- | ------------------------------ | ----------- |
| Certificate of Incorporation | Proof of company formation     | Required    |
| Bylaws                       | Internal governance rules      | Required    |
| EIN (SS-4)                   | Federal tax ID                 | Required    |
| 83(b) Election               | Founder stock tax optimization | Recommended |
| Board Resolutions            | Authorize key decisions        | Ongoing     |
| Stock Purchase Agreement     | Document founder shares        | Required    |
| IP Assignment Agreement      | Transfer IP to company         | Critical    |

### 2. India Entity Documents

| Document                      | Purpose                            | Status   |
| ----------------------------- | ---------------------------------- | -------- |
| Certificate of Incorporation  | Proof of company formation         | Required |
| MOA & AOA                     | Company constitution               | Required |
| PAN Card                      | Tax identification                 | Required |
| GST Registration              | For service invoicing              | Required |
| Professional Tax Registration | State-level compliance             | Required |
| FEMA/ODI Compliance           | RBI approval for foreign ownership | Critical |

### 3. Intercompany Agreements

| Document                       | Purpose                     | Status      |
| ------------------------------ | --------------------------- | ----------- |
| Master Service Agreement       | Define service relationship | Critical    |
| Transfer Pricing Documentation | Arm's length pricing proof  | Critical    |
| IP License Agreement           | License IP to subsidiary    | Recommended |
| Cost Sharing Agreement         | Share development costs     | Optional    |

---

## Transfer Pricing Guidelines

### Arm's Length Principle

The Indian subsidiary must charge the US parent at market rates. Common methods:

1. **Cost Plus Method** (Recommended for service companies)

   - Calculate all costs (salary, infrastructure, overhead)
   - Add 15-20% markup
   - Invoice monthly to US parent

2. **Example Calculation**

   ```
   Monthly Costs in India:
   - Your imputed salary: ₹2,00,000
   - Cloud/SaaS tools: ₹50,000
   - Office/utilities: ₹30,000
   - Miscellaneous: ₹20,000
   ─────────────────────────────
   Total Cost: ₹3,00,000

   Markup (15%): ₹45,000

   Invoice to US Parent: ₹3,45,000 (~$4,100 USD)
   ```

### Documentation Requirements

- Maintain time sheets showing work done for US parent
- Keep invoices and payment records
- Annual transfer pricing report (if turnover exceeds ₹1 crore)
- Benchmarking study (compare with similar companies)

---

## Compliance Calendar

### US Entity (RR Holdings Inc.)

| Month     | Filing                   | Agency   | Notes                     |
| --------- | ------------------------ | -------- | ------------------------- |
| March 15  | Annual Franchise Tax     | Delaware | $400 minimum              |
| March 15  | Form 1120 (or extension) | IRS      | Corporate tax return      |
| Quarterly | Estimated Tax Payments   | IRS      | If tax liability expected |
| Annual    | Annual Report            | Delaware | Due by March 1            |

### India Entity (RR Tech Pvt Ltd)

| Month        | Filing                       | Agency        | Notes                |
| ------------ | ---------------------------- | ------------- | -------------------- |
| Monthly      | GST Returns (GSTR-1, 3B)     | GST Portal    | By 11th/20th         |
| July 31      | Income Tax Return            | IT Department | For non-audit cases  |
| September 30 | Income Tax Return            | IT Department | If audit required    |
| October 31   | Annual Return (AOC-4, MGT-7) | ROC           | Financial statements |
| Ongoing      | TDS Returns                  | IT Department | Quarterly            |

---

## Founder Compensation Strategy

### Phase 1: Bootstrap (Year 1)

- **US Entity**: No salary, retain all profits for reinvestment
- **India Entity**: Minimal director sitting fees (₹50,000/meeting max)
- **Personal**: Live on savings or side income

### Phase 2: Early Revenue ($10k+ MRR)

- **US Entity**: Small salary ($3,000-5,000/month) for visa/tax purposes
- **India Entity**: Continue service fee model
- **Dividends**: Not recommended yet (tax inefficient)

### Phase 3: Growth ($50k+ MRR)

- **US Entity**: Market-rate salary
- **India Entity**: Can add employees
- **Dividends**: Consider after consulting tax advisor

---

## Investment Readiness

This structure is standard for US venture capital. Key points:

1. **Delaware C-Corp** - Required by most US VCs
2. **Clean Cap Table** - Single founder, no complex structures
3. **IP in US Entity** - All valuable IP owned by parent
4. **83(b) Election Filed** - Prevents future tax issues
5. **SAFE/Convertible Notes** - Can be issued by US entity

### For Future Fundraising

- US investors invest in RR Holdings Inc.
- No changes needed to India subsidiary
- Standard NVCA documents applicable

---

## Risk Mitigation

### Legal Risks

- [ ] Maintain corporate formalities (board meetings, minutes)
- [ ] Keep entities separate (no commingling funds)
- [ ] Proper intercompany documentation
- [ ] Annual compliance filings on time

### Tax Risks

- [ ] Transfer pricing documentation
- [ ] Arm's length transactions only
- [ ] Proper withholding tax on international payments
- [ ] Consult CA/CPA for complex transactions

### Operational Risks

- [ ] Business insurance (E&O, cyber liability)
- [ ] Proper contractor agreements
- [ ] Terms of Service and Privacy Policy
- [ ] Data protection compliance (GDPR if serving EU)

---

## Recommended Professional Support

| Role                       | Purpose                            | Estimated Cost            |
| -------------------------- | ---------------------------------- | ------------------------- |
| US CPA                     | Tax filing, compliance             | $2,000-5,000/year         |
| Indian CA                  | ROC filings, GST, transfer pricing | ₹50,000-1,00,000/year     |
| Corporate Attorney (US)    | Formation, contracts               | $1,000-3,000 (one-time)   |
| Corporate Attorney (India) | Formation, FEMA compliance         | ₹30,000-50,000 (one-time) |

---

## Next Steps

1. **Week 1**: Form US Delaware C-Corp via Stripe Atlas or Firstbase
2. **Week 2**: Open Mercury bank account, apply for EIN
3. **Week 3-4**: Form Indian Pvt Ltd with proper ODI documentation
4. **Week 4**: Open Indian bank account, set up intercompany agreement
5. **Ongoing**: Maintain compliance, document all transactions

---

_Last Updated: January 2026_
_Disclaimer: This document is for informational purposes only. Consult qualified legal and tax professionals before implementation._
