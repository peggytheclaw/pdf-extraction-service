# Social Listening Tool

Automated tool to monitor online discussions about PDF automation problems for customer discovery.

## Features

- **Multi-Platform Monitoring**: Reddit, Hacker News (with extensibility for Twitter/X and IndieHackers)
- **Keyword Tracking**: Monitors discussions about PDF extraction, invoice parsing, PDF automation, and more
- **Smart Relevance Scoring**: Ranks opportunities based on engagement, keyword density, and recency
- **Daily Digests**: Generates beautiful HTML reports with high/medium/low value segmentation
- **Duplicate Prevention**: Tracks seen posts to avoid showing the same content twice
- **High-Value Alerts**: Flags discussions with strong buying signals

## Quick Start

```bash
# Run the social listening tool
node social-listening.js

# View the generated digest
open social-listening-results/digest-YYYY-MM-DD.html
```

## How It Works

1. **Searches platforms** for configured keywords across subreddits and Hacker News
2. **Filters results** from the past 7 days (configurable)
3. **Calculates relevance** based on:
   - Keyword matches (10 points each)
   - Engagement metrics (upvotes, comments)
   - Recency (newer posts score higher)
4. **Generates HTML digest** with three tiers:
   - 🔥 **High-Value** (score ≥ 50): Strong buying signals, immediate opportunities
   - ⭐ **Medium-Value** (score 30-49): Relevant discussions worth monitoring
   - 💬 **Low-Value** (score < 30): Tangentially related content

## Configuration

Edit the `CONFIG` object in `social-listening.js`:

```javascript
const CONFIG = {
  keywords: [
    'PDF extraction',
    'invoice parsing',
    'PDF automation',
    'data entry from PDFs',
    'receipt processing',
    'manual data entry PDF'
  ],
  platforms: {
    reddit: {
      enabled: true,
      subreddits: ['entrepreneur', 'smallbusiness', 'accounting', 'bookkeeping']
    },
    hackernews: {
      enabled: true
    }
  },
  outputDir: './social-listening-results',
  seenPostsFile: './social-listening-seen.json',
  daysToLookBack: 7
};
```

## Platforms

### ✅ Implemented
- **Reddit**: Searches new posts in configured subreddits
- **Hacker News**: Uses Algolia HN Search API for all keywords

### 🔜 Future Additions
- **Twitter/X**: Requires API access (currently expensive)
- **IndieHackers**: Would need web scraping (no public API)

## Automation

### Run Daily via Cron

```bash
# Add to crontab (runs every day at 9 AM)
0 9 * * * cd /path/to/pdf-extraction-service && node social-listening.js
```

### Run with GitHub Actions

Create `.github/workflows/social-listening.yml`:

```yaml
name: Daily Social Listening

on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM daily
  workflow_dispatch:  # Manual trigger

jobs:
  listen:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: node social-listening.js
      - uses: actions/upload-artifact@v3
        with:
          name: social-listening-digest
          path: social-listening-results/
```

## Output Files

- **`social-listening-results/digest-YYYY-MM-DD.html`**: Daily HTML digest
- **`social-listening-seen.json`**: Tracks post IDs to prevent duplicates

## Example Output

The HTML digest includes:

- **Summary statistics**: Total posts, high/medium/low value counts
- **High-value alerts**: Prominent warnings when opportunities are found
- **Organized sections**: Posts grouped by relevance tier
- **Rich metadata**: Platform, author, engagement metrics, timestamps
- **Clickable links**: Direct links to original discussions

## Use Cases

1. **Customer Discovery**: Find people actively discussing PDF problems
2. **Market Research**: Understand common pain points and use cases
3. **Lead Generation**: Identify high-intent prospects
4. **Content Ideas**: Discover what questions people are asking
5. **Competitive Intelligence**: Monitor discussions about competitors

## Rate Limiting

- Reddit: 1-second delay between subreddit searches
- Hacker News: 1-second delay between keyword queries
- Both use respectful User-Agent headers

## License

ISC
