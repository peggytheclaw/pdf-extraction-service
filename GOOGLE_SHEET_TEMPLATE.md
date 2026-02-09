# 📊 Google Sheets Tracking Template

**Copy this structure into a new Google Sheet**

---

## TAB 1: LEADS

### Columns:
```
A: Date Added
B: Name
C: Email
D: Company/Store
E: Source (Reddit/LinkedIn/Forum)
F: Segment (eCommerce/Bookkeeper/Other)
G: Status (NEW/CONTACTED/REPLIED/SAMPLE_SENT/CONVERTED/LOST)
H: Last Contact Date
I: Follow-Up Due
J: Notes
```

### Sample Data:
```
2/9/26 | John Smith | john@amazonstore.com | AmazonStore123 | Reddit r/FulfillmentByAmazon | eCommerce | CONTACTED | 2/9/26 | 2/12/26 | Interested in invoice extraction
2/9/26 | Sarah Lee | sarah@shopify.com | SarahsCrafts | LinkedIn | eCommerce | NEW | - | 2/10/26 | Found via "Shopify seller" search
```

### Status Definitions:
- **NEW:** Lead added, not contacted yet
- **CONTACTED:** Initial email sent
- **REPLIED:** They responded (interested or question)
- **SAMPLE_SENT:** Free sample delivered
- **CONVERTED:** Became paying customer
- **LOST:** Not interested / no response after follow-ups

---

## TAB 2: SAMPLES

### Columns:
```
A: Date Requested
B: Name
C: Email
D: Company
E: Document Type
F: What They Need Extracted
G: Status (RECEIVED/PROCESSING/DELIVERED/CONVERTED/LOST)
H: Date Delivered
I: Conversion Status
J: Notes
```

### Sample Data:
```
2/10/26 | Jane Doe | jane@acmestore.com | AcmeStore | Invoice | Vendor, amount, date, line items | DELIVERED | 2/11/26 | PENDING | Sent results, awaiting response
2/11/26 | Mike Brown | mike@contractingco.com | BrownConstruction | Receipt | Vendor, total, date | PROCESSING | - | - | Working on extraction
```

### Status Flow:
```
RECEIVED → PROCESSING → DELIVERED → CONVERTED (paid)
                                   → LOST (didn't convert)
```

---

## TAB 3: CUSTOMERS

### Columns:
```
A: Sign-Up Date
B: Name
C: Email
D: Company
E: Plan (Starter/Business/Enterprise)
F: MRR
G: Last Document Received
H: Total Documents Processed
I: Status (ACTIVE/CHURNED/PAUSED)
J: Notes
```

### Sample Data:
```
2/12/26 | Sarah Lee | sarah@shopify.com | SarahsCrafts | Starter | $49 | 2/14/26 | 15 | ACTIVE | Very happy, using regularly
2/13/26 | John Smith | john@amazonstore.com | AmazonStore123 | Business | $149 | 2/13/26 | 3 | ACTIVE | Just started, watch for usage
```

---

## TAB 4: METRICS (Weekly)

### Columns:
```
A: Week Starting
B: Emails Sent
C: Replies
D: Reply Rate %
E: Samples Requested
F: Samples Delivered
G: Conversions
H: Conversion Rate %
I: New MRR
J: Total MRR
K: Notes
```

### Sample Data:
```
2/9/26 | 100 | 6 | 6% | 2 | 2 | 1 | 50% | $49 | $49 | First week, eCommerce focus
2/16/26 | 150 | 12 | 8% | 4 | 4 | 2 | 50% | $198 | $247 | Scaling volume, good results
```

---

## TAB 5: EMAIL TEMPLATES

**Keep your approved templates here for easy copy-paste**

### Initial Outreach
```
Subject: Quick question about invoice processing

[Full template from EMAIL_TEMPLATES.md]
```

### Follow-Up 1
```
Subject: Re: Quick question

[Full template]
```

### Sample Delivery
```
Subject: Your Extracted Data - [Company]

[Full template]
```

---

## TAB 6: FEEDBACK & LEARNINGS

### Columns:
```
A: Date
B: Contact
C: Feedback Type (Why No/Feature Request/Complaint/Praise)
D: Feedback Text
E: Action Taken
```

### Sample Data:
```
2/12/26 | Jane Doe | Why No | "Too expensive for my volume" | Consider lower tier or pay-per-doc option
2/13/26 | Mike Brown | Praise | "This saved me 3 hours this week!" | Use as testimonial
2/14/26 | Sarah Lee | Feature Request | "Can you integrate with QuickBooks?" | Add to roadmap
```

---

## FORMULAS & AUTOMATION

### Reply Rate Calculation (Metrics Tab, Column D):
```excel
=C2/B2
```

### Conversion Rate Calculation (Metrics Tab, Column H):
```excel
=G2/F2
```

### Follow-Up Due Date (Leads Tab, Column I):
```excel
=H2+3
```
(3 days after last contact)

### Conditional Formatting:

**Leads Tab - Follow-Up Due:**
- If `Follow-Up Due < TODAY()` → Highlight RED (overdue)
- If `Follow-Up Due = TODAY()` → Highlight YELLOW (due today)

**Samples Tab - Status:**
- If `Status = "PROCESSING"` AND `Date Requested > 2 days ago` → Highlight RED (overdue)

**Customers Tab - Last Document:**
- If `Last Document < 7 days ago` → Green (active)
- If `Last Document > 7 days ago` → Yellow (watch)
- If `Last Document > 14 days` → Red (at risk)

---

## SHARING & ACCESS

### Who Gets Access:
1. **Troy** - Owner (full edit)
2. **Peggy (peggytheclaw@gmail.com)** - Editor (can update all tabs)

### How Peggy Updates:
- Via Google Sheets API (automated)
- Or manual entry for notes/feedback

### Backup Strategy:
- Peggy exports to CSV daily
- Saved in repo: `/tracking-backups/YYYY-MM-DD.csv`

---

## QUICK REFERENCE GUIDE

### Daily Tasks:
1. Check LEADS tab for follow-ups due today
2. Update SAMPLES tab with new requests
3. Mark CUSTOMERS tab with last doc dates
4. Add notes as you learn

### Weekly Tasks:
1. Fill in METRICS tab row
2. Review FEEDBACK tab for patterns
3. Archive old data (>60 days)

### Monthly Tasks:
1. Calculate total MRR growth
2. Review conversion funnel
3. Plan optimizations

---

**Template Ready!**
Copy this structure into Google Sheets and share edit access with:
- peggytheclaw@gmail.com

Once shared, I'll populate with lead lists and start tracking automatically! 📊
