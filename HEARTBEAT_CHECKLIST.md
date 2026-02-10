# ParsleyPDF Campaign Heartbeat Checklist

This file is referenced by Peggy's main `HEARTBEAT.md` to monitor the PDF extraction service lead campaign.

---

## 🔄 Every 2 Hours (9am-6pm) - Email Monitoring

**IF EMAIL IS SET UP (currently BLOCKED):**

### Check for Replies
1. Monitor campaign email inbox (IMAP)
2. Match replies to leads in `data/leads.csv` by email address
3. Update lead status: `CONTACTED` → `REPLIED`
4. Categorize reply type:
   - ✅ **Positive:** Interested, wants sample, asking questions
   - 🤔 **Neutral:** "Thanks but not now", polite decline
   - ❌ **Negative:** Annoyed, unsubscribe request
5. **Alert Troy immediately for positive replies:**
   ```
   🔔 #pdf-extraction-service - Reply from [Name] ([Business])
   Type: Positive - wants free sample
   Action: Respond + request sample PDF
   [Link to email or quote]
   ```

### Quick Response Check
- Are there any pending replies Troy hasn't responded to?
- If > 24 hours old, gentle reminder

**IF NO EMAIL YET:**
- Skip this check
- Note: "Email monitoring BLOCKED - waiting for email setup"

---

## 📅 Daily Check (9am) - Pipeline & Outreach

### 1. Lead Research Progress
- How many NEW leads added yesterday?
- Target: 10/day
- If < 5: "Need more lead research today"

### 2. Qualification Queue
- How many NEW leads need qualification?
- Run `lead-qualification` skill if > 5 unqualified leads
- Target: qualify within 24 hours of research

### 3. Outreach Queue
**IF EMAIL IS SET UP:**
- How many QUALIFIED leads ready for initial outreach?
- How many CONTACTED leads need follow-ups today?
  - 3 days since contact → Follow-up #1 (Template 3)
  - 7 days since contact → Follow-up #2 (Template 4)
- Draft emails for Troy approval (if manual) OR send (if automated)

**IF NO EMAIL YET:**
- Count ready leads: "X qualified leads ready for outreach (BLOCKED on email)"

### 4. Sample Requests
- Any REPLIED leads requesting free sample extraction?
- Alert Troy if pending > 24 hours

### 5. Daily Stats Summary
```
📊 Daily Pipeline Check

Leads:
- NEW: X (need qualification)
- QUALIFIED: X (ready for outreach)
- CONTACTED: X (waiting for reply)
- REPLIED: X (need response from Troy)

Action Items:
- [ ] X leads need qualification
- [ ] X follow-ups due today
- [ ] X replies pending response
```

**When to report:**
- Only if action items exist OR significant changes
- Otherwise: HEARTBEAT_OK

---

## 📊 Weekly Deep Dive (Friday 5pm)

### Run Campaign Analytics
1. Read `skills/campaign-analytics/SKILL.md`
2. Generate full weekly report
3. Post to #pdf-extraction-service on Discord

### Report Includes:
- Pipeline overview (leads at each stage)
- Performance metrics (reply rate, conversions)
- Segment/source/template performance
- What's working / what needs improvement
- Action items for next week

### Example Report:
```
📊 WEEKLY CAMPAIGN REPORT - Week of Feb 10-16, 2026

## This Week
- Leads researched: 47 (Target: 50 ✅)
- Emails sent: 35
- Replies: 6 (17% reply rate 🎉 - above 10% target!)
- Sample requests: 3
- Conversions: 1 customer! 💰

## Best Performers
🥇 Segment: Bookkeepers (25% reply rate!)
🥇 Source: Reddit r/FBA (22% reply rate)
🥇 Template: Template 2 (Bookkeeper-specific)

## Insights
- Bookkeepers are crushing it - they REALLY feel the pain
- Reddit leads reply faster than LinkedIn (within 24hrs)
- Follow-up #1 actually working (3 replies from follow-ups)

## Action Items Next Week
- [ ] Double down on bookkeeper research (proven segment)
- [ ] Add 2-3 more bookkeeper-specific sources
- [ ] A/B test subject lines for Amazon FBA (lower reply rate)

---
Next report: Friday Feb 23, 5pm
```

---

## 🚀 Campaign Status Tracking

### Current Status: **PRE-LAUNCH**

**Launch Blockers:**
- [ ] Email account set up (troy@parsleypdf.com or similar)
- [ ] IMAP/SMTP credentials configured
- [ ] First 20 leads researched and qualified
- [ ] Troy approval to start sending

**Once Unblocked:**
- Switch status to **ACTIVE**
- Enable email monitoring (every 2 hours)
- Begin outreach sending (manual or automated per Troy preference)

### Status Definitions:
- **PRE-LAUNCH:** Building infrastructure, blocked on email
- **ACTIVE:** Outreach running, monitoring replies
- **PAUSED:** Campaign temporarily stopped (Troy request or issue)
- **ARCHIVED:** Campaign complete or discontinued

---

## 🎯 Success Metrics (Weekly Targets)

**Lead Generation:**
- 50+ new leads/week
- 70%+ qualification rate

**Outreach:**
- 30-50 emails sent/week (ramp up slowly)
- 10%+ reply rate (industry standard for cold email)

**Conversion:**
- 2-3 sample requests/week
- 1+ new customer/month (initially)

---

## 🔴 Alert Triggers

**Immediate Alert to Troy:**
- ✅ Any positive reply to campaign email
- ⚠️ Reply rate drops below 5% (quality issue)
- 🎉 Reply rate above 15% (something's working!)
- 🚨 Spam complaint or negative feedback
- 💰 Lead converts to paying customer

**Weekly Alert:**
- Lead pipeline < 20 qualified (need more research)
- Follow-ups overdue > 3 days
- Sample requests pending > 48 hours

---

## 📁 File Locations

**Data:**
- `data/leads.csv` - Master lead list
- `data/metrics.json` - Live campaign stats
- `data/campaigns/` - Campaign batches
- `data/reports/` - Daily/weekly/monthly reports

**Skills:**
- `skills/lead-research/SKILL.md`
- `skills/lead-qualification/SKILL.md`
- `skills/outreach-manager/SKILL.md`
- `skills/campaign-analytics/SKILL.md`

**Templates:**
- `EMAIL_TEMPLATES.md` - All email templates

---

## 🐧 Peggy's Role

**Automated (via heartbeat):**
- Monitor email replies (when set up)
- Track pipeline status
- Generate reports
- Alert on important events

**Manual (Troy approval required):**
- Lead research (Troy can review quality)
- Email sending (until automated approval given)
- Sample extraction (Troy provides service)
- Customer onboarding (Troy handles billing/setup)

**Never automated:**
- Responding to customer emails (Troy's voice)
- Pricing negotiations (Troy decides)
- Sample extraction delivery (Troy quality-checks)

---

## Notes

- This checklist evolves as campaign matures
- Adjust targets based on actual performance
- Add new checks as needed
- Remove checks that become irrelevant

**Last updated:** 2026-02-10 by Peggy 🐧
