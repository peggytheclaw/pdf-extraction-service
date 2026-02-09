# 📊 Tracking System - Operations Management

**How Peggy will track everything and keep you updated**

---

## 🎯 OVERVIEW

**Goal:** Know the status of every lead, sample, and customer at all times

**Tools:**
- Google Sheets (main tracking)
- Discord (notifications)
- GitHub (documentation backups)

**Stakeholders:**
- Troy: Owner, can view/edit everything
- Peggy: Automated updates, daily management

---

## 📋 GOOGLE SHEETS STRUCTURE

### Tab 1: LEADS

**Purpose:** Track all cold outreach prospects

**Columns:**
```
A: Date Added (auto)
B: Name (first/full)
C: Email (verified)
D: Company/Store
E: Source (Reddit/LinkedIn/Forum/etc.)
F: Segment (Amazon/Shopify/Bookkeeper/Contractor)
G: Status (NEW → CONTACTED → REPLIED → SAMPLE_SENT → CONVERTED → LOST)
H: Last Contact Date
I: Follow-Up Due (auto: last contact + 3 days)
J: Notes (personalization, context)
K: Reply Text (what they said)
```

**Status Flow:**
```
NEW (added to list, not contacted)
  ↓
CONTACTED (initial email sent)
  ↓
REPLIED (they responded)
  ↓
SAMPLE_SENT (delivered free extraction)
  ↓
CONVERTED (became paying customer) ✅
OR
LOST (not interested / no response after 3 emails) ❌
```

**Automation:**
- Peggy updates status after each action
- Follow-up due dates calculated automatically
- Conditional formatting: RED if overdue, YELLOW if due today

**Weekly Cleanup:**
- Archive LOST leads after 30 days
- Move CONVERTED leads to CUSTOMERS tab

---

### Tab 2: SAMPLES

**Purpose:** Track free sample extractions (pre-sale)

**Columns:**
```
A: Date Requested
B: Name
C: Email
D: Company
E: Document Type (Invoice/Receipt/Statement/etc.)
F: What They Need (vendor, amount, dates, line items...)
G: Status (RECEIVED → PROCESSING → DELIVERED → CONVERTED/LOST)
H: Date Delivered
I: Conversion Status (PENDING/YES/NO)
J: Conversion Date (if YES)
K: Notes (issues, feedback, quality)
```

**Status Flow:**
```
RECEIVED (sample email arrived)
  ↓
PROCESSING (Troy working on extraction)
  ↓
DELIVERED (sent results back)
  ↓
CONVERTED (they signed up) ✅
OR
LOST (didn't convert) ❌
```

**SLA Tracking:**
- Target: RECEIVED → DELIVERED within 24 hours
- Red flag if >48 hours in PROCESSING
- Peggy sends reminder if overdue

**Conversion Window:**
- Track up to 7 days after delivery
- If no response by day 7 → mark LOST
- Track conversion rate weekly

---

### Tab 3: CUSTOMERS

**Purpose:** Active paying customers

**Columns:**
```
A: Sign-Up Date
B: Name
C: Email
D: Company
E: Plan (Starter $49 / Business $149 / Enterprise $399)
F: MRR (monthly recurring revenue)
G: Last Document Date
H: Total Documents Processed (lifetime)
I: Documents This Month
J: Status (ACTIVE / AT_RISK / CHURNED)
K: Next Billing Date
L: Notes (preferences, issues, feedback)
```

**Status Definitions:**
- **ACTIVE:** Using service regularly (docs in last 7 days)
- **AT_RISK:** No docs in 7-14 days (send check-in)
- **CHURNED:** Cancelled or no docs in 30+ days

**Health Monitoring:**
```
GREEN: Last doc < 7 days ago (active)
YELLOW: Last doc 7-14 days ago (check in)
RED: Last doc > 14 days ago (at risk)
```

**Automated Actions:**
- Peggy checks daily
- Yellow → Send check-in email
- Red → Flag for Troy (might cancel)

---

### Tab 4: DOCUMENTS (Customer Activity)

**Purpose:** Track every document processed for paying customers

**Columns:**
```
A: Date Received
B: Customer Name
C: Document Type
D: Pages
E: Status (RECEIVED → PROCESSING → DELIVERED)
F: Date Delivered
G: Turnaround Time (hours)
H: Issues/Notes
```

**SLA Targets:**
- Business hours: 2-hour turnaround
- After hours: 24-hour turnaround

**Tracking:**
- Daily volume
- Average turnaround time
- Quality issues
- Customer satisfaction

---

### Tab 5: METRICS (Weekly Summary)

**Purpose:** Track key performance indicators

**Columns:**
```
A: Week Starting
B: Emails Sent
C: Replies
D: Reply Rate %
E: Samples Requested
F: Samples Delivered
G: Sample → Customer Conversion
H: Conversion Rate %
I: New Customers
J: New MRR
K: Total MRR
L: Churn (customers lost)
M: Net MRR Change
N: Notes
```

**Formulas:**
- Reply Rate % = (Replies / Emails Sent) × 100
- Conversion Rate % = (Conversions / Samples Delivered) × 100
- Net MRR Change = New MRR - Churned MRR

**Weekly Review:**
- Peggy fills in every Monday
- Compare to previous week
- Identify trends
- Plan optimizations

---

### Tab 6: FEEDBACK

**Purpose:** Learn from customer conversations

**Columns:**
```
A: Date
B: Contact
C: Type (Why No / Feature Request / Complaint / Praise)
D: Feedback Text
E: Action Taken
F: Follow-Up Needed
```

**Categories:**
- **Why No:** Why people didn't convert
- **Feature Request:** What customers want
- **Complaint:** What's not working
- **Praise:** What's working well

**Usage:**
- Review monthly
- Identify patterns
- Prioritize fixes/features
- Use praise as testimonials

---

## 🔔 NOTIFICATION SYSTEM

### Discord Alerts (Real-Time)

**Channel:** #pdf-extraction-service

**High Priority (Immediate):**
```
🚨 NEW SAMPLE REQUEST
Name: Jane Doe
Company: AcmeStore
Email: jane@acmestore.com
Document: Invoice
Status: RECEIVED
Action needed: Extract within 24 hours
[Link to tracking sheet]
```

**Medium Priority (Daily Digest):**
```
📊 Daily Launch Report - [Date]

Yesterday's Activity:
- Emails sent: 20
- Replies: 3 (see LEADS tab)
- Samples delivered: 1

Your Action Items:
- [ ] Extract sample for Mike (received yesterday)
- [ ] Follow up with Sarah (replied but needs clarification)

Progress: 2/3 customers this week
[Link to sheet]
```

**Low Priority (Weekly):**
```
📈 Week 1 Summary

Results:
- 100 emails sent
- 6 replies (6%)
- 2 samples delivered
- 1 conversion! 🎉

Next week plan:
- Send 150 emails
- Follow up with 4 hot leads
- Expected: 2 more customers

[Full metrics in sheet]
```

---

## 🤖 AUTOMATION WORKFLOW

### Lead Outreach Automation

**Step 1: Lead Added (Manual or Peggy)**
```
1. Troy/Peggy finds lead
2. Adds to LEADS tab with personalization notes
3. Status: NEW
4. Follow-up due: Today
```

**Step 2: Email Sent (Peggy)**
```
1. Peggy drafts personalized email
2. Troy approves (first 10 to set style)
3. Peggy sends
4. Updates sheet:
   - Status: CONTACTED
   - Last Contact Date: [today]
   - Follow-Up Due: [today + 3 days]
```

**Step 3: Response Tracking (Auto)**
```
1. Reply comes to samples@domain
2. Peggy monitors inbox
3. Updates sheet:
   - Status: REPLIED
   - Reply Text: [what they said]
4. Notifies Troy in Discord
5. Peggy drafts response
```

**Step 4: Follow-Ups (Auto)**
```
Day 3: No response?
- Peggy sends Follow-Up #1
- Updates sheet: Follow-Up Due = +4 days

Day 7: Still no response?
- Peggy sends Follow-Up #2 (final)
- Updates sheet: Follow-Up Due = N/A
- Status stays CONTACTED (give them space)

Day 14: No response?
- Status → LOST
- Archive to separate tab
```

---

### Sample Request Automation

**Instant Response (Peggy):**
```
1. Sample request arrives
2. Peggy responds within 5 mins
3. Adds to SAMPLES tab
4. Notifies Troy
5. Sets status: RECEIVED
```

**Processing Alert:**
```
If >24 hours in RECEIVED:
- Peggy sends Troy reminder
- Highlights in sheet (RED)

If >48 hours:
- Peggy escalates: "⚠️ URGENT: Sample overdue"
```

**Delivery Follow-Up:**
```
Day 0: Sample delivered
- Status: DELIVERED
- Conversion status: PENDING

Day 2: No response?
- Peggy sends: "Did you get a chance to review?"

Day 7: Still no response?
- Peggy asks: "Not a fit? Any feedback?"
- Status: LOST (track reason)
```

---

### Customer Monitoring (Daily)

**Every Morning (Peggy):**
```
1. Check CUSTOMERS tab
2. For each customer:
   - Last doc date < 7 days? → GREEN (all good)
   - Last doc date 7-14 days? → YELLOW (send check-in)
   - Last doc date >14 days? → RED (flag for Troy)
3. Send daily report to Troy
```

**Check-In Email (Auto):**
```
Trigger: Yellow status (7-14 days)

Email:
"Hey [Name]! Just checking in - everything going okay?
Haven't seen any docs from you this week. Let me know
if you need anything! - Troy"
```

**Churn Risk Alert (Manual):**
```
Trigger: Red status (>14 days)

Discord:
"🚨 CHURN RISK: [Name] - no docs in 2+ weeks
Last activity: [date]
Action: Troy to reach out personally"
```

---

## 📈 WEEKLY REVIEW PROCESS

**Every Monday (Peggy + Troy):**

### 1. Update Metrics Tab
```
Peggy fills in:
- Emails sent last week
- Reply/conversion rates
- New MRR
- Churn (if any)
```

### 2. Analyze Results
```
Questions:
- What's working? (reply rates, segments, messages)
- What's not? (low conversion, high churn)
- Any patterns in feedback?
```

### 3. Adjust Strategy
```
Examples:
- eCommerce: 8% reply rate → send more!
- Bookkeepers: 2% reply rate → pause this segment
- "Too expensive": 3 people said → test lower pricing tier?
```

### 4. Plan Next Week
```
- Email volume (increase/decrease?)
- Segment focus (double down or pivot?)
- New experiments (subject lines, offers, etc.)
```

---

## 🛠️ TOOLS & INTEGRATIONS

### Current (Manual):
- Google Sheets (tracking)
- Gmail (email)
- Discord (notifications)

### Future (Automated):
- Zapier/Make: Auto-update sheet from Gmail
- Stripe: Track payments automatically
- QuickBooks: Revenue tracking

---

## ✅ DAILY CHECKLIST

### Peggy's Morning Routine:
- [ ] Check LEADS tab for follow-ups due today
- [ ] Check SAMPLES tab for overdue extractions
- [ ] Check CUSTOMERS tab for health status
- [ ] Send daily report to Troy
- [ ] Update any pending statuses

### Troy's Morning Routine:
- [ ] Read Peggy's daily report
- [ ] Handle any flagged action items
- [ ] Approve any pending emails (if needed)
- [ ] Extract any pending samples

---

## 📊 REPORTS & EXPORTS

### Daily Report (Email to Troy):
```
Subject: Launch Day [X] - [Date]

📧 Email Activity:
- Sent: 20
- Replies: 2 (Jane, Mike)
- Follow-ups due: 3

📋 Samples:
- Pending extraction: 1 (Sarah's invoice)
- Delivered yesterday: 1 (Mike - awaiting conversion)

💰 Customers:
- Total: 2
- MRR: $98
- All healthy (recent activity)

Action Items:
- [ ] Extract Sarah's invoice (due in 12 hours)
- [ ] Follow up with Mike if no response by EOD

[View full sheet: link]
```

### Weekly Summary (Mondays):
```
Subject: Week [X] Summary - PDF Service

Results:
✅ 100 emails → 6 replies (6%)
✅ 2 samples delivered
✅ 1 conversion ($49 MRR)
❌ 1 lost (too expensive)

This Week's Plan:
- 150 emails (scaling up)
- Focus on eCommerce (best segment)
- New subject line test

[Full metrics in sheet]
```

---

## 🎯 SUCCESS METRICS TO TRACK

### Week 1:
- Email volume
- Reply rate (target: >5%)
- Sample requests (target: 2+)

### Week 2:
- Sample → Customer conversion (target: >20%)
- First paying customer!
- Customer satisfaction

### Month 1:
- Total customers (target: 3-5)
- MRR (target: $150-250)
- Churn rate (target: <10%)
- Re-order rate (target: >80%)

---

**Everything tracked, nothing forgotten!** 📊🐧
