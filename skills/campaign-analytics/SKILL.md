# Campaign Analytics Skill

## Purpose
Track, analyze, and report on email campaign performance to optimize outreach strategy.

## Data Sources

**Primary:** `data/leads.csv`

**Metrics tracked:**
- Lead source effectiveness
- Segment conversion rates
- Email template performance
- Reply rates by priority
- Time-to-reply patterns

## Key Metrics

### 1. Pipeline Overview
```
Total Leads: X
├─ NEW: X (not yet qualified)
├─ QUALIFIED: X (ready for outreach)
├─ CONTACTED: X (initial email sent)
│  ├─ FOLLOW_UP_1: X (3-day follow-up sent)
│  └─ FOLLOW_UP_2: X (7-day final sent)
├─ REPLIED: X (any response)
├─ SAMPLE_SENT: X (free extraction delivered)
├─ CONVERTED: X (became paying customer)
└─ NO_RESPONSE: X (no reply after 3 emails)
```

### 2. Conversion Funnel
```
QUALIFIED → CONTACTED: X% reach rate
CONTACTED → REPLIED: X% reply rate (TARGET: 10%+)
REPLIED → SAMPLE_SENT: X% sample conversion
SAMPLE_SENT → CONVERTED: X% customer conversion
```

### 3. Segment Performance
```
Amazon FBA:
- Contacted: X | Replied: X (X%) | Converted: X

Shopify:
- Contacted: X | Replied: X (X%) | Converted: X

Bookkeepers:
- Contacted: X | Replied: X (X%) | Converted: X

Contractors:
- Contacted: X | Replied: X (X%) | Converted: X
```

**Insight:** Which segment has highest reply rate? Focus more research there.

### 4. Template Performance
```
Template 1 (eCommerce): Sent X | Replied X (X%)
Template 2 (Bookkeepers): Sent X | Replied X (X%)
Template 3 (Follow-up #1): Sent X | Replied X (X%)
Template 4 (Follow-up #2): Sent X | Replied X (X%)
```

**Insight:** Which template gets best response? Use learnings to improve others.

### 5. Source Quality
```
Reddit r/FBA: Leads X | Reply rate X%
Shopify Forums: Leads X | Reply rate X%
LinkedIn: Leads X | Reply rate X%
Indie Hackers: Leads X | Reply rate X%
```

**Insight:** Which source produces highest-quality leads? Prioritize that source.

### 6. Priority Accuracy
```
P1 (High): Contacted X | Replied X (X%) | Expected: 15-25%
P2 (Medium): Contacted X | Replied X (X%) | Expected: 8-15%
P3 (Low): Contacted X | Replied X (X%) | Expected: 3-8%
```

**Insight:** If P1 reply rate < 15%, qualification criteria too loose.

## Report Formats

### Daily Quick Check (Heartbeat)
```
📊 PDF Extraction Campaign - Daily Update

New Leads: X qualified today
Outreach: X emails sent
Replies: X new replies (X pending Troy response)
Samples: X sent this week

🎯 This Week So Far:
- Sent: X emails
- Replied: X (X% reply rate)
- Target: 10%+ reply rate

⚠️ Action Items:
- [X replies need response]
- [X follow-ups due tomorrow]
```

### Weekly Deep Dive (Friday 5pm)
```
📊 WEEKLY CAMPAIGN REPORT - Week of [Date]

## Pipeline
- Total active leads: X
- This week: +X new | X contacted | X replied

## Performance
✅ Reply rate: X% (target: 10%+)
✅ Sample requests: X
✅ Conversions: X customers

## Best Performers
🥇 Segment: [Best segment] (X% reply rate)
🥇 Source: [Best source] (X leads, X% reply)
🥇 Template: Template X (X% reply rate)

## What's Working
- [Specific insight - e.g., "Bookkeepers have 18% reply rate!"]
- [Pattern noticed - e.g., "Replies come within 24hrs or never"]

## What Needs Improvement
- [Low performer - e.g., "Contractor segment only 3% reply rate"]
- [Bottleneck - e.g., "10 sample requests pending, need faster turnaround"]

## Action Items for Next Week
- [ ] Focus more research on [high-performing segment]
- [ ] A/B test subject lines for [template]
- [ ] Improve qualification for [segment]

---
Next report: [Next Friday date]
```

### Monthly Strategic Review
```
📊 MONTHLY CAMPAIGN REVIEW - [Month Year]

## Overall Stats
- Total leads generated: X
- Total outreach sent: X
- Total replies: X (X% overall reply rate)
- Total conversions: X customers
- Revenue: $X

## Trends
📈 Improving: [What got better]
📉 Declining: [What got worse]
🔄 Changed: [What we adjusted]

## Customer Profile Emerging
Based on conversions, ideal customer is:
- Segment: [Most converted segment]
- Pain point: [Common thread]
- Business size: [Pattern noticed]

## Strategy Adjustments for Next Month
1. [Big change based on data]
2. [Focus shift based on performance]
3. [New experiment to try]
```

## Output Files

**Save reports to:**
- `data/reports/daily/YYYY-MM-DD.txt` (daily heartbeat)
- `data/reports/weekly/YYYY-MM-DD.txt` (Friday reports)
- `data/reports/monthly/YYYY-MM.txt` (end of month)

**Metrics JSON:**
- `data/metrics.json` (live updating stats for dashboards)

## Insights Engine

### Automated Pattern Detection

**Flag when:**
- Reply rate drops below 8% (quality issue)
- One segment performs 2x better than others (shift focus)
- Follow-up templates perform better than initial (adjust first email)
- Certain pain points get better response (refine targeting)
- Time patterns (e.g., "emails sent Monday morning = 2x replies")

## A/B Testing Tracking

**When testing variations:**
```
Test: Subject line A vs B
Segment: Amazon FBA sellers
Sample size: 50 each
Results:
- Variant A: "Quick question about invoice processing" - 12% reply
- Variant B: "Idea for [business name]" - 8% reply
Winner: Variant A → use for all future
```

Track in: `data/experiments.json`

## Alerts & Recommendations

**Auto-alert Troy when:**
- 🚨 Reply rate < 5% (quality problem, pause and review)
- 🎉 Reply rate > 15% (something's working, double down)
- ⚠️ Lead pipeline < 20 qualified (need more research)
- 📈 One source/segment crushes others (shift strategy)

## Usage

**Heartbeat triggers:**

**Daily (9am):**
- Quick pipeline check
- Flag urgent action items (replies waiting, follow-ups due)

**Weekly (Friday 5pm):**
- Deep dive report
- Insights and recommendations
- Action items for next week

**Monthly (1st of month):**
- Strategic review
- Big-picture trends
- Strategy adjustments

**Ad-hoc:**
- Run analysis when Troy asks "How's the campaign going?"
- Compare before/after when we test changes
