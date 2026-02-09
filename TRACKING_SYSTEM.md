# Tracking System - PDF Extraction Service

## Overview

This document defines the complete tracking system for managing leads, outreach, samples, and conversions for the PDF extraction service.

**System**: Google Sheets (shareable, accessible anywhere, easy automation)
**Owner**: Peggy (AI Assistant)
**Access**: Troy (view/edit), Peggy (edit)

---

## Sheet Structure

### Master Workbook: "PDF_Extraction_Sales_Tracker"

**Contains 5 tabs:**
1. **Leads** - Master lead list with all contact info
2. **Outreach** - Email tracking (sent, opened, replied)
3. **Samples** - Sample requests and delivery tracking
4. **Customers** - Active customers and revenue
5. **Metrics** - Dashboard with KPIs and charts

---

## TAB 1: Leads

### Purpose
Master database of all potential customers with qualification and status.

### Columns

| Column | Description | Format | Example |
|--------|-------------|--------|---------|
| Lead ID | Unique identifier | L-XXXX | L-0001 |
| Date Added | When lead was added | YYYY-MM-DD | 2026-02-09 |
| Name | Contact's full name | Text | John Smith |
| Company | Business name | Text | ABC Supply Co |
| Role | Job title | Text | Owner / CEO |
| Email | Primary email | Email | john@abcsupply.com |
| LinkedIn | Profile URL | URL | linkedin.com/in/johnsmith |
| Phone | Phone number (optional) | Text | +1-555-0123 |
| Source | Where found | Dropdown | Reddit / LinkedIn / Facebook |
| Source Detail | Specific source | Text | r/FulfillmentByAmazon post |
| Platform | Ecommerce platform | Dropdown | Amazon FBA / Shopify / Multi |
| Est. Revenue | Annual revenue estimate | Dropdown | $100K-$500K / $500K-$2M / $2M+ |
| Est. Invoice Volume | Invoices per month | Number | 45 |
| Pain Point | Specific challenge mentioned | Text | "drowning in invoice paperwork" |
| Accounting System | Current software | Dropdown | QuickBooks / Xero / None |
| Lead Score | Qualification score (1-10) | Number | 8 |
| Status | Current stage | Dropdown | New / Contacted / Sample / Customer |
| Priority | Outreach priority | Dropdown | High / Medium / Low |
| Notes | Additional context | Text | Posts frequently about scaling |
| Tags | Keywords for filtering | Text | high-volume, growing, QB-user |
| Last Activity | Last interaction date | YYYY-MM-DD | 2026-02-09 |
| Next Action | What to do next | Text | Send initial email |
| Assigned To | Who's handling | Dropdown | Peggy / Troy |

### Lead Scoring Formula

**Total Score (1-10):**

```
Base Score = 
+ Volume Score (1-4 points)
  • 50+ invoices/month = 4
  • 30-49 invoices/month = 3
  • 15-29 invoices/month = 2
  • <15 invoices/month = 1

+ System Score (1-3 points)
  • Using QuickBooks/Xero = 3
  • Using spreadsheets = 2
  • No system yet = 1

+ Engagement Score (1-3 points)
  • Mentioned pain point directly = 3
  • Active in communities discussing issue = 2
  • Passive (just found them) = 1

Total = Volume + System + Engagement (max 10)
```

**Priority Assignment:**
- Score 8-10 = High Priority
- Score 5-7 = Medium Priority
- Score 1-4 = Low Priority

### Status Values

| Status | Definition | Next Action |
|--------|------------|-------------|
| New | Just added, not contacted | Send initial email |
| Contacted | Initial email sent, awaiting response | Follow up in 3 days |
| Replied | They responded (interested or questions) | Continue conversation |
| Sample Requested | Asked for sample | Process sample ASAP |
| Sample Sent | Sample delivered | Follow up in 2-3 days |
| Negotiating | Discussing pricing/terms | Close the deal |
| Customer | Paying customer | Move to Customers tab |
| Not Interested | Explicitly declined | Mark inactive |
| No Response | No reply after 3 follow-ups | Re-engage in 30 days |
| Bad Contact | Email bounced or wrong person | Find correct contact |

### Automation Rules (Peggy's Jobs)

**Daily:**
- [ ] Add 5-10 new qualified leads
- [ ] Update "Last Activity" for any interactions
- [ ] Move customers from Leads to Customers tab
- [ ] Flag leads ready for follow-up (based on days since last contact)

**Weekly:**
- [ ] Review lead scores (update based on new info)
- [ ] Clean up duplicate entries
- [ ] Verify email addresses for new leads
- [ ] Update "Next Action" for all active leads

---

## TAB 2: Outreach

### Purpose
Track every email sent, responses received, and outreach performance.

### Columns

| Column | Description | Format | Example |
|--------|-------------|--------|---------|
| Outreach ID | Unique identifier | O-XXXX | O-0001 |
| Lead ID | Links to Leads tab | L-XXXX | L-0001 |
| Name | Contact name | Text | John Smith |
| Email | Email address | Email | john@abcsupply.com |
| Date Sent | When email was sent | YYYY-MM-DD | 2026-02-09 |
| Email Type | Template used | Dropdown | Initial / Follow-up 1 / Follow-up 2 / Sample |
| Subject Line | Email subject | Text | "Saw your post about invoices" |
| Template Used | Which template | Text | Reddit Template A |
| Personalization | Key personalized element | Text | Referenced Reddit post from Jan 15 |
| Sent By | Who sent it | Dropdown | Peggy / Troy |
| Status | Email status | Dropdown | Sent / Opened / Replied / Bounced |
| Date Opened | First open timestamp | YYYY-MM-DD HH:MM | 2026-02-09 08:34 |
| Date Replied | Reply timestamp | YYYY-MM-DD HH:MM | 2026-02-09 14:22 |
| Reply Type | Type of response | Dropdown | Positive / Negative / Question / Sample Request |
| Reply Summary | Brief summary | Text | "Interested, wants pricing info" |
| Next Follow-up Date | When to follow up | YYYY-MM-DD | 2026-02-12 |
| Conversion | Did they convert? | Checkbox | ☑ |
| Notes | Additional details | Text | Mentioned timing is tight right now |

### Email Tracking Integration

**Options:**
1. **Manual tracking**: Peggy updates when sending/receiving emails
2. **Gmail labels**: Auto-tag emails and sync to sheet
3. **Email tracking tool**: Use Mailtrack, HubSpot, or similar (if budget allows)

**Recommended for MVP**: Manual tracking by Peggy (most reliable for now)

### Performance Metrics (Calculated)

**Email Performance Summary** (update weekly):

```
Total Emails Sent: COUNT(Status = "Sent")
Open Rate: Opens / Sent
Reply Rate: Replies / Sent
Sample Request Rate: (Reply Type = "Sample Request") / Sent
Bounce Rate: Bounces / Sent

By Template:
- Initial Contact: [X] sent, [Y]% opened, [Z]% replied
- Follow-up 1: [X] sent, [Y]% opened, [Z]% replied
- Follow-up 2: [X] sent, [Y]% opened, [Z]% replied
```

### Automation Rules (Peggy's Jobs)

**Daily:**
- [ ] Log all emails sent
- [ ] Update status for opens/replies
- [ ] Flag leads ready for next follow-up
- [ ] Respond to questions within 24 hours

**Weekly:**
- [ ] Calculate performance metrics
- [ ] Identify top-performing templates
- [ ] Adjust templates if metrics are below target

---

## TAB 3: Samples

### Purpose
Track sample processing from request to delivery and conversion.

### Columns

| Column | Description | Format | Example |
|--------|-------------|--------|---------|
| Sample ID | Unique identifier | S-XXXX | S-0001 |
| Lead ID | Links to Leads tab | L-XXXX | L-0001 |
| Name | Contact name | Text | John Smith |
| Company | Business name | Text | ABC Supply Co |
| Date Requested | When they asked | YYYY-MM-DD | 2026-02-09 |
| Request Source | How they requested | Dropdown | Email Reply / Direct Inquiry |
| Invoices Received | How many PDFs sent | Number | 5 |
| Date Received | When PDFs arrived | YYYY-MM-DD | 2026-02-09 |
| Processing Status | Current stage | Dropdown | Pending / In Progress / Complete |
| Date Started | When processing began | YYYY-MM-DD HH:MM | 2026-02-09 10:00 |
| Date Completed | When finished | YYYY-MM-DD HH:MM | 2026-02-09 11:23 |
| Processing Time | Minutes spent | Number (auto-calc) | 83 |
| Line Items Extracted | Total data points | Number | 127 |
| Issues Found | Any problems detected | Text | Duplicate entry on inv #4521 |
| Quality Score | Extraction quality (1-10) | Number | 9 |
| Date Delivered | When sent to customer | YYYY-MM-DD | 2026-02-09 |
| Delivery Format | File type sent | Dropdown | Excel / CSV / PDF |
| Customer Feedback | Their response | Text | "Looks great, exactly what I need!" |
| Satisfaction Rating | Their rating (1-5) | Number | 5 |
| Follow-up Sent | Sent conversion email | Checkbox | ☑ |
| Converted to Customer | Did they buy? | Checkbox | ☐ |
| Days to Conversion | Time from sample to sale | Number (auto-calc) | - |
| Conversion Value | First payment amount | Currency | - |
| Notes | Additional details | Text | Fast turnaround impressed them |

### Sample Processing Workflow Checklist

For each sample request:

1. **Receive Request** (within 1 hour):
   - [ ] Log in Samples tab
   - [ ] Send upload link to customer
   - [ ] Set expected turnaround time

2. **Receive Invoices** (same day):
   - [ ] Download all PDFs
   - [ ] Log count in "Invoices Received"
   - [ ] Update status to "In Progress"

3. **Process Invoices** (within 24 hours):
   - [ ] Extract data (see EXTRACTION_WORKFLOW.md)
   - [ ] QA check all data
   - [ ] Format for their accounting system
   - [ ] Flag any issues found
   - [ ] Update processing time

4. **Deliver Results** (immediately after processing):
   - [ ] Email results with summary
   - [ ] Include time comparison
   - [ ] Highlight any issues caught
   - [ ] Update status to "Complete"

5. **Follow Up** (2-3 days later):
   - [ ] Send conversion email (Email Template #5)
   - [ ] Ask for feedback
   - [ ] Answer any questions

### Automation Rules (Peggy's Jobs)

**Immediately upon sample request:**
- [ ] Create entry in Samples tab
- [ ] Send upload link to customer
- [ ] Alert Troy if this is high-priority lead

**Within 24 hours of receiving invoices:**
- [ ] Complete processing
- [ ] Deliver results
- [ ] Log all metrics

**2-3 days after delivery:**
- [ ] Send conversion follow-up
- [ ] Update conversion status

---

## TAB 4: Customers

### Purpose
Track active customers, revenue, retention, and satisfaction.

### Columns

| Column | Description | Format | Example |
|--------|-------------|--------|---------|
| Customer ID | Unique identifier | C-XXXX | C-0001 |
| Lead ID | Original lead ID | L-XXXX | L-0001 |
| Name | Contact name | Text | John Smith |
| Company | Business name | Text | ABC Supply Co |
| Email | Primary email | Email | john@abcsupply.com |
| Date Acquired | Became customer | YYYY-MM-DD | 2026-02-15 |
| Plan Type | Subscription level | Dropdown | Monthly Unlimited / Pay-Per-Batch |
| Monthly Fee | Recurring charge | Currency | $179.00 |
| Billing Cycle | Payment frequency | Dropdown | Monthly / Per Batch |
| Payment Method | How they pay | Dropdown | Credit Card / Invoice / PayPal |
| Total Revenue | Lifetime value | Currency (auto-calc) | $358.00 |
| Months Active | Retention period | Number (auto-calc) | 2 |
| Avg Invoices/Month | Volume processed | Number | 42 |
| Total Invoices Processed | All-time count | Number | 84 |
| Last Processing Date | Most recent job | YYYY-MM-DD | 2026-02-09 |
| Satisfaction Score | Overall rating (1-5) | Number | 5 |
| Status | Account status | Dropdown | Active / Paused / Churned |
| Renewal Date | Next billing | YYYY-MM-DD | 2026-03-15 |
| At-Risk Flag | Churn indicators | Checkbox | ☐ |
| At-Risk Reason | Why flagged | Text | - |
| Support Tickets | Issues reported | Number | 0 |
| Referrals Given | New customers referred | Number | 1 |
| Notes | Important details | Text | Very happy, referred friend |

### Customer Health Indicators

**Green (Healthy):**
- ✅ Active for 3+ months
- ✅ Consistent monthly volume
- ✅ No support issues
- ✅ Responds to check-ins positively
- ✅ Provided testimonial or referral

**Yellow (At-Risk):**
- ⚠️ Volume decreased 30%+ in last month
- ⚠️ Late payment (first time)
- ⚠️ Multiple support tickets
- ⚠️ Mentioned budget concerns
- ⚠️ Slow to provide invoices

**Red (High Churn Risk):**
- 🚨 No activity for 30+ days
- 🚨 Payment failed
- 🚨 Explicitly mentioned canceling
- 🚨 Quality complaints
- 🚨 Found competitor

### Automation Rules (Peggy's Jobs)

**Weekly:**
- [ ] Update "Last Processing Date" for all customers
- [ ] Calculate avg invoices/month
- [ ] Flag at-risk customers (based on indicators above)
- [ ] Calculate total revenue and months active

**Monthly:**
- [ ] Send satisfaction survey to customers 30+ days
- [ ] Check in with at-risk customers
- [ ] Request testimonials from happy customers (5-star)
- [ ] Update renewal dates

**Quarterly:**
- [ ] Review customer health scores
- [ ] Identify upsell opportunities (pay-per-batch → monthly)
- [ ] Calculate retention rate
- [ ] Analyze churn reasons

---

## TAB 5: Metrics Dashboard

### Purpose
Visual dashboard showing KPIs and trends at a glance.

### Key Metrics

**Lead Generation:**
- Total Leads: [COUNT from Leads tab]
- Leads Added This Week: [COUNT where Date Added = last 7 days]
- Leads by Source: [PIE CHART - Reddit, LinkedIn, Facebook, etc.]
- Leads by Priority: [PIE CHART - High, Medium, Low]
- Average Lead Score: [AVERAGE of Lead Score]

**Outreach Performance:**
- Total Emails Sent: [COUNT from Outreach tab]
- Open Rate: [Opens / Sent]
- Reply Rate: [Replies / Sent]
- Sample Request Rate: [Sample Requests / Sent]
- Top Performing Template: [Highest conversion rate]

**Sample Conversion:**
- Total Samples Delivered: [COUNT from Samples tab]
- Sample-to-Customer Rate: [Customers / Samples]
- Average Processing Time: [AVERAGE of Processing Time]
- Average Time to Conversion: [AVERAGE of Days to Conversion]
- Customer Satisfaction (Samples): [AVERAGE of Satisfaction Rating]

**Customer Metrics:**
- Total Customers: [COUNT from Customers tab where Status = Active]
- Monthly Recurring Revenue (MRR): [SUM of Monthly Fee where Plan = Monthly]
- Total Revenue (All-Time): [SUM of Total Revenue]
- Average Customer Lifetime: [AVERAGE of Months Active]
- Churn Rate: [Churned Customers / Total Customers]
- Customer Satisfaction: [AVERAGE of Satisfaction Score]

**Sales Funnel:**
```
100 Leads Added
  ↓ 15% reply rate
15 Positive Responses
  ↓ 50% request sample
8 Samples Delivered
  ↓ 30% convert
2-3 New Customers
```

**Graphs to Include:**
1. Leads Added Over Time (line chart)
2. Conversion Funnel (funnel chart)
3. Revenue Growth (bar chart by month)
4. Outreach Performance by Template (bar chart)
5. Customer Retention Curve (line chart)

### Weekly Review Checklist (Peggy + Troy)

Every Monday morning:
- [ ] Review dashboard metrics
- [ ] Identify what's working (double down)
- [ ] Identify what's not working (adjust)
- [ ] Set goals for the week
- [ ] Review at-risk customers
- [ ] Prioritize high-value leads

---

## Data Entry Standards

### Consistency Rules

**Dates:**
- Always use YYYY-MM-DD format
- Use formulas for auto-calculation when possible

**Names:**
- First name + Last name (John Smith, not JOHN SMITH)
- Company names as they appear on website (proper caps)

**Emails:**
- All lowercase (john@company.com)
- Verify before adding (use email verification tool)

**Sources:**
- Use consistent categories:
  - Reddit r/FulfillmentByAmazon
  - Reddit r/shopify
  - LinkedIn (direct)
  - Facebook - [Group Name]
  - Referral - [Referrer Name]
  - Website Inquiry

**Status Updates:**
- Update immediately when status changes
- Always include "Last Activity" date
- Add notes explaining status changes

---

## Google Sheets Setup Instructions

### Initial Setup (Troy to create, share with Peggy)

1. **Create new Google Sheet**: "PDF_Extraction_Sales_Tracker"

2. **Create 5 tabs** with these exact names:
   - Leads
   - Outreach
   - Samples
   - Customers
   - Metrics

3. **Add column headers** (copy from this document)

4. **Set up data validation** (dropdowns):
   - Status fields: Create dropdown with allowed values
   - Priority fields: High / Medium / Low
   - Plan Type: Monthly Unlimited / Pay-Per-Batch
   - Etc.

5. **Add conditional formatting**:
   - High priority leads: Green highlight
   - At-risk customers: Red highlight
   - Overdue follow-ups: Yellow highlight

6. **Create formulas**:
   - Auto-calculate dates (days since last contact, etc.)
   - Auto-calculate revenue totals
   - Auto-link tabs by ID

7. **Share with Peggy**: Give edit access

### Sample Row (Leads Tab)

```
L-0001 | 2026-02-09 | John Smith | ABC Supply Co | Owner | john@abcsupply.com | linkedin.com/in/johnsmith | | Reddit | r/FulfillmentByAmazon Jan 15 post | Amazon FBA | $500K-$2M | 45 | "drowning in invoice paperwork" | QuickBooks | 9 | New | High | Posts frequently about scaling ops | high-volume, growing, QB-user | 2026-02-09 | Send initial email | Peggy
```

---

## Backup & Security

**Daily Backup:**
- Google Sheets auto-saves (cloud-based)
- Export to CSV weekly (stored in ~/repos/pdf-extraction-service/data/)
- Troy has owner access (can restore if needed)

**Access Control:**
- Troy: Owner (full access)
- Peggy: Editor (full access)
- Others: View-only (if needed for contractors)

**Data Privacy:**
- No sensitive financial data (invoices) stored in tracker
- Only contact info and business metrics
- Comply with CAN-SPAM (track opt-outs)

---

## Daily Workflow (Peggy's Routine)

### Morning (9:00 AM):
1. **Check Metrics tab** - Review yesterday's performance
2. **Check Outreach tab** - Any replies overnight? Respond immediately.
3. **Check Samples tab** - Any pending samples? Process ASAP.
4. **Check Customers tab** - Any at-risk flags? Reach out.

### Midday (1:00 PM):
5. **Add new leads** - Research and add 5-10 qualified leads to Leads tab
6. **Send outreach emails** - Contact 10-15 leads (initial or follow-ups)
7. **Update statuses** - Log all activity in appropriate tabs

### Afternoon (4:00 PM):
8. **Follow up on samples** - Any delivered 2-3 days ago? Send conversion email.
9. **Update metrics** - Calculate daily performance
10. **Plan tomorrow** - Flag leads/actions for next day

### Evening (7:00 PM):
11. **Final email check** - Respond to any late replies
12. **Update Last Activity dates** - Ensure all tabs current
13. **Report to Troy** - Summary of day's activity (if needed)

---

## Reporting Cadence

**Daily** (if activity):
- Quick summary to Troy: "Added X leads, sent Y emails, Z replies"

**Weekly** (every Monday):
- Full metrics review
- Wins and challenges
- Plan for the week

**Monthly** (first Monday):
- Performance dashboard
- Revenue update
- Customer health report
- Recommendations for next month

---

## Success Criteria

**Month 1 Goals:**
- ✅ 100 qualified leads added
- ✅ 80% leads contacted (initial email sent)
- ✅ 15% reply rate achieved
- ✅ 10 samples delivered
- ✅ 3-5 customers acquired

**Month 3 Goals:**
- ✅ 300 total leads
- ✅ 20 active customers
- ✅ $3,000+ MRR
- ✅ 25% sample-to-customer conversion
- ✅ 4.5+ customer satisfaction score

---

*Last Updated: 2026-02-09*
*Owner: Peggy (AI Assistant)*
