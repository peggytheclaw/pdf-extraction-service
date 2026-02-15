# 📊 ParsleyPDF Lead Tracker - Google Sheets Setup

## Quick Setup Instructions

1. **Create new Google Sheet** named "ParsleyPDF Lead Tracker"
2. **Create 4 tabs:**
   - LEADS
   - SAMPLES
   - CUSTOMERS
   - METRICS

3. **Import CSVs** (or copy/paste headers from below)

---

## TAB 1: LEADS

**Purpose:** Track all prospective customers from discovery → qualified → contacted

**Columns:**
| Column | Description | Example |
|--------|-------------|---------|
| date_added | When lead was discovered | 2026-02-15 |
| name | Contact person name | Sarah Johnson |
| business | Company/business name | Acme Bookkeeping LLC |
| email | Contact email | sarah@acmebookkeeping.com |
| phone | Phone number (optional) | (555) 123-4567 |
| website | Company website | acmebookkeeping.com |
| source | Where we found them | LinkedIn, Reddit, Referral |
| segment | Business type | Bookkeeper, AmazonFBA, Shopify, Contractor |
| priority | Lead quality | P1, P2, P3 |
| pain_quote | Exact quote showing pain | "Spending 10hrs/week on invoice entry" |
| profile_url | Link to their profile/post | https://linkedin.com/in/... |
| status | Lead stage | NEW, QUALIFIED, CONTACTED, REPLIED, CONVERTED, LOST |
| qualification_date | When we qualified them | 2026-02-15 |
| qualification_notes | Why they're a good fit | High volume, clear pain, budget |
| contact_date | First outreach date | 2026-02-16 |
| contact_count | # of touchpoints | 1, 2, 3 |
| last_template_used | Which email template | Template 1, Template 2 |
| reply_date | When they replied | 2026-02-17 |
| reply_type | Positive/Neutral/Negative | Positive, Neutral, Negative |
| reply_summary | What they said | "Interested, wants to see sample" |
| sample_requested_date | When they asked for sample | 2026-02-17 |
| sample_document_type | What doc they sent | Invoice, Receipt, PO |
| sample_delivered_date | When we sent results | 2026-02-18 |
| conversion_date | When they became customer | 2026-02-20 |
| plan | Which plan they chose | Starter, Pro |
| mrr | Monthly revenue from them | 49 |
| churn_date | When they canceled | 2026-03-20 |
| churn_reason | Why they left | Price, didn't use it |
| personalization_notes | Custom notes for outreach | Mentioned QB integration |

**Status Definitions:**
- **NEW:** Just discovered, needs qualification
- **QUALIFIED:** Vetted, good fit, ready for outreach
- **CONTACTED:** Outreach sent, waiting for reply
- **REPLIED:** They responded (track reply_type)
- **CONVERTED:** Paying customer! (move to CUSTOMERS tab)
- **LOST:** Not interested or bad fit

**Priority Definitions:**
- **P1:** High-value, clear pain, ready to buy
- **P2:** Good fit, moderate clarity
- **P3:** Maybe, less certain

---

## TAB 2: SAMPLES

**Purpose:** Track free sample extraction requests

**Columns:**
| Column | Description | Example |
|--------|-------------|---------|
| request_date | When they requested | 2026-02-17 |
| name | Contact name | Sarah Johnson |
| business | Company name | Acme Bookkeeping |
| email | Contact email | sarah@acmebookkeeping.com |
| document_type | What they sent | Invoice, Receipt, PO, Statement |
| document_url | Where file is stored | /samples/sarah_invoice.pdf |
| data_needed | What to extract | Vendor, Date, Amount, Line items |
| output_format | Desired format | CSV, Excel, JSON |
| received_date | When we got the file | 2026-02-17 |
| processing_status | Current state | RECEIVED, PROCESSING, DELIVERED, FAILED |
| delivered_date | When we sent results | 2026-02-18 |
| quality_score | How good was extraction | Good, Needs work, Failed |
| conversion_status | Did they convert? | PENDING, CONVERTED, LOST |
| conversion_date | When they signed up | 2026-02-20 |
| notes | Internal notes | Complex handwritten invoice, took 2hrs |

**Processing Status:**
- **RECEIVED:** File received, not started yet
- **PROCESSING:** Troy is working on it
- **DELIVERED:** Results sent to customer
- **FAILED:** Couldn't extract (refund/apologize)

---

## TAB 3: CUSTOMERS

**Purpose:** Track paying customers and ongoing service

**Columns:**
| Column | Description | Example |
|--------|-------------|---------|
| signup_date | When they converted | 2026-02-20 |
| name | Contact name | Sarah Johnson |
| business | Company name | Acme Bookkeeping |
| email | Contact email | sarah@acmebookkeeping.com |
| phone | Phone (optional) | (555) 123-4567 |
| plan | Current plan | Starter, Pro |
| mrr | Monthly revenue | 49 |
| billing_cycle | Billing frequency | Monthly, Annual |
| payment_method | How they pay | Stripe, PayPal |
| last_document_date | Most recent doc | 2026-02-25 |
| documents_this_month | Volume this month | 15 |
| total_documents | Lifetime total | 47 |
| status | Customer health | ACTIVE, AT_RISK, CHURNED |
| last_contact_date | Last touchpoint | 2026-02-26 |
| satisfaction_score | NPS or CSAT | 9, Promoter |
| churn_date | When they canceled | 2026-03-20 |
| churn_reason | Why they left | Price, Low usage, Bad quality |
| notes | Account notes | Happy customer, referred 2 friends |

**Status Definitions:**
- **ACTIVE:** Using service regularly, no issues
- **AT_RISK:** Low usage, complaints, payment issues
- **CHURNED:** Canceled subscription

---

## TAB 4: METRICS

**Purpose:** Weekly/monthly performance tracking

**Columns:**
| Column | Description |
|--------|-------------|
| week_start | Start of week (Monday) |
| leads_added | New leads researched |
| leads_qualified | Leads qualified |
| emails_sent | Outreach emails sent |
| replies_received | Total replies |
| reply_rate_pct | % of emails that got replies |
| positive_replies | Interested responses |
| samples_requested | Free samples requested |
| samples_delivered | Samples completed |
| sample_to_request_rate | % of replies → samples |
| conversions | New paying customers |
| sample_to_customer_rate | % of samples → customers |
| new_mrr | New monthly revenue |
| total_customers | Active customers |
| total_mrr | Total monthly revenue |
| churned_customers | Cancellations this week |
| churned_mrr | Lost revenue |
| net_mrr_change | New MRR - Churned MRR |
| notes | Key insights |

---

## 🎨 Formatting Recommendations

### Conditional Formatting:

**LEADS Tab:**
- Status = "CONVERTED" → Green background
- Status = "LOST" → Red background
- Priority = "P1" → Bold text
- Days since contact > 7 → Yellow background (follow-up needed)

**SAMPLES Tab:**
- Processing_status = "DELIVERED" → Green
- Processing_status = "FAILED" → Red
- Conversion_status = "CONVERTED" → Green

**CUSTOMERS Tab:**
- Status = "CHURNED" → Red
- Status = "AT_RISK" → Yellow
- Documents_this_month = 0 → Orange (not using service)

**METRICS Tab:**
- Reply_rate_pct > 10% → Green (good)
- Reply_rate_pct < 5% → Red (bad)
- Conversions > 0 → Bold

### Data Validation:

**Status fields:** Dropdown with allowed values
**Priority:** Dropdown (P1, P2, P3)
**Segment:** Dropdown (Bookkeeper, AmazonFBA, Shopify, Contractor, SmallBusiness)
**Plan:** Dropdown (Starter, Pro, Enterprise)

---

## 📊 Key Metrics to Track

### Weekly Check:
1. **Reply Rate:** emails sent vs replies (target: >10%)
2. **Sample Request Rate:** replies vs samples (target: >20%)
3. **Conversion Rate:** samples vs customers (target: >20%)
4. **MRR Growth:** week-over-week revenue change

### Monthly Check:
1. **Customer Churn:** % of customers who cancel
2. **CAC (Customer Acquisition Cost):** time spent / customers acquired
3. **LTV (Lifetime Value):** avg customer lifespan × MRR

---

## 🔗 Sheet Sharing

**Share with:**
- troy@parsleypdf.com (Owner)
- peggytheclaw@gmail.com (Editor) - so I can update automatically

**Link in Discord:** Post shareable link in #pdf-extraction-service

---

## 📝 Next Steps

1. Create the sheet with 4 tabs
2. Copy/paste column headers
3. Apply conditional formatting
4. Set up data validation dropdowns
5. Share with Peggy
6. I'll start populating with leads!

---

**Questions?** Ping me in Discord and I'll help troubleshoot!
