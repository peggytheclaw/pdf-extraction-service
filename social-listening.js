#!/usr/bin/env node

/**
 * Social Listening Tool for PDF Automation Customer Discovery
 * 
 * Monitors online discussions about PDF automation problems across multiple platforms.
 * Generates daily digests of relevant discussions to identify potential customers.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
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

// Utility: Make HTTPS request
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'PDF-Social-Listener/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Load seen posts
function loadSeenPosts() {
  try {
    if (fs.existsSync(CONFIG.seenPostsFile)) {
      return new Set(JSON.parse(fs.readFileSync(CONFIG.seenPostsFile, 'utf8')));
    }
  } catch (e) {
    console.error('Error loading seen posts:', e.message);
  }
  return new Set();
}

// Save seen posts
function saveSeenPosts(seenPosts) {
  try {
    fs.writeFileSync(CONFIG.seenPostsFile, JSON.stringify([...seenPosts], null, 2));
  } catch (e) {
    console.error('Error saving seen posts:', e.message);
  }
}

// Check if text matches any keyword
function matchesKeywords(text) {
  const lowerText = text.toLowerCase();
  return CONFIG.keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

// Reddit search
async function searchReddit(subreddit) {
  const results = [];
  const cutoffTime = Date.now() / 1000 - (CONFIG.daysToLookBack * 86400);
  
  try {
    const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=100`;
    const data = await httpsGet(url);
    
    if (data.data && data.data.children) {
      for (const post of data.data.children) {
        const p = post.data;
        if (p.created_utc < cutoffTime) continue;
        
        const text = `${p.title} ${p.selftext || ''}`;
        if (matchesKeywords(text)) {
          results.push({
            platform: 'Reddit',
            subreddit: `r/${subreddit}`,
            title: p.title,
            url: `https://reddit.com${p.permalink}`,
            snippet: (p.selftext || p.title).slice(0, 300),
            author: p.author,
            score: p.score,
            comments: p.num_comments,
            created: new Date(p.created_utc * 1000).toISOString(),
            id: p.id
          });
        }
      }
    }
  } catch (e) {
    console.error(`Error searching Reddit r/${subreddit}:`, e.message);
  }
  
  return results;
}

// Hacker News search
async function searchHackerNews() {
  const results = [];
  const cutoffTime = Date.now() / 1000 - (CONFIG.daysToLookBack * 86400);
  
  try {
    for (const keyword of CONFIG.keywords) {
      const encodedKeyword = encodeURIComponent(keyword);
      const url = `https://hn.algolia.com/api/v1/search?query=${encodedKeyword}&tags=story&numericFilters=created_at_i>${Math.floor(cutoffTime)}`;
      const data = await httpsGet(url);
      
      if (data.hits) {
        for (const hit of data.hits) {
          results.push({
            platform: 'Hacker News',
            title: hit.title || hit.story_title,
            url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
            snippet: (hit.story_text || hit.comment_text || '').slice(0, 300),
            author: hit.author,
            points: hit.points,
            comments: hit.num_comments,
            created: new Date(hit.created_at_i * 1000).toISOString(),
            id: hit.objectID
          });
        }
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (e) {
    console.error('Error searching Hacker News:', e.message);
  }
  
  return results;
}

// Calculate relevance score
function calculateRelevance(post) {
  let score = 0;
  
  // Keyword density
  const text = `${post.title} ${post.snippet}`.toLowerCase();
  CONFIG.keywords.forEach(keyword => {
    if (text.includes(keyword.toLowerCase())) score += 10;
  });
  
  // Engagement metrics
  if (post.score) score += Math.min(post.score / 10, 20);
  if (post.points) score += Math.min(post.points / 5, 20);
  if (post.comments) score += Math.min(post.comments * 2, 30);
  
  // Recency (prefer newer posts)
  const ageInDays = (Date.now() - new Date(post.created).getTime()) / 86400000;
  score += Math.max(10 - ageInDays, 0);
  
  return Math.round(score);
}

// Generate HTML digest
function generateHTMLDigest(posts) {
  const sortedPosts = posts
    .map(post => ({ ...post, relevance: calculateRelevance(post) }))
    .sort((a, b) => b.relevance - a.relevance);
  
  const highValuePosts = sortedPosts.filter(p => p.relevance >= 50);
  const mediumValuePosts = sortedPosts.filter(p => p.relevance >= 30 && p.relevance < 50);
  const lowValuePosts = sortedPosts.filter(p => p.relevance < 30);
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Social Listening Digest - ${new Date().toDateString()}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 { margin: 0 0 10px 0; color: #333; }
    .meta { color: #666; font-size: 14px; }
    .section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .section h2 {
      margin-top: 0;
      font-size: 18px;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }
    .high-value h2 { border-color: #ff6b6b; color: #ff6b6b; }
    .medium-value h2 { border-color: #ffa500; color: #ffa500; }
    .low-value h2 { border-color: #999; color: #999; }
    .post {
      border-left: 4px solid #ddd;
      padding: 15px;
      margin-bottom: 15px;
      background: #fafafa;
    }
    .high-value .post { border-color: #ff6b6b; }
    .medium-value .post { border-color: #ffa500; }
    .post-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .post-title a {
      color: #333;
      text-decoration: none;
    }
    .post-title a:hover {
      color: #0066cc;
    }
    .post-meta {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
    }
    .post-snippet {
      font-size: 14px;
      color: #444;
      line-height: 1.5;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      background: #eee;
      border-radius: 3px;
      font-size: 11px;
      margin-right: 5px;
    }
    .relevance-score {
      float: right;
      background: #333;
      color: white;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }
    .alert {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .summary {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    .summary-item {
      text-align: center;
    }
    .summary-number {
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
    .summary-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 Social Listening Digest</h1>
    <div class="meta">Generated on ${new Date().toLocaleString()}</div>
    <div class="summary">
      <div class="summary-item">
        <div class="summary-number">${sortedPosts.length}</div>
        <div class="summary-label">Total Posts</div>
      </div>
      <div class="summary-item">
        <div class="summary-number">${highValuePosts.length}</div>
        <div class="summary-label">High Value</div>
      </div>
      <div class="summary-item">
        <div class="summary-number">${mediumValuePosts.length}</div>
        <div class="summary-label">Medium Value</div>
      </div>
      <div class="summary-item">
        <div class="summary-number">${lowValuePosts.length}</div>
        <div class="summary-label">Low Value</div>
      </div>
    </div>
  </div>
`;

  if (highValuePosts.length > 0) {
    html += `
  <div class="alert">
    🚨 <strong>${highValuePosts.length} High-Value Opportunities Detected!</strong> These discussions show strong buying signals or pain points.
  </div>
  
  <div class="section high-value">
    <h2>🔥 High-Value Opportunities (Score ≥ 50)</h2>
`;
    highValuePosts.forEach(post => {
      html += generatePostHTML(post);
    });
    html += `  </div>\n`;
  }

  if (mediumValuePosts.length > 0) {
    html += `
  <div class="section medium-value">
    <h2>⭐ Medium-Value Discussions (Score 30-49)</h2>
`;
    mediumValuePosts.forEach(post => {
      html += generatePostHTML(post);
    });
    html += `  </div>\n`;
  }

  if (lowValuePosts.length > 0) {
    html += `
  <div class="section low-value">
    <h2>💬 Other Relevant Discussions (Score &lt; 30)</h2>
`;
    lowValuePosts.forEach(post => {
      html += generatePostHTML(post);
    });
    html += `  </div>\n`;
  }

  html += `
</body>
</html>`;

  return html;
}

function generatePostHTML(post) {
  return `
    <div class="post">
      <div class="post-title">
        <a href="${post.url}" target="_blank">${escapeHtml(post.title)}</a>
        <span class="relevance-score">${post.relevance}</span>
      </div>
      <div class="post-meta">
        <span class="badge">${post.platform}</span>
        ${post.subreddit ? `<span class="badge">${post.subreddit}</span>` : ''}
        <span class="badge">👤 ${post.author}</span>
        ${post.score ? `<span class="badge">⬆️ ${post.score}</span>` : ''}
        ${post.points ? `<span class="badge">⬆️ ${post.points}</span>` : ''}
        ${post.comments ? `<span class="badge">💬 ${post.comments}</span>` : ''}
        <span class="badge">🕐 ${new Date(post.created).toLocaleDateString()}</span>
      </div>
      <div class="post-snippet">${escapeHtml(post.snippet)}</div>
    </div>
`;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Main execution
async function main() {
  console.log('🔍 Social Listening Tool Starting...\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Load seen posts
  const seenPosts = loadSeenPosts();
  const initialSeenCount = seenPosts.size;
  
  // Collect all results
  let allPosts = [];
  
  // Search Reddit
  if (CONFIG.platforms.reddit.enabled) {
    console.log('📱 Searching Reddit...');
    for (const subreddit of CONFIG.platforms.reddit.subreddits) {
      console.log(`  - r/${subreddit}`);
      const posts = await searchReddit(subreddit);
      allPosts.push(...posts);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    }
  }
  
  // Search Hacker News
  if (CONFIG.platforms.hackernews.enabled) {
    console.log('🟠 Searching Hacker News...');
    const posts = await searchHackerNews();
    allPosts.push(...posts);
  }
  
  // Filter out already seen posts
  const newPosts = allPosts.filter(post => {
    if (seenPosts.has(post.id)) return false;
    seenPosts.add(post.id);
    return true;
  });
  
  console.log(`\n📊 Results:`);
  console.log(`  - Total posts found: ${allPosts.length}`);
  console.log(`  - New posts: ${newPosts.length}`);
  console.log(`  - Previously seen: ${allPosts.length - newPosts.length}`);
  
  // Generate digest
  if (newPosts.length > 0) {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `digest-${timestamp}.html`;
    const filepath = path.join(CONFIG.outputDir, filename);
    
    const html = generateHTMLDigest(newPosts);
    fs.writeFileSync(filepath, html);
    
    console.log(`\n✅ Digest generated: ${filepath}`);
    
    // Count high-value opportunities
    const highValue = newPosts.filter(p => calculateRelevance(p) >= 50).length;
    if (highValue > 0) {
      console.log(`\n🚨 ALERT: ${highValue} high-value opportunities found!`);
    }
  } else {
    console.log('\n💤 No new posts found.');
  }
  
  // Save seen posts
  if (seenPosts.size > initialSeenCount) {
    saveSeenPosts(seenPosts);
    console.log(`\n💾 Saved ${seenPosts.size - initialSeenCount} new post IDs to tracking file.`);
  }
  
  console.log('\n✨ Social listening complete!\n');
}

// Run
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { searchReddit, searchHackerNews, calculateRelevance };
