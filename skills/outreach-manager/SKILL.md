# Outreach Manager Skill

## Purpose
Manage email campaign sending, follow-ups, and reply tracking for lead outreach.

## Dependencies

**Required:**
- Email account with IMAP/SMTP access (not set up yet - see BLOCKERS)
- `data/leads.csv` with QUALIFIED leads
- Email templates from `EMAIL_TEMPLATES.md`

## Process

### Step 1: Identify Leads Ready for Contact

**Initial Outreach:**
Filter `data/leads.csv` for:
- `status = QUALIFIED`
- `last_contact_date = NULL` or empty

**Follow-Ups:**
Filter for:
- `status = CONTACTED`
- `last_contact_date` + 3 days = today (Follow-up #1)
- `last_contact_date` + 7 days = today (Follow-up #2 - final)

### Step 2: Select Email Template

**By Segment:**
- `AmazonFBA` or `Shopify` → **Template 1** (eCommerce sellers)
- `Bookkeeper` → **Template 2** (Bookkeepers)
- `Contractor` → **Template 1** (adapt slightly for services)

**Follow-ups:**
- 3 days → **Template 3**
- 7 days → **Template 4** (final)

### Step 3: Personalize Email

**Merge fields from lead data:**
- `[Name]` → lead's first name
- `[Business name]` → business/brand name
- `[product category]` or `[service]` → segment-appropriate text
- `[pain point reference]` → from personalization_notes

**Example:**
```
Template says: "Saw you're selling [product category] on Amazon/Shopify."
Lead data: business="JanesHomeGoods", segment="Shopify", pain_quote="15 suppliers"
Result: "Saw you're selling home goods on Shopify. Noticed you mentioned managing 15 suppliers..."
```

### Step 4: Draft Email (Troy Approval Required)

**Before sending ANY cold outreach:**
1. Draft email with personalization
2. Save draft to `data/campaigns/YYYY-MM-DD-drafts.txt`
3. Alert Troy in Discord: "X drafts ready for review in #pdf-extraction-service"
4. Wait for approval before sending

**Once Troy approves sending process:**
- Can send P2/P3 leads automatically
- Still flag P1 leads for review (highest value)

### Step 5: Send Email (BLOCKED - No Email Yet)

**When email is set up:**
1. Send via SMTP
2. Track send timestamp
3. Update lead status

### Step 6: Update Lead Status

After sending:
```csv
status: QUALIFIED → CONTACTED
last_contact_date: YYYY-MM-DD
contact_count: increment by 1
last_template_used: Template1/Template2/etc.
```

### Step 7: Monitor Replies (BLOCKED - No IMAP Yet)

**When email monitoring is active:**
- Check IMAP every 2 hours (or continuous monitoring)
- Match replies to leads by email address
- Update status: `CONTACTED` → `REPLIED`
- Alert Troy immediately: "Reply from [Name] at [Business] - see email"

## Reply Tracking

When reply detected:
```csv
status: CONTACTED → REPLIED
reply_date: YYYY-MM-DD
reply_summary: Brief note (positive/neutral/negative/question)
```

**Alert Troy:**
```
🔔 Reply from Jane Smith (JanesHomeGoods)!
Reply type: Positive - wants free sample
Action needed: Respond + request sample PDF
```

## Follow-Up Schedule

**Timeline:**
- Day 0: Initial outreach (Template 1 or 2)
- Day 3: Follow-up #1 (Template 3) - if no reply
- Day 7: Follow-up #2 (Template 4 - final) - if no reply
- After day 7: Mark as `NO_RESPONSE`, move to backlog

**Status Flow:**
```
QUALIFIED → CONTACTED → [REPLIED or NO_RESPONSE]
                   ↓ (3 days)
              FOLLOW_UP_1
                   ↓ (7 days)
              FOLLOW_UP_2
                   ↓
              NO_RESPONSE
```

## Campaign Batching

**Best practice:**
- Send in small batches (10-20/day)
- Test subject lines with first 50 sends
- Monitor reply rates before scaling
- Don't blast all leads at once

## Metrics to Track

Per campaign/week:
- **Sent:** Total emails sent
- **Reply rate:** % of emails that got replies
- **Positive replies:** Interested in sample/learning more
- **Sample requests:** Actually asked for free extraction
- **Conversions:** Became paying customers

Save to: `data/metrics.json`

## BLOCKERS (Before Going Live)

**Must have:**
- [ ] Email account set up (troy@parsleypdf.com or similar)
- [ ] IMAP credentials for reply monitoring
- [ ] SMTP credentials for sending
- [ ] Troy approval for automated sending (or manual-only?)

**Nice to have:**
- [ ] Email tracking (open rates - optional)
- [ ] Auto-save sent emails for record-keeping
- [ ] CRM integration (future)

## Usage

**Heartbeat trigger (daily 9am):**
1. Read this skill
2. Check for QUALIFIED leads ready for initial contact
3. Check for CONTACTED leads needing follow-ups
4. Draft emails
5. Alert Troy if drafts ready OR if replies received
6. (Future) Send automatically once approved

**Heartbeat trigger (every 2 hours, 9am-6pm):**
1. Check email for replies
2. Update lead status
3. Alert Troy for any replies
