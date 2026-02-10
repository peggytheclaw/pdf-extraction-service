# Lead Research Skill

## Purpose
Automate discovery and collection of potential customer leads from various online sources.

## Target Sources

### 1. Reddit r/FulfillmentByAmazon
- Active sellers discussing operations
- Pain points: supplier management, bookkeeping, inventory
- Look for posts about invoice processing, data entry, expense tracking

### 2. Shopify Community Forums
- community.shopify.com sections: "Managing Your Business", "Orders and Shipping"
- Store owners with operational challenges
- Multi-vendor operations

### 3. LinkedIn
- Search terms: "Amazon seller", "Shopify store owner", "bookkeeper", "contractor owner"
- Solo/small business owners (most likely to have pain)

### 4. Indie Hackers
- indiehackers.com - makers with active ecommerce businesses
- Usually have contact info in bio

## Research Process

### Step 1: Identify Candidates
For each source:
1. Browse recent discussions (past 7 days)
2. Look for business owners mentioning:
   - Multiple suppliers/vendors
   - Invoice management challenges
   - Data entry pain points
   - Bookkeeping overhead
3. Note specific pain points quoted

### Step 2: Qualify Lead
Check:
- ✅ Active business (recent posts, not just starting)
- ✅ Contact info available (website, email, LinkedIn)
- ✅ Fits target segment (ecommerce, bookkeeper, contractor, etc.)
- ❌ Skip: Just starting out, using competitor happily, inactive

### Step 3: Extract Data
For each qualified lead:
```
- Name (from username or business)
- Business name
- Source (Reddit/LinkedIn/etc.)
- Segment (Amazon FBA/Shopify/Bookkeeper/Contractor)
- Pain point quote (exact text from their post)
- Contact info (email or website)
- Profile/post URL
```

### Step 4: Save to Data File
Append to `data/leads.csv` with format:
```
date_added,name,business,email,source,segment,priority,pain_quote,profile_url,status
```

## Output Format

Save leads to: `data/leads.csv`

Columns:
- `date_added`: YYYY-MM-DD
- `name`: First/full name
- `business`: Business/brand name
- `email`: Contact email (or "NEEDS_RESEARCH" if not found)
- `source`: Reddit/LinkedIn/Shopify/IndieHackers
- `segment`: AmazonFBA/Shopify/Bookkeeper/Contractor
- `priority`: P1/P2/P3 (based on pain clarity + business fit)
- `pain_quote`: Exact quote showing pain point
- `profile_url`: Link to post/profile
- `status`: NEW (default for new leads)

## Priority Guidelines

**P1 (High Priority):**
- Explicitly mentioned invoice/data entry pain
- High volume business (multiple suppliers, active)
- Clear contact info available

**P2 (Medium Priority):**
- Likely has pain based on business type
- Moderate activity/engagement
- Good segment fit

**P3 (Low Priority):**
- Might have pain (unclear)
- Less clear fit
- Backup list

## Daily Target

- **10 new qualified leads/day** minimum
- Mix across segments (don't rely on just one source)
- Focus on P1/P2 quality over quantity

## Tools

**Manual Research (for now):**
- Web browser for Reddit, forums, LinkedIn
- Manual extraction into CSV

**Future Automation (optional):**
- Reddit API for post monitoring
- LinkedIn scraping (requires Sales Navigator)
- Hunter.io for email discovery

## Notes

- **IMPORTANT:** No automated scraping without permission/terms compliance
- Manual research preferred to avoid rate limits/bans
- Personalization quality > lead quantity
- If email not found: save as "NEEDS_RESEARCH" and note website URL

## Usage

When heartbeat triggers lead research:
1. Read this skill
2. Spend 1-2 hours researching one source
3. Find 5-10 qualified leads
4. Add to `data/leads.csv`
5. Report new lead count + priority breakdown
