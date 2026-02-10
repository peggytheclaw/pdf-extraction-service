# Lead Qualification Skill

## Purpose
Review new leads from research and prepare them for outreach with personalization notes.

## Input
Reads from: `data/leads.csv`

Filters for: `status = NEW`

## Process

### Step 1: Review Lead Quality
For each NEW lead:

**Check Business Viability:**
- Visit their website/profile
- Confirm active business (recent activity, real products/services)
- Verify contact email works (format check, domain active)

**Assess Pain Point Fit:**
- Does their pain quote actually indicate PDF/invoice processing need?
- Is the pain significant enough to justify purchase?
- Are they currently solving it manually (not using a competitor)?

### Step 2: Build Personalization
For each qualified lead, create personalization notes:

**Required Elements:**
1. **Specific pain mention:** Quote or reference their exact problem
2. **Business context:** What they sell/do, how many suppliers/clients
3. **Why relevant:** Connection between their pain and ParsleyPDF solution

**Example:**
```
LEAD: Jane Smith, JanesHomeGoods.com
PAIN QUOTE: "Struggling to keep track of 15 different suppliers"
PERSONALIZATION:
"Saw your post in Shopify Community about managing 15 suppliers - 
curious how you handle all those invoices? Most store owners I talk 
to spend 2-3 hours/week manually entering that data."
```

### Step 3: Assign Priority (If Not Set)
If priority is empty or needs adjustment:

**P1 Criteria:**
- Pain explicitly mentioned AND
- Active business (recent posts/activity) AND
- Clear volume (multiple suppliers, high transaction count)

**P2 Criteria:**
- Business type suggests pain (ecommerce, bookkeeper) AND
- Moderate engagement/activity

**P3 Criteria:**
- Speculative fit (might have pain)
- Less clear evidence

### Step 4: Flag Ready for Outreach
Update lead status:
- `NEW` → `QUALIFIED` (ready for outreach)
- OR `DISQUALIFIED` (doesn't fit, note reason)

Add to `personalization_notes` column.

## Output Format

Updates `data/leads.csv`:
- Sets `status = QUALIFIED` or `DISQUALIFIED`
- Adds `personalization_notes` field
- Confirms/adjusts `priority`
- Adds `qualification_date`

## Quality Checklist

Before marking QUALIFIED:
- [ ] Business is active (not defunct/just starting)
- [ ] Contact email is valid format
- [ ] Pain point is clear and relevant
- [ ] Personalization is specific (not generic)
- [ ] Appropriate email template identified (Template 1 or 2)

## Disqualification Reasons

Common reasons to disqualify:
- Already using competitor (mentioned by name)
- Just starting out (no volume yet)
- No contact info available
- Pain point is unrelated to PDFs/invoices
- Business appears inactive

**Note reason in CSV** so we can learn patterns.

## Daily Target

- Qualify **all NEW leads** from previous day's research
- Aim for 70%+ qualification rate (if lower, research criteria need adjustment)

## Usage

When heartbeat triggers qualification:
1. Read this skill
2. Filter `data/leads.csv` for `status = NEW`
3. Review each lead (10-15 minutes per lead)
4. Build personalization notes
5. Update status to QUALIFIED or DISQUALIFIED
6. Report: X qualified, Y disqualified, Z ready for outreach
